var gear = require("../../gearbox.js");
var cmd = 'say';

var init = function (message,userDB,DB) {
try{


    var Server = message.guild

        Server.playlist = DB.get(Server.id).playlist
      console.log(Server.playlist)

//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
var lista = ""
    for (i=0;i<Server.playlist.length&&i<10;i++){
        if(i==0) lista += ":arrow_forward:  Current: **"+Server.playlist[i][1]+"** >> `"+Server.playlist[i][2]+"`\n\n**Coming Next:**\n";
        else lista += ":small_orange_diamond: `"+Server.playlist[i][2]+" ::  `"+Server.playlist[i][1]+" \n";
        if(i==9) lista += "\n*And "+(Server.playlist.length-9)+" more*..."
    }

 message.channel.send(lista)
}catch(e){gear.hook.send(e.error)}
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
