exports.run = (bot, message, args, userData, caller, gear, points, skynet, pref) => {
  message.delete()
  message.guild.defaultChannel.sendMessage(message.content.substr(pref.length+3))

}
