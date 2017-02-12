const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
const gear = require('../gearbox.js')

var locale = require('../../utils/multilang_b');
var mm = locale.getT();

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


 emb =    new Discord.RichEmbed();



     var rankItem = []
        var ranked = []
        for (var i in userDB) {
            rankItem.name = userDB[i].name
            rankItem.exp = userDB[i].modules.exp
            rankItem.level = userDB[i].modules.level
            ranked.push(rankItem)
            rankItem = []
        }
        arraySort(ranked, 'userDB', {
            reverse: true
        })
        console.log(ranked)


    emb.setColor('#da5bae')
    emb.title = "Global Leaderboards"

    emb.setAuthor('Pollux',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')

  emb.setFooter('Se você não aparece aqui, digite +profile para ver seu Level')
 emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/skynet.png")
 // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/skynet.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    //emb.description = "Os Top-5 fregueses mais tradicionais do Cyber Cafe"

var medals = [':first_place: 1st',
':first_place: 2nd',
':first_place: 3rd',
':medal: 4th',
':medal: 5th'
]
for (i=0;i<ranked.length;i++){
    if (i > 4) return;
      emb.addField(medals[i],ranked[i].name, true)
      emb.addField('Level '+ranked[i].level,'**'+ranked[i].exp + '** Exp', true)
}



    message.channel.sendEmbed(emb)






}
module.exports = {cmd: cmd, perms: 0, init: init, cat: 'misc'};

