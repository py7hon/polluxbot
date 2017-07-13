var ff = require("../functionfest.js");
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





    message.delete(8000);

    var modPass = false

    try {
        var modPass = ff.hasPerms(Member,DB);
    } catch (err) {
        console.log(err)
    }
    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }





    var argument = MSG.substr((message.prefix + cmd).length + 1)
    var destination = ["LOGCHANNEL", "MODLOG", "ACTLOG", "ADVLOG"]

    if (MSG.startsWith(prefix + cmd + " mod")) {
        var argument = MSG.substr((prefix + cmd + " mod").length + 1)
        var destination = ["MODLOG"]
    }
    if (MSG.startsWith(prefix + cmd + " adv")) {
        var argument = MSG.substr((prefix + cmd + " adv").length + 1)
        var destination = ["ADVLOG"]
    }
    if (MSG.startsWith(prefix + cmd + " activity")) {
        var argument = MSG.substr((prefix + cmd + " activity").length + 1)
        var destination = ["ACTLOG"]
    }






    //-------MAGIC----------------









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
        var errored = false;
        Server.channels.get(chan).overwritePermissions(bot.user, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        }).then(f => {

            message.channel.sendMessage(ff.emoji("check") + " Successfully defined `" + dest + "` as " + Server.channels.get(chan)).then(m => m.delete(5000)).catch()
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
