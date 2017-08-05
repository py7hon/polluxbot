
var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'enable';

var init = function (message,userDB,DB) {

    console.log('fff')
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------

    //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
     gear.usage(cmd,message);
}
//------------

   var On      = gear.emoji("check")
var Off     = gear.emoji("xmark")

    if (message.channel.type === 'dm') {
        message.reply(mm('CMD.noDM', {
            lngs: LANG
        }));
        return;
    }

    if (message.content.length < 10) {
        message.reply(mm('CMD.chooseAmod', {
            lngs: LANG
        }));
        return;
    }

 var modPass = gear.hasPerms(Member,DB)


    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }




    function pp(o, p) {
        return o[p];
    }

    var module = args[0].toUpperCase()
    if (args[1]) {
        var scope = args[1].toLowerCase()
    }
    var sc = ''
    switch (scope) {
        case 's':
        case 'server':
        case 'guild':
        case 'g':
        case 'global':
            sc = 'S'
            break;
        case 'c':
        case 'channel':
        case 'chnl':
            sc = 'C'
            break;
        default:
            sc = 'C'
            break;
    }


    var disaMS = On + mm('CMD.enabledSer', {
        lngs: LANG,
        module: module
    })
    var disaMC = On + mm('CMD.enabledChn', {
        lngs: LANG,
        module: module,
        channel: Channel.name
    })
    var disaCS = On + mm('CMD.enabledComSer', {
        lngs: LANG,
        command: module
    })
    var disaCC = On + mm('CMD.enabledComChn', {
        lngs: LANG,
        command: module,
        channel: Channel.name
    })



    if (sc === 'S') {
        Server.channels.forEach(e=>{

        if (module in DB.get(e.guild.id).channels[e.id].modules) {
            gear.paramDefine(e, module, true)
            message.reply(disaMS)
        } else {
            imComm(message, sc)
        }

        })
    } else {

        if (module in DB.get(message.guild.id).channels[message.channel.id].modules) {
            gear.paramDefine(Channel, module, true)
            message.reply(disaMC)
        } else {
            imComm(message, sc)
        }
    }



    function imComm(msg, scope) {
        console.log('immcomm')
        try {
            let command = msg.content.substr(msg.prefix.length).split(' ')[1];
            let commandFile = require(`./${command}.js`);
            if (scope === 'S') {
                                     Server.channels.forEach(e=>{

   gear.paramRemove(e, 'DISABLED', command)

        })
                gear.paramRemove(Server, 'DISABLED', command)
                message.reply(disaCS)

            }
            if (scope === 'C') {
                gear.paramRemove(Channel, 'DISABLED', command)
                message.reply(disaCC)
            }
        } catch (err) {
            console.log((err.stack).red)
        }
    }


}
 module.exports = {
    pub: true,
    cmd: cmd,
    perms: 2,
    init: init,
    cat: 'mod'
};
