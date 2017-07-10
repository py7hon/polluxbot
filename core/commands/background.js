var gear = require("../gearbox.js");
var cmd = 'background';
var Jimp = require("jimp")

var init = function (message,userDB,DB) {
var args = message.content.split(1)[0]
if (args == undefined || args.length<8){




    return message.reply(":warning:")
}



     Jimp.read("http://files.pollux.fun/"+args+".png", function (err, ovlay) {
                if (err) {
                    message.reply("INVALID IMAGE URL")
                }})
//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');




  message.delete()

    gear.paramDefine(message.author,bgID,args)

 message.channel.sendMessage(gear.emoji('check')+" Background **OK**")

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
