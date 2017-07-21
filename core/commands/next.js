var gear = require("../gearbox.js");
var cmd = 'say';

var init = async function (message,userDB,DB) {

try{
const yt = require('ytdl-core');
    var connection = message.guild.voiceConnection ||await voiceChannel.join();
    if (message.guild.voiceConnection.dispatcher){
  message.guild.voiceConnection.dispatcher.on('end', async() => {
                    if (  message.guild.playlist.length==1) {
                        let stream = yt(  message.guild.playlist[0][0], {
                            audioonly: true,
                            quality: "lowest"
                        });
                         setTimeout(()=>{return connection.playStream(stream);},1000)
                    } else {
                       await   message.guild.playlist.shift()
                        let stream = yt(  message.guild.playlist[0][0], {
                            audioonly: true,
                            quality: "lowest"
                        });
                        message.reply("⏩ Skip")
                       return setTimeout(()=>{ connection.playStream(stream);},1000)
                    }
                });
    message.guild.voiceConnection.dispatcher.end()
    }else{


     let stream = yt(  message.guild.playlist[0][0], {
                            audioonly: true,
                            quality: "lowest"
                        });
                        message.reply("⏩ Skip..")
    return setTimeout(()=>{return connection.playStream(stream);},1000)
    }

}catch(e){console.log(e)}
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
