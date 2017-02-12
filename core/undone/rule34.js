const fs = require("fs");
const getter = require("booru-getter");
var gear = require("../gearbox.js");
 const Discord = require("discord.js");

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

    if(gear.moduleCheck('NSFW',message)==false){
        message.reply(':no_entry_sign: Comandos NSFW não são permitidos neste Canal.');
        return;
    }

let RUBYMOJI = message.guild.emojis.find('name','ruby')
if (RUBYMOJI === null){RUBYMOJI = ':octagonal_sign: '}




        if (gear.checkRubys(5, userData) == false) {
            message.reply(" você não tem rubys suficientes para comprar putaria. Você precisa pelo menos **5**");
            return;
        }

        points['271394014358405121'].rubys+=5
       points['271394014358405121'].earnTracker.putaria += 5
        userData.rubys -= 5;
       userData.expenseTracker.putaria+=5

        console.log("PUTARIA INVOKED by " + caller + "-------------\n")
        let query = message.content.split(" ");
        !query[1] ? query[1] = "furry" : query[1] = query[1];
        getter.getRandomLewd(query[1], (url) => {
            if (url === undefined) {
                message.reply("Teus pornô são tão bizarro que nem achei essa merda.")
            }
            else {
                message.channel.sendMessage()
                //message.reply("http:" + url);
                 emb =    new Discord.RichEmbed();
                      emb.setColor('#b41212')
                      emb.setTitle(':underage:')

                emb.setImage("http:" + url)
                    message.channel.sendEmbed(emb,message.author+" Foram debitados **5** "+RUBYMOJI+" da sua conta.").then(function (m) {
                m.react('👍')
                m.react('👎')
                m.react('❤')
                m.react('😠')

            })


            }
        })
        gear.writePoints(points,caller)

}
