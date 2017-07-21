var gear = require("../gearbox.js");
var cmd = 'say';

var init = function (message,userDB,DB) {
var Server = message.guild
//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
try{
 message.channel.send(Server.playlist[0][1])
}catch(e){console.log(e)}
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
