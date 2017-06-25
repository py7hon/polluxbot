
var cmd = 'invite';

var init = function (message,userDB,DB) {
  message.reply("Invite me to your Server using this: https://goo.gl/info/qkGqqU")

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 8,
    init: init,
    cat: 'bot'
};
