var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'pick';

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

var emojya = bot.emojis.get('276878246589497344')
    let GOODMOJI = emojya
    let GOOD = 'Ruby'
    if (DB.get(Server.id).modules.GOODMOJI) {
        GOODMOJI = DB.get(Server.id).modules.GOODMOJI
    }
    if (DB.get(Server.id).modules.GOODNAME) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }


        console.log("Pick trial by" + Author)
        if (Channel.DROPSLY > 0) {
            console.log("----------- SUCCESSFUL PICK by" + Author)

            message.channel.sendMessage("**" + Author.username + "** pegou " + Channel.DROPSLY + " "+GOOD).then(function (c) {
                message.delete()
                c.delete(500000)
            }).catch();

            gear.paramIncrement(Author, 'goodies', Channel.DROPSLY)
            gear.paramIncrement(Author, 'earnings.drops', Channel.DROPSLY)
            Channel.DROPSLY=0
        }
        else {
            console.log("----------- FAILED PICK by" + Author)


            //message.channel.sendMessage("No Ruby");
        }

    };

 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'misc'};





































