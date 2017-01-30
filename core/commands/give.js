var paths = require("../paths.js");
const fs = require("fs");



exports.run = (bot, message, args, userData, caller, gear, points) => {
        console.log("------------give by" + caller)
        var stuff=message.content.split(' ')
        if (stuff.lenght <3){
            message.reply("Ordem inválida")
            return;
        }
    console.log(stuff[1])
        if (gear.checkCookies(stuff[1],message.author)){
            message.reply("Sem Cookies suficientes")
            return;
        }

        let tgt = gear.checkment(message)
        let tgtData = points[tgt.id];

            // message.guild.defaultChannel.sendMessage()

            userData.cookies -= stuff[1]
            tgtData.cookies += stuff[1]
            aaa = message.channel.sendFile(paths.BUILD + 'cookie.png', 'Cookie.png', message.author.username + " deu **"+stuff[1]+"**:cookie: para"+tgt.username+"!").then(function (c) {
                message.delete(1000)
            })

gear.writePoints(points,caller)

    }
