var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'personalTxt';

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

        var userData = userDB[Author.id]
        var persotxt = MSG.substr((message.prefix + cmd).length +1)
        gear.paramDefine(Author,'persotext',persotxt)
        userData.persotext = persotxt
        message.reply(mm('profile.persotexUpdate', {
            lngs:LANG,
            pstext: persotxt,
            prefix: message.prefix
        }))

    }

module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'profile'
};
