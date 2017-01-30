exports.run = (bot, message, args) => {
  let modRole = message.guild.roles.find("name", "MOD");
  if(!message.member.roles.has(modRole.id)) {
    return message.reply("como assim tu quer kickar alguém, seu pleb.").catch(console.error);
  }
  if(message.mentions.users.size === 0) {
    return message.reply("tu precisa me dizer de quem eu vou chutar a bunda").catch(console.error);
  }
  let kickMember = message.guild.member(message.mentions.users.first());
  if(!kickMember) {
    return message.reply("deu ruim, não achei esse maluco");
  }
  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
    return message.reply("Por algum raio de razão eu não posso kickar esse cara. MIMDÁ PERMISSÃO").catch(console.error);
  }
  kickMember.kick().then(member => {
    message.channel.sendMessage(`:boot: Meti um pé na bunda de ${member.user.username}.`).catch(console.error);
  }).catch(console.error)
}
