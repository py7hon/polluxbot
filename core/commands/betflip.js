var paths = require("./paths.js");
exports.run = (bot, message, args) => {
        if (checkCookies(3, userData) == false) {
            message.reply(" você não tem cookies suficientes. Você precisa pelo menos **3** :cookie:");
            return;
        }
        var bet = message.content.toLowerCase().split(' ');
        if (bet.length <= 2) {
            message.reply('Comando incorreto, use `+beflip <quantidade> <resultado>` Ex: `+betflip 5 cara`');
            return;
        }
        if (isNaN(parseInt(bet[1], 10))) {
            console.log("isnan")
            message.reply('Comando incorreto, use `+beflip <quantidade> <resultado>` Ex: `+betflip 5 cara`');
            return;
        };
        if (checkCookies(parseInt(bet[1]), userData) == false) {
            message.reply(" cê não tá com essa bola toda não...");
            return;
        };
        console.log(bet[2])
        if (bet[2] != "cara" && bet[2] != "coroa") {
            message.reply('Comando incorreto, use `+beflip <quantidade> <resultado>` Ex: `+betflip 5 cara`');
            return;
        }
        userData.cookies -= bet[1]
        var coin = randomize(1, 2);
        var res = ""
        var ros = ""
        coin == 1 ? res = "Cara" : res = "Coroa";
        coin == 1 ? ros = "heads.png" : ros = "tails.png";
        if (res.toLowerCase() == bet[2]) {
            message.channel.sendFile(paths.BUILD + 'heads.png', 'heads.png', "Yay! " + res + "! Você ganhou **" + (bet[1] * 2) + "**")
            userData.cookies += bet[1] * 2
        }
        else {
            message.channel.sendFile(paths.BUILD + ros, ros, "Putz! " + res + "! Você perdeu...")
        }
    }
