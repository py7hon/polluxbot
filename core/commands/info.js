
var cmd = 'stats';

var init = function (message,userDB,DB) {

   var kek = require("./stats.js")
    return kek.init(message,userDB,DB)

}
 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'info'};
