var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
const yt = require('ytdl-core');
var cmd = 'vapor';

var init = function (message,userDB,DB) {

console.log("VAPOR")
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------



    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`Enter a Voice Channel!`);
    }
       message.reply(`Joining your voice channel and playing some vape!`);
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=cU8HrO7XuiE', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => {
          voiceChannel.leave();
        });
      });



}
 module.exports = {
    pub: true,
    cmd: cmd,
    perms: 2,
    init: init,
    cat: 'master'
};

