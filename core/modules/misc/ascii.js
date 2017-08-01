var gear = require("../../gearbox.js");
var ascii = require("ascii-art");
var cmd = 'ascii';

var init = function (message,userDB,DB) {

//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
try{
    ascii.Figlet.fontPath = './resources/fonts/';
       let string = message.content.substr(message.prefix.length+cmd.length+1)

        if (string.length > 18){
            return message.reply(":warning:")
        }
       if (string.length > 6){

             var nomorestring = []
    for (i = 0; i < string.length; i += 6) {
        nomorestring.push(string.slice(i, i + 6))


        ascii.font(nomorestring[i/6],"standard", render =>{
     console.log(render)
    message.channel.send("```"+render+"```")
})
console.log()
    }

       }
}catch(e){gear.hook.send(e.error)}
     console.log(string)


ascii.font(string,"standard", render =>{
     console.log(render)
    message.channel.send("```"+render+"```")
})
  message.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
