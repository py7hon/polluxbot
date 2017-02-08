exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    const Jimp = require("jimp");
    var paths = require("../paths.js");


    // let fuq = message.guild.roles.find("name", "Malcriados");
    //let modRole = message.guild.roles.find("name", "MOD");
    //let admRole = message.guild.roles.find("name", "ADM");

    // if (!message.member.roles.has(modRole.id) && !message.member.roles.has(admRole.id)) {
    //        return message.reply("como assim tu quer kickar alguém, seu pleb.").catch(console.error);
    //  }
    if (message.mentions.users.size === 0) {
        return message.reply("tu precisa me dizer de quem eu vou chutar a bunda").catch(console.error);
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    let kik = message.mentions.users.first()
    if (!kickMember) {
        return message.reply("deu ruim, não achei esse maluco");
    }
    if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
        return message.reply("Por algum raio de razão eu não posso kickar esse cara. MIMDÁ PERMISSÃO").catch(console.error);
    }


    let img = bot.user.avatarURL.substr(0, bot.user.avatarURL.length - 10)
    if (kik.avatarURL !== undefined) {
        img = kik.avatarURL.substr(0, kik.avatarURL.length - 10);
    }

    Jimp.read(img).then(function (face) {
        face.resize(126, 126)
        Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
            face.mask(lenna, 0, 0)


            face.resize(96, 96)
            face.rotate(-45)
            Jimp.read(paths.BUILD + "jazz.png").then(function (jazz) {
                jazz.composite(face, 80, 31);
                //jazz.write(`${paths.ROUND}/${caller}2.png`);
                message.channel.sendMessage('Ok, me dá um segundo...')
                jazz.getBuffer(Jimp.MIME_PNG, function (err, image) {


                    message.channel.sendFile(image, 'kicked.png', `:lock: Mandei ${kik.username} passear na Masmorra.`).then(m => {
                       // kickMember.addRole(fuq)
                    }).catch(console.error)
                })
            });

        });
    });



}
