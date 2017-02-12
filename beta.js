var Discord = require("discord.js");
var bot = new Discord.Client({
    messageCacheMaxSize: 2048,
    messageCacheLifetime: 680,
    messageSweepInterval: 1600,
    disableEveryone: true,
    fetchAllMembers: true,
    disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking']
});
var cfg = require('./config.js');
var deployer = require('./core/deployer.js');
var cleverbot = require("cleverbot-node");
cleverbot = new cleverbot(cfg.clever.ID, cfg.clever.token);
//cleverbot.setNick(cfg.name)
//scleverbot.create()
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
    bot.login(cfg.tokenBETA).then(loginSuccess());
    console.log('Ready to Rock!')
    bot.on('ready', () => {
        bot.user.setStatus('online')
        bot.user.setGame(`Heroes of the Storm`, 'https://www.picarto.tv/LucasFlicky').then().catch();
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

        //message.lang = ['en', 'en'];
        //message.langList = list;
        //message.shardID = shardID;
        //message.shardCount = shardCount;
        // messageHelper.filterEmojis(message);
        if (Server && !Author.bot) {
            serverSetup(Server);
            userSetup(Author);

            //Wave 1
            if (Server && typeof (Server.mods.LANGUAGE) !== 'undefined' && Server.mods.LANGUAGE && Server.mods.LANGUAGE !== '') {
                message.lang = [Server.mods.LANGUAGE, 'en'];
            }
            //Wave 2
            if (Server && typeof (Server.mods.PREFIX) !== 'undefined' && Server.mods.PREFIX && Server.mods.PREFIX !== '') {
                if (message.content.startsWith(Server.mods.PREFIX)) {
                    message.botUser = bot;
                    message.prefix = Server.mods.PREFIX;

                    deployer.run(message);
                } else {
                    if (message.guild && !message.mentions.users.has('id', bot.user.id) && !message.author.equals(bot.user) && !message.author.bot) {

                      paramUpdate(Author, 'exp', 1)
                            updateEXP(Author,message)

                    }
                    if (message.guild && !!message.mentions.users.get(bot.user.id) && !message.content.startsWith(prefix) && !message.author.bot) {
                        message.channel.startTyping()
                            /*   cleverbot.create(function (err, session) {
                               cleverbot.ask(message.content.substr(13), function (err, response) {
                                   message.reply(response);
                                   message.channel.stopTyping();
                                   console.log(colors.blue("Cleverbot chat: " + message.content + " // " + response))
                              */
                    }
                }
            } else {
                if (message.content.startsWith(prefix)) {
                    message.botUser = bot;
                    message.prefix = prefix;
                    deployer.commCheck(message);
                } else {
                    if (message.guild && !message.mentions.users.has('id', bot.user.id) && !message.author.equals(bot.user) && !message.author.bot) {

                    }
                    if (message.guild && !!message.mentions.users.get(bot.user.id) && message.guild.id !== '110373943822540800' && !message.content.startsWith(prefix) && !message.author.bot) {
                        if (!cfg.beta) {

                        }

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
    serverModel.findOne({
        id: member.guild.id
    }, (err, Server) => {
        if (err) return;
        if (Server) {
            if (typeof (Server.joinText) !== 'undefined' && Server.joinText !== '' && Server.joinText) {
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
});
bot.on('guildMemberRemove', (member) => {
    serverModel.findOne({
        id: member.guild.id
    }, (err, Server) => {
        if (err) return;
        if (Server) {
            if (typeof (Server.leaveText) !== 'undefined' && Server.leaveText !== '' && Server.leaveText) {
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
});
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
        DB[guild.id] = {
            name: guild.name,
            modules: {
                NSFW: false,
                GOODIES: true,
                LEVELS: true,
                LVUP: true,
                DROPS: true,
                ANNOUNCE: false,
                PREFIX: "+",
                MODROLE: {},
                LANGUAGE: 'dev',
                DISABLED: {}
            },
            channels: {}
        }
        guild.channels.forEach(element => {
            if (element.type != 'voice') {

                DB[guild.id].channels[element.id] = {
                    name: element.name,
                    modules: {
                        NSFW: false,
                        GOODIES: true,
                        GOODMOJI: ':gem:',
                        GOODNAME: 'Gems',
                        LEVELS: true,
                        LVUP: true,
                        DROPS: true,
                        DISABLED: {}
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
    fs.writeFile('./database/servers.json', JSON.stringify(DB, null, 4), (err) => {
        console.log("JSON Write Server Database".gray)
    });
}


function userSetup(user) {

    if (!userDB[user.id]) {
        userDB[user.id] = {
            name: user.username,
            modules: {
                level: 0,
                exp: 0,
                goodies: 0,
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
                dyStreak: 0,
                daily: 1486595162497,
                rubys: 0,
                persotext: "",

            }
        }
    }
    user.mods = userDB[user.id].modules
    fs.writeFile('./database/users.json', JSON.stringify(userDB, null, 4), (err) => {
        console.log("JSON Write User Database".gray)
    });
}


function paramUpdate(target, param, val) {

    target.mods[param] += val
    if (target instanceof Discord.User) {
        userDB[target.id].modules[param] += val
    }
    if (target instanceof Discord.Guild) {
        DB[target.id].modules[param] += val
    }
    if (target instanceof Discord.Channel) {
        DB[target.id].modules.channels.modules[param] += val
    }
    //this.writeJ(userDB,'./database/users')
    //this.writeJ(DB,'./database/servers')
}

function paramDefine(target, param, val) {

    target.mods[param] = val
    if (target instanceof Discord.User) {
        userDB[target.id].modules[param] = val
    }
    if (target instanceof Discord.Guild) {
        DB[target.id].modules[param] = val
    }
    if (target instanceof Discord.Channel) {
        DB[target.guild.id].channels[target.id].modules[param] = val
    }
}








function updateEXP(TG,event) {
    let userData = TG.mods;

    var caller = TG.username // Checar Caller

        //LEVEL UP CHECKER
        //-----------------------------------------------------

    let curLevel = Math.floor(0.18 * Math.sqrt(userData.exp));
    let forNext = Math.trunc(Math.pow((userData.level + 1) / 0.18, 2));
    if (curLevel > userData.level) {
        // Level up!
        paramUpdate(TG, 'level', 1)

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
                                            event.channel.sendFile(image)
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








module.exports = {
    userDB: userDB,
    DB: DB
};
