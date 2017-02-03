exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    message.channel.sendMessage("pong!").catch(console.error);
}
