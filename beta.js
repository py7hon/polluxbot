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


var deployer = require('./core/deployer.js'); // <------------- I DUN LIKE DIS


var cleverbot = require("cleverbot");// <------------- REVIEW  DIS
cleverbot = new cleverbot(cfg.clever.ID, cfg.clever.token);



var async = require('async')  // <-- EVER USED?


const Jimp = require("jimp");
var i18next = require('i18next');
var multilang = require('./utils/multilang_b');


var Backend = require('i18next-node-fs-backend');
var fs = require("fs");
var paths = require("./core/paths.js");
var DB = JSON.parse(fs.readFileSync('./database/servers.json', 'utf8', console.log("OK")));
var userDB = JSON.parse(fs.readFileSync('./database/users.json', 'utf8', console.log("OK")));


var prefix = "+";
var skynet = '248285312353173505'



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

client.login(cfg.beta).then(() => {

});


//DEBUG
const hook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);
//---


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
    function loginSuccess() {
        console.log('LOGGED IN!'.bgGreen.white.bold)
        hook.sendSlackMessage({
            'username': 'Pollux Core Reporter',
            'attachments': [{
                'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
                'pretext': `Successful Login!`,
                'color': '#49c7ff', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
                // 'footer': 'Powered by sneks',
                'ts': Date.now() / 1000
      }]
        })
    }

//var dvv = require('./database.js')

    console.log('Ready to Rock!')
    bot.on('ready', () => {


        bot.guilds.forEach(g => { g.members.forEach( m=> {



          //  dvv.addUser(m.user,false);
        //    dvv.find('name',m.user.id);
        })})


        bot.user.setStatus('online')

        // bot.user.setGame(`Flicky draws Silenyte stuff`, 'https://www.twitch.tv/LucasFlicky').then().catch();

        bot.user.setGame(`Bocha`).then().catch();

        async.parallel(bot.guilds.forEach(G => serverSetup(G)))

        userSetup(bot.user)
        hook.sendSlackMessage({
            'username': 'Pollux Core Reporter',
            'attachments': [{
                'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
                'pretext': `All systems go! I am ready to rock, master!`,
                'color': '#3ed844', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
                // 'footer': 'Powered by sneks',
                'ts': Date.now() / 1000
      }]
        })

        fs.createReadStream('database/users.json').pipe(fs.createWriteStream('./backup/USERS_' + Date.now() + '.json'));
        fs.createReadStream('database/servers.json').pipe(fs.createWriteStream('./backup/SERVERS_' + Date.now() + '.json'));


    });


//Check Commands

    deployer.pullComms()



//=====================================             EVENTS



    bot.on("message", (message) => {




        var Server = message.guild;
        var Channel = message.channel;
        var Author = message.author;
        var Target = message.mentions.users.first() || Author;
        var MSG = message.content;





        //---  LOGS
        if (Server) {

            var logserver = Server.name + " "
            var logchan = " #" + Channel.name + " "
            var logusr = " " + Author.username + ": "
            var logmsg = MSG

            if (Server.name == "Discord Bots" && (MSG.includes('px+') || MSG.toLowerCase().includes('pollux'))) {
                console.log(" @ " + logserver.bgRed.blue.bold + logchan.bgRed.yellow + " - " + logusr.bold + ": " + logmsg.gray + "\n")
            } else {
                if (Server.name != "Discord Bots") {

                    console.log(" @ " + logserver.bgWhite.black.bold + logchan.bgWhite.blue + logusr.yellow.underline + logmsg.gray.underline + "\n")
                }
            }

        }
        //--- END LOGS



//-- NO BOTS PAST HERE

        if (Author.bot) return;

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

        if (Server && !Author.bot) {


            serverSetup(Server);

            userSetup(Author);

            userSetup(Target);


            paramIncrement(Author, 'exp', 1)


            /*

            -= ::PERMS:: =-

            0 = ALMIGHTY (owner)
            1 = ADM
            2 = MOD
            3 = PLEB
            4 = FUDIDO
            5 = FORBIDDEN

            */


                updatePerms(Author,Server)
                updatePerms(Target,Server)




            // DONE WITH PERMS ---//

            if (DB[Server.id].channels[Channel.id] == undefined) {
                channelSetup(Channel, Server);
            }



            try {

                if (DB[Server.id].modules&&!DB[Server.id].modules.DISABLED.includes("level")) {
                     updateEXP(Author, message)
                }else if (DB[Server.id].modules&&!DB[Server.id].channels[Channel.id].modules.DISABLED.includes("level")) {
                     updateEXP(Author, message)
                    }

            } catch (err) {
                serverSetup(Server)
            }

         try {

                if (DB[Server.id].modules&&!DB[Server.id].modules.DISABLED.includes("drop")) {
                     dropGoodies(message)
                }else if (!DB[Server.id].channels[Channel.id].modules.DISABLED.includes("drop")) {
                     dropGoodies(message)
                    }

            } catch (err) {
                serverSetup(Server)
            }




            //Wave 1
            if (Server && typeof (DB[Server.id].modules.LANGUAGE) !== 'undefined' && DB[Server.id].modules.LANGUAGE && DB[Server.id].modules.LANGUAGE !== '') {
                message.lang = [DB[Server.id].modules.LANGUAGE, 'en'];
            }


            //Wave 2 -- CHECK PREFIX
            if (Server && typeof (DB[Server.id].modules.PREFIX) !== 'undefined' && DB[Server.id].modules.PREFIX && DB[Server.id].modules.PREFIX !== '') {
                //-- START PREFIX
                if (message.content.startsWith(DB[Server.id].modules.PREFIX)) {
                    message.botUser = bot;
                    message.akairo = client;
                    message.prefix = DB[Server.id].modules.PREFIX;

                    //deployer.checkModule(message)

                    console.log('check ' + message)

                var mm = multilang.getT();

                    switch (deployer.checkUse(message, DB, userDB)) {

                        case "DISABLED":
                            message.reply(mm('CMD.disabledModule', {
                                lngs: message.lang,
                                module: message.content.substr(message.prefix.length).split(' ')[0]
                            }))


                            break;
                        case "NO PRIVILEGES":
                            message.reply(mm('CMD.moderationNeeded', {
                                lngs: message.lang,
                                prefix: message.prefix
                            }))
                            break;
                        default:
                            console.log('OK go')
                            deployer.run(message, userDB, DB);
                            break;
                    }
                    // deployer.checkUse(message)


                }


                else {
            /*


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

                   */
                }
            }

            else {
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

//----------------------------------------


 bot.on('reconnecting', () => {
        console.log("Reconnect".bgRed)
        hook.sendSlackMessage({
            'username': 'Pollux Core Reporter',
            'attachments': [{
                'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
                'pretext': `SELF RESTART TRIGGERED! Gimme a second to still myself.`,
                'color': '#ffb249', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
                // 'footer': 'Powered by sneks',
                'ts': Date.now() / 1000
      }]
        })
    });

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

//bot.on("warn", console.warn);
bot.on('error', (error) => {
    if (!error) return;
    console.log(error.toString().red);
    hook.sendSlackMessage({
        'username': 'Pollux Core Reporter',
        'attachments': [{
            'avatar': 'https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg',
            'pretext': `Minor error! Check console`,
            'color': '#ffdc49', //'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
            // 'footer': 'Powered by sneks',
            'ts': Date.now() / 1000
      }]
    })
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
    //element.mods = DB[guild.id].channels[element.id].modules;


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
                DROPS: false,
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
               // element.mods = DB[guild.id].channels[element.id].modules;

            }
        });
    }

    try {

        fs.writeFile('./database/servers.json', JSON.stringify(DB, null, 4), (err) => {
            console.log("JSON Write Server Database".gray)
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

                skin:'default',
                skinsAvailable:['default'],

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
            }
        }
    }
  //  user.mods = userDB[user.id].modules
    fs.writeFile('./database/users.json', JSON.stringify(userDB, null, 4), (err) => {
        ////console.log("JSON Write User Database".gray)
    });
}
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


function updatePerms(tgt,Server){
          switch (true){
                          case Server.member(tgt).id == Server.ownerID:

                        paramDefine(tgt, 'PERMS', 0);
                  console.log(tgt.username + "PERMS  "+0)
                        break;
                           case Server.member(tgt).hasPermission("ADMINISTRATOR"):
                     case Server.member(tgt).hasPermission("BAN_MEMBERS"):
                        paramDefine(tgt, 'PERMS', 1);
                  console.log(tgt.username + "PERMS  "+1)
                        break;
                    case Server.member(tgt).hasPermission("MANAGE_GUILD"):
                    paramDefine(tgt, 'PERMS', 2);
                        console.log(tgt.username + "   MG GLD PERMS  "+2)
                        break;
                    case Server.member(tgt).hasPermission("KICK_MEMBERS"):
                        paramDefine(tgt, 'PERMS', 2);
                        console.log(tgt.username + "    KIK PERMS  "+2)
                        break;


                    default:
                         paramDefine(tgt, 'PERMS', 3);
                        break;
                       }

                if (DB[Server.id].modules.MODROLE.name) {
                    if (Server.member(tgt).roles.exists('name', DB[Server.id].modules.MODROLE.name)) {
                        paramDefine(tgt, 'PERMS', 2)
                        console.log(tgt.username + "PERMS plus "+2)
                    }
                }

}






function dropGoodies(event) {
    var CHN = event.channel
    var GLD = event.guild
    var LANG = event.lang;
    let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (DB[Server.id].modules) {
        GOODMOJI = DB[Server.id].modules
    }
    if (DB[Server.id].modules.GOODNAME) {
        GOOD = DB[Server.id].modules.GOODNAME
    }
    if (typeof CHN.DROPSLY != 'number') {
        CHN.DROPSLY = 0
    }
    var droprate = randomize(1, 8000)
    if (GLD.name == "Discord Bots") return;
    console.log(droprate)
    if (droprate > 1889 && droprate < 2000) {
        console.log('DROP')
        var pack;
        var prefie = DB[Server.id].modules.PREFIX || "+"
        var mm = multilang.getT();
        CHN.sendFile(paths.BUILD + 'ruby.png', 'goodie.png', mm('$.goodDrop', {
            lngs: LANG,
            good: GOOD,
            emoji: GOODMOJI,
            prefix: prefie
        })).then(function (r) {
            bot.on('message', m => {
                if (m.content == m.DB[guild.id].modules.PREFIX + "pick") {
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
            prefix: event.DB[guild.id].modules.PREFIX
        })).then(function (r) {
            bot.on('message', m => {
                if (m.content == m.DB[guild.id].modules.PREFIX + "pick") {
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
    let userData = userDB[TG.id].modules;
    var caller = TG.username // Checar Caller

    //LEVEL UP CHECKER
    //-----------------------------------------------------
    let curLevel = Math.floor(0.18 * Math.sqrt(userData.exp));
    let forNext = Math.trunc(Math.pow((userData.level + 1) / 0.18, 2));
    if (curLevel > userData.level) {
        // Level up!
        paramIncrement(TG, 'level', 1)

        // event.reply(`upou pro level **${curLevel}**!`);
        console.log("LEVEL UP EVENT FOR ".bgBlue + TG)
        if (event.guild.name == "Discord Bots") return;
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
                        Jimp.read(paths.BUILD +"profile/skins/"+ userData.skin + '/levelcard.png').then(function (cart) {
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
                                            if (event.DB[guild.id].modules.LVUP) {
                                                if (DB[event.channel.guild.id].channels[event.channel.id].modules.LVUP) {

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
    DB: DB,
    serverSetup: serverSetup,
    userSetup: serverSetup
};




   bot.login(cfg.beta).then(loginSuccess());
