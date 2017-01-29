const fs = require("fs");
var gear = require('../gearbox.js');

let points = JSON.parse(fs.readFileSync('../points.json', 'utf8'));

exports.run = (bot, message, args) => {
let userData = points[message.author.id];

        userData.persotext = message.content.substr(13)
        message.reply(`Seu texto pessoal mudou para:

*` + message.content.substr(13) + `*

Digite \`+profile\` para visualizar ele em seu Profile Card~`)
    }

