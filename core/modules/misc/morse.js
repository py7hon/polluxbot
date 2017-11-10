
const gear = require("../../gearbox.js");
const morse = require("morse-mp3");
const morset = require("morse");
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();
const fs = require("fs");
const cmd = 'morse';

const init = async function (message) {

    let P = {lngs:message.lang}
    let string = message.content.split(/ +/).slice(1).join(' ').toUpperCase()+" ";
    let voiceChannel = message.member.voiceChannel;
    let mo = morset.encode(string)
    let exportFile
    let connection;
    if (!voiceChannel) {
      message.reply(mm('CMD.enterVoiceBetterExperience',P));
    }else{
      exportFile = message.author.id+'.mp3';
      morse.convert(string, exportFile);
      connection=  await voiceChannel.join()
    }

const embed = new gear.Discord.RichEmbed
embed.setAuthor("We get signal!");
embed.setFooter("Radio Operator | Zero Wing","http://i.imgur.com/tda07NK.png")
embed.setColor("#5745a3")
embed.setThumbnail("https://telegraph.p3k.io/assets/telegraph-icon-white.png")
let output = mo.replace(/\.\.\.\.\.\.\./g," ")
embed.setDescription("*\"WHAT?\"*\n```"+output+"```\n"+gear.emoji("wifirouter")+mm('forFun.transmittedVc',P))
message.channel.send({embed}).catch(e=>message.channel.send(output).catch(e=>message.channel.send("Morse Code Too Long")))
message.delete()

if(!connection)return;
const dispatcher = connection.playStream(exportFile);
dispatcher.on('end', () => {
    voiceChannel.leave();
    fs.unlink(exportFile,x=>x);
});

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
