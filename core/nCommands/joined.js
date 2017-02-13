var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'joined';

var init = function (message, userDB, DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------

        let join = Server.member(Target).joinedAt
        let datestamp = `${join.getDate()}-${join.getMonth()+1}-${join.getFullYear()} : ${join.toLocaleTimeString()}`;

        console.log(datestamp)

        message.reply(mm('misc.memberSince', {lngs:LANG,target:Target.username,joinedstamp:datestamp}))
    };


module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'misc'
};
