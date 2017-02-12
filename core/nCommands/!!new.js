var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'name';

var init = function (message, userDB, DB) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
if (Author.bot) return;
var Member = Server.member(Author);
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
var bot = message.botUser
var args = MSG.split(' ').slice(1)[1]
var LANG = message.lang;

//-------MAGIC----------------

};

module.exports = {cmd: cmd, perms: 0, init: init, cat: 'misc'};



       error3: mm('$.insuBet', {
            lngs: message.lang,
            number: 3
        }),

let GOODMOJI = ':gem:'
    let GOOD = 'Gems'
    if (Server.mods.GOODMOJI) {
        GOODMOJI = Server.mods.GOODMOJI
    }
    if (Server.mods.GOODNAME) {
        GOOD = Server.mods.GOODNAME
    }





















