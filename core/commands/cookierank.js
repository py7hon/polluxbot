const arraySort = require('array-sort')
const fs = require("fs");


exports.run = (bot, message, args, userData, caller, gear, points) => {
        console.log("RANK COOK VIEW INVOKED by " + caller + "-------------\n")
        var rankItem = []
        var ranked = []
        for (var i in points) {
            rankItem.name = points[i].name
            rankItem.cookies = points[i].cookies
            rankItem.level = points[i].level
            ranked.push(rankItem)
            rankItem = []
        }
        arraySort(ranked, 'cookies', {
            reverse: true
        })
        console.log(ranked)
        let replyData = `
:first_place: 1st\t**${ranked[0].name}**\tLevel\t${ranked[0].level}\t\t::\t${ranked[0].cookies+":cookie:"}

:second_place: 2nd\t**${ranked[1].name}**\tLevel\t${ranked[1].level}\t\t::\t${ranked[1].cookies+":cookie:"}

:third_place: 3rd\t**${ranked[2].name}**\tLevel\t${ranked[2].level}\t\t::\t${ranked[2].cookies+":cookie:"}

:medal: 4th\t**${ranked[3].name}**\tLevel\t${ranked[3].level}\t\t::\t${ranked[3].cookies+":cookie:"}

:medal: 5th\t**${ranked[4].name}**\tLevel\t${ranked[4].level}\t\t::\t${ranked[4].cookies+":cookie:"}

                        `
        message.channel.sendMessage(replyData)
    };
