var gear = require("../gearbox.js");
var cmd = 'spam';

var init = function (message,userDB,DB) {
    var args = message.content.toLowerCase().split(' ').slice(1)[0]
 message.guild.deadlock = args
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
