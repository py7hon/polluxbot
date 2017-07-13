var cmd = 'ahegao';
var gear = require("../gearbox.js");
var ff = require("../functionfest.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var init = function (message,userDB,DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var LANG = message.lang;

    //-------MAGIC----------------

    if(DB.get(Server.id).channels[Channel.id].modules.NSFW==false){
        message.reply(mm('forFun.nsfwNope',{lngs:LANG}));
        return;
    }



    var rand = ff.randomize(1,7)

    message.channel.sendFile(paths.BUILD+"ahegao/"+rand+".jpg")

};

 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'misc'};


