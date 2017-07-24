
const polx = require("../pollux.js")
var defaults = require("../utils/defaults.js")  // Database Defaults


module.exports = {
    run:  function run(gear,DB,userDB,bot, message) {



        function serverSetup(guild) {


    if (!DB.get(guild.id)||DB.get(guild.id)==undefined) {

        console.log(('          --- - - - - = = = = = = Setting Up Guild:'.yellow + guild.name).bgBlue)

        DB.set(guild.id, defaults.gdfal)

        var gg = DB.get(guild.id);
        gg.name = guild.name;
        gg.ID = guild.id;
        if (guild.region === 'brazil') gg.modules.LANGUAGE = "dev";
        DB.set(guild.id, gg);

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

//COOLDOWNS-----------------------------------------------------------//
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
}     //
//-------------------------------------------------------------------//

var gibexp = cd(console, gear.paramIncrement, 5000);
var plzDrop = cd(console,  gear.dropGoodies, 5000);

    //Set Them Up
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;

if(message.mentions.users.size+message.mentions.roles.size >= 6){
    return;
    message.delete().catch(e=>{
        console.log(e)
        console.log("POLLUX 415".red)
    })
    message.channel.send(":warning: SPAM PROTECTION TRIGGERED :warning:")
    Server.member(message.author).ban().then(e=>message.channel.send(message.author+" kicked for Mention Spam above 5")).catch(a=>message.channel.send(Server.owner+" could not kick "+message.author+" due to permission issues."))
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
                   // hook.send(err)
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
                //hook.send(err)
                return
            }
        }
        console.log(Server.name)

    if (DB.get(Server.id)==undefined)serverSetup(Server);

        if (DB.get(Server.id).modules.REACTIONS != undefined) {
            let servdata = DB.get(Server.id).modules
            if (servdata.REACTIONS[MSG]) {
                let max = servdata.REACTIONS[MSG].length
                let goer = gear.randomize(0, max)
                return Channel.send(servdata.REACTIONS[MSG][goer])
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
        try{
        if(userDB.get(Author.id).name==undefined){
            superDefine(Author,"name",Author.username)
        }
        if(userDB.get(Author.id).ID==undefined){
            superDefine(Author,"ID",Author.username)
        }
        if(userDB.get(Author.id).modules.goodies>=999999){
            gear.paramDefine(Author,"goodies",0)
            message.reply("Your rubies has been reset due to suspect of exploit")
            console.log("\n\n\n\n RUBY FRAUD RESET \n\n\n\n\n")
            bot.users.get("88120564400553984").send("RESET:"+Author+" :: "+Author.id+" "+Author.username)
        }
        }catch(e){}
        //  ------
        gibexp(Author, 'exp', gear.randomize(1, 10)) // EXP GIVEAWAY

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

        Author.PLXpems = gear.updatePerms(Author, Server, DB)
        Target.PLXpems = gear.updatePerms(Target, Server, DB)

        // DONE WITH PERMS ---//

        //A NEW CHANNEL? --------------------------------------------
        if (DB.get(Server.id).channels[Channel.id] == undefined)channelSetup(Channel, Server);

        let defaultgreet = {
            hi: false,
            joinText: "Welcome to the Server %username%!",
            greetChan: ""
        }

        if (!DB.get(Server.id).modules.GREET || DB.get(Server.id).modules.GREET === undefined) {
            gear.paramDefine(Server, "GREET", defaultgreet)
        }

        let defaultgreetB = {
            hi: false,
            joinText: "%username% has left us!",
            greetChan: ""
        }
        if (!DB.get(Server.id).modules.FWELL || DB.get(Server.id).modules.FWELL === undefined) {
            gear.paramDefine(Server, "FWELL", defaultgreetB)
        }


        //TRY level shit
        //------------------------------------------------------------
        try {
            if (DB.get(Server.id).modules && !DB.get(Server.id).modules.DISABLED.includes("level")) {
                gear.updateEXP(Author, message, DB, userDB)
            } else if (DB.get(Server.id).modules && !DB.get(Server.id).channels[Channel.id].modules.DISABLED.includes("level")) {
                gear.updateEXP(Author, message, DB, userDB)
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
            console.log(err)
            serverSetup(Server)
        }

                   //==========================//
//-----------------//  ACTUAL COMMAND PROCESS  //~~//~~//~~//~~//~~//~~//~~||
                   //==========================//

        //Wave 1 --> CHECK LOCALE

        if (Server && typeof (DB.get(Server.id).modules.LANGUAGE) !== 'undefined' && DB.get(Server.id).modules.LANGUAGE && DB.get(Server.id).modules.LANGUAGE !== '') {
            let langua = "en"
            if (Server.region === 'brazil') langua = "dev";
            message.lang = [DB.get(Server.id).modules.LANGUAGE, langua];
        } else {
            let langua = "en"
            if (Server.region === 'brazil') langua = "dev";
            gear.paramDefine(Server, "LANGUAGE", langua)
        }

        //Wave 2 -- CHECK PREFIX
        if (Server && typeof (DB.get(Server.id).modules.PREFIX) !== 'undefined' && DB.get(Server.id).modules.PREFIX && DB.get(Server.id).modules.PREFIX !== '') {

            //-- GET & CHECK PREFIX
            if (message.content.startsWith(DB.get(Server.id).modules.PREFIX)||
                message.content.startsWith("p!")) {
                console.log(message.content)
                if (message.content.startsWith("p!")){
                    message.prefix = "p!";
                }
                polx.commandFire(message, Server, Channel, Author)

            } else {

                let cleber = false
                if (cleber) {
                    //cleverbot someday
                } else {

                        if (message.content.startsWith("pollux, ")&&message.author.id==="88120564400553984"){
                              let msg = message;
                            let M = message.content;
                            console.log(M)
                            msg.content = DB.get(Server.id).modules.PREFIX + "eval" + M.substr(M.indexOf(",") + 1)
                            console.log(msg.content)
                           return polx.commandFire(msg, Server, Channel, Author)
                        }
                        try {
                        var usr = message.mentions.users.first()
                        if (message.guild && usr.id == bot.user.id && !message.author.bot) {
                            let msg = message;
                            let M = message.content;
                            msg.content = DB.get(Server.id).modules.PREFIX + M.substr(M.indexOf(">") + 2)
                            polx.commandFire(msg, Server, Channel, Author)
                        }
                    } catch (err) {}
                }
            }
        } else {
            //CHECK COMMANDS INSIDE PM
            if (message.content.startsWith(prefix)) {
                message.botUser = bot;
                message.content.startsWith("p!") ? message.prefix = "p!" : message.prefix = prefix;

            } else {

            }
        }
    } else {
        console.log(message.content)
        //PMpolx.commandFire(message)
        message.reply("Sorry sweetie, don't send stuff for me here. I'll have DM support someday in the future. If you are here for help check http://pollux.fun/commands");
        return;
    }
    }
}
