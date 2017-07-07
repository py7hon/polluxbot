var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var fs = require('fs');
var cmd = 'speak or lang';

var init = function (message,userDB,DB) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
if (Author.bot) return;
var Member = Server.member(Author);
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
var bot = message.botUser
var args = MSG.split(' ').slice(1)[0]
var LANG = message.lang;

//-------MAGIC----------------

       var modPass = false


    var noperms     =   mm('CMD.moderationNeeded', {lngs:LANG})
    var noPermsMe   =   mm('CMD.unperm', {lngs:LANG})
    var justasec    =   mm('CMD.jas', {lngs:LANG})
    var lerror    =   mm('CMD.genericInvalid', {lngs:LANG})




   var modPass = gear.hasPerms(Member)

    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }

    let cmdd = message.content.split(' ');




            if (typeof (cmdd[1]) !== 'undefined') {
                var number = 0;
                try {
                    number = parseInt(cmdd[1]);
                } catch (e) {
                    return message.reply(lerror);
                }
                if (isNaN(number)) {
                    return message.reply(lerror);
                }
                if (number < 2) {
                    return message.reply(lerror +" Must be 2 or more").then(m=> {m.delete(15000);message.delete()});
                }
                if (number > 100) {
                    return message.reply(lerror +" Must be 100 or less").then(m=> {m.delete(15000);message.delete()});
                } else {
                   Channel.fetchMessages({before: message.id, limit: number}).then(mbk => {
                        Channel.bulkDelete(mbk).then(() => {




                           var burn = mm('CMD.incinerate', {lngs: LANG,amt: number,amtB: (number*2)})

                            message.reply(":fire:  "+burn).then(m=> {m.delete(15000);message.delete()});
                        }).catch(err => {
                            message.reply(lerror);

                        });
                    }).catch();
                }
            } else {
                message.reply(lerror);
            }

};
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 1,
    init: init,
    cat: 'mgmt'
};
