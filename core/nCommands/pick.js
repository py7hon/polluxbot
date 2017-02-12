var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'pick';

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

let GOODMOJI = ':gem:'
    let GOOD = 'Gems'
    if (Server.mods.GOODMOJI) {
        GOODMOJI = Server.mods.GOODMOJI
    }
    if (Server.mods.GOODNAME) {
        GOOD = Server.mods.GOODNAME
    }
var userData = Author.mods


        console.log("Pick trial by" + Author)
        if (gear.drops > 0) {
            console.log("----------- SUCCESSFUL PICK by" + Author)
             gear.paramUpdate(Author,'goodies',1)
              gear.paramUpdate(Author,'earnings.drops',1)
            message.channel.sendMessage("**" + Author.username + "** pegou " + gear.drops + " "+GOOD).then(function (c) {
                message.delete()
                c.delete(500000)
            });
            //  message.channel.bulkDelete(gear.vacuum);
            //    message.guild.defaultChannel.bulkDelete(gear.vacuum);
            for (i in gear.vacuum) {
                gear.vacuum[i].delete()
            }
            //   message.channel.bulkDelete(gear.vacuum);
            gear.drops = 0
        }
        else {
            console.log("----------- FAILED PICK by" + Author)
                //   message.channel.bulkDelete(gear.vacuum);
                //   message.guild.defaultChannel.bulkDelete(gear.vacuum);
            for (i in gear.vacuum) {
                gear.vacuum[i].delete()
            }
            //message.channel.sendMessage("No Ruby");
        }

    };

module.exports = {pub:true,cmd: cmd, perms: 0, init: init, cat: 'misc'};

