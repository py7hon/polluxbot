var paths = require("./paths.js");
const Jimp = require("jimp");

module.exports = {
    drops : 0,
    vacuum : [],
    ongoing : false,
    checkAdm: function checkAdm(origin, target) {
        if (origin.guild.member(target).roles.exists("name", "ADM")) {
            return "ADM";
        }
        else if (origin.guild.member(target).roles.exists("name", "MOD")) {
            return "MOD";
        }
        else if (origin.guild.member(target).roles.exists("name", "🎀   Maids")) {
            return "MAID";
        }
        else if (target.bot) {
            return "BOT";
        }
        else {
            return "none";
        }
    }
    , checkment: function checkment(message) {
        let ment = message.mentions.users.first()
        let tgt = message.author;
        ment === undefined ? tgt = message.author : tgt = ment;
        return tgt
    }
    , checkCookies: function checkCookies(amount, invoker) {
        if (invoker.cookies >= amount) {
            return true;
        }
        else {
            return false;
        }
    }
    , glassify: function glassify(img, call, msg = false) {
        Jimp.read(img).then(function (user) {
            Jimp.read(paths.BUILD + "glass.png").then(function (glass) {
                Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
                    user.resize(126, 126)
                    user.mask(glass, 0, 0)
                    var air = {}
                    Jimp.read(paths.BUILD + "note.png").then(function (lennaB) {
                        lennaB.composite(user, 0, 0)
                        lennaB.mask(lenna, 0, 0)
                        lennaB.write(`${paths.GLASS}/${call}.png`);
                    });
                });
            })
        });
    }
    , randomize: function randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    , shuffle: function shuffle(array) {
        var currentIndex = array.length
            , temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    , clean: function clean(text) {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }
    , draw: function draw(array, who) {
        var cardimg = new Jimp(array.length * 98, 147, function (err, image) {});
        Jimp.read(`${paths.BUILD}cards/${array[0].card}.png`).then(function (c1) {
            cardimg.composite(c1, 0 * 96, 0)
            cardimg.write(`${paths.BUILD}cards/${who}0_bj.png`)
            console.log(array[0].card)
        })
        setTimeout(function () {
            Jimp.read(`${paths.BUILD}cards/${array[1].card}.png`).then(function (c1) {
                cardimg.composite(c1, 1 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}1_bj.png`)
            })
        }, 50);
        setTimeout(function () {
            Jimp.read(`${paths.BUILD}cards/${array[2].card}.png`).then(function (c1) {
                cardimg.composite(c1, 2 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}2_bj.png`)
                console.log(array[2].card + "-------------------------------------")
            })
        }, 100);
        setTimeout(function () {
            console.log(`${paths.BUILD}cards/${array[3].card}.png`)
            Jimp.read(`${paths.BUILD}cards/${array[3].card}.png`).then(function (c1) {
                cardimg.composite(c1, 3 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}3_bj.png`)
            })
        }, 150);
        setTimeout(function () {
            Jimp.read(`${paths.BUILD}cards/${array[4].card}.png`).then(function (c1) {
                cardimg.composite(c1, 4 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}4_bj.png`)
                cardimg.write(`${paths.BUILD}cards/${who}5_bj.png`)
                console.log(array[5].card + "-------------------------------------")
            })
        }, 200);
    }
}
