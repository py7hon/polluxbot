const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
var Jimp = require("jimp");
var paths = require("./paths.js");
var cleverbot = require("cleverbot");
let points = JSON.parse(fs.readFileSync('../points.json', 'utf8'));
let modules = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));
let reactions = JSON.parse(fs.readFileSync('./reactions.json', 'utf8'));
const cfg = require("../config.js");
var gear = require('./gearbox.js');
let prefix = "+";
var counter = 0
var droprate = 5000
let skynet = bot.guilds.get('248285312353173505');
var colors = require('colors');



function buildGuilds() {


    for (i = 0; i < bot.guilds.size; i++) {

        if (!modules[bot.guilds.array()[i].id]) {
            var nama = bot.guilds.array()[i].name

            bot.guilds.array()[i].createEmoji('../resources/imgres/emoji/ruby.png', 'ruby');

            var params = {}
            for (x = 0; x < bot.guilds.array()[i].channels.size; x++) {

                nam = bot.guilds.array()[i].channels.array()[x].id

                params[nam] = {
                    NSFW: false,
                    RUBY: true,
                    RUBYDROP: true,
                    GAMES: true,
                    LEVEL: true,
                    LVUP_MSG: true

                }
            }


            modules[bot.guilds.array()[i].id] = {


                name: nama,
                language:'en',
                prefix: '+',
                modrole: '',
                announcements: true,
                channels: {},
            }

            modules[bot.guilds.array()[i].id].channels = params

        };
        fs.writeFile('./modules.json', JSON.stringify(modules), (err) => {
            console.log("JSON write event-------".gray)
            if (err) console.log("JSON ERROR  ------------\n".red + err)
        });

    }



}
//
//===============================================================
//             PATHS
//===============================================================
//
//const RANK = points
//const hook = new Discord.WebhookClient(cfg.hook.ID, cfg.hook.token);
const hook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);
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
                console.log(colors.blue("Cleverbot chat: " + message.content + " // " + response))
            })
        }
    });
});

bot.on('ready', () => {

    buildGuilds()


    console.log('START'.green.bold);
    var ts = Date.now().toString()
    fs.createReadStream('../points.json').pipe(fs.createWriteStream('../backup/points_backup.json'));
    fs.createReadStream('./modules.json').pipe(fs.createWriteStream('../backup/modules_backup.json'));
    // bot.setPlayingGame("Hyperdimension Neptunia")
    hook.sendSlackMessage({
            'username': 'Pollux Core Reporter',
            'attachments': [{
                'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
                'pretext': `**Pollux** sent READY`,
                'color': '#00cc08', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
                // 'footer': 'Powered by sneks',
                'ts': Date.now() / 1000
      }]
        })
        //  var aa = new Date();
    console.log("HOOK DEPLOYER".gray);
    bot.user.setGame("Ace Combat ZERO")
});


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, (event) => eventFunction.run(bot, event, points, gear, cfg, skynet, hook, prefix, modules));
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


bot.on('error', e => {
    console.log('MOREO'.red);
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `Soft Error (Client)`,
            'color': '#ffc400', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
            // 'footer': 'Powered by sneks',
            'ts': Date.now() / 1000
      }]
    })
});

process.on('error', e => {
    console.log('MOREO'.bgRed.white.bold);
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `Vital Error (Process)`,
            'color': '#fc6c00', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
            // 'footer': 'Powered by sneks',
            'ts': Date.now() / 1000
      }]
    })
});

process.on("unhandledRejection", err => {
    console.log('REJECTION: '.bgYellow.red.bold + err);

});

process.on('uncaughtException', function (err) {
    console.log('EXCEPTION: '.bgRed.white.bold + err);
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `**Internal Systems has Sustained a Crash Event**
**${err}**
${err.stack}
`,
            'color': '#C04', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
            // 'footer': 'Powered by sneks',
            'ts': Date.now() / 1000
      }]
    })

});


bot.login(cfg.token);
