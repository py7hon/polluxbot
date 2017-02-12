
var cmd = 'say';

var init = function (message, userDB, DB) {
  message.delete()
 message.channel.sendMessage(message.content.substr(message.prefix.length+3))

}
module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'bot'
};
