var cmd = 'serverinfo';

var init = function (message,userDB,DB) {

    if (message.content == message.prefix+"servers") return;

   var kek = require("./serverinfo.js")
    return kek.init(message,userDB,DB)

}
 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'info'};
