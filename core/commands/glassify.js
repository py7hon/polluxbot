var paths = require("./paths.js");
exports.run = (bot, message, args) => {
        console.log("paths.GLASSIFY INVOKED by " + caller + "-------------\n")
        let img = message.author.avatarURL.substr(0, message.author.avatarURL.length - 10)
            // message.channel.sendFile(img)
            //  aImg = Jimp.read(img, function (err, image) {});
        gear.glassify(img, caller)
        setTimeout(function () {
            message.channel.sendFile(`${paths.GLASS}/${caller}.png`)
        }, 2000);
    };
