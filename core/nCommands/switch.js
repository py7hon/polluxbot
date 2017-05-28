var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'switch';

var init = function (message,userDB,DB) {

    var bot = message.botUser
    var args = message.content.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------
if (!message.author.id == '88120564400553984') return message.reply('Only my master can change my profile picture. now begone!');
var av;
    if (args && args > 0 && args < 8 ){
         av = args
    }else{
        av = gear.randomize(1,7)
    }

    var vocab = mm('misc.aviOK', {lngs: LANG})

    bot.user.setAvatar( './avis/'+av+'.png');
    message.channel.sendFile('./avis/'+av+'.png','avatar.png',vocab)
    }

module.exports = {
    pub:false,
    cmd: cmd,
    perms: 1,
    init: init,
    cat: 'bot'
};
