const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
var paths = require("../paths.js");
const gear = require('../gearbox.js')
let modules = require("../modules.json");



exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

    modules[message.guild.id].prefix = args[0]
    message.reply('prefix changed to ' + args[0])


    fs.writeFile('./modules.json', JSON.stringify(modules), (err) => {
        console.log("JSON write event-------\n")
        if (err) console.log("JSON ERROR  ------------\n" + err)



    })
}
