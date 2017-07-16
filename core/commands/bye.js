var paths = require("../paths.js");

var gear = require("../gearbox.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'bye';



var init = function (message, userDB, DB) {
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

    var modPass = gear.hasPerms(Member,DB)

    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }


    let defaultfare = {
        hi: false,
        joinText: "Welcome to the Server %username%!",
        greetChan: {}
    }

    if (!DB.get(Server.id).modules.FWELL || DB.get(Server.id).modules.FWELL === undefined) {
        gear.paramDefine(Server, "FWELL", defaultfare)
    }

    var output = "x"

    var v = {

        outON: mm('greet.byeON', {
            lngs: LANG
        }),
        outOFF: mm('greet.byeOFF', {
            lngs: LANG
        }),


        outCX: mm('greet.outChan', {
                lngs: LANG,
                outtex: output
            }),
        tellMsg: mm('greet.tellmeMSG', {
            lngs: LANG
        }),
        tellChn: mm('greet.tellmeCHN', {
            lngs: LANG
        })
    }




    if (args.length >= 2 && args[0] === "msg") {
        if (args.length == 2) {
            return Channel.send(v.tellMsg);
        }


        let offset = MSG.indexOf("msg") + 3
        gear.paramDefine(Server, "FWELL.joinText", MSG.substr(offset))
         v.outTX = mm('greet.outTex', {
            lngs: LANG,
            wtxt: MSG.substr(offset)
        })
        return Channel.send(v.outTX);

    }
    if (args.length >= 2 && args[0] === "channel") {
        if (args.length == 2) {
            return Channel.send(v.tellChn);
        }
        let offset = MSG.indexOf("channel") + 7
        gear.paramDefine(Server, "FWELL.greetChan", "")
        gear.paramDefine(Server, "FWELL.greetChan", message.channel.id)
        return Channel.send(v.outCX);
    }



    if (DB.get(Server.id).modules.FWELL.hi === true) {
        gear.paramDefine(Server, "FWELL.hi", false)
        return Channel.send(v.outOFF);

    } else {

        gear.paramDefine(Server, "FWELL.hi", true)
        gear.paramDefine(Server, "FWELL.greetChan", "")
        gear.paramDefine(Server, "FWELL.greetChan", message.channel.id)
        return Channel.send(v.outON);
    }





}
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'server'
};
