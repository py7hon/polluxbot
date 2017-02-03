var paths = require("../paths.js");
const fs = require("fs");

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    const RUBYMOJI = message.guild.emojis.find('name','ruby')
    console.log("------------give by" + caller)
    var stuff = message.content.split(' ')
    if (stuff.lenght < 3) {
        message.reply("Ordem inválida")
        return;
    }
    var donate = parseInt(stuff[1])
    if (gear.checkRubys(donate, userData) == true) {
        let tgt = gear.checkment(message)
        let tgtData = points[tgt.id];
        // message.guild.defaultChannel.sendMessage()
        userData.rubys -= donate
        tgtData.rubys += donate
        message.channel.sendMessage(message.author.username + " deu **" + donate + "** "+RUBYMOJI+" para **" + tgt.username + "**!").then(function (c) {
            message.delete(5000)
        })
        gear.writePoints(points, caller)
    }
    else {
        message.reply("você não tem Rubys suficientes")
        return;
    }
}
