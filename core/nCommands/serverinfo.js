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

${DB[G.id].name}
${G.memberCount} Members
${G.channels.size} Channels

Owner: ${G.owner.displayName}

${DB[G.id].modules.DISABLED}
${DB[G.id].modules.PREFIX}
${DB[G.id].modules.LANGUAGE}
${DB[G.id].modules.GOODMOJI}
${DB[G.id].modules.GOODNAME}


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
