var gear = require("../gearbox.js");
var cmd = 'spam';

var init = function (message,userDB,DB) {

 message.channel.sendFile("http://www.it-sicherheitsnews.de/wp-content/uploads/2014/11/spam.png")

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
