var gear = require("../../gearbox.js");


const rq = require("request")

var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'catgirl';

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

        //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (message.content.split(" ")[1]==helpkey || message.content.split(" ")[1]=="?"|| message.content.split(" ")[1]=="help"){
    return gear.usage(cmd,message,"nsfw");
}
//------------
    var emb =    new gear.Discord.RichEmbed();
var xc = ""
        console.log("CATGIRL INVOKED by " + Author.name + "-------------\n")
        console.log(1) ;
 rq('http://catgirls.brussell98.tk/nsfw/',  function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = gear.cheerio.load(html);
            $('img').each(function (i, element) {
              xc += "http://catgirls.brussell98.tk"+ element.attribs.src
            });

                //message.reply('http:' + url)
               // emb.setImage(url)
               emb.setTitle(":heart: Meow")
               emb.setImage( xc)


                  emb.setColor('#f25acf')

                    message.channel.send({embed:emb}).then(function (m) {
                m.react('👍').catch()
                m.react('👎').catch()
                m.react('❤').catch()
                m.react('😠').catch()

            }).catch(e=>message.channel.send(xc))
        }else{
         // console.log(response.statusCode)
          //  console.log(error)

        }
    });



            }


 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'nsfw'};

