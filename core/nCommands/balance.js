const Discord = require("discord.js");
const arraySort = require('array-sort')
const Jimp = require("jimp");
const fs = require("fs");
var paths = require("../paths.js");
var cmd = 'balance';

var locale = require('../../utils/multilang_b');
var mm = locale.getT();




var init = function (message) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    if (Author.bot) return;
    var LANG = message.lang;
    emb = new Discord.RichEmbed();


    var bal =  mm('$.balance',{lngs:LANG});
    var put =  mm('$.lewdery',{lngs:LANG});
    var jog =  mm('$.gambling',{lngs:LANG});
    var dro =  mm('$.drops',{lngs:LANG});
    var tra =  mm('$.trades',{lngs:LANG});
    var gas =  mm('$.expenses',{lngs:LANG});
    var gan =  mm('$.earnings',{lngs:LANG});
    var tot =  mm('$.total',{lngs:LANG});
    var nope =  mm('CMD.noDM',{lngs:LANG});

    let GOODMOJI = ':gem:'
let GOOD = 'Gem'
if (Server.mods.GOODMOJI) {
    GOODMOJI = Server.mods.GOODMOJI
}
if (Server.mods.GOODNAME) {
    GOOD = Server.mods.GOODNAME
}
    if (message.channel.type == 'dm') {
        message.reply(nope)
        return
    }
    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10)
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10);
    }
    emb.setColor('#ffd156')
    emb.title =  ":yen: " +bal
    emb.setThumbnail(img)
    emb.description = tot+' **'+Target.mods.goodies+"** "+GOOD+"s "+GOODMOJI
    emb.addField(gan, `
      **${put}**: ${Target.mods.earnings.putaria}
**${jog}**: ${Target.mods.earnings.jogatina}
**${dro}**: ${Target.mods.earnings.drops}
**${tra}**: ${Target.mods.earnings.trade}
      `, true)
    emb.addField(gas, `
  **${put}**: ${Target.mods.expenses.putaria}
**${jog}**: ${Target.mods.expenses.jogatina}
**${dro}**: ${Target.mods.expenses.drops}
**${tra}**: ${Target.mods.expenses.trade}

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
