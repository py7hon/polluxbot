const arraySort = require('array-sort')

exports.run = (bot, message, args, userData, caller) => {
if (message.content.startsWith(prefix + "rank")) {
        console.log("RANK VIEW INVOKED by " + caller + "-------------\n")
        var rankItem = []
        var ranked = []
        for (var i in points) {
            rankItem.name = points[i].name
            rankItem.points = points[i].points
            rankItem.level = points[i].level
            ranked.push(rankItem)
            rankItem = []
        }
        arraySort(ranked, 'points', {
            reverse: true
        })
        console.log(ranked)
        let replyData = `
:first_place: 1st   **${ranked[0].name}**  Level ${ranked[0].level} :: ${ranked[0].points} Exp

:second_place: 2nd  **${ranked[1].name}** Level ${ranked[1].level} :: ${ranked[1].points} Exp

:third_place: 3rd   **${ranked[2].name}**  Level ${ranked[2].level} :: ${ranked[2].points} Exp

:medal: 4th **${ranked[3].name}**    Level ${ranked[3].level} :: ${ranked[3].points} Exp

:medal: 5th **${ranked[4].name}**    Level ${ranked[4].level} :: ${ranked[4].points} Exp

                        `
        message.channel.sendMessage(replyData)
    };
}
