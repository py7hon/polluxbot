var gear = require("../gearbox.js");
var morse = require("morse-mp3");
var morset = require("morse");
var cmd = 'morse';

var init = async function (message,userDB,DB) {

//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
try{

    exportFile = message.author.id+'.mp3'
     let string = message.content.substr(message.prefix.length+cmd.length+1)
    morse.convert(string, exportFile)

     var voiceChannel = message.member.voiceChannel;
       if (!voiceChannel) {
                   return  message.reply(`Enter a Voice Channel!`);
                 //   return resolve(true);
                }

 botvoice =  await voiceChannel.join()
    var connection = botvoice

               // console.log(botvoice)
                console.log(connection+"\n CONNECT")

              //  message.delete()

             let mo = morset.encode(string)
           message.reply(mo.replace(/ /g," / "))
               const dispatcher = connection.playStream(exportFile);

           //     dispatcher.on('end', () => {
             //       voiceChannel.playFile(exportFile);
            //    });




}catch(e){console.log(e)}



}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
