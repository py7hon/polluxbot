exports.run = (bot, message, args, userData, caller) => {
        tgt = message.guild.member(gear.checkment(message))
        let myRole = message.guild.roles.find("name", "ADM");
        if (tgt.roles.exists("name", "ADM")) {
            message.guild.defaultChannel.sendMessage(`:mega:  **Anúncio**
` + message.content.substr(10))
        }
        else if (tgt.roles.exists("name", "MOD")) {
            message.guild.defaultChannel.sendMessage(`:mega:  **Anúncio**
` + message.content.substr(10))
        }
        else {
            message.reply("Somente Admins e Mods podem criar anúncios");
        }
    };
