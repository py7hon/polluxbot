const Discord = require("discord.js");
const arraySort = require('array-sort')
const Jimp = require("jimp");
const fs = require("fs");

exports.run = (bot, message, args, userData, caller, gear, points, skynet, pref) => {
    const Server = message.Server
    var modules = message.Modules

    console.log(args[0])
    try{
        var l = require("../../utils/lang/"+args[0]+".json")
        }catch(err){return message.reply('lolnope')};

  message.reply('OK')
  Server.language = args[0]

   fs.writeFile('./modules.json', JSON.stringify(modules), (err) => {
        console.log("JSON write event-------")
        if (err) console.log("JSON ERROR  ------------\n" + err)

    })
}
