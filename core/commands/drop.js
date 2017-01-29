exports.run = (bot, message, args) => {
        console.log("------------DROP by" + caller)
            // message.guild.defaultChannel.sendMessage()
        if (userData.cookies >= 1) {
            userData.cookies -= 1
            aaa = message.channel.sendFile(paths.BUILD + 'cookie.png', 'Cookie.png', message.author.username + " largou um cookie :cookie: na sala! Quem digitar \`+pick\` primeiro leva! ").then(function (c) {
                vacuum.push(c)
            })
            drops++
            message.delete(1000)
        }
        else {
            message.reply("Você não tem cookies pra dropar...");
        }
    }
