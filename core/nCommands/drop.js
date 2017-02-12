var paths = require("../paths.js");
var gear = require("../gearbox.js");
const fs = require("fs");


exports.run = (bot, message, args, userData, caller, gear, points, skynet, pref) => {

      if(!gear.moduleCheck('RUBY',message)){
        message.reply(':no_entry_sign: Sistema de Rubys foi desabilitado aqui.');
        return;
    }

let RUBYMOJI = message.guild.emojis.find('name','ruby')
if (RUBYMOJI === null){RUBYMOJI = ':octagonal_sign: '}
        console.log("------------DROP by" + caller)
            // message.guild.defaultChannel.sendMessage()
        if (userData.rubys >= 1) {
            userData.rubys -= 1
            userData.expenseTracker.drops+=1
            aaa = message.channel.sendFile(paths.BUILD + 'ruby.png', 'Ruby.png', message.author.username + " largou um ruby "+RUBYMOJI+" na sala! Quem digitar \`"+pref+"pick\` primeiro leva! ").then(function (c) {
                gear.vacuum.push(c)
            })
            gear.drops++
            message.delete(1000)
        }
        else {
            message.reply("Você não tem rubys pra dropar...");
        }
    gear.writePoints(points,caller)
    }
