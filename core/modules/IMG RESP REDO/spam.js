var gear = require("../../gearbox.js");
var cmd = 'spam';

var init = function (message,userDB,DB) {
try{
//message.channel.send("test")
 message.channel.send({files:[{attachment:"http://www.it-sicherheitsnews.de/wp-content/uploads/2014/11/spam.png",name:"spam.png"}]})

}catch(e){gear.hook.send(e.error)}
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
