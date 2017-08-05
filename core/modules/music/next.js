var gear = require("../../gearbox.js");
var cmd = 'say';

var init =  function (message,userDB,DB) {
var Server=message.guild
try{
const yt = require('ytdl-core');


  // if(message.author.id != "88120564400553984") return message.reply(":warning:"); if(message.author.id!="88120564400553984"&&message.guild.id!="277391723322408960"&&message.guild.id!="337574844524789760"&&message.guild.owner.id!="88120564400553984"){
 //       return message.reply("Sorry, since this command is still very performance-consuming, it is a Patron-Only command.")
//    }
    var voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) {
                    return message.reply(`Enter a Voice Channel!`);

                }


  if (message.guild.dispatcher) {
      message.reply("⏩ Skip")
      message.guild.dispatcher.end();
  }




}catch(e){gear.hook.send(e.error)}
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
