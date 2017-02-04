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
            sc = 'S'
            break;
    }
console.log(sc)
    if (sc == 'S') {

        for(var y in modules[message.guild.id].channels){
             modules[message.guild.id].channels[y][target] = false
        }


        message.reply('O módulo ' + target + ' foi desabilitado globalmente!')
        }
     else {

            modules[message.guild.id].channels[message.channel.id][target] = false
            message.reply('O módulo ' + target + ' foi desabilitado no canal #'+message.channel.name)
        }





    fs.writeFile('./modules.json', JSON.stringify(modules), (err) => {
        console.log("JSON write event-------\n")
        if (err) console.log("JSON ERROR  ------------\n" + err)



    })
}
