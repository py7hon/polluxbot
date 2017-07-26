//Discord Start
const Discord = require("discord.js");
var rq = require("request");
var bot = new Discord.Client({
    messageCacheMaxSize: 4048,
    messageCacheLifetime: 1680,
    messageSweepInterval: 2600,
    disableEveryone: true,
    fetchAllMembers: true,
    disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking']
});

// Get Tokens
const cfg = require('./config.js');


//=======================================//
//      TOOLSET
//======================================//

var deployer = require('./core/deployer.js'); // <------------- I DUN LIKE DIS << FIX
//==-------------------------------------------
// UTILITY

var fs = require("fs");
var paths = require("./core/paths.js");
var emojya = bot.emojis.get('276878246589497344');
//var cleverbot = require("cleverbot"); // <------------- REVIEW  DIS << NEEDS $ for CB fee
//cleverbot = new cleverbot(cfg.clever.ID, cfg.clever.token);
var async = require('async');
var timer;
const {
    AkairoClient
} = require('discord-akairo');
const client = new AkairoClient({
    ownerID: '88120564400553984',
    prefix: '+'
});
const skynet = '248285312353173505';
const colors = require('colors');
//==-------------------------------------------


//==-------------------------------------------
// MULTILANG

var i18next = require('i18next');
var multilang = require('./utils/multilang_b');
var Backend = require('i18next-node-fs-backend');
var backendOptions = {
    loadPath: './utils/lang/{{lng}}/{{ns}}.json',
    addPath: './utils/lang/{{lng}}/{{ns}}.missing.json',
    jsonIndent: 2
};



getDirs('utils/lang/', (list) => {
    i18next.use(Backend).init({
        backend: backendOptions,
        lng: 'en',
        fallbacklngs: false,
        preload: list,
        load: 'all'
    }, async (err, t) => {
        if (err) {
            console.log(err)
        }

        await multilang.setT(t);
    });
})

var mm = multilang.getT();

//Gearbox assemble!
var gear = require("./core/gearbox.js");

//Database load!
const DB = gear.DB
const userDB = gear.userDB
var defaults = require("./utils/defaults.js")  // Database Defaults

//DASHBOARD INIT
const dash = require("../pollux-dash/server.js")
dash.init(bot,DB,userDB)



//==-------------------------------------------

async function loginSuccess() {

    console.log('LOGGED IN!'.bgGreen.white.bold)

    let name = 'Pollux Core Reporter';
    let tx = `Successful Login!`;
    let color = '#49c7ff';

    gear.sendSlack(name, tx, undefined, color)

// ACTIONS OVER TIME ▼▼▼▼▼▼▼▼▼▼

    setInterval(function () {
        var date = new Date();

        if (date.getHours() === 3){

            let epc = date.getTime()
                gear.superDefine(bot.user,"epochStamp",date)
            if (!userDB.get(bot.user.id).dailyEpoch){
                gear.superDefine(bot.user,"dailyEpoch",epc)
            }

            var botEntry = userDB.get(bot.user.id)
            try{
            botEntry.dailyEpoch = epc
            }catch(e){
            botEntry.dailyEpoch= epc
            }
            if (isNaN(botEntry.dailyEpoch)){
            botEntry.dailyEpoch= epc
            }

            userDB.set(bot.user.id,botEntry)

        }
        if (date.getSeconds() === 0) {

            gear.gamechange(bot)

        }
    }, 1000); // EVERY SEC

    setInterval(function () {
        //CLEAR EV CACHE
        fs.readdir("./eventHandlers/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
      delete require.cache[require.resolve(`./eventHandlers/${file}`)]
  });
            postGCount(bot.guilds.size);
});

  }, (60000*15) ); // EVERY 15 MINS

// ACTIONS OVER TIME ▲▲▲▲▲▲▲▲▲
}

console.log('Ready to Rock!')


//=====================================

Array.prototype.removeire = function removeire() {
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


//=======================================//
//      FUNCTIONFEST
//=======================================//

function getDirs(rootDir, cb) {
    fs.readdir(rootDir, function (err, files) {
        var dirs = [];
        for (var i = 0; i < files.length; ++i) {
            var file = files[i];
            if (file[0] !=== '.') {
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
} //detatch
function serverSetup(guild) {

    if (!DB.get(guild.id)||DB.get(guild.id)==undefined) {

        console.log(('          --- - - - - = = = = = = Setting Up Guild:'.yellow + guild.name).bgBlue)

        DB.set(guild.id, defaults.gdfal)

        var gg = DB.get(guild.id)
        gg.name = guild.name
        gg.ID = guild.id
        DB.set(guild.id, gg)


        guild.channels.forEach(element => {
            if (element.type != 'voice') {
                console.log('Setting Up Channel:'.white + element.name)

                var GGD = DB.get(guild.id)
                GGD.channels[element.id] = defaults.cdfal
                DB.set(guild.id, GGD)
                var gg = DB.get(guild.id)
                gg.channels[element.id].name = element.name
                DB.set(guild.id, gg)

            }
        });
    } else {

        gear.normaliseGUILD(guild,DB)
    }

}
function channelSetup(element, guild) {

    console.log('Setting Up Channel:'.white + element.name + " from " + guild.name)
    //  DB.get(guild.id).channels[element.id] =
    //element.mods = DB.get(guild.id).channels[element.id].modules;
    var GGD = DB.get(guild.id)
    GGD.channels[element.id] = defaults.cdfal
    DB.set(guild.id, GGD)
    var gg = DB.get(guild.id)
    gg.channels[element.id].name = element.name
    gg.channels[element.id].ID = element.id
    DB.set(guild.id, gg)

} //DB
function userSetup(user) {

    if (!userDB.get(user.id)) {
        console.log('Setting Up Member:' + user.username)

        userDB.set(user.id, defaults.udefal)

        var uu = userDB.get(user.id)
        uu.name = user.username
        uu.ID = user.id
        userDB.set(user.id, uu)

    } else {
        gear.normaliseUSER(user, userDB, DB)
    }
} //DB
function commandFire(message, Server, Channel, Author) {


    message.botUser = bot;
    message.akairo = client;


    if(!message.prefix) message.prefix = DB.get(Server.id).modules.PREFIX;
    let forbiddens = DB.get(Server.id).channels[Channel.id].modules.DISABLED

    let DTMN = deployer.determine(message)
    let MDLE = deployer.checkModule(DTMN);

    if (!DTMN) return;
    if (DTMN.reaction) {
        if (forbiddens.includes(MDLE)) return;
        if (deployer.checkUse(DTMN, DB, message)!==true) return;
        return message.channel.send({files: [DTMN.reaction]});
    };

    if (forbiddens.includes(MDLE)) {
        return message.reply("forbidden")
    }
    var mm = multilang.getT();
    switch (deployer.checkUse(DTMN, DB, message)) {
        case "DISABLED":
            message.reply(mm('CMD.disabledModule', {
                lngs: message.lang,
                module: message.content.substr(message.prefix.length).split(' ')[0]
            }))
            break;
        case "NO ELEVATION":
            message.reply(mm('CMD.insuperms', {
                lngs: message.lang,
                prefix: message.prefix
            }))
            break;
        default:
            deployer.run(DTMN.path, message, userDB, DB); //aqui nóis vai!
            break;
    }
}


bot.login(cfg.token).then(loginSuccess());


//=======================================//
//      BOT EVENT HANDLER
//=======================================//

fs.readdir("./eventHandlers/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventor = require(`./eventHandlers/${file}`);
    let eventide = file.split(".")[0];

    bot.on(eventide, (...args) => eventor.run(gear,DB,userDB,bot, ...args));
  });
});

//=======================================//
//      PROCESS EVENT HANDLER
//=======================================//

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise \n".red,p, "\n\n reason: ".red, reason.stack);

    gear.sendSlack("Promise Breaker","Promise Rejection: "+reason,reason.stack,"#ffcd25" )
});
process.on('uncaughtException', function (err) {

    console.log('EXCEPTION: '.bgRed.white.bold + err);
    console.log(err.stack);

    let name = 'Pollux Core Reporter'
    let txb = '__**System has Sustained a Crash Event**__'
    let tx = `

**${err}**
${err.stack}
`
    let color = '#C04'

    gear.sendSlack(name, txb, tx, color)





});

function postGCount(g) {
    let rqORG = {
        headers: {
            Authorization: cfg.dborg
        },
        url: `https://discordbots.org/api/bots/271394014358405121/stats`,
        method: 'POST',
        body: {
            server_count: g
        },
        json: true
    };
    rq(rqORG, function (err, response, body) {
        if (err) {
            console.log("ORG");
            console.log(err)
        }
        console.log("ORG");
        //  console.log(response);
        console.log(body);
    });

    let rqOptions = {
        headers: {
            Authorization: cfg.pwTok
        },
        url: `https://bots.discord.pw/api/bots/271394014358405121/stats`,
        method: 'POST',
        body: {
            server_count: g
        },
        json: true
    };
    rq(rqOptions, function (err, response, body) {
        if (err) {
            console.log("PW");
            console.log(err)
        }
        console.log("PW");
        //  console.log(response);
        console.log(body);
    });
    /*

        });

        let rqCarbon = {
            url: `https://www.carbonitex.net/discord/data/botdata.php`,
            method: 'POST',
            json: {
                "server_count": g,
                "key": cfg.carbon_token //SOON
            }
        };

        rq(rqCarbon, function (err, response, body) {
            if (err) {
                console.log(err)
            }

        });
    */
}

//---------------------------------------------------------------------------------------- END

module.exports = {
    userDB: userDB,
    DB: DB,
    serverSetup: serverSetup,
    userSetup: serverSetup,
    commandFire: commandFire,
    postGCount: postGCount,
    bot:bot
};
