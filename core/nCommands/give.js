var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'give';

var init = function (message, userDB, DB) {
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
    var userData = Author.mods
    var tgtData = Target.mods



    let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (Server.mods.GOODMOJI) {
        GOODMOJI = Server.mods.GOODMOJI
    }
    if (Server.mods.GOODNAME) {
        GOOD = Server.mods.GOODNAME
    }


    if (args.lenght < 2) {
        message.reply("Ordem inválida")
        return;
    }
    var donate = parseInt(args[0])
    if (gear.checkGoods(donate, Author) == true) {

        // message.guild.defaultChannel.sendMessage()
        gear.paramIncrement(Author, 'goodies', -donate)
        gear.paramIncrement(Author, 'expenses.trade', donate)
        gear.paramIncrement(Target, 'goodies', donate)
        gear.paramIncrement(Target, 'earnings.trade', donate)

        message.channel.sendMessage( mm('$.giveGoods' , {lngs:LANG, donate:donate, emoji:GOODMOJI, target:Target.username,author:Author.username })).then(function (c) {
            message.delete(5000)
        })
        gear.writePoints(points, caller)
    } else {
        message.reply(mm('$.noFundsGeneric',{lngs:LANG,goods:GOOD}))
        return;
    }
}

module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'misc'
};
