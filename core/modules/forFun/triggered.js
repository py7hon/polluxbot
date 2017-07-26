const fs = require("fs");

var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'profile';

var init = function (message, userDB, DB) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
if (Author.bot) return;
var Member = Server.member(Author);
var Target = message.mentions.users.first() || Author;

var img = Target.displayAvatarURL
gear.Jimp.read(img).then(function (photo) {
    photo.resize(512, 512)
    gear.Jimp.read(paths.BUILD + "trigger.png").then(function (lenna) {

        photo.composite(lenna,0,0)

        console.log("Success".green)
        photo.getBuffer(gear.Jimp.MIME_PNG, function (err, image) {
            message.channel.send({files:[{attachment:image,name:"file.png"}]})
        })

    })
})

}




module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
