const fs = require("fs");
const getter = require("booru-getter");
 const Discord = require("discord.js");


exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {


        console.log("SAFEBOORU INVOKED by " + caller + "-------------\n")
        console.log(1) ;
        let query = message.content.split(" ");
        !query[1] ? query[1] = "1girl+airplane" : query[1] = query[1];
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

