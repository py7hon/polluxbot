if (message.content.startsWith(prefix + "joined")) {
        console.log("JOINED BY " + caller)
        tgt = message.guild.member(checkment(message))
        let join = tgt.joinedAt
        let data = `**${tgt.displayName}** é membro desde: ${join.getDate()}/${join.getMonth()+1}/${join.getFullYear()} - ${join.toLocaleTimeString()}`;
        message.reply(data)
    };
