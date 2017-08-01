var gear = require("../../gearbox.js");
var cmd = 'say';

var init = function (message,userDB,DB) {

//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');

  message.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})
 message.channel.send(message.content.substr(message.prefix.length+3))

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
