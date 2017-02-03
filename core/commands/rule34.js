const fs = require("fs");
const getter = require("booru-getter");



exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    const RUBYMOJI = message.guild.emojis.find('name','ruby')




        if (gear.checkRubys(5, userData) == false) {
            message.reply(" você não tem rubys suficientes para comprar putaria. Você precisa pelo menos **5**");
            return;
        }
        userData.rubys -= 5;
        console.log("PUTARIA INVOKED by " + caller + "-------------\n")
        let query = message.content.split(" ");
        !query[1] ? query[1] = "furry" : query[1] = query[1];
        getter.getRandomLewd(query[1], (url) => {
            if (url === undefined) {
                message.reply("Teus pornô são tão bizarro que nem achei essa merda.")
            }
            else {
                message.channel.sendMessage("Foram debitados **5** "+RUBYMOJI+" da sua conta.")
                message.reply("http:" + url);
            }
        })
        gear.writePoints(points,caller)

}
