
var gear = require("../../gearbox.js");
var cmd = 'say';

var init = function (message,userDB,DB) {
var Server = message.guild
//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
try{

    Server.playlist = DB.get(Server.id).playlist

    let emb = new gear.Discord.RichEmbed
    emb.setDescription(gear.emoji("play")+" Now Playing: **"+Server.playlist[0][1]+"**")
    emb.setColor("#fbd796")
    emb.setFooter(Server.playlist[0][2])
    message.channel.send({embed:emb})
}catch(e){gear.hook.send(e.error)}
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'music'
};
