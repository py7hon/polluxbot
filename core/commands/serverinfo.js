var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'dbx';

var init = function (message,userDB,DB) {


var G = message.guild

 message.reply(
    "```"+`
Server Info:

${DB.get(G.id).name}
${G.memberCount} Members
${G.channels.size} Channels

Owner: ${G.owner.displayName}

${DB.get(G.id).modules.DISABLED}
${DB.get(G.id).modules.PREFIX}
${DB.get(G.id).modules.LANGUAGE}
${DB.get(G.id).modules.GOODMOJI}
${DB.get(G.id).modules.GOODNAME}


`+"``` "+`${G.iconURL}`

 )

}




 module.exports = {
    pub:false,
    cmd: cmd,
    perms: 1,
    init: init,
    cat: 'bot'
};
