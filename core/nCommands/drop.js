var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'name';

var init = function (message, userDB, DB) {
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
    let GOOD = 'Gems'
    if (Server.mods.GOODMOJI) {
        GOODMOJI = Server.mods.GOODMOJI
    }
    if (Server.mods.GOODNAME) {
        GOOD = Server.mods.GOODNAME
    }



        console.log("------------DROP by" + Author)
            // message.guild.defaultChannel.sendMessage()
        if (userData.goodies >= 1) {
            gear.paramUpdate(Author,'goodies',-1)
              gear.paramUpdate(Author,'expenses.drops',1)
            message.channel.sendFile(paths.BUILD + 'ruby.png', 'Ruby.png', message.author.username + " largou um ruby "+GOODMOJI+" na sala! Quem digitar \`"+Server.mods.PREFIX+"pick\` primeiro leva! ").then(function (c) {
                gear.vacuum.push(c)
            })
            gear.drops++
            message.delete(1000)
        }
        else {
            message.reply("Você não tem goodies pra dropar...");
        }

    }

module.exports = {cmd: cmd, perms: 0, init: init, cat: 'misc'};

