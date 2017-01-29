exports.run = (bot, message, args) => {
        console.log("GLASSIFY INVOKED by " + caller + "-------------\n")
        let img = message.author.avatarURL.substr(0, message.author.avatarURL.length - 10)
            // message.channel.sendFile(img)
            //  aImg = Jimp.read(img, function (err, image) {});
        glassify(img, caller)
        setTimeout(function () {
            message.channel.sendFile(`${GLASS}/${caller}.png`)
        }, 2000);
    };
