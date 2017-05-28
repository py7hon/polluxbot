var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'credits';

var init = function (message,userDB,DB) {
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


    let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (Server.mods.GOODMOJI) {
        GOODMOJI = Server.mods.GOODMOJI
    }
    if (Server.mods.GOODNAME) {
        GOOD = Server.mods.GOODNAME
    }


    var vocab = {
        c1: mm("$.cash10", {
            lngs: LANG
        }),
        c2: mm("$.cash100", {
            lngs: LANG
        }),
        c3: mm("$.cash500", {
            lngs: LANG
        }),
        c4: mm("$.cash1000", {
            lngs: LANG
        }),
        c5: mm("$.cash5000", {
            lngs: LANG
        }),
        c6: mm("$.cash10000", {
            lngs: LANG
        }),
        c7: mm("$.cashInfinite", {
            lngs: LANG
        }),
        heHas: mm("$.hasAmount", {
            lngs: LANG,
            goodname: GOOD,
            goods: Target.mods.goodies
        }),
        youHave: mm("$.youAmount", {
            lngs: LANG,
            goodname: GOOD,
            goods: Author.mods.goodies
        })

    }
    vocab.c1

    if (message.mentions.users.size === 0) {
        var r = Target.mods.goodies
        var fam = ''
        switch (true) {
            case (r < 10):
                fam = vocab.c1
                break;
            case (r < 100):
                fam = vocab.c2
                break;
            case (r < 500):
                fam = vocab.c3
                break;
            case (r < 1000):
                fam = vocab.c4
                break;
            case (r < 5000):
                fam = vocab.c5
                break;
            case (r < 10000):
                fam = vocab.c6
                break;
            case (r > 10000):
                fam = vocab.c7
                break;

        }
        return message.reply(vocab.youHave + fam)

    }

    return message.channel.sendMessage(vocab.heHas)
}

module.exports = {
    pub:false,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: '$'
};
