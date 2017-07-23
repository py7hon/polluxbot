var gear = require("../gearbox.js");
var cmd = 'say';

var init =  function (message,userDB,DB) {

try{



    if (message.guild.voiceConnection) {
  gear.superDefine(Server, "playlist", [])
    return message.guild.voiceConnection.disconnect();
  }




}catch(e){gear.hook.send(e.error)}
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
