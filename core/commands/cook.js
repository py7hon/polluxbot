exports.run = (bot, message, args, userData, caller, gear, points) => {
 if(message.mentions.users.size === 0) {
     return message.reply("voce tem " + userData.cookies + " cookies")
    }
  let target = message.mentions.users.first();
     return message.channel.sendMessage(target.username +" tem " + points[target.id].cookies + " cookies")
    }
