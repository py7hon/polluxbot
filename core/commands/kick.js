var ff = require("../functionfest.js");
const Discord = require('discord.js');
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'kick';

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
var reason = MSG.split(' ').slice(2)
var LANG = message.lang;

 reason = reason.toString().replace(/,/g," ")



//-------MAGIC----------------
    const Jimp = require("jimp");
    var paths = require("../paths.js");
    var modPass = false

    var noperms     =   mm('CMD.moderationNeeded', {lngs:LANG})
    var KICKED     =   mm('dict.kicked', {lngs:LANG})
    var wasKICKED     =   mm('dict.waskicked', {lngs:LANG})
    var REASON     =   mm('dict.reason', {lngs:LANG})
    var RESPO     =   mm('dict.responsible', {lngs:LANG})
    var whokik      =   mm('CMD.kinNone', {lngs:LANG})
    var nope        =   mm('CMD.kin404', {lngs:LANG})
    var noPermsMe   =   mm('CMD.unperm', {lngs:LANG})
    var justasec    =   mm('CMD.jas', {lngs:LANG})
    var noReason      =   mm('CMD.noReason', {lngs:LANG, target:Target.username})

   if (reason=="") {reason = noReason };
    var didkik      =   mm('CMD.didkik', {lngs:LANG, target:Target.username,reason:reason})

   var modPass = ff.hasPerms(Member,DB)

    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }


    if (message.mentions.users.size === 0) {
        return message.reply(whokik).catch(console.error);
    }
    let kickMember = Server.member(Target);
    let kik = Target
    if (!kickMember) {
        return message.reply(nope);
    }
    if (!Server.member(bot.user).hasPermission("KICK_MEMBERS")) {
        return message.reply(noPermsMe).catch(console.error);
    }


    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10)
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10);
    }
var namae = kickMember.displayName

 kickMember.kick().then(kik=>{


     let logchan = DB.get(Server.id).modules.LOGCHANNEL
     let advchan = DB.get(Server.id).modules.ADVLOG
     let actchan = DB.get(Server.id).modules.ACTLOG
     let modchan = DB.get(Server.id).modules.MODLOG


   // if( advchan && Server.channels.has(advchan)){chanpoint = Server.channels.get(advchan)}
  //  if( actchan && Server.channels.has(actchan)){chanpoint = Server.channels.get(actchan)}
    if( logchan && Server.channels.has(logchan)){chanpoint = Server.channels.get(logchan)}
    if( modchan && Server.channels.has(modchan)){chanpoint = Server.channels.get(modchan)}


   if (chanpoint){

var id =  Target.id
var mess = message
var emb = new Discord.RichEmbed;

     emb.setThumbnail(Target.avatarURL)
       emb.setTitle(":boot: "+KICKED);
emb.setDescription(`**${Target.username+"#"+Target.discriminator}** ${wasKICKED}`);
//emb.addField("Channel",mess.channel,true)
emb.addField(REASON, reason ,true)
emb.addField(RESPO,Author,true)
//emb.addField("Message",mess.content,true)
 emb.setColor("#f54510");
var ts = new Date
emb.setFooter("Kick",Target.avatarURL)
emb.setTimestamp(ts)

   chanpoint.sendEmbed(emb).catch()

         }


    Jimp.read(img).then(function (face) {
        face.resize(126, 126)
        Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
            face.mask(lenna, 0, 0)


            face.resize(96, 96)
            face.rotate(-45)
            Jimp.read(paths.BUILD + "jazz.png").then(function (jazz) {
                jazz.composite(face, 80, 31);
                //jazz.write(`${paths.ROUND}/${caller}2.png`);
                message.channel.sendMessage(justasec)
                jazz.getBuffer(Jimp.MIME_PNG, function (err, image) {


                    message.channel.sendFile(image, 'kicked.png', didkik).then(m => {

                    }).catch(e=>{message.reply("Não me deixaram postar a imagem pica do Jazz aqui mas kickei ele igual")})
                })

            });

        });
    });




 }).catch(e=>{message.reply(e)})


    message.delete(1000)

}
 module.exports = {pub:true,cmd: cmd, perms: 2, init: init, cat: 'misc'};
