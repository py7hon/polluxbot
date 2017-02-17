const Discord = require("discord.js");
const getter = require("booru-getter");
const fs = require("fs");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'airwaifu';
var emb = new Discord.RichEmbed();

var init = function (message) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
if (Author.bot) return;

  var LANG = message.lang;

    var success = mm('forFun.airwaifu',{lngs:LANG})
    var fail = mm('forFun.booru404',{lngs:LANG})


    let query = 'airplane+-comic+-animated'
    console.log("AIRWAIFU INVOKED by " + Author + "-------------\n")

    getter.getRandom(query, (url) => {

        if (url === undefined) {
            message.reply("Não achei nada com essas tags :(")
        } else {
            //message.reply('http:' + url)
            emb.setImage('http:' +url)
            emb.setColor('#a47ee2')
            emb.setTitle(':airplane: Aerowaifu do Dia')


            message.channel.sendEmbed(emb).then(function (m) {
                m.react('👍').catch()
                m.react('👎').catch()
                m.react('❤').catch()
                m.react('😠').catch()

            }).catch()
        }
    })


};

module.exports = {pub:true,cmd: cmd, perms: 0, init: init, cat: 'misc'};


