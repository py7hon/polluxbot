
const Discord = require("discord.js");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'rolerem';

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


            //--------------------------------------


            var On = gear.emoji("check")
            var Off = gear.emoji("xmark")

            var rolenotfound = mm('CMD.nosuchrole', {
                lngs: LANG
            });


            //--------------------------------------

            var noPermsMe = mm('CMD.unperm', {
                lngs: LANG
            })

            return fR(args, Server.member(Target))

            function fR(role, memb) {
                message.delete()
                var rolerem_confirm = On + mm('CMD.superRolermCom', {
                    lngs: LANG,
                    user: memb.displayName,
                    group: role
                });
                 var superRoleNope = On + mm('CMD.superRoleNope', {
                    lngs: LANG,
                    user: memb.displayName,
                    group: role
                });
                var a = memb.roles.find('name', role);
               // message.reply(role)
                if (a == undefined) return message.reply(superRoleNope);
                memb.addRole(a).then(a => message.channel.sendMessage(rolerem_confirm)).then(e => e.delete(120000)).catch(e => message.channel.sendMessage(noPermsMe))
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
