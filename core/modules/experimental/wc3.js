



var request = require('request');

var rotation = [[]]
const fs = require("fs");

var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();



var cmd = 'rotation-hots';
var LANG = ""
var init = function (message, userDB, DB) {
        var Server = message.guild;
        var Channel = message.channel;
        var Author = message.author;
        if (Author.bot) return;
        var Member = Server.member(Author);
        var Target = message.mentions.users.first() || Author;
        var MSG = message.content;
        var bot = message.botUser
        var args = MSG.split(' ').slice(1)
        LANG = message.lang;

        var nope = mm('CMD.noDM', {
            lngs: LANG
        });
        var gener = mm('builds.genProf', {
            lngs: LANG
        });
        var inf = mm('dict.infinite', {
            lngs: LANG
        });

        //-------MAGIC----------------


        //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (message.content.split(" ")[1]==helpkey || message.content.split(" ")[1]=="?"|| message.content.split(" ")[1]=="help"){
    return gear.usage(cmd,message,this.cat);
}
//------------

    request('https://www.epicwar.com/maps/'+gear.randomize(1,255000), function (error, response, html) {

  if (!error && response.statusCode == 200) {
    var $ = gear.cheerio.load(html);
    $('.hero-tile').each(function(i, element){




      var a = $(this).children()[0]//[0];




    });




  }

});



}

                 module.exports = {
                    pub:true,
                    cmd: cmd,
                    perms: 3,
                    init: init,
                    cat: 'misc'
                };



