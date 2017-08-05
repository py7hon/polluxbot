var request = require('request');

var rotation = []
const fs = require("fs");

var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();



var cmd = 'fortunecookie';
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


   Channel.startTyping()
    //-------MAGIC----------------
    request('http://www.fortunecookiemessage.com/', function (error, response, html) {

        if (!error && response.statusCode == 200) {
            var $ = gear.cheerio.load(html);
            $('.cookie-link').each(function (i, element) {

                //console.log(element)
                //  console.log(this)
                var a = $(this).children()[0] //[0];

                var txt = $(a).html();
                if ($(a).html() === null) txt = $(this).text();

            //    message.channel.send("```html\n" + txt + "```")
                //  message.reply(a.text())



                gear.Jimp.read(paths.BUILD + 'fortune.jpg').then(function (base) {


                    var ovlay = new gear.Jimp(278, 80, function (err, txbox) {
                        // txbox.background(0xFFFFFFFF)
                    })
                    gear.Jimp.loadFont(paths.FONTS + 'TXT.fnt').then(function (sub) {


                        ovlay.print(sub, 0, 0, txt, 200);
                      //  ovlay.opaque();
                        ovlay.autocrop();
                        var kalk = ovlay.clone();
                        kalk.autocrop(false);
                        kalk.contain(278,80,gear.Jimp.VERTICAL_ALIGN_CENTER)
                        kalk.invert();
                        //  txbox.print(sub, 0, 0, txt, 665);
                        kalk.rotate(11);
                            base.composite(kalk, 192, 91);
                        base.getBuffer(gear.Jimp.MIME_PNG, function (err, image) {
                            message.channel.send(message.author + " ",{files:[image]}).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})

                        })
                    })



                })


            });

        }



 Channel.stopTyping()

    })
}

module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'forFun'
};
