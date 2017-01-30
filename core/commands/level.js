const fs = require("fs");
const gear = require("../gearbox.js");
let points = JSON.parse(fs.readFileSync('../points.json', 'utf8'));

exports.run = (bot, message, args, userData, caller) => {

    let tgt = gear.checkment(message)
        let tgtData = points[tgt.id];
    message.channel.sendMessage( tgt.username+' está no Level **'+tgtData.level+'**')
}
