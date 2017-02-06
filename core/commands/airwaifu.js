const fs = require("fs");
const getter = require("booru-getter");
const Discord = require("discord.js");


exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {


    console.log("AIRWAIFU INVOKED by " + caller + "-------------\n")
    console.log(1);
    let query = 'airplane+-comic'
    getter.getRandom(query, (url) => {
        console.log(2)
        if (url === undefined) {
            message.reply("Não achei nada com essas tags :(")
        } else {
            //message.reply('http:' + url)
            emb = new Discord.RichEmbed();
            emb.setColor('#a47ee2')
            emb.setTitle(':airplane: Aerowaifu do Dia')

            emb.setImage("http:" + url)
            message.channel.sendEmbed(emb).then(function (m) {
                m.react('👍')
                m.react('👎')
                m.react('❤')
                m.react('😠')

            })
        }
    })
};
