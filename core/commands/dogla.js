const fs = require("fs");
const Jimp = require("jimp");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'dogla';
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
    if (message.channel.type == 'dm') {
        message.reply(nope)
        return
    }


    const dogla = paths.BUILD + "dogla.jpg"
    var txt = MSG.substr((message.prefix + cmd).length + 1)

    if (txt.startsWith("http://")||txt.startsWith("https://")) {
        message.delete()
        if (txt.includes("imgur") && (!txt.includes('png') && !txt.includes('jpg') && !txt.includes('gif'))) {
            txt = txt + ".png"
        }
        Jimp.read(dogla).then(function (base) {
            Jimp.read(txt, function (err, ovlay) {
                if (err) {
                    message.reply("INVALID IMAGE URL")
                }
                ovlay.contain(665, 170, Jimp.HORIZONTAL_ALIGN_CENTER);
                ovlay.rotate(-6);
                base.composite(ovlay, 100, 24);
                base.getBuffer(Jimp.MIME_PNG, function (err, image) {
                    message.channel.send({files:[{attachment:image,name:"file.png"}]})


                })
            }) //.catch(err=> message.reply("INVALID URL"))


        }).catch()

    } else if (txt =="dogla"){

       Jimp.read(dogla).then(function (base) {
            Jimp.read(dogla, function (err, ovlay) {
                if (err) {
                    message.reply("INVALID IMAGE URL")
                }
                ovlay.contain(665, 170, Jimp.HORIZONTAL_ALIGN_CENTER);
                ovlay.rotate(-6);
                base.composite(ovlay, 100, 24);
                base.getBuffer(Jimp.MIME_PNG, function (err, image) {
                    message.channel.send({files:[{attachment:image,name:"file.png"}]})


                })
            }) //.catch(err=> message.reply("INVALID URL"))


        }).catch()

    }
    else if (txt.startsWith("$")){

       Jimp.read(dogla).then(function (base) {
            Jimp.read('./resources/imgres/reactions/'+txt.substr(1)+".png", function (err, ovlay) {
                if (err) {
                    message.reply("NOT A SERVER IMAGE")
                }
                ovlay.contain(665, 170, Jimp.HORIZONTAL_ALIGN_CENTER);
                ovlay.rotate(-6);
                base.composite(ovlay, 100, 24);
                base.getBuffer(Jimp.MIME_PNG, function (err, image) {
                    message.channel.send({files:[{attachment:image,name:"file.png"}]})


                })
            }) //.catch(err=> message.reply("INVALID URL"))


        }).catch()

    }else {

        if (txt =="") return message.reply("ERROR");
            message.delete(5000)

        //   cart.print(eval(skinfo.persotextF), skinfo.persotextX  , skinfo.persotextY , `${texp}`, skinfo.persotextWmax);

        Jimp.read(dogla).then(function (base) {


                var ovlay = new Jimp(947, 100, function (err, txbox) {
           // txbox.background(0xFFFFFFFF)
                })
            Jimp.loadFont(paths.FONTS + 'BIG.png.fnt').then(function (sub) {

            let totalWidth = measureText(sub, txt)
            ovlay.print(sub, Math.floor(947 / 2 - totalWidth / 2), Math.floor(100 / 2 - 64), txt);
            ovlay.opaque();
                  //  txbox.print(sub, 0, 0, txt, 665);

                ovlay.rotate(-6);
                base.composite(ovlay, 0, 24);
                    base.getBuffer(Jimp.MIME_PNG, function (err, image) {
                     message.channel.send({files:[{attachment:image,name:"file.png"}]})

                    })
            })



        })


    }


function measureText(font, text) {
    var x = 0;
    for (var i = 0; i < text.length; i++) {
        if (font.chars[text[i]]) {
            x += font.chars[text[i]].xoffset
                + (font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]] ? font.kernings[text[i]][text[i + 1]] : 0)
                + (font.chars[text[i]].xadvance || 0);
        }
    }
    return x;
};


}

module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
