var gear = require("../gearbox.js");
var fs = require("fs");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();


var cmd = 'help';

var init = function (message,userDB,DB) {
    var LANG = message.lang;



var commands = [];
var commandInfo = {};
var txt = ""
var txt2 = ""
var txt3 = ""
var tx = ""
    let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (message.guild.mods.GOODMOJI) {
        GOODMOJI = message.guild.mods.GOODMOJI
    }
    if (message.guild.mods.GOODNAME) {
        GOOD = message.guild.mods.GOODNAME
    }
    fs.readdir("./core/nCommands/", (err, files) => {
        //if (err) return console.error(err);
        files.forEach(file => {
            var comm = require('./'+file)


            commandInfo = {
                name: comm.cmd,
                category: comm.cat,
                description: mm('help.' + comm.cmd, {
                    lngs: LANG,
                    langs: "pt, en",
                    prefix: message.prefix,
                    good:GOOD.toLowerCase()
                })
                ,public: comm.pub
            }

            if(commandInfo.public==true||commandInfo.category!=undefined){

            commands.push(commandInfo)
            }

        });
            for (i in commands){
    tx = `
__**${message.prefix+commands[i].name}**__
Category: _${commands[i].category}_
${commands[i].description}
`

   if((txt+tx).length<1000){
    txt = txt + tx
   }else{
       txt2=txt2 + tx
   }


}
        txt2 = txt2 + `
${mm('help.disableNuisance', {
                    lngs: LANG,

                    prefix: message.prefix,

                })}

${mm('help.invite', {
                    lngs: LANG,

                    prefix: message.prefix,

                })}: https://discordapp.com/oauth2/authorize?client_id=271394014358405121&scope=bot&permissions=2121661559

${mm('help.joinSupp', {
                    lngs: LANG,

                    prefix: message.prefix,

                })}: https://discord.gg/ay48h7Q

`


        message.author.sendMessage(txt).catch()

            message.author.sendMessage(txt2).catch()

        return
    });
    //----Mess








    console.log("HELP INVOKED")
    message.reply(mm('help.checkYeDM',{lngs:LANG}))
};

module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'help'
};
