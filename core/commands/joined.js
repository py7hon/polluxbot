exports.run = (bot, message, args, userData, caller) => {

if (message.content.startsWith(prefix + "joined")) {
        console.log("JOINED BY " + caller)
        tgt = message.guild.member(gear.checkment(message))
        let join = tgt.joinedAt
        let data = `**${tgt.displayName}** é membro desde: ${join.getDate()}/${join.getMonth()+1}/${join.getFullYear()} - ${join.toLocaleTimeString()}`;
        message.reply(data)
    };

}
