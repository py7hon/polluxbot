var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'drop';

var init = function (message,userDB,DB) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
if (Author.bot) return;
var Member = Server.member(Author);
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
var bot = message.botUser
var args = MSG.split(' ').slice(1)[1]
var LANG = message.lang;

//-------MAGIC----------------

var  userData = Author.mods


let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (Server.mods.GOODMOJI) {
        GOODMOJI = Server.mods.GOODMOJI
    }
    if (Server.mods.GOODNAME) {
        GOOD = Server.mods.GOODNAME
    }



        console.log("------------DROP by" + Author)
            // message.guild.defaultChannel.sendMessage()
        if (userData.goodies >= 1) {

            gear.paramIncrement(Author,'goodies',-1)
              gear.paramIncrement(Author,'expenses.drops',1)
            message.channel.sendFile(paths.BUILD + 'ruby.png', 'Ruby.png', mm('$.userDrop',{lngs:LANG,emoji:GOODMOJI,good:GOOD,user:Author.username,prefix:message.prefix})).then(function (r) {
                bot.on('message', m => {
                if (m.content == m.guild.mods.PREFIX+"pick"){
                    r.delete().catch()
                }
            })
            }).catch()

             if(isNaN(Channel.DROPSLY)){Channel.DROPSLY=1}else{Channel.DROPSLY+=1}
            message.delete(1000)
        }
        else {
            message.reply(mm('$.cantDrop', {lngs:LANG,goods:GOOD}));
        }

    }

module.exports = {pub:true,cmd: cmd, perms: 0, init: init, cat: 'misc'};

