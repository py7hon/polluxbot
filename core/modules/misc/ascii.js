var gear = require("../../gearbox.js");
var ascii = require("ascii-art");
var cmd = 'ascii';

var init = function (message, userDB, DB) {

    //    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');

    ascii.Figlet.fontPath = './resources/fonts/';
    const string = message.content.substr(message.prefix.length + cmd.length + 1)

    if (string.length > 18) {
        return message.reply(":warning:")
    }

    console.log(string)

    ascii.font(string, "standard", render => {
        console.log(render)
        message.channel.send("```" + render + "```")
    })







}
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
