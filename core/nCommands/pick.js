const fs = require("fs");
var gear = require("../gearbox.js");

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {


        //aaa.message.delete()
        ///console.log(aaa)
        console.log("Pick trial by" + caller)
        if (gear.drops > 0) {
            console.log("----------- SUCCESSFUL PICK by" + caller)
            userData.rubys += gear.drops
            userData.earnTracker.drops+=gear.drops
            message.channel.sendMessage("**" + message.author.username + "** pegou " + gear.drops + " Ruby(s)").then(function (c) {
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
            console.log("----------- FAILED PICK by" + caller)
                //   message.channel.bulkDelete(gear.vacuum);
                //   message.guild.defaultChannel.bulkDelete(gear.vacuum);
            for (i in gear.vacuum) {
                gear.vacuum[i].delete()
            }
            //message.channel.sendMessage("No Ruby");
        }
    gear.writePoints(points,caller)
    };



