var Discord = require("discord.js");
var bot = new Discord.Client({
    messageCacheMaxSize: 2048,
    messageCacheLifetime: 680,
    //messageSweepInterval: 1600,
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
var DB = JSON.parse(fs.readFileSync('./database/servers.json', 'utf8'));
var userDB = JSON.parse(fs.readFileSync('./database/users.json', 'utf8'));
var timer;
var colors = require('colors');
var backendOptions = {
    loadPath: './utils/lang/{{lng}}/{{ns}}.json',
    addPath: './utils/lang/{{lng}}/{{ns}}.missing.json',
    jsonIndent: 2
};

const hook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);
getDirs('utils/lang/', (list) => {
    i18next.use(Backend).init({
        backend: backendOptions,
        lng: 'dev',
        fallbacklngs: false,
        preload: list,
        load: 'all'
    }, (err, t) => {
        if (err) {
            console.log(err)
        }
        setTimer();
        multilang.setT(t);
    });

    function loginSuccess() {
        console.log('LOGGED IN!'.bgGreen.white.bold)
    }
    bot.login(cfg.token).then(loginSuccess());
    console.log('Ready to Rock!')
    bot.on('ready', () => {

        bot.user.setStatus('online')
       // bot.user.setGame(`Adobe Edge Code CC`, 'https://www.twitch.tv/LucasFlicky').then().catch();
        bot.user.setGame(`Super Smash Bros`).then().catch();

      async.parallel(  bot.guilds.forEach(G => serverSetup(G)) )

        userSetup(bot.user)
    });
    deployer.pullComms()

    function setTimer() {
        timer = setTimeout(() => {
            try {
                bot.destroy();
            } catch (e) {}
            process.exit(1);
        }, 1000 * 10 * 60);
    }
    bot.on('reconnecting', () => {
        console.log("Reconnect")
    });
    bot.on("message", (message) => {
        var Server = message.guild;
        var Channel = message.channel;
        var Author = message.author;
        var Target = message.mentions.users.first() || Author;
        var MSG = message.content;
        if (Author.bot) return;
        clearTimeout(timer);
        setTimer();
        if (message.content.endsWith('now illegal')) {
        let aargs = message.content.split(' ')
        aargs.pop()
        aargs.pop()

        let illegal = require(`./core/sidecommands/nowillegal.js`);
        try {
            illegal.run(bot, message, aargs)
            return
        } catch (err) {
            console.log('ERROR')
            hook.sendMessage(err)
            return
        }
    }
        //message.lang = ['en', 'en'];
        //message.langList = list;
        //message.shardID = shardID;
        //message.shardCount = shardCount;
        // messageHelper.filterEmojis(message);
        if (Server && !Author.bot) {
            serverSetup(Server);
            userSetup(Author);
            userSetup(Target);
            paramIncrement(Author, 'exp', 1)

            if (Server.mods.LEVELS) {
                if (Channel.mods.LEVELS) {
                    updateEXP(Author, message)
                }
            }
            if (Server.mods.DROPS) {
                if (Channel.mods.DROPS) {
                    dropGoodies(message)
                }
            }


            //Wave 1
            if (Server && typeof (Server.mods.LANGUAGE) !== 'undefined' && Server.mods.LANGUAGE && Server.mods.LANGUAGE !== '') {
                message.lang = [Server.mods.LANGUAGE, 'en'];
            }
            //Wave 2 -- CHECK PREFIX
            if (Server && typeof (Server.mods.PREFIX) !== 'undefined' && Server.mods.PREFIX && Server.mods.PREFIX !== '') {
                //-- START PREFIX
                if (message.content.startsWith(Server.mods.PREFIX)) {
                    message.botUser = bot;
                    message.prefix = Server.mods.PREFIX;

                    //deployer.checkModule(message)
                    console.log('check ' + message)
                    if (deployer.checkUse(message)) {
                        console.log('OK')
                        deployer.run(message);
                    }

                    // deployer.checkUse(message)

                } else {
                    //-- IS MENTION BOT
                    if (message.guild && !message.mentions.users.has('id', bot.user.id) && !message.author.equals(bot.user) && !message.author.bot) {}
                    //-- KLEBER
                    if (message.guild && !!message.mentions.users.get(bot.user.id) && !message.content.startsWith(prefix) && !message.author.bot) {
                        cleverbot.setNick(cfg.name)
                        cleverbot.create(function (err, session) {
                            message.channel.startTyping()
                            cleverbot.ask(message.content, function (err, response) {
                                message.reply(response);
                                message.channel.stopTyping();
                                console.log(colors.blue("Cleverbot chat: " + message.content + " // " + response))
                            })
                        })
                    }
                }
            } else {
                if (message.content.startsWith(prefix)) {
                    message.botUser = bot;
                    message.prefix = prefix;
                    deployer.commCheck(message);
                } else {
                    if (message.guild && !message.mentions.users.has('id', bot.user.id) && !message.author.equals(bot.user) && !message.author.bot) {}
                    if (message.guild && !!message.mentions.users.get(bot.user.id) && message.guild.id !== '110373943822540800' && !message.content.startsWith(prefix) && !message.author.bot) {
                        if (!cfg.beta) {}
                    }
                }
            }
        } else {
            message.reply('PM Not Supported');
            return;
        }
    })
})
bot.on('guildCreate', (guild, member) => {
    serverSetup(guild);
});
bot.on('guildMemberAdd', (member) => {
    var Server = member.guild
    if (Server) {
        if (typeof (Server.hi) !== 'undefined' && Server.joinText !== '' && Server.joinText) {
            let channels = member.guild.channels.filter(c => {
                return (c.id === Server.joinChannel)
            });
            let channel = channels.first();
            let content = Server.joinText.replace('%user%', member.user);
            content = content.replace('%server%', member.guild.name);
            try {
                channel.sendMessage(content);
            } catch (e) {}
        }
        if (typeof (Server.roles) !== 'undefined' && Server.roles.length > 0) {
            async.each(Server.roles, (role, cb) => {
                if (role.default) {
                    member.addRole(role.id).then(memberNew => {
                        return cb();
                    }).catch(err => cb(err));
                } else {
                    async.setImmediate(() => {
                        return cb();
                    });
                }
            }, (err) => {
                if (err) return;
            });
        }
    }
})

bot.on('guildMemberRemove', (member) => {
    var Server = member.guild
    if (Server) {
        if (typeof (Server.bye) !== 'undefined' && Server.leaveText !== '' && Server.leaveText) {
            try {
                let channels = member.guild.channels.filter(c => {
                    return (c.id === Server.leaveChannel)
                });
                let channel = channels.first();
                let content = Server.leaveText.replace('%user%', member.user.username);
                content = content.replace('%guild%', member.guild.name);
                try {
                    channel.sendMessage(content);
                } catch (e) {}
            } catch (e) {}
        }
    }
})

bot.on("warn", console.warn);
bot.on('error', (error) => {
    if (!error) return;
    console.log(error.toString().red);
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

function serverSetup(guild) {


    if (!DB[guild.id]) {
          console.log('Setting Up Guild:'.yellow + guild.name)
        DB[guild.id] = {
            name: guild.name,
            modules: {
                NSFW: false,
                GOODIES: true,
                LEVELS: true,
                LVUP: true,
                DROPS: false,
                ANNOUNCE: false,
                PREFIX: "+",
                MODROLE: {},
                LANGUAGE: 'dev',
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

                        NSFW: false,
                        GOODIES: true,
                        GOODMOJI: ':gem:',
                        GOODNAME: 'Gems',
                        LEVELS: true,
                        LVUP: true,
                        DROPS: false,
                        DISABLED: ['cog']
                    }
                }
                element.mods = DB[guild.id].channels[element.id].modules;
            }
        });
    } else {
        guild.channels.forEach(element => {
            if (element.type != 'voice') {
                element.mods = DB[guild.id].channels[element.id].modules;

            }
        });
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
                level: 0,
                exp: 0,
                goodies: 500,
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
        if (target instanceof Discord.User) {
            //target.mods[param].remove(val)
            userDB[target.id].modules[param].remove(val)
        }
        if (target instanceof Discord.Guild) {
            //target.mods[param].remove(val)
            DB[target.id].modules[param].remove(val)
        }
        if (target instanceof Discord.Channel) {
            //target.mods[param].remove(val)
            DB[target.guild.id].channels[target.id].modules[param].remove(val)
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
        if (target instanceof Discord.User) {
            //target.mods[param] += val
            userDB[target.id].modules[param] += val
        }
        if (target instanceof Discord.Guild) {
            //target.mods[param] += val
            DB[target.id].modules[param] += val
        }
        if (target instanceof Discord.Channel) {
            //target.mods[param] += val
            DB[target.guild.id].channels[target.id].modules[param] += val
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
        if (target instanceof Discord.User) {
            //target.mods[param] = val
            userDB[target.id].modules[param] = val
        }
        if (target instanceof Discord.Guild) {
            // target.mods[param] = val
            DB[target.id].modules[param] = val
        }
        if (target instanceof Discord.Channel) {
            //target.mods[param] = val
            DB[target.guild.id].channels[target.id].modules[param] = val
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









function dropGoodies(event) {
    var CHN = event.channel
    var GLD = event.guild
    var LANG = event.lang;
    let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (GLD.mods.GOODMOJI) {
        GOODMOJI = GLD.mods.GOODMOJI
    }
    if (GLD.mods.GOODNAME) {
        GOOD = GLD.mods.GOODNAME
    }
    if (typeof CHN.DROPSLY != 'number') {
        CHN.DROPSLY = 0
    }
    var droprate = randomize(1, 8000)
    if (GLD.name == "Discord Bots") return;
    console.log(droprate + " @ " + event.guild.name.toString().bgWhite.black + " - " + event.author.username.toString().bold + ": "+event.content.toString().gray)
    if (droprate > 1889 && droprate < 2000) {
        console.log('DROP')
        var pack;
         var mm = multilang.getT();
        CHN.sendFile(paths.BUILD + 'ruby.png', 'goodie.png', mm('$.goodDrop', {
            lngs: LANG,
            good: GOOD,
            emoji: GOODMOJI,
            prefix: event.guild.mods.PREFIX
        })).then(function (r) {
            bot.on('message', m => {
                if (m.content == m.guild.mods.PREFIX + "pick") {
                    r.delete().catch()
                }
            })
        }).catch()
        CHN.DROPSLY += 1

        // modules[bot.user.id].expenseTracker.drops++
        // modules[bot.user.id].rubys--
        console.log("------------=========== ::: NATURAL DROP".bgGreen.white)
    }
    if (droprate == 777) {
         var mm = multilang.getT();
        event.channel.sendFile(paths.BUILD + 'rubypot.png', mm('$.rareDrop', {
            lngs: LANG,
            good: GOOD,
            emoji: GOODMOJI,
            prefix: event.guild.mods.PREFIX
        })).then(function (r) {
            bot.on('message', m => {
                if (m.content == m.guild.mods.PREFIX + "pick") {
                    r.delete().catch()
                }
            })
        }).catch()
        CHN.DROPSLY += 10

        // modules[bot.user.id].expenseTracker.drops += 10
        //modules[bot.user.id].rubys -= 10
        console.log("------------=========== ::: NATURAL RARE DROP ::: ===".bgGreen.yellow.bold)
    }

}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateEXP(TG, event) {
    let userData = TG.mods;
    var caller = TG.username // Checar Caller
    if (event.guild.name == "Discord Bots") return;
    //LEVEL UP CHECKER
    //-----------------------------------------------------
    let curLevel = Math.floor(0.18 * Math.sqrt(userData.exp));
    let forNext = Math.trunc(Math.pow((userData.level + 1) / 0.18, 2));
    if (curLevel > userData.level) {
        // Level up!
        paramIncrement(TG, 'level', 1)
            // event.reply(`upou pro level **${curLevel}**!`);
        console.log("LEVEL UP EVENT FOR ".bgBlue + TG)
        let img = TG.defaultAvatarURL.substr(0, TG.defaultAvatarURL.length - 10)
        if (TG.avatarURL) {
            img = TG.avatarURL.substr(0, TG.avatarURL.length - 10);
        }
        Jimp.read(img).then(function (user) {
            Jimp.read(paths.BUILD + "glass.png").then(function (glass) {
                Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
                    user.resize(126, 126)
                    user.mask(glass, 0, 0)
                    var air = {}
                    Jimp.read(paths.BUILD + "note.png").then(function (photo) {
                        photo.composite(user, 0, 0)
                        photo.mask(lenna, 0, 0)
                        Jimp.read(paths.BUILD + 'levelcard.png').then(function (cart) {
                            Jimp.loadFont(paths.FONTS + 'HEADING.fnt').then(function (head) { // load font from .fnt file
                                Jimp.loadFont(paths.FONTS + 'BIG.png.fnt').then(function (sub) {
                                    try {
                                        var level = userData.level.toString()
                                    } catch (err) {
                                        var level = "00"
                                    }
                                    var next = Math.trunc(Math.pow((Number(level) + 1) / 0.18, 2));
                                    if (level.length == 1) {
                                        level = `0${level}`
                                    } else if (level === undefined) {
                                        level = `XX`
                                    }
                                    cart.print(head, 153, 3, event.guild.member(TG).displayName);
                                    cart.print(sub, 336, 45, `${level}`);
                                    cart.composite(photo, 18, 20)
                                    cart.getBuffer(Jimp.MIME_PNG, function (err, image) {
                                            if (Server.mods.LVUP) {
                                                if (Channel.mods.LVUP) {
                                                    event.channel.sendFile(image)
                                                }
                                            }

                                        })
                                        //cart.write(`${paths.CARDS}/up/${caller}.png`)
                                })
                            });
                        });
                    });
                });
            });
        });
    }
}


process.on('uncaughtException', function (err) {
    console.log('EXCEPTION: '.bgRed.white.bold + err);
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `__**Internal System has Sustained a Crash Event**__

**${err}**
${err.stack}
`,
            'color': '#C04', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
            // 'footer': 'Powered by sneks',
            'ts': Date.now() / 1000
      }]
    })
});
module.exports = {
    userDB: userDB,
    DB: DB
};
