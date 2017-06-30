var request = require('request');
var cheerio = require('cheerio');
var rotation = []
const fs = require("fs");
const Jimp = require("jimp");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
const Discord = require("discord.js");


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
            var $ = cheerio.load(html);
            $('.cookie-link').each(function (i, element) {

                //console.log(element)
                //  console.log(this)
                var a = $(this).children()[0] //[0];

                var txt = $(a).html();
                if ($(a).html() === null) txt = $(this).text();

            //    message.channel.sendMessage("```html\n" + txt + "```")
                //  message.reply(a.text())



                Jimp.read(paths.BUILD + 'fortune.jpg').then(function (base) {


                    var ovlay = new Jimp(278, 80, function (err, txbox) {
                        // txbox.background(0xFFFFFFFF)
                    })
                    Jimp.loadFont(paths.FONTS + 'TXT.fnt').then(function (sub) {


                        ovlay.print(sub, 0, 0, txt, 200);
                      //  ovlay.opaque();
                        ovlay.autocrop();
                        var kalk = ovlay.clone();
                        kalk.autocrop(false);
                        kalk.contain(278,80,Jimp.VERTICAL_ALIGN_CENTER)
                        kalk.invert();
                        //  txbox.print(sub, 0, 0, txt, 665);
                        kalk.rotate(11);
                            base.composite(kalk, 192, 91);
                        base.getBuffer(Jimp.MIME_PNG, function (err, image) {
                            message.channel.sendFile(image, 'cookie.png', message.author + " ")

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
    cat: 'misc'
};
