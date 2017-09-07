var Discord = require("discord.js");
var cfg = require("../config.js");
var fs = require("fs");
var paths = require("./paths.js");
const Canvas = require("canvas");
var hook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);



Array.prototype.removeire = function removeire() {
    var what, a = arguments;
        L = a.length;
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return ;
};



  var errLog = async function errLog(error,file = "no file provided",errim){

      errim = errim || (new Error)

        sendSlack("ErrLogger",error.name+": "+error.message,errim);
        //log("\n")
        //log("CATCH! ".bgRed.white+(error.name+" :: "+error.message).red)
        //log("@ ::  "+file)
        //log(errim)
        //log("\n---===---\n")
    }

// DATABASE
var PersistentCollection = require("djs-collection-persistent");

var DB = new PersistentCollection({
    name: "DB"
});
var userDB = new PersistentCollection({
    name: "userDB"
});

var sendSlack = async function sendSlack(hookname = "PolluxHOOK", pretex="**Hook**", text = "", col = "#2551c9", avi = "https://cdn.discordapp.com/attachments/249641789152034816/272620679755464705/fe3cf46fee9eb9162aa55c8eef6a300c.jpg") {
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
        }).catch(e=> {let a = (new Error); errLog(e,__filename,a.stack.toString())})

    }

    var normaliseUSER = function normaliseUSER(User, userDB, DB) {

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
            //   //log("not this")
        }
    }
    var normaliseGUILD = function normaliseGUILD(SERV, DB) {

      this.paramDefine(SERV,"id",SERV.id)
      this.paramDefine(SERV,"ID",SERV.id)

    }

    var randomize = function randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var gamechange = function gamechange(gamein = false) {
        try {
            if (gamein != false) return gamein;
            delete require.cache[require.resolve(`../resources/lists/playing.js`)];
            var gamelist = require("../resources/lists/playing.js");
            var max = gamelist.games.length
            var rand = this.randomize(0, max)

            return gamelist.games[rand]


        } catch (e) {
            gear.hook.send(e.error)
        }
    }
    var emoji = function emoji(emo) {

        delete require.cache[require.resolve(`../resources/lists/emoji.js`)];
        var emojia = require("../resources/lists/emoji.js");
        if (emojia[emo] === undefined) return "";
        return emojia[emo];
    }
    var writeJ = function writeJ(a, b) {
        fs.writeFile(b + ".json", JSON.stringify(a, null, 4), (err) => {
            //log("-")
        });
    }
    var updateEXP = function updateEXP(TG, event,DB,userDB) {

try{

        var  userData = this.userDB.get(TG.id).modules;
}catch(e){gear.hook.send(e.error)}
try{
       var  userData = userDB.get(TG.id).modules;
}catch(e){console.log("2:    "+e)}
        var caller = TG.username // Checar Caller
        const SVID = event.guild.id
        //LEVEL UP CHECKER
        //-----------------------------------------------------
        let curLevel = Math.floor(0.08 * Math.sqrt(userData.exp));


        let forNext = Math.trunc(Math.pow((userData.level + 1) / 0.08, 2));
        //////-- // -- // -- // -- // -- -- - - -
        let curLevel_local = Math.floor(0.12 * Math.sqrt(userData.exp));
        let forNext_local = Math.trunc(Math.pow((userData.level + 1) / 0.12, 2));
        //-----------------------------------------------------
        if (!userData.loclevel)this.paramDefine(TG,"loclevel",{});
        if (!userData.loclevel[SVID])this.paramDefine(TG,"loclevel."+SVID,0);
        //----------------------------------------------------------------------
        if (curLevel_local > userData.loclevel[SVID]){
             this.paramIncrement(TG, "loclevel."+SVID, 1)
        }
        if (curLevel > userData.level) {
            // Level up!
               //log(typeof userDB.get(TG.id).modules.level)
            this.paramIncrement(TG, "level", 1)
               //log(typeof userDB.get(TG.id).modules.level)
            var overallevel = userDB.get(TG.id).modules.level;

            //log("LEVEL UP EVENT FOR ".bgBlue + caller)
            if (event.guild.name === "Discord Bots") return;
            let img = TG.defaultAvatarURL.substr(0, TG.defaultAvatarURL.length - 10)
            if (TG.avatarURL) {
                img = TG.avatarURL.substr(0, TG.avatarURL.length - 10);
            }
            var guild = event.guild

            gear.Jimp.read(img).then(function (user) {
                gear.Jimp.read(paths.BUILD + "glass.png").then(function (glass) {
                    gear.Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
                        user.resize(126, 126)
                        user.mask(glass, 0, 0)
                        var air = {}
                        gear.Jimp.read(paths.BUILD + "note.png").then(function (photo) {
                            photo.composite(user, 0, 0)
                            photo.mask(lenna, 0, 0)
                            gear.Jimp.read(paths.BUILD + "profile/skins/" + userData.skin + "/levelcard.png").then(function (cart) {
                                gear.Jimp.loadFont(paths.FONTS + "HEADING.fnt").then(function (head) { // load font from .fnt file
                                    gear.Jimp.loadFont(paths.FONTS + "BIG.png.fnt").then(function (sub) {
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

                                        cart.getBuffer(gear.Jimp.MIME_PNG, function (err, image) {
                                            if (DB.get(guild.id).modules.LVUP) {
                                                if (DB.get(guild.id).channels[event.channel.id].modules.LVUP) {

                                                    event.channel.send({files:[{attachment:image,name:"file.png"}]})
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
    }

    var updatePerms = function updatePerms(tgt, Server, DaB) {
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
                case Server.member(tgt).hasPermission("MANAGE_CHANNELS"):
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

    var hasPerms = function hasPerms(Member, DB) {

        if(Member.id =="88120564400553984" ) return true;

        let Server = Member.guild
        //var DB = DB;

        try {
            modPass = Member.roles.has(DB.get(Server.id).modules.MODROLE);
        } catch (e) {
            message.channel.send("noMod Role defined")
        }
        if (Server.owner.id === Member.id || Member.hasPermission("ADMINISTRATOR")) {
            modPass = true;
        };
        if (Member.hasPermission("MANAGE_GUILD")) {
            modPass = true;
        };
        return modPass;
    }
    var checkGoods = function checkGoods(amount, invoker) {
        if (userDB.get(invoker.id).modules.goodies >= amount) {
            return true;
        } else {
            return false;
        }
    }


    const sendLog = async function sendLog(eve,logtype,sv,DB,extra){
      console.log("ASYNC SENDLOG")
      try{

      var a = require("./modules/dev/log.js")
        a.init(eve,logtype,sv,DB,extra)
      }catch(e){console.log(e)}
    }



    var logChannel = async function logChannel(channel, action, DB) {
        let Server = channel.guild
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

            for(let type =0;type<3;type++){

                switch (true){
                  case logchan && Server.channels.has(logchan):
                    chanpoint = Server.channels.get(logchan);
                    break;
                  case actchan && Server.channels.has(actchan):
                    chanpoint = Server.channels.get(actchan);
                    break;
                  case advchan && Server.channels.has(advchan):
                    chanpoint = Server.channels.get(advchan);
                    break;
                  case modchan && Server.channels.has(modchan):
                    chanpoint = Server.channels.get(modchan);
                    break;
                  default:
                    chanpoint = false;
                  }

                if (chanpoint) {

                var emb = new Discord.RichEmbed;
                emb.setDescription(`:hash: Channel **${channel.name}** ${action}`);
                emb.setColor("#2551c9");
                emb.setFooter("Channel Edit")
                var ts = new Date
                emb.setTimestamp(ts)

                chanpoint.send({embed:emb}).catch(e=> {console.log(e)})

              }
            }
        } catch (err) {

        }

    }

    var editData = function editData(target,param,val,ope) {
        //log(param,val,ope)
    try {
        if (target instanceof Discord.User) {
            var Umodules = userDB.get(target.id)
            if (!Umodules.modules[param]) {
                Umodules.modules[param] = []
            }

            if (param.includes(".")) {
                param = param.split(".")
                Umodules = operateTwo(Umodules,param,ope,val)
                 userDB.set(target.id,Umodules)
            }
            else {
                Umodules = operateOne(Umodules,param,ope,val)
                 userDB.set(target.id,Umodules)
            }
        }
        //if GUILD
        if (target instanceof Discord.Guild) {
            var Smodules = DB.get(target.id)
            if (param.includes(".")) {
                param = param.split(".")
                if (!Smodules.modules[param[0]][param[1]]) {
                    Smodules.modules[param[0]][param[1]] = []
                }
               Smodules = operateTwo(Smodules,param,ope,val)
                 DB.set(target.id,Smodules)
            }
            else {
                Smodules = operateOne(Smodules,param,ope,val)
                 DB.set(target.id,Smodules)
            }
        }
        //IF CHAN
        if (target instanceof Discord.Channel) {
            var Tchannel = DB.get(target.guild.id)

            if (!Tchannel.channels[target.id].modules[param]) {
                Tchannel.channels[target.id].modules[param] = []
            }
            if (param.includes(".")) {
                param = param.split(".")
                 let nTchannel = operateTwo(Tchannel.channels[target.id],param,ope,val)
                 Tchannel.channels[target.id] = nTchannel
                 DB.set(target.guild.id,Tchannel)
            }
            else {
                let  nTchannel = operateOne(Tchannel.channels[target.id],param,ope,val)
                 Tchannel.channels[target.id] = nTchannel
                DB.set(target.guild.id,Tchannel)
            }
        }
    }catch (err) {
        //log("ERROR ONWRITE == PARAM ADD".bgRed.white.bold)
        //log(err.stack)
    }
                           function operateTwo(item,p, operation,value){

                    switch(operation){

                        case "push":
                            item.modules[p[0]][p[1]].push(value);
                            break;
                        case "remove":

                            if(item.modules[p[0]][p[1]].constructor === Array){
                              item.modules[p[0]][p[1]].removeire(value);
                            }
                            if(item.modules[p[0]][p[1]].constructor === Object){
                              delete item.modules[p[0]][p[1]][value];
                            }
                            break;
                        case "define":
                            item.modules[p[0]][p[1]] = value;
                            break;
                        case "increment":
                            item.modules[p[0]][p[1]] = Number(item.modules[p[0]][p[1]])+Number(value);
                            break;
                        case "superDef":
                            item[p[0]][p[1]] = value;
                            break;
                    }
                            return item
                }
                           function operateOne(item,p, operation,value){

                    switch(operation){

                        case "push":
                            item.modules[p].push(value);
                            break;
                            case "remove":
                              if (item.modules[p].constructor === Array) {
                                item.modules[p].removeire(value);
                              }
                              if (item.modules[p].constructor === Object) {
                                delete item.modules[p][value];
                              }
                              break;
                        case "define":
                            //log(item)
                            item.modules[p] = value;
                            //log(item)
                            break;
                        case "increment":
                            item.modules[p] = Number(item.modules[p])+Number(value);
                            break;
                        case "superDef":
                            item[p] = value;
                            break;
                    }
                            return item
                }
}

    var paramAdd = function paramAdd(target, param, val) {
       editData(target,param,val,"push");
    }
    var paramRemove = function paramRemove(target, param, val) {
       editData(target,param,val,"remove");
    }

    var paramIncrement = function paramIncrement(target, param, val) {
       editData(target,param,val,"increment");
    }

    var paramDefine = function paramDefine(target, param, val) {
      //log("Param Define:"+target+" "+param+" "+val)
        editData(target,param,val,"define");
    }

    var superDefine = function superDefine(target, param, val) {
        editData(target,param,val,"superDef");
    }
    var sendDebug = function sendDebug(msg){
        let response = `
**Server:** ${msg.guild.name}
**Channel:** ${msg.channel.name}
**Author:** ${msg.author} :: ${msg.author.username}#${msg.author.discriminator}
**Message:**
${msg.content}

**PERMS:** ${"```"}${msg.guild.member(msg.botUser).permissions.serialize()}${"```"}

`;
        return response
    }


    var dropGoodies = function(a,b,c){
    delete require.cache[require.resolve("./archetypes/drops.js") ];
  let drops = require("./archetypes/drops.js")
    return drops.runb(a,b,c)

}

    var usage = function usage(cmd,m,third){
          delete require.cache[require.resolve("./archetypes/usage.js")];
        let usage = require("./archetypes/usage.js")

    return usage.run(cmd,m,third)

    }

    //OLDS

    var getFlair = function getFlair(origin, target) {
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

            if (target.id == origin.guild.owner.id) return "ADM";
            if (origin.guild.member(target).hasPermission("ADMINISTRATOR")) return "ADM";
            if (origin.guild.member(target).hasPermission("MANAGE_GUILD")) return "MOD";
            if (origin.guild.member(target).hasPermission("KICK_MEMBERS")) return "MOD";
            if (target.bot) return "BOT";
            return "none"
        }
    }

    var glassify = function glassify(img, call, msg = false) {

            gear.Jimp.read(img).then(function (user) {

                gear.Jimp.read(paths.BUILD + "glass.png").then(function (glass) {
                    gear.Jimp.read(paths.BUILD + "note.png").then(function (lenna) {

                        user.resize(126, 126)
                        user.mask(glass, 0, 0)
                        var air = {}
                        gear.Jimp.read(paths.BUILD + "note.png").then(function (lennaB) {
                            lennaB.composite(user, 0, 0)
                            lennaB.mask(lenna, 0, 0)

                            //lennaB.write(`${paths.GLASS}/${call}.png`);
                            //log("Glassify Done")
                        });
                    });
                })
            });
        }

    var shuffle = function shuffle(array) {
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
    }
    var clean = function clean(text) {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }
    var draw = function draw(array, who) {
        var cardimg = gear.Jimp.read(`${paths.BUILD}cards/fiver.png`).then(function (cardimg) {
            gear.Jimp.read(`${paths.BUILD}cards/${array[0].card}.png`).then(function (c1) {
                cardimg.composite(c1, 0 * 96, 0)
                cardimg.write(`${paths.BUILD}cards/${who}0_bj.png`)
                //log(array[0].card)
            })
            setTimeout(function () {
                gear.Jimp.read(`${paths.BUILD}cards/${array[1].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 1 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}1_bj.png`)
                })
            }, 300);
            setTimeout(function () {
                gear.Jimp.read(`${paths.BUILD}cards/${array[2].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 2 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}2_bj.png`)
                    //log(array[2].card + "-------------------------------------")
                })
            }, 600);
            setTimeout(function () {
                //log(`${paths.BUILD}cards/${array[3].card}.png`)
                gear.Jimp.read(`${paths.BUILD}cards/${array[3].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 3 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}3_bj.png`)
                })
            }, 900);
            setTimeout(function () {
                gear.Jimp.read(`${paths.BUILD}cards/${array[4].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 4 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}4_bj.png`)
                    cardimg.write(`${paths.BUILD}cards/${who}5_bj.png`)
                    //log(array[5].card + "-------------------------------------")
                })
            }, 1200);
        })
    }
    var drawalt = function drawalt(array, who) {

        if (array.length >= 1) {


            var cardimg = gear.Jimp.read(`${paths.BUILD}cards/fiver.png`).then(function (cardimg) {


                gear.Jimp.read(`${paths.BUILD}cards/${array[0].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 0 * 96, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}0_bj.png`)
                    //log(array[0].card)
                })
            })
        };
        if (array.length >= 2) {
            setTimeout(function () {
                gear.Jimp.read(`${paths.BUILD}cards/${array[1].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 1 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}1_bj.png`)
                })
            }, 50);
        }
        if (array.length >= 3) {
            setTimeout(function () {
                gear.Jimp.read(`${paths.BUILD}cards/${array[2].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 2 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}2_bj.png`)
                    //log(array[2].card + "-------------------------------------")
                })
            }, 100);
        }
        if (array.length >= 4) {
            setTimeout(function () {
                //log(`${paths.BUILD}cards/${array[3].card}.png`)
                gear.Jimp.read(`${paths.BUILD}cards/${array[3].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 3 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}3_bj.png`)
                })
            }, 150);
        }
        if (array.length >= 5) {
            setTimeout(function () {
                gear.Jimp.read(`${paths.BUILD}cards/${array[4].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 4 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}4_bj.png`)
                    cardimg.write(`${paths.BUILD}cards/${who}5_bj.png`)
                    //log(array[5].card + "-------------------------------------")
                })
            }, 200);
        }
    }
    var getDir = function getDir(rootDir, cb) {
        fs.readdir(rootDir, function (err, files) {
            var dirs = [];
            for (var index = 0; index < files.length; ++index) {
                var file = files[index];
                if (file[0] !== ".") {
                    var filePath = rootDir + "/" + file;
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


    const miliarize=function miliarize(numstring,strict){
        if (typeof numstring == "number"){
            numstring = numstring.toString()
        }
        if(numstring.length < 4)return numstring;

        let stashe = numstring.replace(/\B(?=(\d{3})+(?!\d))/g, ".").toString();

        if(strict){


            //log(stashe)
            //log(typeof stashe)
            let stash = stashe.split(".")
        switch(stash.length){
            case 1:
                return stash;
            case 2:
                if(stash[1]!="000") break;
                return stash[0]+"K";
            case 3:
                if(stash[2]!="000") break;
                return stash[0]+"."+stash[1][0]+stash[1][1]+"Mi";
            case 4:
                if(stash[3]!="000") break;
                return stash[0]+"."+stash[1][0]+stash[1][1]+"Bi";
             }

            return stashe;
        }

        stash = stashe.split(".")
        switch(stash.length){
            case 1:
                return stash.join(" ");
            case 2:
                if(stash[0].length<=1) break;
                return stash[0]+"K";
            case 3:
                return stash[0]+"Mi";
            case 4:
                return stash[0]+"Bi";
             }
         return stashe;
    }

    const tag = async function tag(base, text, font, color) {

            font = font || '14px Product,Sans'
            color = color || '#b4b4b4'
            base.font = font;

            let H = base.measureText(text).emHeightAscent
            let h = base.measureText(text).emHeightDescent;
            let w = base.measureText(text).width;
            const item = new Canvas(w, h + H);
                let c = item.getContext("2d")
                c.antialias = 'subpixel';
                c.filter = 'best';
                c.font = font;
                c.fillStyle = color;
                await c.fillText(text, 0, H);
            return {item:item,height:h+H,width:w};
        }


    const getImg = async function getImg(message) {

            if (message.attachments.url && message.attachments.width) return message.attachments.url;
            let sevmesgs = message.channel.messages

            const messpool = sevmesgs.filter(mes => {
                try {
                    //console.log("\n\n-------------------")
                    //console.log(mes.content)
                    //console.log(!!mes.attachments.first().url)
                    if (mes.attachments) {
                        if (mes.attachments.first().url) {
                            return true
                        }
                    }
                } catch (e) {
                    return false
                }
                //console.log("------------------\n\n")
            })
            if (messpool.last()) return messpool.last().attachments.first().url;
            else return undefined
    }

    // DEPENDENCY TOOLBOX AHOY

module.exports = {
    getImg:getImg,
    tag:tag,
    miliarize:miliarize,
     errLog:errLog,
    DB: DB,
    userDB: userDB,
    hook: hook,
    sendSlack: sendSlack,
    normaliseUSER: normaliseUSER,
    normaliseGUILD: normaliseGUILD,
    randomize: randomize,
    gamechange: gamechange,
    emoji: emoji,
    writeJ: writeJ,
    updateEXP: updateEXP,
    updatePerms: updatePerms,
    hasPerms: hasPerms,
    checkGoods: checkGoods,
    logChannel: logChannel,
    editData: editData,
    paramAdd: paramAdd,
    paramRemove: paramRemove,
    paramIncrement: paramIncrement,
    paramDefine: paramDefine,
    superDefine: superDefine,
    sendDebug: sendDebug,
    dropGoodies: dropGoodies,
    usage: usage,
    getFlair: getFlair,
    glassify: glassify,
    shuffle: shuffle,
    clean: clean,
    draw: draw,
    drawalt: drawalt,
    getDir: getDir,
  sendLog:sendLog,
    Jimp: require("jimp"),
    cheerio: require("cheerio"),
    Discord: Discord,
    fs: fs

}



