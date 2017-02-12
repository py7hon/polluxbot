var gear = require("../gearbox.js");
const Discord = require("discord.js");
const Jimp = require("jimp");
const getter = require("booru-getter")

var cmd = 'name';

var init = function (message, userDB, DB) {
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


        console.log("SAFEBOORU INVOKED by " + Author + "-------------\n")
        console.log(1) ;
        let query = message.content.split(" ");
        !query[1] ? query[1] = "1girl+airplane+solo" : query[1] = query[1];
        getter.getRandom(query[1], (url) => {
            console.log(2)
            if (url === undefined) {
                message.reply("Não achei nada com essas tags :(")
            }
            else {
                //message.reply('http:' + url)
                 emb =    new Discord.RichEmbed();
                        emb.setColor('#ff97cf')

                emb.setImage("http:" + url)
                    message.channel.sendEmbed(emb,message.author+' ').then(function (m) {
                m.react('👍')
                m.react('👎')
                m.react('❤')
                m.react('😠')

            })
            }
        })
    };

module.exports = {cmd: cmd, perms: 0, init: init, cat: 'image'};

