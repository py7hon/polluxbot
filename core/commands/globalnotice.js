exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

    if (!message.author.id == '88120564400553984') return;
    for (i = 0; i < bot.guilds.size; i++) {

        if (modules[bot.guilds.array()[i].id].announcements) {
            bot.guilds.array()[i].guild.defaultChannel.sendMessage(message.content.substr('+globalnotice'.length))
        }
    }

};
