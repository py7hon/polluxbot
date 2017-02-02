var paths = require("./paths.js");
const Jimp = require("jimp");
const fs = require("fs");

module.exports = {
    drops : 0,
    vacuum : [],
    ongoing : false,
    writePoints: function writePoints(points,caller){
          fs.writeFile('../points.json', JSON.stringify(points), (err) => {
        console.log("JSON write event on " + caller + "'s activity -------------\n")
        if (err) console.log("JSON ERROR  on " + caller + "'s activity -------------\n" + err)
    });
    },
    checkAdm: function checkAdm(origin, target) {

        let modRole = origin.guild.roles.find("name", "MOD");
        let admRole = origin.guild.roles.find("name", "ADM");
        let maidRole = origin.guild.roles.find("name", "🎀   Maids");




        if (origin.guild.member(target).roles.has(admRole.id)) {
            return "ADM";
        }
        else if (origin.guild.member(target).roles.has(modRole.id)) {
            return "MOD";
        }
        else if (origin.guild.member(target).roles.has(maidRole.id)) {
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

       if(!message.mentions.users.size){

           return message.author

       }else{

           return message.mentions.users.first()
       }
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
                         console.log("Glassify Done")
                    });
                });
            })
        });
    }
     , roundify: function roundify(img, call, msg = false) {
         console.log('ROUNDIFY')
        Jimp.read(img).then(function (user) {
           user.resize(126, 126)
                Jimp.read(paths.BUILD + "note.png").then(function (lenna) {


                        user.mask(lenna, 0, 0)
                        user.write(`${paths.ROUND}/${call}.png`);

                });

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
          var cardimg = Jimp.read(`${paths.BUILD}cards/fiver.png`).then(function(cardimg) {
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
        }, 300);
        setTimeout(function () {
            Jimp.read(`${paths.BUILD}cards/${array[2].card}.png`).then(function (c1) {
                cardimg.composite(c1, 2 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}2_bj.png`)
                console.log(array[2].card + "-------------------------------------")
            })
        }, 600);
        setTimeout(function () {
            console.log(`${paths.BUILD}cards/${array[3].card}.png`)
            Jimp.read(`${paths.BUILD}cards/${array[3].card}.png`).then(function (c1) {
                cardimg.composite(c1, 3 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}3_bj.png`)
            })
        }, 900);
        setTimeout(function () {
            Jimp.read(`${paths.BUILD}cards/${array[4].card}.png`).then(function (c1) {
                cardimg.composite(c1, 4 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}4_bj.png`)
                cardimg.write(`${paths.BUILD}cards/${who}5_bj.png`)
                console.log(array[5].card + "-------------------------------------")
            })
        }, 1200);
    })}
    , drawalt: function drawalt(array, who) {

         if (array.length >= 1) {


        var cardimg = Jimp.read(`${paths.BUILD}cards/fiver.png`).then(function(cardimg) {


        Jimp.read(`${paths.BUILD}cards/${array[0].card}.png`).then(function (c1) {
            cardimg.composite(c1, 0 * 96, 0)
            cardimg.write(`${paths.BUILD}cards/${who}0_bj.png`)
            console.log(array[0].card)
        })
         }) };
         if (array.length >= 2) {
        setTimeout(function () {
            Jimp.read(`${paths.BUILD}cards/${array[1].card}.png`).then(function (c1) {
                cardimg.composite(c1, 1 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}1_bj.png`)
            })
        }, 50);}
         if (array.length >= 3) {
        setTimeout(function () {
            Jimp.read(`${paths.BUILD}cards/${array[2].card}.png`).then(function (c1) {
                cardimg.composite(c1, 2 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}2_bj.png`)
                console.log(array[2].card + "-------------------------------------")
            })
        }, 100);
         }
         if (array.length >= 4) {
        setTimeout(function () {
            console.log(`${paths.BUILD}cards/${array[3].card}.png`)
            Jimp.read(`${paths.BUILD}cards/${array[3].card}.png`).then(function (c1) {
                cardimg.composite(c1, 3 * 97, 0)
                cardimg.write(`${paths.BUILD}cards/${who}3_bj.png`)
            })
        }, 150);
         }
         if (array.length >= 5) {
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
}
