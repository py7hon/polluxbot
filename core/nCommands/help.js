var gear = require("../gearbox.js");
var fs = require("fs");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();


var cmd = 'help';

var init = function (message,userDB,DB) {
    var LANG = message.lang;


        txt3 = `

**COMMAND LIST:** http://pollux.lucasflicky.com/commands.html


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


            message.author.sendMessage(txt3).catch()


    //----Mess








    console.log("HELP INVOKED")
  //  message.reply(mm('help.checkYeDM',{lngs:LANG}))
    message.reply("See my command list at: http://pollux.lucasflicky.com/commands")
};

module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'help'
};
