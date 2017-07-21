var gear = require("../gearbox.js");
var cmd = 'say';

var init = function (message,userDB,DB) {
try{
    var Server = message.guild
//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
var lista = ".\n"
    for (i=0;i<Server.playlist.length;i++){
        if(i>10)return;
        lista += Server.playlist[i][1]+"\n"
    }

 message.channel.send(lista)
}catch(e){console.log(e)}
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
