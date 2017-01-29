const arraySort = require('array-sort')


exports.run = (bot, message, args, userData, caller) => {
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
:first_place: 1st   **${ranked[0].name}**  Level ${ranked[0].level} :: ${ranked[0].cookies+":cookie:"}

:second_place: 2nd  **${ranked[1].name}** Level ${ranked[1].level} :: ${ranked[1].cookies+":cookie:"}

:third_place: 3rd   **${ranked[2].name}**  Level ${ranked[2].level} :: ${ranked[2].cookies+":cookie:"}

:medal: 4th **${ranked[3].name}**    Level ${ranked[3].level} :: ${ranked[3].cookies+":cookie:"}

:medal: 5th **${ranked[4].name}**    Level ${ranked[4].level} :: ${ranked[4].cookies+":cookie:"}

                        `
        message.channel.sendMessage(replyData)
    };
