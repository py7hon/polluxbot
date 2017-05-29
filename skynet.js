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
var deployer = require('./core/deployer.js');
var cleverbot = require("cleverbot");
cleverbot = new cleverbot(cfg.clever.ID, cfg.clever.token);
var async = require('async')
var prefix = "+";
var shardID = process.env.SHARD_ID;
var shardCount = process.env.SHARD_COUNT;
const Jimp = require("jimp");
var i18next = require('i18next');
var multilang = require('./utils/multilang_b');
var Backend = require('i18next-node-fs-backend');
var fs = require("fs");
var paths = require("./core/paths.js");
var skynet = '248285312353173505'
    //var SelfReloadJSON = require('self-reload-json');
var DB = JSON.parse(fs.readFileSync('./database/servers.json', 'utf8'));
var userDB = JSON.parse(fs.readFileSync('./database/users.json', 'utf8'));


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

client.login(cfg.token).then(() => {

});



//FUNCTIONFEST
function getDirs(rootDir, cb) {
    fs.readdir(rootDir, function (err, files) {
        var dirs = [];
        for (var i = 0; i < files.length; ++i) {
            var file = files[i];
            if (file[0] !== '.') {
                var filePath = rootDir + '/' + file;
                fs.stat(filePath, function (err, stat) {
                    if (stat.isDirectory()) {
                        dirs.push(this.file);
                    }
                    if (files.length === (this.index + 1)) {
                        return cb(dirs);
                    }
                }.bind({
                    index: i,
                    file: file
                }));
            }
        }
    })
}

function channelSetup(element, guild) {

    console.log('Setting Up Channel:'.white + element.name + " from " + guild.name)
    DB[guild.id].channels[element.id] = {
        name: element.name,
        modules: {
            DROPSLY: 0,

            NSFW: true,
            GOODIES: true,
            GOODMOJI: ':gem:',
            GOODNAME: 'Gem',
            LEVELS: true,
            LVUP: true,
            DROPS: true,
            DISABLED: ['cog']
        }
    }
    element.mods = DB[guild.id].channels[element.id].modules;


}

var serverSetup = function serverSetup(guild) {


    if (!DB[guild.id]) {
        console.log(('          --- - - - - = = = = = = Setting Up Guild:'.yellow + guild.name).bgBlue)
        DB[guild.id] = {
            name: guild.name,
            modules: {
                NSFW: true,
                GOODIES: true,
                LEVELS: true,
                LVUP: true,
                DROPS: true,
                GOODMOJI: ':gem:',
                GOODNAME: 'Gem',
                ANNOUNCE: false,
                PREFIX: "+",
                MODROLE: {},
                LANGUAGE: 'en',
                DISABLED: ['cog']
            },
            channels: {}
        }
        guild.channels.forEach(element => {
            if (element.type != 'voice') {
                console.log('Setting Up Channel:'.white + element.name)
                DB[guild.id].channels[element.id] = {
                    name: element.name,
                    modules: {
                        DROPSLY: 0,

                        NSFW: true,
                        GOODIES: true,

                        LEVELS: true,
                        LVUP: true,
                        DROPS: true,
                        DISABLED: ['cog']
                    }
                }
                element.mods = DB[guild.id].channels[element.id].modules;

            }
        });
    } else {

    }
    guild.mods = DB[guild.id].modules
    try {

        fs.writeFile('./database/servers.json', JSON.stringify(DB, null, 4), (err) => {
            //console.log("JSON Write Server Database".gray)
        });
    } catch (err) {}

    /*guild.members.forEach(memb => {
        if (!memb.user.bot) {
            userSetup(memb.user)
        }
    })*/
}

function userSetup(user) {



    if (!userDB[user.id]) {
        console.log('Setting Up Member:' + user.username)
        userDB[user.id] = {
            name: user.username,
            modules: {
                PERMS: 0,
                level: 0,
                exp: 0,
                goodies: 500 + randomize(100, 200),
                coins: 0,
                medals: {},
                expenses: {
                    putaria: 0,
                    jogatina: 0,
                    drops: 0,
                    trade: 0
                },
                "earnings": {
                    putaria: 0,
                    jogatina: 0,
                    drops: 0,
                    trade: 0
                },
                dyStreak: 8,
                daily: 1486595162497,
                persotext: ""
            }
        }
    }
    user.mods = userDB[user.id].modules
    fs.writeFile('./database/users.json', JSON.stringify(userDB, null, 4), (err) => {
        ////console.log("JSON Write User Database".gray)
    });
}


Array.prototype.remove = function () {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function paramAdd(target, param, val) {
    try {
        param = param.split('.');
        if ((param.length == 1)) {

            if (target instanceof Discord.User) {
                //target.mods[param].push(val)
                userDB[target.id].modules[param].push(val)
            }
            if (target instanceof Discord.Guild) {
                // target.mods[param].push(val)
                DB[target.id].modules[param].push(val)
            }
            if (target instanceof Discord.Channel) {
                // target.mods[param].push(val)
                DB[target.guild.id].channels[target.id].modules[param].push(val)
            }
        } else {
            if (target instanceof Discord.User) {
                //target.mods[param].push(val)
                userDB[target.id].modules[param[0]][param[1]].push(val)
            }
            if (target instanceof Discord.Guild) {
                // target.mods[param].push(val)
                DB[target.id].modules[param[0]][param[1]].push(val)
            }
            if (target instanceof Discord.Channel) {
                // target.mods[param].push(val)
                DB[target.guild.id].channels[target.id].modules[param[0]][param[1]].push(val)
            }
        }
        fs.writeFile('./database/users.json', JSON.stringify(userDB, null, 4), (err) => {
            ////console.log("JSON Write User Database".gray)
        });
        fs.writeFile('./database/servers.json', JSON.stringify(DB, null, 4), (err) => {
            ////console.log("JSON Write Servers Database".gray)
        });
    } catch (err) {
        console.log('ERROR JSON'.bgRed.white.bold)
        console.log(err.stack)
    }
}

function paramRemove(target, param, val) {
    try {
        param = param.split('.');
        if ((param.length == 1)) {

            if (target instanceof Discord.User) {
                //target.mods[param].push(val)
                userDB[target.id].modules[param].remove(val)
            }
            if (target instanceof Discord.Guild) {
                // target.mods[param].push(val)
                DB[target.id].modules[param].remove(val)
            }
            if (target instanceof Discord.Channel) {
                // target.mods[param].push(val)
                DB[target.guild.id].channels[target.id].modules[param].remove(val)
            }
        } else {
            if (target instanceof Discord.User) {
                //target.mods[param].push(val)
                userDB[target.id].modules[param[0]][param[1]].remove(val)
            }
            if (target instanceof Discord.Guild) {
                // target.mods[param].push(val)
                DB[target.id].modules[param[0]][param[1]].remove(val)
            }
            if (target instanceof Discord.Channel) {
                // target.mods[param].push(val)
                DB[target.guild.id].channels[target.id].modules[param[0]][param[1]].remove(val)
            }
        }
        fs.writeFile('./database/users.json', JSON.stringify(userDB, null, 4), (err) => {
            ////console.log("JSON Write User Database".gray)
        });
        fs.writeFile('./database/servers.json', JSON.stringify(DB, null, 4), (err) => {
            ////console.log("JSON Write Servers Database".gray)
        });
    } catch (err) {
        console.log('ERROR JSON'.bgRed.white.bold)
        console.log(err.stack)
    }
}

function paramIncrement(target, param, val) {
    try {
        param = param.split('.');
        if ((param.length == 1)) {

            if (target instanceof Discord.User) {
                //target.mods[param].push(val)
                userDB[target.id].modules[param] += val
            }
            if (target instanceof Discord.Guild) {
                // target.mods[param].push(val)
                DB[target.id].modules[param] += val
            }
            if (target instanceof Discord.Channel) {
                // target.mods[param].push(val)
                DB[target.guild.id].channels[target.id].modules[param] += val
            }
        } else {
            if (target instanceof Discord.User) {
                //target.mods[param].push(val)
                userDB[target.id].modules[param[0]][param[1]] += val
            }
            if (target instanceof Discord.Guild) {
                // target.mods[param].push(val)
                DB[target.id].modules[param[0]][param[1]] += val
            }
            if (target instanceof Discord.Channel) {
                // target.mods[param].push(val)
                DB[target.guild.id].channels[target.id].modules[param[0]][param[1]] += val
            }
        }
        try {
            fs.writeFile('./database/users.json', JSON.stringify(userDB, null, 4), (err) => {
                ////console.log("JSON Write User Database".gray)
            });
            fs.writeFile('./database/servers.json', JSON.stringify(DB, null, 4), (err) => {
                ////console.log("JSON Write Servers Database".gray)
            });
        } catch (err) {}
    } catch (err) {
        console.log('ERROR JSON'.bgRed.white.bold)
        console.log(err.stack)
    }
}

function paramDefine(target, param, val) {
    try {
        param = param.split('.');
        if ((param.length == 1)) {

            if (target instanceof Discord.User) {
                //target.mods[param].push(val)
                userDB[target.id].modules[param] = val
            }
            if (target instanceof Discord.Guild) {
                // target.mods[param].push(val)
                DB[target.id].modules[param] = val
            }
            if (target instanceof Discord.Channel) {
                // target.mods[param].push(val)
                DB[target.guild.id].channels[target.id].modules[param] = val
            }
        } else {
            if (target instanceof Discord.User) {
                //target.mods[param].push(val)
                userDB[target.id].modules[param[0]][param[1]] = val
            }
            if (target instanceof Discord.Guild) {
                // target.mods[param].push(val)
                DB[target.id].modules[param[0]][param[1]] = val
            }
            if (target instanceof Discord.Channel) {
                // target.mods[param].push(val)
                DB[target.guild.id].channels[target.id].modules[param[0]][param[1]] = val
            }
        }
        try {
            fs.writeFile('./database/users.json', JSON.stringify(userDB, null, 4), (err) => {
                ////console.log("JSON Write User Database".gray)
            });
            fs.writeFile('./database/servers.json', JSON.stringify(DB, null, 4), (err) => {
                ////console.log("JSON Write Servers Database".gray)
            });
        } catch (err) {}
    } catch (err) {
        console.log('ERROR JSON'.bgRed.white.bold)
        console.log(err.stack)
    }
}






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
            sky.defaultChannel.sendMessage("O gay do " + newMember + " já tá jogando aquele jogo de viado de novo.")

        }


        if ((newMember.presence.game.name.toLowerCase() == "heroes of the storm")&&(oldMember.presence.game.name.toLowerCase() != "heroes of the storm")) {
            console.log('HERO')
            var herois = sky.roles.find('name', 'Herois do Toró')
            sky.defaultChannel.sendMessage(herois + " pessoal, **" + newMember.displayName + "** abriu o jogo, juntem ae.").then(jjm=>{jjm.delete(600000)}).catch()

            var team = 0
            newMember.guild.presences.forEach(e => {
                if (e.game && e.game.name.toLowerCase() == "heroes of the storm") team++;
            })

            if (team > 1 && team < 6){
                sky.defaultChannel.sendMessage("Temos **"+team+"** malucos jogando, faltam "+(5-team)+" e fecha o time.").then(jjm=>{jjm.delete(600000)}).catch()
            }
            if (team > 5 && team < 10){
                sky.defaultChannel.sendMessage("Temos **"+team+"** malucos jogando, faltam "+(10-team)+" e temos dois times!!!").then(jjm=>{jjm.delete(600000)}).catch()
            }
             if (team == 5){
                sky.defaultChannel.sendMessage("FECHOU TIME!!!").then(jjm=>{jjm.delete(600000)}).catch()
            }
if (team == 10){
                sky.defaultChannel.sendMessage("FECHOU DOIS TIMES!!!").then(jjm=>{jjm.delete(600000)}).catch()
            }

        }
    } catch (e) {
        if (newMember.id == '248435798179971072' && oldMember.presence.game.name.toLowerCase() == "for honor" && !newMember.presence.game) {
            sky.defaultChannel.sendMessage(" Juba acabou de sair do jogo de viado dele.")

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

        if (!DB[message.guild.id].modules.putometro_curr) {
            paramDefine(message.guild, 'putometro_curr', 0)
        }
        if (!DB[message.guild.id].modules.putometro_max) {
            paramDefine(message.guild, 'putometro_max', 0)
        }
        if (!DB[message.guild.id].modules.putometro_last) {
            paramDefine(message.guild, 'putometro_last', now)
        }
        if (now-DB[message.guild.id].modules.putometro_last >= dayC){
            paramDefine(message.guild, 'putometro_curr', parseInt(Math.round(-(DB[message.guild.id].modules.putometro_last-now)/dayC * 100) / 100))
        }
            if(DB[message.guild.id].modules.putometro_curr>DB[message.guild.id].modules.putometro_max){
                 paramDefine(message.guild, 'putometro_max', DB[message.guild.id].modules.putometro_curr)
            }


    if (message.content.includes('mad scientist')||message.content.includes('mado saient')){

        message.channel.sendMessage('https://www.youtube.com/watch?v=gjTzz8cOxBU')
    }

    if (message.content.includes(':rage:')||message.content.includes('puto') && message.content.includes('to ')){
console.log("puto")
paramDefine(message.guild, 'putometro_max', DB[message.guild.id].modules.putometro_curr)
 paramDefine(message.guild, 'putometro_curr', 0)
 paramDefine(message.guild, 'putometro_last', now)

    }

    if (message.content.startsWith(prefix + "salty")) {
        message.channel.sendFile(REACTIONS + "juba.png")
    };

    if (message.content.startsWith(prefix + "vidal")) {
        message.channel.sendFile(REACTIONS + "vidaru.png")

    };    if (message.content.includes("quantos heróis temos")||message.content.includes("quantos herois temos")||message.content.includes("how many heroes")) {

   var team = 0
            message.guild.presences.forEach(e => {
                if (e.game && e.game.name.toLowerCase() == "heroes of the storm") team++;
            })
            var n =""
            if (team > 1) n="s";
            message.reply(' temos **'+team+'** Herói'+n+' no Nexus no momento.')
    };


})
