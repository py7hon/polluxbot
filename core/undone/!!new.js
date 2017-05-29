var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'name';

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

};

 module.exports = {
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};



error3: mm('$.insuBet', {
        lngs: message.lang,
        number: 3
    }),



    let GOODMOJI = ':gem:'
let GOOD = 'Gem'
if (DB[Server.id].modules) {
    GOODMOJI = DB[Server.id].modules
}
if (DB[Server.id].modules.GOODNAME) {
    GOOD = DB[Server.id].modules.GOODNAME
}


if (modPass) {
    Server.defaultChannel.sendMessage(`:mega:  **Anúncio**
` + MSG.substr(10))
} else {
    message.reply("Somente Admins e Mods podem criar anúncios");
}};
