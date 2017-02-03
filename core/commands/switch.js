var paths = require("../paths.js");
var gear = require("../gearbox.js");

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
 args == "" ? av = gear.randomize(1,6) : av = args

    bot.user.setAvatar( '../avis/'+av+'.png');
    message.channel.sendFile('../avis/'+av+'.png','avatar.png',"Okei, troquei minha foto por essa daqui:")
    }
