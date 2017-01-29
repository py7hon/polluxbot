exports.run = (bot, message, args) => {
        console.log("------------give by" + caller)
        var stuff=message.content.split(' ')
        if (stuff.lenght <3){
            message.reply("Ordem inválida")
            return;
        }
        if (checkCookies(stuff[1],message.author)){
            message.reply("Ordem inválida")
            return;
        }

        let tgt = checkment(message)
        let tgtData = points[tgt.id];

            // message.guild.defaultChannel.sendMessage()

            userData.cookies -= stuff[1]
            tgtData.cookies += stuff[1]
            aaa = message.channel.sendFile(paths.BUILD + 'cookie.png', 'Cookie.png', message.author.username + " deu **"+stuff[1]+"**:cookie: para"+tgt.username+"!").then(function (c) {
                message.delete(1000)
            })



    }
