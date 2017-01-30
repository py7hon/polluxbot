exports.run = (bot, message, args, userData, caller, gear, points) => {
    message.channel.sendMessage("pong!").catch(console.error);
}
