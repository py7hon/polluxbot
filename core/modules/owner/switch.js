var gear = require("../../gearbox.js");
var paths = require("../../paths.json");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'switch';

var init = function (message,userDB,DB) {
    var bot = message.botUser
    var args = message.content.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------
if (message.author.id != '88120564400553984') return message.reply('Only my master can change my profile picture. now begone!');

var av;
    if (args && args > 0 && args < 12 ){
         av = args
    }else{
        av = gear.randomize(1,9)
    }

    var vocab = mm('misc.aviOK', {lngs: LANG})

    bot.user.setAvatar( './avis/'+av+'.png').catch(e=> {/*ERROR ESCAPE*/});
    message.channel.send(vocab,{files:['./avis/'+av+'.png']})
    }

 module.exports = {
    pub:false,
    cmd: cmd,
    perms: 1,
    init: init,
    cat: 'bot'
};
