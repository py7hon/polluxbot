var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'cash';

var init = function (message,userDB,DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var TargetU = message.mentions.users.first() || Author;
    var Target = message.mentions.roles.first()
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------


var emoj = bot.emojis.get('276878246589497344')

   if (!Target) return;
message.reply(Target.members.size + " user(s) bears the "+Target.name+" Role")
   Target.members.slice(0, 10).forEach((e,a,d) => {
                          Channel.sendMessage(e.displayName)

   } )
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: '$'
};
