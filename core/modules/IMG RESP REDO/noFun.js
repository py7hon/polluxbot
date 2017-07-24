var gear = require("../../gearbox.js");
var cmd = 'spam';

var init = function (message,userDB,DB) {

 message.channel.send({files:["http://i3.kym-cdn.com/photos/images/facebook/000/731/143/3e3.jpg"]})

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
