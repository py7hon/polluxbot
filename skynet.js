var Discord = require("discord.js");
var bot = new Discord.Client({
    messageCacheMaxSize: 4048,
    messageCacheLifetime: 1680,
    messageSweepInterval: 2600,
    disableEveryone: true,
    fetchAllMembers: true,
    disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking']
});
var cfg = require('./config.js');

var async = require('async')
var prefix = "+";
const Jimp = require("jimp");
var i18next = require('i18next');
var multilang = require('./utils/multilang_b');
var Backend = require('i18next-node-fs-backend');
var fs = require("fs");
var paths = require("./core/paths.js");
var skynet = '248285312353173505'

//var DB= new SelfReloadJSON();
//var userDB =new SelfReloadJSON('./database/users.json');

var timer;
var colors = require('colors');
var backendOptions = {
    loadPath: './utils/lang/{{lng}}/{{ns}}.json',
    addPath: './utils/lang/{{lng}}/{{ns}}.missing.json',
    jsonIndent: 2
};
const {
    AkairoClient
} = require('discord-akairo');
const client = new AkairoClient({
    ownerID: '88120564400553984',
    prefix: '+'
});

bot.login(cfg.tokenOS).then(() => {

});



//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------SKYNET MAID CAFE EXCLUSIVE FEATURES ------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

bot.on('presenceUpdate', (oldMember, newMember) => {
    var sky = bot.guilds.get(skynet)
    if (oldMember.guild != sky) return;
setTimeout(fu=>{

    try {

        if (newMember.id == '248435798179971072' && newMember.presence.game.name.toLowerCase() == "for honor") {
            console.log('HONOR')
            sky.defaultChannel.send("O gay do " + newMember + " já tá jogando aquele jogo de viado de novo.")

        }


        if ((newMember.presence.game.name.toLowerCase() == "heroes of the storm")&&(oldMember.presence.game.name.toLowerCase() != "heroes of the storm")) {
            console.log('HERO')
            var herois = sky.roles.find('name', 'Herois do Toró')
            sky.defaultChannel.send(herois + " pessoal, **" + newMember.displayName + "** abriu o jogo, juntem ae.").then(jjm=>{jjm.delete(600000)}).catch()

            var team = 0
            newMember.guild.presences.forEach(e => {
                if (e.game && e.game.name.toLowerCase() == "heroes of the storm") team++;
            })

            if (team > 1 && team < 6){
                sky.defaultChannel.send("Temos **"+team+"** malucos jogando, faltam "+(5-team)+" e fecha o time.").then(jjm=>{jjm.delete(600000)}).catch()
            }
            if (team > 5 && team < 10){
                sky.defaultChannel.send("Temos **"+team+"** malucos jogando, faltam "+(10-team)+" e temos dois times!!!").then(jjm=>{jjm.delete(600000)}).catch()
            }
             if (team == 5){
                sky.defaultChannel.send("FECHOU TIME!!!").then(jjm=>{jjm.delete(600000)}).catch()
            }
if (team == 10){
                sky.defaultChannel.send("FECHOU DOIS TIMES!!!").then(jjm=>{jjm.delete(600000)}).catch()
            }

        }
    } catch (e) {
        if (newMember.id == '248435798179971072' && oldMember.presence.game.name.toLowerCase() == "for honor" && !newMember.presence.game) {
            sky.defaultChannel.send(" Juba acabou de sair do jogo de viado dele.")

        }
    }
},10000)
})

//
//Reactions
//-----------------------------------------------------
const REACTIONS = "./resources/imgres/reactions/"

bot.on('message', message => {
  var now = new Date().getTime();
       var dayC = 86400000



if (!message.guild) return;

    if (message.content.includes('mad scientist')||message.content.includes('mado saient')){

        message.channel.send('https://www.youtube.com/watch?v=gjTzz8cOxBU')
    }

    if (message.content.startsWith(prefix + "salty")) {
        message.channel.send({files:[REACTIONS + "juba.png"]})
    };

    if (message.content.startsWith(prefix + "vidal")) {
        message.channel.send({files:[REACTIONS + "vidaru.png"]})

    };

    if (message.content.startsWith(prefix + "several")) {
        message.channel.send({files:[REACTIONS + "several.png"]})

    };

    if (message.content.includes("quantos heróis temos")||message.content.includes("quantos herois temos")||message.content.includes("how many heroes")) {

   var team = 0
            message.guild.presences.forEach(e => {
                if (e.game && e.game.name.toLowerCase() == "heroes of the storm") team++;
            })
            var n =""
            if (team > 1) n="s";
            message.reply(' temos **'+team+'** Herói'+n+' no Nexus no momento.')
    };


})
