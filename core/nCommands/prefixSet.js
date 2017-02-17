const fs = require("fs");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'prefixSet';

var init = function (message,userDB,DB) {
var args = message.content.split(' ').slice(1)
    var Server = message.guild;
    var LANG = message.lang;
    var bot = message.botUser

    gear.paramDefine(Server, 'PREFIX', args[0].toString());
    Server.mods.PREFIX =  args[0].toString();
    message.reply(mm('CMD.prefixChng', {
        lngs: LANG,
        prefix: Server.mods.PREFIX
    }));
}

module.exports = {
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'master'
};
