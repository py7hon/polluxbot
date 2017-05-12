var gear = require("../gearbox.js");
const Discord = require("discord.js");
const Jimp = require("jimp");
const getter = require("booru-getter")
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'safe';

var init = function (message,userDB,DB) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
if (Author.bot) return;
var Member = Server.member(Author);
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
var bot = message.botUser
var args = MSG.split(' ').slice(1)[1]
var LANG = message.lang;

//-------MAGIC----------------
 var emb =    new Discord.RichEmbed();

        console.log("SAFEBOORU INVOKED by " + Author.name + "-------------\n")
        console.log(1) ;
        let query = message.content.split(" ");
        !query[1] ? query[1] = "1girl+airplane+solo" : query[1] = query[1];
        getter.getRandom(query[1], (url) => {
            console.log(2)
            if (url === undefined) {
                message.reply(mm('forFun.booru404',{lngs:LANG}))
            }
            else {
                //message.reply('http:' + url)
                emb.setImage('https://webassets.mongodb.com/_com_assets/global/mongodb-logo-white.png')
               emb.setTitle("dsfasf")
                console.log(url)
                  emb.setColor('#ff97cf')


                    message.channel.sendEmbed(emb,message.author+' ').then(function (m) {
                m.react('👍').catch()
                m.react('👎').catch()
                m.react('❤').catch()
                m.react('😠').catch()

            }).catch()
            }
        })
    };

module.exports = {pub:true,cmd: cmd, perms: 0, init: init, cat: 'image'};

