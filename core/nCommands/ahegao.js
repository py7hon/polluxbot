var cmd = 'ahegao';
var gear = require("../gearbox.js");
var paths = require("../paths.js");

var init = function (message) {

    var rand = gear.randomize(1,7)

    message.channel.sendFile(paths.BUILD+"ahegao/"+rand+".jpg")

};

 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'misc'};


