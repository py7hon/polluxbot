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

var ff = require("./core/functionfest.js");

var defaults = require("./utils/defaults.js")  // Database Defaults

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


//  DATABASE END
//----------------------------
var dash = require("../pollux-dash/server.js")

dash.init(bot,DB,userDB)

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

var mm = multilang.getT();

//==-------------------------------------------

//==-------------------------------------------
// HOOKS
//const hook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);


function loginSuccess() {
    console.log('LOGGED IN!'.bgGreen.white.bold)

    let name = 'Pollux Core Reporter';
    let tx = `Successful Login!`;
    let color = '#49c7ff';

    ff.sendSlack(name, tx, undefined, color)

    setInterval(function () {
        var date = new Date();
        if (date.getSeconds() === 0) {
            ff.gamechange(bot)
        }
    }, 1000);
}

//var dvv = require('./database.js')

console.log('Ready to Rock!')
bot.on('ready', () => {

    bot.guilds.forEach(async g => {
        if (!DB.get(g.id)) return serverSetup(g);
        await ff.normaliseGUILD(g,DB)

        g.members.forEach(async m => {
            if (!userDB.get(m.id)) return userSetup(m.user);
            await ff.normaliseUSER(m, userDB, DB)

        })
    })
bot.user.setStatus('online')

    // bot.user.setGame(`Flicky draws Silenyte stuff`, 'https://www.twitch.tv/LucasFlicky').then().catch();

//bot.user.setGame(`Neverwinter Nights`).then().catch();

async.parallel(bot.guilds.forEach(G => serverSetup(G)))

userSetup(bot.user)

let name = 'Pollux Core Reporter';

let tx = `All systems go! I am ready to rock, master!`;
let color = '#3ed844';

ff.sendSlack(name, tx, undefined, color)

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

function superDefine(target, param, val) {
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
    } //DB

var cd = function (argamassa, fx, timeout, respfn) {
    var onCooldown = false;
    return function () {
        if (!onCooldown) {
            fx.apply(argamassa, arguments);
            onCooldown = true;
            try{

            setTimeout(function () {
                onCooldown = false;
            }, timeout);
            }catch(err){
                onCooldown = false;
                console.log("HERE")
                console.error
            }

        } else {
            try {
                respfn()
            } catch (err) {}
        }
    }
}  //detatch

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
} //detatch


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

var serverSetup = function serverSetup(guild) {


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

        ff.normaliseGUILD(guild,DB)
    }

}

function userSetup(user) {

    if (!userDB.get(user.id)) {
        console.log('Setting Up Member:' + user.username)

        userDB.set(user.id, defaults.udefal)

        var uu = userDB.get(user.id)
        uu.name = user.username
        uu.ID = user.id
        userDB.set(user.id, uu)

    } else {
        ff.normaliseUSER(user, userDB, DB)
    }
} //DB

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
                if (!Smodules.modules[param[0]][param[1]]) {
                    console.log("CREATE")
                    Smodules.modules[param[0]][param[1]] = []
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

function commandFire(message, Server, Channel, Author) {
    message.botUser = bot;
    message.akairo = client;
    message.prefix = DB.get(Server.id).modules.PREFIX;

    let forbiddens = DB.get(Server.id).channels[Channel.id].modules.DISABLED

    let MDLE = deployer.checkModule(message)

    if (forbiddens.includes(MDLE)) {
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
var plzDrop = cd(console, ff.dropGoodies, 5000);
// ==============================================

bot.on("message", (message) => {

    //Set Them Up
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;


if(message.mentions.users.size+message.mentions.roles.size >= 5){
    message.delete()
    message.channel.sendMessage(":warning: SPAM PROTECTION TRIGGERED :warning:")
    Server.member(message.author).ban().then(e=>message.channel.sendMessage(message.author+" kicked for Mention Spam above 5")).catch(a=>message.channel.sendMessage(Server.owner+" could not kick "+message.author+" due to permission issues."))
}



    //---  LOGS     ---------------------------------------------------------
    if (Server && Server.name != "Discord Bots") {


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

        let args = message.content.toLowerCase().split(' ').slice(1)[0]
        if (message.guild.deadlock) {
            if (args == message.guild.deadlock) return;
        }


        //==-------------------------------------------
        // SIDE COMMANDS
try{


        fs.readFile("./core/collateral_triggers.json", 'utf8', (err, data) => {
            data = JSON.parse(data)

            if (data[MSG]) {
                let jet = require(`./core/sidecommands/${data[MSG]}.js`);
                try {
                    jet.run(bot, message, DB, defaults.gdfal)
                    return
                } catch (err) {
                    hook.sendMessage(err)
                    return
                }
            }
        });
}catch(e){}
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
                let goer = ff.randomize(0, max)
                return Channel.sendMessage(servdata.REACTIONS[MSG][goer])
            }
        } else {
            let D = DB.get(Server.id)
            D.modules.REACTIONS = {}
            DB.set(Server.id, D)
        }

        //--- END SIDE   ---------------------------------------------------------

        //  SETUPS
        serverSetup(Server);
        userSetup(Author);
        userSetup(Target);

        if(userDB.get(Author.id).name==undefined){
            superDefine(Author,"name",Author.username)
        }
        if(userDB.get(Author.id).ID==undefined){
            superDefine(Author,"ID",Author.username)
        }
        if(userDB.get(Author.id).modules.goodies>=999999){
            paramDefine(Author,"goodies",0)
            message.reply("Your rubies has been reset due to suspect of exploit")
            console.log("\n\n\n\n RUBY FRAUD RESET \n\n\n\n\n")
            bot.users.get("88120564400553984").sendMessage("RESET:"+Author+" :: "+Author.id+" "+Author.username)
        }


        //  ------

        gibexp(Author, 'exp', ff.randomize(1, 10)) // EXP GIVEAWAY



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

        Author.PLXpems = ff.updatePerms(Author, Server, DB)
        Target.PLXpems = ff.updatePerms(Target, Server, DB)

        // DONE WITH PERMS ---//

        //A NEW CHANNEL? --------------------------------------------
        if (DB.get(Server.id).channels[Channel.id] == undefined) {
            channelSetup(Channel, Server);
        }
        let defaultgreet = {
            hi: false,
            joinText: "Welcome to the Server %username%!",
            greetChan: ""
        }

        if (!DB.get(Server.id).modules.GREET || DB.get(Server.id).modules.GREET === undefined) {
            paramDefine(Server, "GREET", defaultgreet)
        }

        let defaultgreetB = {
            hi: false,
            joinText: "%username% has left us!",
            greetChan: ""
        }
        if (!DB.get(Server.id).modules.FWELL || DB.get(Server.id).modules.FWELL === undefined) {
            paramDefine(Server, "FWELL", defaultgreetB)
        }


        //TRY level shit
        //------------------------------------------------------------
        try {
            if (DB.get(Server.id).modules && !DB.get(Server.id).modules.DISABLED.includes("level")) {
                ff.updateEXP(Author, message, DB, userDB)
            } else if (DB.get(Server.id).modules && !DB.get(Server.id).channels[Channel.id].modules.DISABLED.includes("level")) {
                ff.updateEXP(Author, message, DB, userDB)
            }

        } catch (err) {
            serverSetup(Server) // maybe no server
        }

        //TRY gemdrop shit
        //------------------------------------------------------------
        try {

            if (DB.get(Server.id).modules && !DB.get(Server.id).modules.DISABLED.includes("drop")) {
                plzDrop(message,DB,userDB)
            } else if (!DB.get(Server.id).channels[Channel.id].modules.DISABLED.includes("drop")) {
                plzDrop(message,DB,userDB)
            }

        } catch (err) {
            serverSetup(Server)
        }

        //========================//

        //Wave 1
        if (Server && typeof (DB.get(Server.id).modules.LANGUAGE) !== 'undefined' && DB.get(Server.id).modules.LANGUAGE && DB.get(Server.id).modules.LANGUAGE !== '') {
            let langua = "en"
            if (Server.region === 'brazil') {
                langua = "dev"
            }
            message.lang = [DB.get(Server.id).modules.LANGUAGE, langua];
        } else {
            let langua = "en"
            if (Server.region === 'brazil') {
                langua = "dev"
            }
            paramDefine(Server, "LANGUAGE", langua)
        }


        //Wave 2 -- CHECK PREFIX
        if (Server && typeof (DB.get(Server.id).modules.PREFIX) !== 'undefined' && DB.get(Server.id).modules.PREFIX && DB.get(Server.id).modules.PREFIX !== '') {

            //-- START PREFIX
            if (message.content.startsWith(DB.get(Server.id).modules.PREFIX)) {

                commandFire(message, Server, Channel, Author)

            } else {

                let cleber = false
                if (cleber) {

                } else {

                        if (message.content.startsWith("pollux, ")&&message.author.id==="88120564400553984"){
                              let msg = message;
                            let M = message.content;
                            console.log(M)
                            msg.content = DB.get(Server.id).modules.PREFIX + "eval" + M.substr(M.indexOf(",") + 1)

                            console.log(msg.content)

                            //   console.log(msg.content)
                           return commandFire(msg, Server, Channel, Author)
                        }

     try {
                        var usr = message.mentions.users.first()
                        if (message.guild && usr.id == bot.user.id && !message.author.bot) {

                            let msg = message;
                            let M = message.content;
                            msg.content = DB.get(Server.id).modules.PREFIX + M.substr(M.indexOf(">") + 2)

                            //   console.log(msg.content)
                            commandFire(msg, Server, Channel, Author)

                        }

                    } catch (err) {}
                }

            }
        } else {
            //CHECK COMMANDS INSIDE PM
            if (message.content.startsWith(prefix)) {
                message.botUser = bot;
                message.prefix = prefix;
                deployer.commCheck(message);
            } else {

                deployer.commCheck(message);
            }
        }
    } else {
        console.log(message.content)
        message.reply("Sorry sweetie, don't send stuff for me here. I'll have DM support someday in the future. If you are here for help check http://pollux.fun/commands");
        return;
    }
})

// COMMANDS (MESSAGES)
//==-------------------------------------------

bot.on('reconnecting', () => {
    console.log("Reconnect".bgRed)

    let username = 'Pollux Core Reporter';
    let pretext = `SELF RESTART TRIGGERED! Gimme a second to still myself.`;
    let color = '#ffb249';

    ff.sendSlack(username, pretext, undefined, color)

});


bot.on('guildCreate', (guild) => {



    var PolluxS = bot.guilds.get("277391723322408960")
    var rad = PolluxS.channels.get("332025773521371137")

            var emb = new Discord.RichEmbed;

            emb.setThumbnail(guild.iconURL)
            emb.setDescription(`:inbox_tray: Added to **${guild.name}**`);
            emb.addField("Members",guild.members.size,false)
            emb.addField("Owner",guild.owner,true)
            emb.addField("Owner Tag",guild.owner.username+"#"+guild.owner.discriminator,true)
            emb.setColor("#255ec9");
            var ts = new Date
            emb.setTimestamp(ts)

            rad.sendEmbed(emb).catch()








    var greetings = greeting.own.replace(/\{\{server\}\}/g, guild.name)
    guild.owner.sendMessage(greetings)
    serverSetup(guild);
});
bot.on("guildDelete", (guild) => {




        var PolluxS = bot.guilds.get("277391723322408960")
    var rad = PolluxS.channels.get("332025773521371137")


            var emb = new Discord.RichEmbed;

            emb.setThumbnail(guild.iconURL)
            emb.setDescription(`:outbox_tray: Removed from **${guild.name}**`);
  emb.addField("Members",guild.members.size,false)
            emb.addField("Owner",guild.owner,true)
            emb.addField("Owner Tag",guild.owner.username+"#"+guild.owner.discriminator,true)
            emb.setColor("#c92525");
            var ts = new Date
            emb.setTimestamp(ts)

            rad.sendEmbed(emb).catch()


    DB.delete(guild.id)
});

bot.on('guildMemberAdd', (member) => {
    var Server = member.guild
var chanpoint=false;
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

            var id = member.id
            var emb = new Discord.RichEmbed;


            var joined = "joined the Server"


            emb.setDescription(`:inbox_tray: **${member.user.username+"#"+member.user.discriminator}** ${joined}`);

            emb.setColor("#25c9b0");
            var ts = new Date
            emb.setFooter("Join", member.user.avatarURL)
            emb.setTimestamp(ts)

            chanpoint.sendEmbed(emb).catch()

        }


    } catch (err) {
        console.log(err)
    }


    if (Server) {

        let defaultgreet = {
            hi: false,
            joinText: "Welcome to the Server %username%!",
            greetChan: ""
        }
try{

        if (!DB.get(Server.id).modules.GREET || DB.get(Server.id).modules.GREET === undefined) {
            paramDefine(Server, "GREET", defaultgreet)
        }
}catch(e){
    serverSetup(Server)
}



        if (typeof (DB.get(Server.id).modules.GREET.hi) !== 'undefined' && DB.get(Server.id).modules.GREET.joinText !== '' && DB.get(Server.id).modules.GREET.hi == true) {


            let channels = member.guild.channels.filter(c => {
                return (c.id === DB.get(Server.id).modules.GREET.greetChan)
            });
            let channel = channels.first();
            let content = DB.get(Server.id).modules.GREET.joinText.replace('%username%', member.user);
            content = content.replace('%server%', member.guild.name);
            try {
                channel.sendMessage(content).then();
            } catch (e) {}
        }



    }
})

bot.on('guildMemberRemove', (member) => {


    var Server = member.guild



var chanpoint=false;
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

            var id = member.id
            var emb = new Discord.RichEmbed;



            //var mm = multilang.getT();

            var left = "left the Server"
            emb.setDescription(`:outbox_tray: **${member.user.username+"#"+member.user.discriminator}** ${left}`);

            emb.setColor("#c92525");
            var ts = new Date
            emb.setFooter("Leave", member.user.avatarURL)
            emb.setTimestamp(ts)

            chanpoint.sendEmbed(emb).catch()

        }


    } catch (err) {
        console.log(err)
    }









    if (Server) {
        let defaultgreetB = {
            hi: false,
            joinText: "%username% has left us!",
            greetChan: ""
        }



        if (!DB.get(Server.id).modules.FWELL || DB.get(Server.id).modules.FWELL === undefined) {
            paramDefine(Server, "FWELL", defaultgreetB)
        }


        if (typeof (DB.get(Server.id).modules.FWELL.hi) !== 'undefined' && DB.get(Server.id).modules.FWELL.joinText !== '' && DB.get(Server.id).modules.FWELL.hi == true) {


            let channels = member.guild.channels.filter(c => {
                return (c.id === DB.get(Server.id).modules.FWELL.greetChan)
            });
            let channel = channels.first();
            let content = DB.get(Server.id).modules.FWELL.joinText.replace('%username%', member.user);
            content = content.replace('%server%', member.guild.name);
            try {
                channel.sendMessage(content);
            } catch (e) {}
        }



    }
})

bot.on('error', (err) => {
    if (!err    ) return;
let name = "Pollux Core Reporter"
let txb = "Minor error! Check console"
let tx = `
**${err}**


${err.stack}

`
let color =  '#ffdc49'

ff.sendSlack(name, txb, tx, color)

    hook.sendMessage(error.toString())
});

bot.on("channelCreate", channel=>{

    ff.logChannel(channel,"CREATED",DB)

})
bot.on("channelDelete", channel=>{

    ff.logChannel(channel,"DELETED",DB)

})

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise \n".red, "\n\n reason: ".red, reason.stack);


    ff.sendSlack("Promise Breaker","Promise Rejection: "+reason,reason.stack,"#ffcd25" )
});



//=======================================//
//      PROCESS EVENT HANDLER
//=======================================//



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

    ff.sendSlack(name, txb, tx, color)

});




module.exports = {
    userDB: userDB,
    DB: DB,
    serverSetup: serverSetup,
    userSetup: serverSetup,
    bot:bot
};
