const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
const gear = require('../gearbox.js')

var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'rank';

var init = function (message, userDB, DB) {
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



     var rankItem = []
        var ranked = []
        for (var i in userDB) {
            rankItem.name = userDB[i].name
            rankItem.exp = userDB[i].modules.exp
            rankItem.level = userDB[i].modules.level
            ranked.push(rankItem)
            rankItem = []
        }
        arraySort(ranked, 'exp', {
            reverse: true
        })


 emb =    new Discord.RichEmbed();
    emb.setColor('#da5bae')
    emb.title = "Global Leaderboards"

    emb.setAuthor('Pollux',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')

  emb.setFooter(mm('forFun.leadUnap',{lngs:LANG,prefix:message.prefix}))
 emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/skynet.png")
 // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/skynet.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    //emb.description = "Os Top-5 fregueses mais tradicionais do Cyber Cafe"

var medals = [':first_place: 1st',
':second_place: 2nd',
':third_place: 3rd',
':medal: 4th',
':medal: 5th'
]
console.log("WALRUS")
for (i=0;i<ranked.length;i++){
    if (i < 5){
         console.log(ranked[i])
         console.log(medals[i])
      emb.addField(medals[i],ranked[i].name, true)
      emb.addField('Level '+ranked[i].level,'**'+ranked[i].exp + '** Exp', true)
    }
}



    message.channel.sendEmbed(emb).catch()






}
 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'misc'};

