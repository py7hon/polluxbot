const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
var Jimp = require("jimp");
var paths = require("./paths.js");
var cleverbot = require("cleverbot");
let points = JSON.parse(fs.readFileSync('../points.json', 'utf8'));
let modules = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
let reactions = JSON.parse(fs.readFileSync('./reactions.json', 'utf8'));
let masterreactions = JSON.parse(fs.readFileSync('./masterreactions.json', 'utf8'));
const cfg = require("../config.js");
var gear = require('./gearbox.js');
const prefix = "+";
var counter = 0
var droprate = 5000
let skynet = bot.guilds.get('248285312353173505');

function buildGuilds() {


    for (i = 0; i < bot.guilds.size; i++) {

        if (!modules[bot.guilds.array()[i].id]) {

            var params = {}
            for (x = 0; x < bot.guilds.array()[i].channels.size; x++) {

                nam = bot.guilds.array()[i].channels.array()[x].id
                nama = bot.guilds.array()[i].name
                params.name = nama
                params[nam] = {
                    NSFW: false,
                    RUBY: false,
                    GAMES: true,
                    LEVEL: false

                }
            }


            modules[bot.guilds.array()[i].id] = {


                channels: {},
                announcements: false

            }

            modules[bot.guilds.array()[i].id].channels = params

        };
        fs.writeFile('./modules.json', JSON.stringify(modules), (err) => {
            console.log("JSON write event-------\n")
            if (err) console.log("JSON ERROR  ------------\n" + err)
        });

    }



}
//
//===============================================================
//             PATHS
//===============================================================
//
//const RANK = points
const hook = new Discord.WebhookClient(cfg.hook.ID, cfg.hook.token);
const coreHook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);
// START SHIT UP
cleverbot = new cleverbot(cfg.clever.ID, cfg.clever.token);
cleverbot.setNick(cfg.name)
    //----Cleverbot
cleverbot.create(function (err, session) {
    bot.on("message", message => {
        if (gear.checkment(message).username != bot.user.username) return;
        if (message.author.bot) return;
        //if (message.author.username != "RoboEd") return;
        if (!message.content.startsWith('+')) {
            message.channel.startTyping()
            cleverbot.ask(message.content.substr(13), function (err, response) {
                message.reply(response);
                message.channel.stopTyping();
                console.log("Cleverbot chat: " + message.content + " // " + response)
            })
        }
    });
});
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, (event) => eventFunction.run(bot, event, points, gear,cfg, skynet, hook, prefix));
    });
});
//----Message Digester



  bot.on('message', (event) => {
       if (reactions[event.content]) {
        if (event.guild != skynet) return;
        event.channel.sendevent(reactions[event.content]);
    }

  })

//--Presence Update
bot.on('guildMemberAdd', (member) => {
    // member.guild.defaultChannel.sendMessage(`Ae galera, ${member.user.username} acabou de entrar!`)
});
bot.on('guildMemberRemove', (member) => {
    // member.guild.defaultChannel.sendMessage(` ${member.user.username} foi-se!`)
});
bot.on('ready', () => {

    buildGuilds()


    console.log('START');
    var ts = Date.now().toString()
    fs.createReadStream('../points.json').pipe(fs.createWriteStream('../backup/points_backup_' + ts + '.json'));
    // bot.setPlayingGame("Hyperdimension Neptunia")
    hook.sendSlackMessage({
            'username': 'Bot status',
            'attachments': [{
                'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
                'pretext': `**Falk / Pollux** has been **updated**`,
                'color': '#C04', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
                // 'footer': 'Powered by sneks',
                'ts': Date.now() / 1000
      }]
        })
        //  var aa = new Date();
    console.log("HOOK DEPLOYER");
    bot.user.setGame("Ace Combat ZERO")
});
var made = false
var mado = false
bot.on('message', msg => {
    if (!msg.author.id == '88120564400553984') {
        return
    }
    var m = msg.content.toLowerCase()
    if (masterreactions[m]) {
        msg.channel.startTyping();
        setTimeout(function () {
            var a = gear.randomize(1, 10)
            try {
                msg.channel.sendMessage(masterreactions[m][a]);
            } catch (e) {
                console.log(e)
                msg.channel.sendMessage(masterreactions[m][0]);
            }
            msg.channel.stopTyping();
        }, 1000);
    }
})
bot.on('presenceUpdate', (me, mo) => {
    if (me.id == '88120564400553984') {
        console.log(mo.presence.status)
        var skynet = bot.guilds.get('248285312353173505')
        var engine = skynet.defaultChannel
        if (mo.presence.status == 'online' && me.presence.status == 'offline') {
            if (made == false) {
                var ind = gear.randomize(0, 5)
                var mess = [
                    "Yay! Meu mestre chegou!"
                    , "Ih, chegou o Flicky aí"
                    , "Opa, ó só quem voltou"
                    , "Flicky olha esses cara"
                    , "Chegou o guei"
                    , "Apareceu a margarida"
                ]
                engine.sendMessage(mess[ind])
            }
            made = true
            return
        } else if (mo.presence.status == 'offline') {
            if (mado == false) {
                engine.sendMessage("Galera, o Flicky saiu! Hora de tacar o terror no server!")
            }
            mado = true
        } else {
            made = false
            mado = false
        }
    }
});
bot.on('error', e => {
    console.log('MOREO');
    hook.sendMessage(":skull_crossbones: Falk MORREO")
        //  var aa = new Date();
        //console.log(aa.getHours());
});
process.on("unhandledRejection", err => {
    let crash = ":skull_crossbones: **Uncaught Promise Error:** \n" + err.stack;
    coreHook.sendSlackMessage({
        'username': 'Falk',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': crash,
            'color': '#C04', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
            // 'footer': 'Powered by sneks',
            'ts': Date.now() / 1000
      }]
    })
});
bot.login(cfg.token);
