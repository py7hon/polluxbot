const Discord = require("discord.js");
var paths = require("./paths.js");
var cfg = require('../config.js');
//const main = require('../pollux.js')
//var ff = require("./functionfest.js");
const Jimp = require("jimp");
const fs = require("fs");

//var emoji = require("../resources/lists/emoji.js");
//var playing = require("../resources/lists/playing.js");
const hook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);


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
const PersistentCollection = require('djs-collection-persistent');
const DB = new PersistentCollection({
    name: "DB"
});
const userDB = new PersistentCollection({
    name: 'userDB'
});

module.exports = {
DB:DB,
    userDB:userDB,

    //DB OPS


    sendSlack: async function sendSlack(hookname = "PolluxHOOK", pretex="**Hook**", text = "", col = "#2551c9", avi = "https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg") {
//return;
       await hook.sendSlackMessage({
            "username": hookname,
            "attachments": [{
                "avatar": avi,
                "pretext": "**"+pretex+"**",
                "text": text,
                "color": col,

                "ts": Date.now() / 1000
        }]
        }).catch()

    },
    normaliseUSER: function normaliseUSER(User, userDB, DB) {


        try {


            var Umodules = userDB.get(User.id)

            //console.log(User.id)
            Umodules.ID = User.id
            Umodules.username = User.username
            Umodules.name = User.username
            Umodules.discriminator = User.discriminator
            Umodules.tag = User.tag
            Umodules.avatarURL = User.avatarURL

            if (Umodules.modules.goodies < 0) {
                Umodules.modules.goodies = 0
            }
            Umodules.modules.goodies = parseInt(Umodules.modules.goodies)

            userDB.set(User.id, Umodules)
        } catch (err) {
            //   console.log("not this")
        }
    },
    normaliseGUILD: function normaliseGUILD(SERV, DB) {

        var GG = DB.get(SERV.id)
        GG.ID = SERV.id
        GG.iconURL = SERV.iconURL


        DB.set(SERV.id, GG)

    },
    randomize: function randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    gamechange: function gamechange(gamein = false) {
        try {
            if (gamein != false) return gamein;
            delete require.cache[require.resolve(`../resources/lists/playing.js`)];
            var gamelist = require("../resources/lists/playing.js");
            var max = gamelist.games.length
            var rand = this.randomize(0, max)

            return gamelist.games[rand]


        } catch (e) {
            console.log(e)
        }
    },


    emoji: function emoji(emo) {

        delete require.cache[require.resolve(`../resources/lists/emoji.js`)];
        var emojia = require("../resources/lists/emoji.js");
        if (emojia[emo] === undefined) return "";
        return emojia[emo];
    },


    writeJ: function writeJ(a, b) {
        fs.writeFile(b + '.json', JSON.stringify(a, null, 4), (err) => {
            console.log('-')
        });
    },


    updateEXP: function updateEXP(TG, event,DB,userDB) {
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
                                            var level = "" + userDB.get(TG.id).modules.level
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
    },



    updatePerms: function updatePerms(tgt, Server, DaB) {
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

    },


    hasPerms: function hasPerms(Member, DB) {
        let Server = Member.guild
        //var DB = DB;
        var modPass = false;
        try {

            modPass = Member.roles.has(DB.get(Server.id).modules.MODROLE);
        } catch (e) {
            message.channel.sendMessage("noMod Role defined")
        }
        if (Server.owner.id === Member.id || Member.hasPermission("ADMINISTRATOR")) {
            modPass = true;
        };
        if (Member.hasPermission("MANAGE_GUILD")) {
            modPass = true;
        };
        return modPass;
    },

    dropGoodies: function dropGoodies(event, DB, userDB) {
        var CHN = event.channel
        var GLD = event.guild
        var LANG = event.lang;
        let GOODMOJI = emoji("ruby")
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
                        msg2.content === '+pick', {
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
                        }) + " " + emoji("ruby")).then(function (c) {
                            message.delete()
                            c.delete(500000)
                        }).catch();

                        paramIncrement(Picker, 'goodies', CHN.DROPSLY)
                        paramIncrement(Picker, 'earnings.drops', CHN.DROPSLY)
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
                        }) + " " + emoji("ruby")).then(function (c) {
                            message.delete()
                            c.delete(500000)
                        }).catch();

                        paramIncrement(Picker, 'goodies', CHN.DROPSLY)
                        paramIncrement(Picker, 'earnings.drops', CHN.DROPSLY)
                        CHN.DROPSLY = 0

                        r.delete().catch()
                        return resolve(true);

                    }
                })

            }).catch()



        }


    },
    logChannel: function logChannel(channel, action, DB) {
        Server = channel.guild
        var chanpoint = false;
        try {

            let logchan = DB.get(Server.id).modules.LOGCHANNEL
            let advchan = DB.get(Server.id).modules.ADVLOG
            let actchan = DB.get(Server.id).modules.ACTLOG
            let modchan = DB.get(Server.id).modules.MODLOG


            // if( advchan && Server.channels.has(advchan)){chanpoint = Server.channels.get(advchan)}
            if (logchan && Server.channels.has(logchan)) {
                chanpoint = Server.channels.get(logchan)
            }
            if (actchan && Server.channels.has(actchan)) {
                chanpoint = Server.channels.get(actchan)
            }
            // if( modchan && Server.channels.has(modchan)){chanpoint = Server.channels.get(modchan)}


            if (chanpoint) {

                var emb = new Discord.RichEmbed;





                emb.setDescription(`:hash: Channel **${channel.name}** ${action}`);

                emb.setColor("#2551c9");
                var ts = new Date
                emb.setFooter("Channel Edit")
                emb.setTimestamp(ts)

                chanpoint.sendEmbed(emb).catch()

            }


        } catch (err) {

        }



    },
    paramAdd: function paramAdd(target, param, val) {

        try {

            if (target instanceof Discord.User) {

                var Umodules = userDB.get(target.id)
                if (!Umodules.modules[param]) {
                    Umodules.modules[param] = []
                }


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
                    if (!Smodules.modules[param[0]][param[1]]) {
                        Smodules.modules[param[0]][param[1]] = []
                    }
                    Smodules.modules[param[0]][param[1]].push(val)
                } else {
                    console.log("INCLUDES")
                    Smodules.modules[param].push(val)
                }

                DB.set(target.id, Smodules)

            }
            if (target instanceof Discord.Channel) {

                var Tchannel = DB.get(target.guild.id)
                if (!Tchannel.channels[target.id].modules[param]) {
                    Tchannel.channels[target.id].modules[param] = []
                }

                if (param.includes('.')) {
                    param = param.split('.')
                    Tchannel.channels[target.id].modules[param[0]][param[1]].push(val)
                } else {
                    Tchannel.channels[target.id].modules[param].push(val)
                }
                DB.set(target.guild.id, Tchannel)

            }
            //  }
        } catch (err) {
            console.log('ERROR ONWRITE == PARAM ADD'.bgRed.white.bold)
            console.log(err.stack)


        }
    },
    paramRemove: function paramRemove(target, param, val) {
        try {

            //    param = param.split('.');
            //   if ((param.length == 1)) {

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
            console.log('ERROR JSON'.bgRed.white.bold)
            console.log(err.stack)
        }
    },
    paramIncrement: function paramIncrement(target, param, val) {
        try {



            if (target instanceof Discord.User) {

                var Umodules = userDB.get(target.id)
                if (!Umodules.modules[param]) {
                    Umodules.modules[param] = 0
                }
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
                if (!Smodules.modules[param]) {
                    Smodules.modules[param] = 0
                }
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
                if (!Tchannel.channels[target.id].modules[param]) {
                    Tchannel.channels[target.id].modules[param] = 0
                }

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

    },
    paramDefine: function paramDefine(target, param, val) {
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
    },
    superDefine: function superDefine(target, param, val) {
        try {

            if (target instanceof Discord.User) {

                var Umodules = userDB.get(target.id)

                if (param.includes('.')) {
                    param = param.split('.')
                    Umodules[param[0]][param[1]] = val
                } else {
                    Umodules[param] = val
                }

                userDB.set(target.id, Umodules)

            }

            if (target instanceof Discord.Guild) {

                var Smodules = DB.get(target.id)
                if (param.includes('.')) {
                    param = param.split('.')
                    Smodules[param[0]][param[1]] = val
                } else {
                    Smodules[param] = val
                }
                DB.set(target.id, Smodules)

            }
            if (target instanceof Discord.Channel) {

                var Tchannel = DB.get(target.guild.id)

                if (param.includes('.')) {
                    param = param.split('.')
                    Tchannel.channels[target.id][param[0]][param[1]] = val
                } else {
                    Tchannel.channels[target.id][param] = val
                }
                DB.set(target.guild.id, Tchannel)

            }
        } catch (err) {
            console.log('ERROR JSON'.bgRed.white.bold)
            console.log(err.stack)
        }
    },
    checkGoods: function checkGoods(amount, invoker) {
        if (userDB.get(invoker.id).modules.goodies >= amount) {
            return true;
        } else {
            return false;
        }
    },

    paramAdd: function paramAdd(target, param, val) {

        try {

            if (target instanceof Discord.User) {

                var Umodules = userDB.get(target.id)
                if  (!Umodules.modules[param]){Umodules.modules[param] =[]}


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
                        Smodules.modules[param[0]][param[1]]=[]
                    }
                Smodules.modules[param[0]][param[1]].push(val)
            } else {
                  console.log("INCLUDES")
                Smodules.modules[param].push(val)
            }

            DB.set(target.id, Smodules)

            }
            if (target instanceof Discord.Channel) {

                var Tchannel = DB.get(target.guild.id)
                if  (!Tchannel.channels[target.id].modules[param]){Tchannel.channels[target.id].modules[param] =[]}

                if (param.includes('.')) {
                    param = param.split('.')
                    Tchannel.channels[target.id].modules[param[0]][param[1]].push(val)
                } else {
                    Tchannel.channels[target.id].modules[param].push(val)
                }
                DB.set(target.guild.id, Tchannel)

            }
            //  }
        } catch (err) {
            console.log('ERROR ONWRITE == PARAM ADD'.bgRed.white.bold)
            console.log(err.stack)


        }
    },
    paramRemove: function paramRemove(target, param, val) {
        try {

            //    param = param.split('.');
            //   if ((param.length == 1)) {

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
            console.log('ERROR JSON'.bgRed.white.bold)
            console.log(err.stack)
        }
    },
    paramIncrement: function paramIncrement(target, param, val) {
        try {



            if (target instanceof Discord.User) {

                var Umodules = userDB.get(target.id)
                 if  (!Umodules.modules[param]){Umodules.modules[param] =0}
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
                if  (!Smodules.modules[param]){Smodules.modules[param] =0}
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
                if  (!Tchannel.channels[target.id].modules[param]){Tchannel.channels[target.id].modules[param] =0}

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

    },
    paramDefine: function paramDefine(target, param, val) {
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
    },
    superDefine: function superDefine(target, param, val) {
        try {

            if (target instanceof Discord.User) {

                var Umodules = userDB.get(target.id)

                if (param.includes('.')) {
                    param = param.split('.')
                    Umodules[param[0]][param[1]] = val
                } else {
                    Umodules[param] = val
                }

                userDB.set(target.id, Umodules)

            }

            if (target instanceof Discord.Guild) {

                var Smodules = DB.get(target.id)
                if (param.includes('.')) {
                    param = param.split('.')
                    Smodules[param[0]][param[1]] = val
                } else {
                    Smodules[param] = val
                }
                DB.set(target.id, Smodules)

            }
            if (target instanceof Discord.Channel) {

                var Tchannel = DB.get(target.guild.id)

                if (param.includes('.')) {
                    param = param.split('.')
                    Tchannel.channels[target.id][param[0]][param[1]] = val
                } else {
                    Tchannel.channels[target.id][param] = val
                }
                DB.set(target.guild.id, Tchannel)

            }
        } catch (err) {
            console.log('ERROR JSON'.bgRed.white.bold)
            console.log(err.stack)
        }
    },
    checkGoods: function checkGoods(amount, invoker) {
        if (userDB.get(invoker.id).modules.goodies >= amount) {
            return true;
        } else {
            return false;
        }
    },



    //OLDS

    checkAdm: function checkAdm(origin, target) {
        try {

            let modRole = origin.guild.roles.find("name", "MOD");
            let admRole = origin.guild.roles.find("name", "ADM");
            let maidRole = origin.guild.roles.find("name", "🎀   Maids");

            if (origin.guild.member(target).roles.has(admRole.id)) {
                return "ADM";
            } else if (origin.guild.member(target).roles.has(modRole.id)) {
                return "MOD";
            } else if (origin.guild.member(target).roles.has(maidRole.id)) {
                return "MAID";
            } else if (target.bot) {
                return "BOT";
            } else {
                return "none";
            }
        } catch (err) {
            return "none"
        }
    },

    glassify: function glassify(img, call, msg = false) {

            Jimp.read(img).then(function (user) {

                Jimp.read(paths.BUILD + "glass.png").then(function (glass) {
                    Jimp.read(paths.BUILD + "note.png").then(function (lenna) {

                        user.resize(126, 126)
                        user.mask(glass, 0, 0)
                        var air = {}
                        Jimp.read(paths.BUILD + "note.png").then(function (lennaB) {
                            lennaB.composite(user, 0, 0)
                            lennaB.mask(lenna, 0, 0)

                            //lennaB.write(`${paths.GLASS}/${call}.png`);
                            console.log("Glassify Done")
                        });
                    });
                })
            });
        }

        ,

    shuffle: function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },
    clean: function clean(text) {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    },
    draw: function draw(array, who) {
        var cardimg = Jimp.read(`${paths.BUILD}cards/fiver.png`).then(function (cardimg) {
            Jimp.read(`${paths.BUILD}cards/${array[0].card}.png`).then(function (c1) {
                cardimg.composite(c1, 0 * 96, 0)
                cardimg.write(`${paths.BUILD}cards/${who}0_bj.png`)
                console.log(array[0].card)
            })
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[1].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 1 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}1_bj.png`)
                })
            }, 300);
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[2].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 2 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}2_bj.png`)
                    console.log(array[2].card + "-------------------------------------")
                })
            }, 600);
            setTimeout(function () {
                console.log(`${paths.BUILD}cards/${array[3].card}.png`)
                Jimp.read(`${paths.BUILD}cards/${array[3].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 3 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}3_bj.png`)
                })
            }, 900);
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[4].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 4 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}4_bj.png`)
                    cardimg.write(`${paths.BUILD}cards/${who}5_bj.png`)
                    console.log(array[5].card + "-------------------------------------")
                })
            }, 1200);
        })
    },
    drawalt: function drawalt(array, who) {

        if (array.length >= 1) {


            var cardimg = Jimp.read(`${paths.BUILD}cards/fiver.png`).then(function (cardimg) {


                Jimp.read(`${paths.BUILD}cards/${array[0].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 0 * 96, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}0_bj.png`)
                    console.log(array[0].card)
                })
            })
        };
        if (array.length >= 2) {
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[1].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 1 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}1_bj.png`)
                })
            }, 50);
        }
        if (array.length >= 3) {
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[2].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 2 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}2_bj.png`)
                    console.log(array[2].card + "-------------------------------------")
                })
            }, 100);
        }
        if (array.length >= 4) {
            setTimeout(function () {
                console.log(`${paths.BUILD}cards/${array[3].card}.png`)
                Jimp.read(`${paths.BUILD}cards/${array[3].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 3 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}3_bj.png`)
                })
            }, 150);
        }
        if (array.length >= 5) {
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[4].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 4 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}4_bj.png`)
                    cardimg.write(`${paths.BUILD}cards/${who}5_bj.png`)
                    console.log(array[5].card + "-------------------------------------")
                })
            }, 200);
        }
    },
    getDir: function getDir(rootDir, cb) {
        fs.readdir(rootDir, function (err, files) {
            var dirs = [];
            for (var index = 0; index < files.length; ++index) {
                var file = files[index];
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
                        index: index,
                        file: file
                    }));
                }
            }
        });
    }

}
