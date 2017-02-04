const fs = require("fs");
const gear = require("../gearbox.js");


exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
  if(!gear.moduleCheck('LEVEL',message)||!gear.moduleCheck('PROFILE',message)){
        message.reply(':no_entry_sign: Sistema de Levels foi desabilitado aqui.');
        return;
    }
    let tgt = gear.checkment(message)
        let tgtData = points[tgt.id];
    message.channel.sendMessage( tgt.username+' está no Level **'+tgtData.level+'**')
}
