exports.run = (bot, message, args, userData, caller) => {
    message.channel.sendMessage("pong!").catch(console.error);
}
