const fs = require("fs");
const getter = require("booru-getter");
var gear = require('../gearbox.js');
let points = JSON.parse(fs.readFileSync('../points.json', 'utf8'));

exports.run = (bot, message, args) => {

    var caller = gear.gear.checkment(message).username
        console.log("SAFEBOORU INVOKED by " + caller + "-------------\n")
        console.log(1)
        let query = message.content.split(" ");
        !query[1] ? query[1] = "1girl" : query[1] = query[1];
        getter.getRandom(query[1], (url) => {
            console.log(2)
            if (url === undefined) {
                message.reply("Não achei nada com essas tags :(")
            }
            else {
                message.reply('http:' + url)
            }
        })
    };

