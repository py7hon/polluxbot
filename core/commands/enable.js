var paths = require("../paths.js");
var gear = require("../gearbox.js");
var modules = require("../modules.json");
const fs = require('fs')


exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    
    
    
if(message.channel.type == 'dm'){
    message.reply("Comando não utilizável por DM");
    return;
}

    if(message.content.length<10){
    message.reply("Escolha um módulo");
    return;
}
    
 let modRole = message.guild.roles.find("name", "MOD");
    let admRole = message.guild.roles.find("name", "ADM");
try{
    
    if (!message.member.roles.has(modRole.id) && !message.member.roles.has(admRole.id)) {
        return message.reply("Apenas MODs e ADMs podem executar este comando").catch(console.error);
    }
}catch(err){}
    
    
    function pp(o, p) {
        return o[p];
    }

    var target = args[0].toUpperCase()
    if (args[1]){
        var scope = args[1].toLowerCase()
        }
    var sc = ''
    switch (scope) {
        case 's':
        case 'server':
        case 'guild':
            sc = 'S'
            break;
        case 'c':
        case 'channel':
        case 'chnl':
            sc = 'C'
            break;
        default:
            sc = 'C'
            break;
    }
console.log(sc)
    if (sc == 'S') {

        for(var y in modules[message.guild.id].channels){
             modules[message.guild.id].channels[y][target] = true
        }


        message.reply('O módulo ' + target + ' foi habilitado globalmente!')
        }
    else {

            modules[message.guild.id].channels[message.channel.id][target] = true
            message.reply('O módulo ' + target + ' foi habilitado no canal #'+message.channel.name)
        }





    fs.writeFile('./modules.json', JSON.stringify(modules), (err) => {
        console.log("JSON write event-------\n")
        if (err) console.log("JSON ERROR  ------------\n" + err)



    })
}
