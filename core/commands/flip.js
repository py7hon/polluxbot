var paths = require("../paths.js");
var gear = require("../gearbox.js");

exports.run = (bot, message, args, userData, caller, gear, points) => {
        var coin = gear.randomize(1, 2);
        if (coin == 1) {
            message.channel.sendFile(paths.BUILD + 'heads.png', 'heads.png', "Cara!")
        }
        else {
            message.channel.sendFile(paths.BUILD + 'tails.png', 'tails.png', "Coroa!")
        }
    }
