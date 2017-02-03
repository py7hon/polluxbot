exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    const Jimp = require("jimp");
    var paths = require("../paths.js");


    let modRole = message.guild.roles.find("name", "MOD");
    let admRole = message.guild.roles.find("name", "ADM");

    if (!message.member.roles.has(modRole.id) && !message.member.roles.has(admRole.id)) {
        return message.reply("como assim tu quer kickar alguém, seu pleb.").catch(console.error);
    }
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

    gear.roundify(img, caller)
    setTimeout(function () {
        Jimp.read(paths.ROUND + caller + '.png').then(function (face) {
            face.resize(96, 96)
            face.rotate(-45)
            Jimp.read(paths.BUILD + "jazz.png").then(function (jazz) {
                jazz.composite(face, 80, 31);
                jazz.write(`${paths.ROUND}/${caller}2.png`);

            });

        });
    }, 800)
    message.channel.sendMessage('Ok, me dá um segundo...')
    setTimeout(function () {
        message.channel.sendFile(`${paths.ROUND}/${caller}2.png`, 'kicked.png', `:boot: Meti um pé na bunda de ${kik.username}.`).then(m => {
            kickMember.kick()
        }).catch(console.error)
    }, 3000)


}
