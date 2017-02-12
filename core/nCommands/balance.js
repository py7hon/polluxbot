const Discord = require("discord.js");
const arraySort = require('array-sort')
const Jimp = require("jimp");
const fs = require("fs");
var paths = require("../paths.js");
var cmd = 'balance';

var init = function (message) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    if (Author.bot) return;
    emb = new Discord.RichEmbed();
    if (message.channel.type == 'dm') {
        message.reply('Não usável em DM')
        return
    }
    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10)
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10);
    }
    emb.setColor('#ffd156')
    emb.title = "Balanço"
    emb.setThumbnail(img)
        //emb.description = ' Números contabilizados desde 8-Feb-2017 '
    emb.addField('Ganhos', `
      **Putaria**: ${Target.mods.earnings.putaria}
**Jogatina**: ${Target.mods.earnings.jogatina}
**Drops**: ${Target.mods.earnings.drops}
**Trade**: ${Target.mods.earnings.trade}
      `, true)
    emb.addField('Gastos', `
  **Putaria**: ${Target.mods.expenses.putaria}
**Jogatina**: ${Target.mods.expenses.jogatina}
**Drops**: ${Target.mods.expenses.drops}
**Trade**: ${Target.mods.expenses.trade}

      `, true)
    message.channel.sendEmbed(emb)
}
module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'misc'
};
