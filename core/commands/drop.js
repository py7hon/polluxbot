var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');

var mm = locale.getT();

var cmd = 'drop';

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

    //-------MAGIC----------------
//HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}
//------------
    var userData = userDB.get(Author.id).modules

    var emojya = gear.emoji("ruby")
    let GOODMOJI = emojya
    let GOOD = 'Ruby'
    if (DB.get(Server.id).modules.GOODMOJI) {
        GOODMOJI = DB.get(Server.id).modules.GOODMOJI
    }
    if (DB.get(Server.id).modules.GOODNAME) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }

    var dropAmy = parseInt(args[0]) || 1

    console.log("------------DROP by" + Author)
    // message.guild.defaultChannel.send()
    if (userData.goodies >= dropAmy) {

        gear.paramIncrement(Author, 'goodies', -dropAmy)
        gear.paramIncrement(Author, 'expenses.drops', dropAmy)
        message.channel.send(mm('$.userDrop', {
            lngs: LANG,
            amt: dropAmy,
            emoji: GOODMOJI,
            good: GOOD,
            user: Author.username,
            prefix: message.prefix
        }).replace(/\&lt;/g, "<").replace(/\&gt;/g, ">"),{files:[paths.BUILD + 'ruby.png']}).then(function (r) {


            if (isNaN(Channel.DROPSLY)) {
                Channel.DROPSLY = dropAmy
            } else {
                Channel.DROPSLY += dropAmy
            }
            message.delete(1000)


            return new Promise(async resolve => {

                var oldDropsly = Channel.DROPSLY
                const responses = await Channel.awaitMessages(msg2 =>
                    msg2.content === '+pick', {
                        maxMatches: 1
                    }
                ).catch("DROP.JS 67 -- ERROR");
                if (responses.size === 0) {} else {
                    if (oldDropsly > Channel.DROPSLY) {

                        return resolve(true);
                    }

                    let Picker = responses.first().author


                    console.log("----------- SUCCESSFUL PICK by" + Picker.username)
                    message.channel.send(mm('$.pick', {
                        lngs: LANG,
                        good: GOOD,
                        user: Picker.username,
                        count: Channel.DROPSLY,
                        emoji: ""
                    }) + " " + emojya).then(function (c) {

                        c.delete(500000)
                        r.delete(0)
                    }).catch();

                    gear.paramIncrement(Picker, 'goodies', Channel.DROPSLY)
                    gear.paramIncrement(Picker, 'earnings.drops', Channel.DROPSLY)
                    Channel.DROPSLY = 0


                    return resolve(true);

                }
                return resolve(true);
            })

        }).catch()

    } else {
        message.reply(mm('$.cantDrop', {
            lngs: LANG,
            goods: GOOD
        })).catch();
    }

}

module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
}
