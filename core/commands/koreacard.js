    const fs = require("fs");
    const Jimp = require("jimp");
    var gear = require("../gearbox.js");
    var paths = require("../paths.js");
    var locale = require('../../utils/multilang_b');
    var mm = locale.getT();
    var cmd = 'crd';
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
            var input = args[0].toUpperCase()
            switch (args) {
            case "U":
                collectionLast = 8673
                type = "UNIT"
                break;
            case "M":
                collectionLast = 3861
                type = "MAGIC"
                break;
            case "E":
                collectionLast = 823
                type = "ENCHANT"
                break;
            case "L":
                collectionLast = 291
                type = "LAND"
                break;
            case "I":
                collectionLast = 1753
                type = "ITEM"
                break;
            }
            card = input
            url = "https://www.fantasymasters.co.kr/FM_Image/FM_image/fm/shop/Cardmarket/L_images/" + card + "L.jpg"
            Jimp.read(url).then(function (base) {
               // base.crop(25, 45, 240, 196)
                base.getBuffer(Jimp.MIME_PNG, function (err, image) {
                    message.channel.send({files:[image]})
                })
            })
        }


     module.exports = {
        pub: false
        , cmd: cmd
        , perms: 0
        , init: init
        , cat: 'private'
    };
