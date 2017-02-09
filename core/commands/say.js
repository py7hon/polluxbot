exports.run = (bot, message, args, userData, caller, gear, points, skynet, pref) => {
  message.delete()
  message.channel.sendMessage(message.content.substr(pref.length+3))
  
}
