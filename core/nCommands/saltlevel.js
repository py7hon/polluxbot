var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'saltlevel';

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

let saltmoji = message.guild.emojis.find('name','salty')

    //let target = message.mentions.users.first();
    var multiplier = 1
    try{if (message.mentions.users.first().id == "248435798179971072"){
        multiplier = 23
    }}catch(err){}
    r = gear.randomize(1,100)
    var vocab = mm('forFun.saltLVL', {
        lngs:LANG,
        target: Target.username,
        amount: r * multiplier,
        emoji: saltmoji
    })
    message.channel.sendMessage(vocab)
}

module.exports = {
    pub:false,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'skynet',
    skynet:true
};
