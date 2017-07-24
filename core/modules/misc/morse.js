var Discord = require("discord.js");
var gear = require("../../gearbox.js");
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

             emb = new Discord.RichEmbed
            emb.setAuthor("We get signal!")
            emb.setFooter("Radio Operator | Zero Wing","http://i.imgur.com/tda07NK.png")
            emb.setColor("#5745a3")
    emb.setThumbnail("https://telegraph.p3k.io/assets/telegraph-icon-white.png")
    let output = mo.replace(/\.\.\.\.\.\.\./g," ")
    emb.setDescription("*\"WHAT?\"*\n```"+output+"```\n"+gear.emoji("wifirouter")+" Transmitted to your voice channel!")
           message.channel.send({embed:emb}).catch(e=>message.channel.send(output).catch(e=>message.channel.send("Morse Code Too Long")))


               const dispatcher = connection.playStream(exportFile);

           //     dispatcher.on('end', () => {
             //       voiceChannel.playFile(exportFile);
            //    });




}catch(e){gear.hook.send(e.error)}



}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
