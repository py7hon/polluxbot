
var cmd = 'invite';

var init = function (message,userDB,DB) {
  message.reply("Invite me to your Server using this: https://discordapp.com/oauth2/authorize?client_id=271394014358405121&scope=bot&permissions=2121661559")

}
module.exports = {
    pub:true,
    cmd: cmd,
    perms: 8,
    init: init,
    cat: 'bot'
};
