const Discord = require("discord.js");
const arraySort = require('array-sort')
const Jimp = require("jimp");
const fs = require("fs");
var paths = require("../paths.js");
var cmd = 'balance';

var locale = require('../../utils/multilang_b');
var mm = locale.getT();




var init = function (message,userDB,DB) {
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
if (DB[Server.id].modules) {
    GOODMOJI = DB[Server.id].modules
}
if (DB[Server.id].modules) {
    GOOD = DB[Server.id].modules.GOODNAME
}
    if (message.channel.type == 'dm') {
        message.reply(nope)
        return
    }

    userDB[Target.id].modules = userDB[Author.id].modules


    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10)
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10);
    }
    emb.setColor('#ffd156')
    emb.title =  ":yen: " +bal
    emb.setThumbnail(img)
    emb.description = tot+' **'+userDB[Target.id].modules.goodies+"** "+GOOD+"s "+GOODMOJI
    emb.addField(gan, `
      **${put}**: ${userDB[Target.id].modules.earnings.putaria}
**${jog}**: ${userDB[Target.id].modules.earnings.jogatina}
**${dro}**: ${userDB[Target.id].modules.earnings.drops}
**${tra}**: ${userDB[Target.id].modules.earnings.trade}
      `, true)
    emb.addField(gas, `
  **${put}**: ${userDB[Target.id].modules.expenses.putaria}
**${jog}**: ${userDB[Target.id].modules.expenses.jogatina}
**${dro}**: ${userDB[Target.id].modules.expenses.drops}
**${tra}**: ${userDB[Target.id].modules.expenses.trade}

      `, true)
    message.channel.sendEmbed(emb)
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
