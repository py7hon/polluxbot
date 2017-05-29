const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
const gear = require('../gearbox.js')
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'cashrank';
var init = function (message,userDB,DB) {



    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;
    //-------MAGIC----------------

    gear.paramIncrement(Author,'goodies',0)
      gear.paramIncrement(Author,'goodies',0)

    let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (DB[Server.id].modules) {
        GOODMOJI = DB[Server.id].modules
    }
    if (DB[Server.id].modules.GOODNAME) {
        GOOD = DB[Server.id].modules.GOODNAME
    }
    emb = new Discord.RichEmbed();
    var rankItem = []
    var ranked = []
    for (var i in userDB) {
        console.log(i +'---------------')


        if (userDB[i].name == 'Pollux') {}
        else {
            rankItem.name = userDB[i].name
            rankItem.goodies = userDB[i].modules.goodies
            rankItem.level = userDB[i].modules.level
            ranked.push(rankItem)
            rankItem = []
        }
    }
    arraySort(ranked, 'goodies', {
        reverse: true
    })

    emb.setColor('#e22449')
    emb.title = "WEALTH RANK"
    emb.setAuthor('Pollux', bot.user.avatarURL, 'https://github.com/LucasFlicky/polluxbot')
        //emb.setFooter('Se você não aparece aqui, digite +ruby para ver quantos Rubys você tem')
    emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/resources/imgres/emoji/ruby.png")
        // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
        //    emb.description = "Os Top-5 mais rubificadoss do server"
var medals = [':first_place: 1st',
':second_place: 2nd',
':third_place: 3rd'
, ':medal: 4th'
, ':medal: 5th'
]
    console.log("WALRUS")
    for (i = 0; i < ranked.length; i++) {
        if (i < 5) {

            emb.addField(medals[i], ranked[i].name, true)
            emb.addField(GOOD + 's', ranked[i].goodies + GOODMOJI, true)
        }
    }
    message.channel.sendEmbed(emb)
}
 module.exports = {
    pub: true
    , cmd: cmd
    , perms: 0
    , init: init
    , cat: 'misc'
};
