
const Discord = require("discord.js");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'logs';

var init = function (message, userDB, DB) {


    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.roles.first();
    var MSG = message.content;
    var bot = message.botUser
    var prefix = message.prefix

    var LANG = message.lang;





//HELP TRIGGER
let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.length == (message.prefix + cmd).length || MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
    return gear.usage(cmd,message,"mod")
}
//------------



    message.delete(8000);

    var modPass = false

    try {
        var modPass = gear.hasPerms(Member,DB);
    } catch (err) {
        console.log(err)
    }
    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }



var LG = mm("logs.logChan",{lngs:LANG})
var MD = mm("logs.modLogs",{lngs:LANG})
var AC = mm("logs.actLogs",{lngs:LANG})
var AV = mm("logs.advLogs",{lngs:LANG})
var failure = mm("logs.failure",{lngs:LANG})


    var argument = MSG.substr((message.prefix + cmd).length + 1)
    var destination = ["LOGCHANNEL", "MODLOG", "ACTLOG", "ADVLOG"]
    var friendlYdestination = [ LG,MD,AC,AV]

    if (MSG.startsWith(prefix + cmd + " mod")) {
        var argument = MSG.substr((prefix + cmd + " mod").length + 1)
        var destination = ["MODLOG"]
         var friendlYdestination = [MD]
    }
    if (MSG.startsWith(prefix + cmd + " adv")) {
        var argument = MSG.substr((prefix + cmd + " adv").length + 1)
        var destination = ["ADVLOG"]
         var friendlYdestination = [AV]
    }
    if (MSG.startsWith(prefix + cmd + " activity")) {
        var argument = MSG.substr((prefix + cmd + " activity").length + 1)
        var destination = ["ACTLOG"]
         var friendlYdestination = [AC]
    }






    //-------MAGIC----------------




if (MSG.includes("del")){

        for (var i = 0; i < destination.length; i++) {

console.log(destination[i])
    let    dest = destination[i]
    let    destA = friendlYdestination[i]
        var errored = false;
        Server.channels.get(chan).overwritePermissions(bot.user, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        }).then(f => {

           message.channel.send(gear.emoji("check") + mm('logs.successDelete', {
                lngs: LANG,
                channel: Server.channels.get(chan),
                CHNTYPE: destA
            }) ).then(m => m.delete(25000)).catch()
               gear.paramDefine(Server, dest, "")
        }).catch(e => {
            message.reply(mm('CMD.unpermB', {
                lngs: LANG
            })).catch(console.error);

        })


    }




    return
}




    var chan;
    if (message.mentions.channels.size === 0) {

        if (argument.length > 1) {
            if (Server.channels.exists("name", argument)) {
                chan = Server.channels.find("name", argument).id

            } else {
                return message.reply(mm('CMD.cantFindChannel', {
                    lngs: LANG,
                    role: argument
                }))
            }

        } else {
            return message.reply(mm('CMD.noChannelGiven', {
                lngs: LANG,
                role: argument
            }))
        }

    } else {
        chan = message.mentions.channels.first().id
    }




    for (var i = 0; i < destination.length; i++) {

console.log(destination[i])
    let    dest = destination[i]
    let    destA = friendlYdestination[i]
        var errored = false;
        Server.channels.get(chan).overwritePermissions(bot.user, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        }).then(f => {

            message.channel.send(gear.emoji("check") + mm('logs.success', {
                lngs: LANG,
                channel: Server.channels.get(chan),
                CHNTYPE: destA
            }) ).then(m => m.delete(25000)).catch()
            gear.paramDefine(Server, dest, chan)
        }).catch(e => {
            message.reply(mm('CMD.unpermB', {
                lngs: LANG
            })).catch(console.error);
            errored = true;
        })




    }





}




module.exports = {
    pub: false,
    cmd: cmd,
    perms: 2,
    init: init,
    cat: 'mod'
};
