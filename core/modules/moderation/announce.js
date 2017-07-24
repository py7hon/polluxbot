
var cmd = 'announce';
var locale = require('../../../utils/multilang_b');
var gear = require('../gearbox');
var mm = locale.getT();
var init = function (message) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    var Member = message.guild.member(Author);
    var serverRoles = message.guild.roles;
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    if (Author.bot) return;

  var LANG = message.lang;
//HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}
//------------

 var modPass = gear.hasPerms(Member,DB)

    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }


  //  var tgt = message.guild.member(Target)

var anno = mm('dict.announce',{lngs:LANG})
        Server.defaultChannel.send(`**${anno}:**
` + MSG.substr(10))


};

 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
