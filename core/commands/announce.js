var cmd = 'announce';
var locale = require('../../utils/multilang_b');
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

 var modPass = gear.hasPerms(Member)

    if (!modPass) {
        return message.reply(mm('CMD.moderatioNeeded', {
            lngs: LANG
        })).catch(console.error);
    }


    var tgt = message.guild.member(Target)
    if (modPass) {
var anno = mm('dict.announce',{lngs:LANG})
        Server.defaultChannel.sendMessage(`${anno}
` + MSG.substr(10))

    } 
};

 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
