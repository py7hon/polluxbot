var gear = require("../gearbox.js");
var cmd = 'spam';

var init = function (message,userDB,DB) {

 message.channel.sendFile("https://cdn.discordapp.com/attachments/332017756016738314/332262548063911936/raid-multi-base-agua.png")

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
