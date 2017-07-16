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

var emojya = bot.emojis.get('276878246589497344')
    let GOODMOJI = emojya
    let GOOD = 'Ruby'
    if (DB.get(Server.id).modules.GOODMOJI) {
        GOODMOJI = DB.get(Server.id).modules.GOODMOJI
    }
    if (DB.get(Server.id).modules.GOODNAME) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }
    if (message.channel.type == 'dm') {
        message.reply(nope)
        return
    }

    userDB.get(Target.id).modules = userDB.get(Author.id).modules


    let img = Target.defaultAvatarURL.substr(0, Target.defaultAvatarURL.length - 10)
    if (Target.avatarURL) {
        img = Target.avatarURL.substr(0, Target.avatarURL.length - 10);
    }
    emb.setColor('#ffd156')
    emb.title =  ":yen: " +bal
    emb.setThumbnail(img)
    emb.description = tot+' **'+userDB.get(Target.id).modules.goodies+"** "+GOOD+"s "+GOODMOJI
    emb.addField(gan, `
      **${put}**: ${userDB.get(Target.id).modules.earnings.putaria}
**${jog}**: ${userDB.get(Target.id).modules.earnings.jogatina}
**${dro}**: ${userDB.get(Target.id).modules.earnings.drops}
**${tra}**: ${userDB.get(Target.id).modules.earnings.trade}
      `, true)
    emb.addField(gas, `
  **${put}**: ${userDB.get(Target.id).modules.expenses.putaria}
**${jog}**: ${userDB.get(Target.id).modules.expenses.jogatina}
**${dro}**: ${userDB.get(Target.id).modules.expenses.drops}
**${tra}**: ${userDB.get(Target.id).modules.expenses.trade}

      `, true)
    message.channel.send({embed:emb})
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
