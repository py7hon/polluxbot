const fs = require("fs");



exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
  if(!gear.moduleCheck('LEVEL',message)){
        message.reply(':no_entry_sign: Sistema de Levels foi desabilitado aqui.');
        return;
    }
        userData.persotext = message.content.substr(13)
        message.reply(`Seu texto pessoal mudou para:

*` + message.content.substr(13) + `*

Digite \`+profile\` para visualizar ele em seu Profile Card~`)
        gear.writePoints(points,caller)
    }

