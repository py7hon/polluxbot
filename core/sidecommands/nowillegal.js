const Discord = require("discord.js");
const arraySort = require('array-sort')
const Jimp = require("jimp");
const fs = require("fs");
var paths = require("../paths.js");

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    if (args == "") return;

    let textHolder = new Jimp(120, 100, function (err, image) {});
    args.pop()
    args.pop()
    args.pop()
    var A = args.toString().split(',').join(' ')

    Jimp.read(`${paths.BUILD}illegal.jpg`).then(function (illegal) {
        console.log(3);
        Jimp.loadFont(paths.FONTS + 'blackTXT.fnt').then(function (sub) {
            textHolder.print(sub, 0, 0, A);
            textHolder.print(sub, 0, 32, `is now illegal`);
            textHolder.rotate(8);

            illegal.composite(textHolder, 318, 162);

            illegal.write(`${paths.MISC}/${caller}_illegal.jpg`);
            console.log(message.guild.name)
            console.log('Illegal - Done');
        })
    })
    setTimeout(f => {
        message.channel.sendFile(`${paths.MISC}/${caller}_illegal.jpg`)
    }, 2000)
}
