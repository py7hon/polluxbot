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


var emojya = bot.emojis.get('276878246589497344')


//=======================================//
//      DATABASE
//=======================================//


const PersistentCollection = require('djs-collection-persistent');
const DB = new PersistentCollection({
    name: "DB"
});
const userDB = new PersistentCollection({
    name: 'userDB'
});

//==-------------------------------------------
// DEFAULTS

//SERVS
const gdfal = {
        name: "",
        modules: {
            GREET: {
                hi: false,
                joinText: "Welcome to the Server %username%!",
                greetChan: {}
            },
              FWELL: {
                hi: false,
                joinText: "%username% has left us!",
                greetChan: {}
            },
            NSFW: true,
            GOODIES: true,
            LEVELS: true,
            LVUP: true,
            DROPS: false,
            GOODMOJI: emojya,
            GOODNAME: 'Ruby',
            ANNOUNCE: false,
            PREFIX: "+",
            MODROLE: {},
            LANGUAGE: 'en',
            DISABLED: ['cog'],
            AUTOROLES: [],
            statistics: {
                commandsUsed: {},
                rubyHistory: 0
            }

    },

    channels: {}
};

//CHANS
const cdfal = {
    name: "",
    modules: {
        DROPSLY: 0,

        NSFW: true,
        GOODIES: true,
        LEVELS: true,
        LVUP: true,
        DROPS: true,
        DISABLED: ['cog']
    }
};

//USRS
const udefal = {
    name: "",
    modules: {
        PERMS: 3,
        level: 0,
        exp: 0,
        goodies: 0,
        coins: 0,
        medals: [],
        expenses: {
            putaria: 0,
            jogatina: 0,
            drops: 0,
            trade: 0
        },
        earnings: {
            putaria: 0,
            jogatina: 0,
            drops: 0,
            trade: 0
        },
        dyStreak: 5,
        daily: 1486595162497,
        persotext: "",

        skin: 'default',
        skinsAvailable: ['default'],

        build: {
            STR: 10,
            DEX: 10,
            CON: 10,
            INT: 10,
            WIS: 10,
            CHA: 10,
            weaponA: "none",
            weaponB: "none",
            shield: "none",
            armor: "none",
            invent: [],
            skills: [],
            HP: 100,
            MP: 50
        },
        fun: {
            waifu: undefined,
            shiprate: {}
        },
        statistics: {
            commandsUsed: {}

        }
    }
}

//  DATABASE END
//----------------------------


//=======================================//
//      TOOLSET
//======================================//

var deployer = require('./core/deployer.js'); // <------------- I DUN LIKE DIS << FIX


//==-------------------------------------------
// UTILITY

var fs = require("fs");
var paths = require("./core/paths.js");
const greeting = require('./utils/greeting');
var cleverbot = require("cleverbot"); // <------------- REVIEW  DIS << NEEDS $ for CB fee
cleverbot = new cleverbot(cfg.clever.ID, cfg.clever.token);
var async = require('async')
var skynet = '248285312353173505'
var colors = require('colors');
var timer;
const {
    AkairoClient
} = require('discord-akairo');
const client = new AkairoClient({
    ownerID: '88120564400553984',
    prefix: '+'
});


//==-------------------------------------------



//==-------------------------------------------
// MULTILANG

const Jimp = require("jimp");
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
    }, (err, t) => {
        if (err) {
            console.log(err)
        }

        multilang.setT(t);
    });
})
//==-------------------------------------------

//==-------------------------------------------
// HOOKS
const hook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);







function loginSuccess() {
    console.log('LOGGED IN!'.bgGreen.white.bold)
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `Successful Login!`,
            'color': '#49c7ff',

            'ts': Date.now() / 1000
        }]
    })


    setInterval(function () {
        var date = new Date();
        if (date.getSeconds() === 0) {
            gamechange(bot)
        }


    }, 1000);




}

//var dvv = require('./database.js')

console.log('Ready to Rock!')
bot.on('ready', () => {


    bot.guilds.forEach(g => {
        g.members.forEach(m => {



            //  dvv.addUser(m.user,false);
            //    dvv.find('name',m.user.id);
        })
    })


    bot.user.setStatus('online')

    // bot.user.setGame(`Flicky draws Silenyte stuff`, 'https://www.twitch.tv/LucasFlicky').then().catch();

    //bot.user.setGame(`Neverwinter Nights`).then().catch();

    async.parallel(bot.guilds.forEach(G => serverSetup(G)))

    userSetup(bot.user)
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `All systems go! I am ready to rock, master!`,
            'color': '#3ed844',

            'ts': Date.now() / 1000
        }]
    })




});


//Check Commands

//deployer.pullComms()



//=====================================             EVENTS



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

//=======================================//
//      FUNCTIONFEST
//=======================================//





var cd = function (argamassa, fx, timeout, respfn) {
    var onCooldown = false;
    return function () {
        if (!onCooldown) {
            fx.apply(argamassa, arguments);
            onCooldown = true;
            setTimeout(function () {onCooldown = false;}, timeout);
        }else{try{respfn()}catch(err){}}
    }
}

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
    //  DB.get(guild.id).channels[element.id] =
    //element.mods = DB.get(guild.id).channels[element.id].modules;
    var GGD = DB.get(guild.id)
    GGD.channels[element.id] = cdfal
    DB.set(guild.id, GGD)
    var gg = DB.get(guild.id)
    gg.channels[element.id].name = element.name
    DB.set(guild.id, gg)

}

var serverSetup = function serverSetup(guild) {





    if (!DB.get(guild.id)) {

        console.log(('          --- - - - - = = = = = = Setting Up Guild:'.yellow + guild.name).bgBlue)

        DB.set(guild.id, gdfal)

        var gg = DB.get(guild.id)
        gg.name = guild.name
        DB.set(guild.id, gg)



        guild.channels.forEach(element => {
            if (element.type != 'voice') {
                console.log('Setting Up Channel:'.white + element.name)

                var GGD = DB.get(guild.id)
                GGD.channels[element.id] = cdfal
                DB.set(guild.id, GGD)
                var gg = DB.get(guild.id)
                gg.channels[element.id].name = element.name
                DB.set(guild.id, gg)

                // element.mods = DB.get(guild.id).channels[element.id].modules;

            }
        });
    }



    /*guild.members.forEach(memb => {
        if (!memb.user.bot) {
            userSetup(memb.user)
        }
    })*/
}



function userSetup(user) {

    if (!userDB.get(user.id)) {
        console.log('Setting Up Member:' + user.username)

        userDB.set(user.id, udefal)

        var uu = userDB.get(user.id)
        uu.name = user.name
        userDB.set(user.id, uu)

    }
}

function paramAdd(target, param, val) {


    try {

        if (target instanceof Discord.User) {

            var Umodules = userDB.get(target.id)
            if (param.includes('.')) {
                param = param.split('.')
                Umodules.modules[param[0]][param[1]].push(val)
            } else {
                Umodules.modules[param].push(val)
            }
            userDB.set(target.id, Umodules)

        }

        if (target instanceof Discord.Guild) {

            var Smodules = DB.get(target.id)
            if (param.includes('.')) {
                param = param.split('.')
                   if (!Smodules.modules[param[0]][param[1]]){
                        console.log("CREATE")
                        Smodules.modules[param[0]][param[1]]=[]
                    }
                Smodules.modules[param[0]][param[1]].push(val)
            } else {
                Smodules.modules[param].push(val)
            }
            console.log(Smodules)
           // DB.set(target.id, Smodules)

        }
        if (target instanceof Discord.Channel) {

            var Tchannel = DB.get(target.guild.id)

            if (param.includes('.')) {
                param = param.split('.')
                Tchannel.channels[target.id].modules[param[0]][param[1]].push(val)
            } else {
                Tchannel.channels[target.id].modules[param].push(val)
            }
            DB.set(target.guild.id, Tchannel)

        }

    } catch (err) {
        console.log('ERROR JSON'.bgRed.white.bold)
        console.log(err.stack)
    }
};

function paramRemove(target, param, val) {
    try {

        if (target instanceof Discord.User) {

            var Umodules = userDB.get(target.id)
            if (param.includes('.')) {
                param = param.split('.')
                Umodules.modules[param[0]][param[1]].remove(val)
            } else {
                Umodules.modules[param].remove(val)
            }
            userDB.set(target.id, Umodules)

        }

        if (target instanceof Discord.Guild) {

            var Smodules = DB.get(target.id)
            if (param.includes('.')) {
                param = param.split('.')
                Smodules.modules[param[0]][param[1]].remove(val)
            } else {
                Smodules.modules[param].remove(val)
            }
            DB.set(target.id, Smodules)

        }
        if (target instanceof Discord.Channel) {

            var Tchannel = DB.get(target.guild.id)

            if (param.includes('.')) {
                param = param.split('.')
                Tchannel.channels[target.id].modules[param[0]][param[1]].remove(val)
            } else {
                Tchannel.channels[target.id].modules[param].remove(val)
            }
            DB.set(target.guild.id, Tchannel)

        }
        //  }

    } catch (err) {

    }
};

function paramIncrement(target, param, val) {

    try {

        if (target instanceof Discord.User) {

            var Umodules = userDB.get(target.id)
            if (param.includes('.')) {
                param = param.split('.')
                Umodules.modules[param[0]][param[1]] += val
            } else {
                Umodules.modules[param] += val
            }
            userDB.set(target.id, Umodules)

        }

        if (target instanceof Discord.Guild) {

            var Smodules = DB.get(target.id)
            if (param.includes('.')) {
                param = param.split('.')
                Smodules.modules[param[0]][param[1]] += val
            } else {
                Smodules.modules[param] += val
            }
            DB.set(target.id, Smodules)

        }
        if (target instanceof Discord.Channel) {

            var Tchannel = DB.get(target.guild.id)

            if (param.includes('.')) {
                param = param.split('.')
                Tchannel.channels[target.id].modules[param[0]][param[1]] += val
            } else {
                Tchannel.channels[target.id].modules[param] += val
            }
            DB.set(target.guild.id, Tchannel)

        }

    } catch (err) {
        console.log('ERROR JSON'.bgRed.white.bold)
        console.log(err.stack)
    }

};

function paramDefine(target, param, val) {
    try {

        if (target instanceof Discord.User) {

            var Umodules = userDB.get(target.id)

            if (param.includes('.')) {
                param = param.split('.')
                Umodules.modules[param[0]][param[1]] = val
            } else {
                Umodules.modules[param] = val
            }

            userDB.set(target.id, Umodules)

        }

        if (target instanceof Discord.Guild) {

            var Smodules = DB.get(target.id)
            if (param.includes('.')) {
                param = param.split('.')
                Smodules.modules[param[0]][param[1]] = val
            } else {
                Smodules.modules[param] = val
            }
            DB.set(target.id, Smodules)

        }
        if (target instanceof Discord.Channel) {

            var Tchannel = DB.get(target.guild.id)

            if (param.includes('.')) {
                param = param.split('.')
                Tchannel.channels[target.id].modules[param[0]][param[1]] = val
            } else {
                Tchannel.channels[target.id].modules[param] = val
            }
            DB.set(target.guild.id, Tchannel)

        }
    } catch (err) {
        console.log('ERROR JSON'.bgRed.white.bold)
        console.log(err.stack)
    }
};

function updatePerms(tgt, Server) {
    try {

        switch (true) {
            case Server.member(tgt).id == Server.ownerID:
                return 0;
                break;

            case Server.member(tgt).hasPermission("ADMINISTRATOR"):
            case Server.member(tgt).hasPermission("MANAGE_GUILD"):
                return 1;
                break;

            case Server.member(tgt).hasPermission("KICK_MEMBERS"):
                return 2;
                break;

            default:
                return 3;
                break;

        }
    } catch (err) {}

    if (DB.get(Server.id).modules.MODROLE.id) {
        if (Server.member(tgt).roles.has(DB.get(Server.id).modules.MODROLE.id)) {
            return 2
        }
    }

}

function dropGoodies(event) {
    var CHN = event.channel
    var GLD = event.guild
    var LANG = event.lang;
    let GOODMOJI = emojya
    let GOOD = 'Ruby'
    if (DB.get(Server.id).modules) {
        GOODMOJI = DB.get(Server.id).modules.GOODMOJI
    }
    if (DB.get(Server.id).modules) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }
    if (typeof CHN.DROPSLY != 'number') {
        CHN.DROPSLY = 0
    }
    var droprate = randomize(1, 5000)
    if (GLD.name == "Discord Bots") return;
    console.log(droprate)
    if (droprate == 1234) {
        console.log('DROP')
        var pack;
        var prefie = DB.get(Server.id).modules.PREFIX || "+"
        var mm = multilang.getT();
        CHN.sendFile(paths.BUILD + 'ruby.png', 'goodie.png', mm('$.goodDrop', {
            lngs: LANG,
            good: GOOD,
            emoji: GOODMOJI,
            prefix: prefie
        })).then(function (r) {


            if (isNaN(CHN.DROPSLY)) {
                CHN.DROPSLY = 1
            } else {
                CHN.DROPSLY += 1

            }
            console.log("------------=========== ::: NATURAL DROP".bgGreen.white)

            return new Promise(async resolve => {

                var oldDropsly = CHN.DROPSLY
                const responses = await CHN.awaitMessages(msg2 =>
                    msg2.author.id === message.author.id && (msg2.content === '+pick'), {
                        maxMatches: 1
                    }
                );
                if (responses.size === 0) {} else {
                    if (oldDropsly > CHN.DROPSLY) {
                        r.delete();
                        return resolve(true);
                    }
                    let Picker = responses.first().author


                    console.log("----------- SUCCESSFUL PICK by" + Picker.username)
                    message.channel.sendMessage(mm('$.pick', {
                        lngs: LANG,
                        good: GOOD,
                        user: Picker.username,
                        count: CHN.DROPSLY,
                        emoji: ""
                    }) + " " + emojya).then(function (c) {
                        message.delete()
                        c.delete(500000)
                    }).catch();

                    gear.paramIncrement(Picker, 'goodies', CHN.DROPSLY)
                    gear.paramIncrement(Picker, 'earnings.drops', CHN.DROPSLY)
                    CHN.DROPSLY = 0

                    r.delete().catch()
                    return resolve(true);
                }
            })

        }).catch()

    }

    if (droprate == 777) {
        var mm = multilang.getT();
        event.channel.sendFile(paths.BUILD + 'rubypot.png', mm('$.rareDrop', {
            lngs: LANG,
            good: GOOD,
            emoji: GOODMOJI,
            prefix: event.DB.get(Server.id).modules.PREFIX
        })).then(function (r) {

            if (isNaN(CHN.DROPSLY)) {
                CHN.DROPSLY = 10
            } else {
                CHN.DROPSLY += 10

            }
        console.log("------------=========== ::: NATURAL RARE DROP ::: ===".bgGreen.yellow.bold)

            return new Promise(async resolve => {

                var oldDropsly = CHN.DROPSLY
                const responses = await CHN.awaitMessages(msg2 =>
                    msg2.author.id === message.author.id && (msg2.content === '+pick'), {
                        maxMatches: 1
                    }
                );
                if (responses.size === 0) {} else {
                    if (oldDropsly > CHN.DROPSLY) {
                        r.delete();
                        return resolve(true);
                    }
                    let Picker = responses.first().author


                    console.log("----------- SUCCESSFUL PICK by" + Picker.username)
                    message.channel.sendMessage(mm('$.pick', {
                        lngs: LANG,
                        good: GOOD,
                        user: Picker.username,
                        count: CHN.DROPSLY,
                        emoji: ""
                    }) + " " + emojya).then(function (c) {
                        message.delete()
                        c.delete(500000)
                    }).catch();

                    gear.paramIncrement(Picker, 'goodies', CHN.DROPSLY)
                    gear.paramIncrement(Picker, 'earnings.drops', CHN.DROPSLY)
                    CHN.DROPSLY = 0

                    r.delete().catch()
                    return resolve(true);

                }
            })

        }).catch()



    }


} //<<<<<<<<<< IMPORTANT REVISE THIS // REVISED, revision 1

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gamechange(bot) {
    try {
        delete require.cache[require.resolve(`./resources/lists/playing.js`)];
        var gamelist = require("./resources/lists/playing.js");
        var max = gamelist.games.length - 1
        var rand = randomize(0, max)
        bot.user.setGame(gamelist.games[rand]).then().catch(err => {
            console.log(err)
        });

        // return


    } catch (e) {
        console.log(e)
    }
};

function updateEXP(TG, event) {
    let userData = userDB.get(TG.id).modules;
    var caller = TG.username // Checar Caller


    //LEVEL UP CHECKER
    //-----------------------------------------------------
    let curLevel = Math.floor(0.18 * Math.sqrt(userData.exp));
    let forNext = Math.trunc(Math.pow((userData.level + 1) / 0.18, 2));
    if (curLevel > userData.level) {
        // Level up!
        paramIncrement(TG, 'level', 1)
        var overallevel = userDB.get(TG.id).modules.level;

        console.log("LEVEL UP EVENT FOR ".bgBlue + caller)
        if (event.guild.name == "Discord Bots") return;
        let img = TG.defaultAvatarURL.substr(0, TG.defaultAvatarURL.length - 10)
        if (TG.avatarURL) {
            img = TG.avatarURL.substr(0, TG.avatarURL.length - 10);
        }
        var guild = event.guild
        Jimp.read(img).then(function (user) {
            Jimp.read(paths.BUILD + "glass.png").then(function (glass) {
                Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
                    user.resize(126, 126)
                    user.mask(glass, 0, 0)
                    var air = {}
                    Jimp.read(paths.BUILD + "note.png").then(function (photo) {
                        photo.composite(user, 0, 0)
                        photo.mask(lenna, 0, 0)
                        Jimp.read(paths.BUILD + "profile/skins/" + userData.skin + '/levelcard.png').then(function (cart) {
                            Jimp.loadFont(paths.FONTS + 'HEADING.fnt').then(function (head) { // load font from .fnt file
                                Jimp.loadFont(paths.FONTS + 'BIG.png.fnt').then(function (sub) {
                                    try {
                                        var level = overallevel.toString()
                                    } catch (err) {
                                        var level = ""+userDB.get(TG.id).modules.level
                                    }
                                    var next = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2));
                                    if (level.length == 1) {
                                        level = `0${level}`
                                    } else if (level === undefined) {
                                        level = `0${userDB.get(TG.id).modules.level}`
                                    }
                                    cart.print(head, 153, 3, event.guild.member(TG).displayName);
                                    cart.print(sub, 336, 45, `${level}`);
                                    cart.composite(photo, 18, 20)

                                    cart.getBuffer(Jimp.MIME_PNG, function (err, image) {
                                        if (DB.get(guild.id).modules.LVUP) {
                                            if (DB.get(guild.id).channels[event.channel.id].modules.LVUP) {

                                                event.channel.sendFile(image)
                                            }
                                        }

                                    })
                                })
                            });
                        });
                    });
                });
            });
        });
    }
} // REVISED

function commandFire(message,Server,Channel,Author){
                message.botUser = bot;
                message.akairo = client;
                message.prefix = DB.get(Server.id).modules.PREFIX;

                let forbiddens = DB.get(Server.id).channels[Channel.id].modules.DISABLED

                let MDLE = deployer.checkModule(message)

                if (forbiddens.includes(MDLE)){
                    return message.reply("forbidden")
                }

                var mm = multilang.getT();

                switch (deployer.checkUse(message, DB, userDB)) {

                    case "DISABLED":
                        message.reply(mm('CMD.disabledModule', {
                            lngs: message.lang,
                            module: message.content.substr(message.prefix.length).split(' ')[0]
                        }))

                        break;
                    case "NO PRIVILEGES":
                        message.reply(mm('CMD.insuperms', {
                            lngs: message.lang,
                            prefix: message.prefix
                        }))
                        break;
                    default:
                        deployer.run(message, userDB, DB); //aqui nóis vai!
                        break;
                }
            }


bot.login(cfg.token).then(loginSuccess());



//=======================================//
//      BOT EVENT HANDLER
//=======================================//


//==-------------------------------------------
// COMMANDS (MESSAGES)


// XP SPAM PROTECTION
var gibexp = cd(console, paramIncrement, 5000);
var plzDrop = cd(console, dropGoodies, 5000);
// ==============================================

bot.on("message", (message) => {

    //Set Them Up
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;




    //---  LOGS     ---------------------------------------------------------
    if (Server && Server.name!="Discord Bots") {


        var logserver = Server.name + " "
        var logchan = " #" + Channel.name + " "
        var logusr = " " + Author.username + ": "
        var logmsg = MSG

            if (Author.username == "Pollux" || MSG.toLowerCase().includes('pollux') || MSG.startsWith("+")) {

                console.log(" @ " + logserver.bgWhite.black.bold + logchan.bgWhite.blue + logusr.yellow.underline + logmsg.gray.underline + "\n")

        }
    }
    //--- END LOGS   ---------------------------------------------------------
    if (Author.bot) return;
    //-- NO BOTS PAST HERE ---------------------------------------------------

    if (Server && !Author.bot) {
 //==-------------------------------------------
        // SIDE COMMANDS

        fs.readFile("./core/collateral_triggers.json", 'utf8', (err, data) => {
            data = JSON.parse(data)

            if (data[MSG]) {
                let jet = require(`./core/sidecommands/${data[MSG]}.js`);
                try {
                    jet.run(bot, message, DB, gdfal)
                    return
                } catch (err) {
                    hook.sendMessage(err)
                    return
                }
            }
        });

        if (message.content.endsWith('now illegal')) {

            let illegal = require(`./core/sidecommands/nowillegal.js`);
            try {
                illegal.run(bot, message)
                return
            } catch (err) {
                console.log('ERROR')
                hook.sendMessage(err)
                return
            }
        }

        if (DB.get(Server.id).modules.REACTIONS != undefined) {
            let servdata = DB.get(Server.id).modules
            if (servdata.REACTIONS[MSG]) {
                let max = servdata.REACTIONS[MSG].length
                let goer = randomize(0, max)
                return Channel.sendMessage(servdata.REACTIONS[MSG][goer])
            }
        } else {
            let D = DB.get(Server.id)
            D.modules.REACTIONS = {}
            DB.set(Server.id,D)
        }

        //--- END SIDE   ---------------------------------------------------------

        //  SETUPS
        serverSetup(Server);
        userSetup(Author);
        userSetup(Target);
        //  ------

gibexp(Author, 'exp', randomize(1,10))  // EXP GIVEAWAY

        // POLLUX PERMS 101

        /*
        -= ::PERMS:: =-
        0 = ALMIGHTY (owner)
        1 = ADM
        2 = MOD
        3 = PLEB
        4 = FUDIDO
        5 = FORBIDDEN
        */

        Author.PLXpems = updatePerms(Author, Server)
        Target.PLXpems = updatePerms(Target, Server)

        // DONE WITH PERMS ---//

        //A NEW CHANNEL? --------------------------------------------
        if (DB.get(Server.id).channels[Channel.id] == undefined) {
            channelSetup(Channel, Server);
        }

        //TRY level shit
        //------------------------------------------------------------
        try {
            if (DB.get(Server.id).modules && !DB.get(Server.id).modules.DISABLED.includes("level")) {
                updateEXP(Author, message)
            } else if (DB.get(Server.id).modules && !DB.get(Server.id).channels[Channel.id].modules.DISABLED.includes("level")) {
                updateEXP(Author, message)
            }

        } catch (err) {
            serverSetup(Server) // maybe no server
        }

        //TRY gemdrop shit
        //------------------------------------------------------------
        try {

            if (DB.get(Server.id).modules && !DB.get(Server.id).modules.DISABLED.includes("drop")) {
                plzDrop(message)
            } else if (!DB.get(Server.id).channels[Channel.id].modules.DISABLED.includes("drop")) {
                plzDrop(message)
            }

        } catch (err) {
            serverSetup(Server)
        }

        //========================//

        //Wave 1
        if (Server && typeof (DB.get(Server.id).modules.LANGUAGE) !== 'undefined' && DB.get(Server.id).modules.LANGUAGE && DB.get(Server.id).modules.LANGUAGE !== '') {
               let langua = "en"
            if (Server.region === 'brazil'){
                langua = "dev"
           }
            message.lang = [DB.get(Server.id).modules.LANGUAGE, langua];
        }else{
            let langua = "en"
            if (Server.region === 'brazil'){
                langua = "dev"
           }
            paramDefine(Server,"LANGUAGE",langua)
        }


        //Wave 2 -- CHECK PREFIX
        if (Server && typeof (DB.get(Server.id).modules.PREFIX) !== 'undefined' && DB.get(Server.id).modules.PREFIX && DB.get(Server.id).modules.PREFIX !== '') {

            //-- START PREFIX
            if (message.content.startsWith(DB.get(Server.id).modules.PREFIX)) {

                commandFire(message,Server,Channel,Author)

            } else {

                let cleber = false
                if (cleber){

                }else{

                   if (message.guild && message.mentions.users.has('id', bot.user.id) && !message.author.equals(bot.user) && !message.author.bot) {


                   // console.log("I WILL MANGLE")
                     let msg = message;
                     let M=message.content;
                     msg.content = DB.get(Server.id).modules.PREFIX + M.substr(M.indexOf(">")+2)

                  //   console.log(msg.content)
                     commandFire(msg,Server,Channel,Author)

                 }

                   }

            }
        } else {
            //CHECK COMMANDS INSIDE PM
            if (message.content.startsWith(prefix)) {
                message.botUser = bot;
                message.prefix = prefix;
                deployer.commCheck(message);
            }else{

                deployer.commCheck(message);
            }
        }
    } else {
        console.log(message.content)
        message.reply("Sorry sweetie, don't send stuff for me here. I'll have DM support someday in the future. If you are here for help check http://pollux.lucasflicky.com/commands");
        return;
    }
})

// COMMANDS (MESSAGES)
//==-------------------------------------------


bot.on('reconnecting', () => {
    console.log("Reconnect".bgRed)
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `SELF RESTART TRIGGERED! Gimme a second to still myself.`,
            'color': '#ffb249',

            'ts': Date.now() / 1000
        }]
    })
});



bot.on('guildCreate', (guild) => {

    var greetings = greeting.own.replace(/\{\{server\}\}/g, guild.name)
    guild.owner.sendMessage(greetings)
    serverSetup(guild);
});
bot.on("guildDelete", (guild) => {
    DB.delete(guild.id)
});

bot.on('guildMemberAdd', (member) => {
    var Server = member.guild

   // if (member.guild.id == "")

        if (Server) {

             let defaultgreet = {
                hi: false,
                joinText: "Welcome to the Server %username%!",
                greetChan: {}
            }

            if (!DB.get(Server.id).modules.GREET || DB.get(Server.id).modules.GREET===undefined){
    paramDefine(Server,"GREET",defaultgreet)
}



            if (typeof (DB.get(Server.id).modules.GREET.hi) !== 'undefined' && DB.get(Server.id).modules.GREET.joinText !== '' && DB.get(Server.id).modules.GREET.joinText) {


                let channels = member.guild.channels.filter(c => {
                    return (c.id === DB.get(Server.id).modules.GREET.greetChan.id)
                });
                let channel = channels.first();
                let content = DB.get(Server.id).modules.GREET.joinText.replace('%username%', member.user.username);
                content = content.replace('%server%', member.guild.name);
                try {
                    channel.sendMessage(content);
                } catch (e) {}
            }



        }
})

bot.on('guildMemberRemove', (member) => {
    var Server = member.guild
        if (Server) {
                     let defaultgreetB = {
                hi: false,
                joinText: "%username% has left us!",
                greetChan: {}
            }
if (!DB.get(Server.id).modules.FWELL || DB.get(Server.id).modules.FWELL===undefined){
    paramDefine(Server,"FWELL",defaultgreetB)
}


            if (typeof (DB.get(Server.id).modules.FWELL.hi) !== 'undefined' && DB.get(Server.id).modules.FWELL.joinText !== '' && DB.get(Server.id).modules.FWELL.joinText) {


                let channels = member.guild.channels.filter(c => {
                    return (c.id === DB.get(Server.id).modules.FWELL.greetChan.id)
                });
                let channel = channels.first();
                let content = DB.get(Server.id).modules.FWELL.joinText.replace('%username%', member.user.username);
                content = content.replace('%server%', member.guild.name);
                try {
                    channel.sendMessage(content);
                } catch (e) {}
            }



        }
})

bot.on('error', (error) => {
    if (!error) return;
    console.log(error.toString().red);
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `Minor error! Check console`,
            'color': '#ffdc49',
            'ts': Date.now() / 1000
        }]
    })
    hook.sendMessage(error.toString())
});



//=======================================//
//      PROCESS EVENT HANDLER
//=======================================//



process.on('uncaughtException', function (err) {
    console.log('EXCEPTION: '.bgRed.white.bold + err);
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `__**System has Sustained a Crash Event**__

**${err}**
${err.stack}
`,
            'color': '#C04',
            'ts': Date.now() / 1000
        }]
    })
});




module.exports = {
    userDB: userDB,
    DB: DB,
    serverSetup: serverSetup,
    userSetup: serverSetup
};
