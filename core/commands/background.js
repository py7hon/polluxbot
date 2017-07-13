var gear = require("../gearbox.js");
var cmd = 'background';
var Jimp = require("jimp")


var init = function (message,userDB,DB) {


    try{
var args = message.content.split(" ").slice(1)[0]





     Jimp.read("http://files.pollux.fun/"+args+".png",async function (err, ovlay) {
                if (err) {
                  message.reply("**__INVALID IMAGE CODE__**")
                 message.channel.sendMessage("Image codes can be get at <http://files.pollux.fun/a/wQLyYKdE>, click on an image, and copy its code like this:")
            await message.channel.sendFile("http://files.pollux.fun/0jVTENJoA0ZaA5uPVhcOJcuTV0RLSPtL.png")
                 return message.channel.sendMessage("then use `"+message.prefix+"background [image code]`")


                }


    gear.paramDefine(message.author,"bgID",args)

 message.channel.sendMessage(gear.emoji('check')+" Background **OK**")

     })
//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');




 // message.delete()

    }catch(e){console.log(e)}

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
