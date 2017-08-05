 const paths = require("../../paths.js");
 const gear = require("../../gearbox.js");
 const namely = require('name-this-color');
 const translate = require('google-translate-api');
 var locale = require('../../../utils/multilang_b');
 var mm = locale.getT();

const cmd = 'color';

const init = function (message, userDB, DB) {
     const Channel = message.channel;
     const Author = message.author;
     const MSG = message.content;
     const bot = message.botUser
     const args = MSG.split(' ').slice(1)[0]
     const regExp = new RegExp(/[0-9A-Fa-f]{6}/g);

     try {
         //HELP TRIGGER
         let helpkey = mm("helpkey", {
             lngs: message.lang
         })
         if (!regExp.test(args) || !args || args === undefined || MSG.split(" ")[1] == helpkey || MSG.split(" ")[1] == "?" || MSG.split(" ")[1] == "help") {
             return gear.usage(cmd, message,this.cat);
         }
     } catch (e) {
         console.log(e)
     }
     //------------

     const hex = parseInt((args + "FF").replace(/^#/, ''), 16);

     const image = new gear.Jimp(126, 126, hex, function (err, img) {
         gear.Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
             img.mask(lenna, 0, 0)
             img.getBuffer(gear.Jimp.MIME_PNG, function (err, image) {
                 let emb = new gear.Discord.RichEmbed;
                 emb.setColor("#" + args.replace(/^#/, ''))
                 let colset = namely(args)[0]

                 let lang = message.lang[0]
                 if (lang === "dev") lang = "pt";

                 translate(namely(args)[0].title, {
                     to: lang
                 }).then(colset => {
                     console.log(colset.text);
                     console.log(namely(args)[0].title);
                     emb.setAuthor(colset.text, "https://png.icons8.com/paint-brush/dusk/64")
                     message.channel.send({embed: emb,files: [{attachment: image,name: "file.png"}]})

                 })

             })

         })

     });

 }

 module.exports = {
     pub: true,
     cmd: cmd,
     perms: 3,
     init: init,
     cat: 'misc'
 };
