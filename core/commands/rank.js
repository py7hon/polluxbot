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
var args = MSG.split(' ').slice(1)[0]
var LANG = message.lang;

//-------MAGIC----------------


gear.paramIncrement(Author,'goodies',0)

 emb =    new Discord.RichEmbed();
    emb.title = "Global Leaderboards"

 emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/skynet.png")
     if (args == "sv"|| args =="server"||args=="guild"||args=="s") {
                    emb.title = "Server Leaderboards"
 emb.setThumbnail(Server.iconURL)
     }
     var rankItem = []
        var ranked = []
        userDB.forEach(j=>{
            var i = JSON.parse(j)


                try{
                var u = bot.users.get(i.ID)
                gear.superDefine(u,"name",u.username)
            }catch(e){}


            if (args == "sv"|| args =="server"||args=="guild"||args=="s") {
                if(!Server.members.has(i.ID)) return;
            }




            rankItem.exp = i.modules.exp
            rankItem.level = i.modules.level
            //rankItem.name = (i.name||i.username||i.ID)
            rankItem.name = (i.name||i.username)
            ranked.push(rankItem)
            rankItem = []
        })
        arraySort(ranked, 'exp', {
            reverse: true
        })


    emb.setColor('#da5bae')


    emb.setAuthor('Pollux',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')

  emb.setFooter(mm('forFun.leadUnap',{lngs:LANG,prefix:message.prefix}))
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



    message.channel.send({embed:emb}).catch()





}
 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'misc'};

