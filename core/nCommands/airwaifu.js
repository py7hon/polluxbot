const Discord = require("discord.js");
const getter = require("booru-getter");
const fs = require("fs");

var cmd = 'name';


var init = function (message) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
if (Author.bot) return;
var emb = new Discord.RichEmbed();




    let query = 'airplane+-comic+-animated'
    console.log("AIRWAIFU INVOKED by " + Author + "-------------\n")

    getter.getRandom(query, (url) => {

        if (url === undefined) {
            message.reply("Não achei nada com essas tags :(")
        } else {
            //message.reply('http:' + url)
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

module.exports = {cmd: cmd, perms: 0, init: init, cat: 'misc'};


