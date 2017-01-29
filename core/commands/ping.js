exports.run = (bot, message, args) => {
    message.channel.sendMessage("pong!").catch(console.error);
}
