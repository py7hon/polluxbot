
const Discord = require("discord.js");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'roleadd';

var init = function (message, userDB, DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(2).join(" ")


    var LANG = message.lang;
    try {
        var modPass = gear.hasPerms(Member,DB)

        if (!modPass) {
            return message.reply(mm('CMD.moderationNeeded', {
                lngs: LANG
            })).catch(console.error);
        }


        //-------MAGIC----------------

        Target = Server.member(Target)

        if (MSG.split(" ")[2] != undefined && !isNaN(MSG.split(" ")[2])) {

            var time = Number(MSG.split(" ")[2])
            var timeTx = MSG.split(" ")[2] + " minutes."
        } else {
            var time = undefined
            var timeTx = "Indetermined Time"
        }




        var MUTED = "MUTED"
        var wasMUTED = "was Muted"
        var TIME = "Time"
        var UNMUTE = "UNMUTED"
        var wasAUTOUNMUTE = "Mute has Timed Out"
        var noperms = mm('CMD.moderationNeeded', {
            lngs: LANG
        })

        var RESPO = mm('dict.responsible', {
            lngs: LANG
        })

        var noPermsMe = mm('CMD.unperm', {
            lngs: LANG
        })


        // Create a new role with data
        var muteRole = DB.get(Server.id).modules.MUTEROLE;
        if (muteRole == undefined && !Server.roles.exists("name", "POLLUX-MUTE")) {

            Server.createRole({
                    name: 'POLLUX-MUTE',
                    color: '000000',

                })
                .then(role => {
                    console.log(`Created role ${role}`)


                    Server.channels.forEach(chn => {
                        chn.overwritePermissions(role, {
                            'SEND_MESSAGES': false
                        })
                    })

                    Target.addRole(role)

                    roleout(time, role)
                    logThis(time,timeTx)
                    return message.channel.sendMessage(`**${Target.displayName}** was MUTED for ${timeTx}`)

                }).catch(console.error)



        } else if (Server.roles.exists("name", "POLLUX-MUTE")) {
            let role = Server.roles.find("name", "POLLUX-MUTE")
            Target.addRole(role)

            roleout(time, role)
            logThis(time,timeTx)
            return message.channel.sendMessage(`**${Target.displayName}** was MUTED for ${timeTx}`)

        } else if (Server.roles.has(muteRole)) {

            Target.addRole(Server.roles.get(muteRole))

            roleout(time, muteRole)
            logThis(time,timeTx)
            return message.channel.sendMessage(`**${Target.displayName}** was MUTED for ${timeTx}`)

        }


        function roleout(tm, role) {
            if (tm == undefined) return false;
            return setTimeout(f => {
                Target.removeRole(role)
            }, tm*60000)

        }


        function logThis(time,timeTx) {


            let logchan = DB.get(Server.id).modules.LOGCHANNEL
            let advchan = DB.get(Server.id).modules.ADVLOG
            let actchan = DB.get(Server.id).modules.ACTLOG
            let modchan = DB.get(Server.id).modules.MODLOG

            if (logchan && Server.channels.has(logchan)) {
                chanpoint = Server.channels.get(logchan)
            }
            if (modchan && Server.channels.has(modchan)) {
                chanpoint = Server.channels.get(modchan)
            }


            if (chanpoint) {


                var id = Target.user.id
                var mess = message
                var emb = new Discord.RichEmbed;

                emb.setThumbnail(Target.user.avatarURL)
                emb.setTitle(":mute: " + MUTED);
                emb.setDescription(`**${Target.user.username+"#"+Target.user.discriminator}** ${wasMUTED}`);
                //emb.addField("Channel",mess.channel,true)
                emb.addField(TIME, timeTx, true)
                emb.addField(RESPO, Author, true)
                //emb.addField("Message",mess.content,true)
                emb.setColor("#102af5");
                var ts = new Date
                emb.setFooter("Mute", Target.user.avatarURL)
                emb.setTimestamp(ts)

                chanpoint.sendEmbed(emb).catch()


                var RevokeEmb = new Discord.RichEmbed;

                RevokeEmb.setThumbnail(Target.user.avatarURL)
                RevokeEmb.setTitle(":mute: " + UNMUTE);
                RevokeEmb.setDescription(`**${Target.user.username+"#"+Target.user.discriminator}** ${wasAUTOUNMUTE}`);
                RevokeEmb.addField(RESPO, bot.user, true)
                RevokeEmb.setColor("#102af5");
                var ts = new Date
                RevokeEmb.setFooter("Unmute", Target.user.avatarURL)
                RevokeEmb.setTimestamp(ts)

                if (time && typeof time == "number") {

                    setTimeout(f => {
                        chanpoint.sendEmbed(RevokeEmb).catch()
                    }, time*60000)
                }


            }


        }









    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    pub: false,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'info'
};
