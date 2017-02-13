var gear = require("../gearbox.js");
var fs = require("fs");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'help';

var init = function (message, userDB, DB) {
    var LANG = message.lang;


var commands = [];
var commandInfo = {};
var txt = ""
var tx = ""

    fs.readdir("./core/nCommands/", (err, files) => {
        //if (err) return console.error(err);
        files.forEach(file => {
            var comm = require('./'+file)


            commandInfo = {
                name: comm.cmd,
                category: comm.cat,
                description: mm('help.' + comm.cmd, {
                    lngs: LANG
                })
                ,public: comm.pub
            }
            if(commandInfo.public==true){

            commands.push(commandInfo)
            }

        });
            for (i in commands){
    tx = `
__**${message.prefix+commands[i].name}**__
Category: _${commands[i].category}_
${commands[i].description}
`
    txt = txt + tx


}
        txt = txt + `
Disabling annoying autopost commands:
Goodies/Gems Drops: ${message.prefix}disable DROPS
Level Up pictures: ${message.prefix}disable LVUP

Invite me to your server: https://discordapp.com/oauth2/authorize?client_id=271394014358405121&scope=bot&permissions=2121661559

Join the Support Discord:https://discord.gg/ay48h7Q

`
        message.author.sendMessage(txt)
       return
    });
    //----Mess








    console.log("HELP INVOKED")
    message.reply("Te enviei uns lance em pvt, dá um zóio.")
};

module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'help'
};
