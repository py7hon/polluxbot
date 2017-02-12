var commands = {};
const fs = require('fs');
const path = require('path');
var cfg = require('../config.js');
var DB = JSON.parse(fs.readFileSync('./database/servers.json', 'utf8'));
var userDB = JSON.parse(fs.readFileSync('./database/users.json', 'utf8'));



var deploy = function (message) {
    var bot = message.botUser
    var command = message.content.substr(message.guild.mods.PREFIX.length).split(' ')[0]

    try {
        delete require.cache[require.resolve(`./nCommands/${command}.js`)];
        let commandFile = require(`./nCommands/${command}.js`);
        commandFile.init(message, userDB, DB);
        console.log(("  --== " + command.toUpperCase() + " ==--   ").bgBlue.yellow.bold)
    } catch (err) {
        console.log((err.stack).red)
    }
};

var pullComms = function () {
    return commands;
};

var pushComms = function (t) {
    commands = t;
};

var commCheck = function (msg) {
    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];

        commands[command].init(msg, userDB, DB);
    } catch (err) {
        //console.log(err.stack)
    }
};
module.exports = {
    commCheck: commCheck,
    run: deploy,
    pullComms: pullComms,
    pushComms: pushComms
};
