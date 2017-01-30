const fs = require("fs");
const gear = require("../gearbox.js");


exports.run = (bot, message, args, userData, caller, gear, points) => {

    let tgt = gear.checkment(message)
        let tgtData = points[tgt.id];
    message.channel.sendMessage( tgt.username+' está no Level **'+tgtData.level+'**')
}
