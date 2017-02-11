const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
var paths = require("../paths.js");
const gear = require('../gearbox.js')
let modules = require('../modules.json')
//let modules = JSON.parse(fs.readFileSync('./modules.json', 'utf8'));



exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

    modules[message.guild.id].prefix = args[0].toString()
    message.reply('prefix changed to ' + args[0])


    fs.writeFile('./modules.json', JSON.stringify(modules), (err) => {
        console.log("JSON write event-------")
         delete require.cache[require.resolve('../modules.json')];
        if (err) console.log("JSON ERROR  ------------\n" + err)



    })
}
