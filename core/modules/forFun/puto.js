const fs = require("fs");

var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'puto';
var LANG = ""
var init = function (message, userDB, DB) {


 message.channel.send({files:["https://pbs.twimg.com/media/Cvi3xACWAAAqFoW.jpg" ]})



    /*
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
        if (message.channel.type === 'dm') {
            message.reply(nope)
            return
        }
        if (!DB.get(Server.id).modules.putometro_curr) {
            gear.paramDefine(Server, 'putometro_curr', 0)
        }
        if (!DB.get(Server.id).modules.putometro_max) {
            gear.paramDefine(Server, 'putometro_max', 0)
        }


        var a = DB.get(Server.id).modules.putometro_curr
        var s = DB.get(Server.id).modules.putometro_max



        gear.Jimp.read(paths.BUILD + "puto.jpg").then(function (base) {
                    gear.Jimp.loadFont(paths.FONTS + 'blackTXT.fnt').then(function (sub) {
                          base.print(sub, 235, 25, a.toString());
                          base.print(sub, 322, 65, s.toString());
                        base.getBuffer(gear.Jimp.MIME_PNG, function (err, image) {
                            message.channel.send({files:[{attachment:image,name:"file.png"}]})


                        })
                    })


                })
                                        */         }

                 module.exports = {
                    pub:true,
                    cmd: cmd,
                    perms: 3,
                    init: init,
                    cat: 'misc'
                };
