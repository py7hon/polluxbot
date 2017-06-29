const Discord = require("discord.js");
const arraySort = require('array-sort')
const Jimp = require("jimp");
const fs = require("fs");
var paths = require("../paths.js");

exports.run = (bot, message) => {

  console.log('Illegal - Start');
  
  
    let textHolder = new Jimp(128, 100, function (err, image) {});

    var A = message.content

    Jimp.read(`${paths.BUILD}illegal.jpg`).then(function (illegal) {
       
        Jimp.loadFont(paths.FONTS + 'blackTXT.fnt').then(function (sub) {
            //textHolder.print(sub, 0, 0, A);
            textHolder.print(sub, 0, 0, A, 128);
            textHolder.rotate(7);
 console.log(3);
            illegal.composite(textHolder, 320, 135);
            illegal.getBuffer(Jimp.MIME_PNG, function (err, image) {
                message.channel.sendFile(image)
            })

            console.log('Illegal - Done');
        })
    })
}
