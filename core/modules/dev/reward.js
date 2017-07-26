var gear = require("../../gearbox.js");
const Discord = require("discord.js");
const Jimp = require("jimp");
const rq = require("request")
const cheerio = require("cheerio")
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'catgirl';
    const cfg = require('../../../config.js');

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




    let rqORG = {
        headers: {
            Authorization: cfg.dborg
        },
        url: `https://discordbots.org/api/bots/271394014358405121/votes`,
        method: 'GET',
           body: { onlyids: true, search:["id",Author.id] },
  json: true
    };

    rq(rqORG, function (err, response, body) {
        if (err) {
          console.log("ORG");
            console.log(err)
        }
          console.log("ORG");
          console.log(body);

    if(userDB.get(Target.id).upvote==true){
        return message.reply("Bonus already rewarded!")
    }

 var emb  = new Discord.RichEmbed

 emb.setColor("#d92323")
        emb.setAuthor(Target.tag,Target.avatarURL)
        emb.setDescription("Not Voted Yet. Please upvote me at: https://discordbots.org/bot/271394014358405121 and receive 1000 "+gear.emoji("ruby")+", Dailies Boost and 5 Rep as Reward! And a Pollux medal! `+equip` "+gear.emoji("pollux"))
        if(LANG === "dev"||LANG=="pt"){
         emb.setDescription("Upvote não computado vote em mim em: https://discordbots.org/bot/271394014358405121 e receba 1000 "+gear.emoji("ruby")+", boost de Dailies e +5 Rep de Recompensa! E de brinde a Medalhinha da Pollux! `+equip`"+gear.emoji("pollux"))
        }



        for (i=0;i<body.length ;i++){

            if (body[i].id == Target.id){
 emb.setColor("#8cdd5a")
        emb.setDescription("Vote confirmed! Awarding 1000 "+gear.emoji("ruby")+" as reward! And boosting your dailies by 50 for one month, and 5 Rep!" )
                 if(LANG === "dev"||LANG=="pt"){
         emb.setDescription("Voto confirmado! Entregando 1000 "+gear.emoji("ruby")+" de Recompensa! E boostando suas dailies em 50 por um mês, e 5 Rep!")
        }
                gear.superDefine(Target,"upvote",true)
                gear.paramIncrement(Target,"rep",5)
                gear.paramIncrement(Target,"goodies",1000)
                gear.paramAdd(Target,"medalInventory",["pollux","Pollux"])

           return message.reply({embed:emb})}else{

            }

            }
 message.reply({embed:emb})


        })
}

 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'nsfw'};

