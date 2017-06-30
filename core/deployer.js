var commands = {};
const fs = require('fs');
const path = require('path');
var cfg = require('../config.js');


//MDLE -- returns module
var checkModule = function (msg) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];
        let commandFile = require(`./commands/${command}.js`);
        return commandFile.mod;

    } catch (err) {}
}


//USBT -- returns usability
var checkUse = function (msg, DB, userDB) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];

        let commandFile = require(`./commands/${command}.js`);

        switch (true) {

            case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cat):
            case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cmd):
                return "DISABLED";
                break;
            case msg.author.PLXpems > commandFile.perms:
                return "NO PRIVILEGE";
                break;
            default:
                return true;
                break;
        }

    } catch (err) {
        // console.log((err.stack).red)

    }

}


var deploy = function (message, userDB, DB) {


    var bot = message.botUser
    var command = message.content.substr(DB.get(message.guild.id).modules.PREFIX.length).split(' ')[0]
    let commandFile;
    try {


        if (!DB.get(message.guild.id).modules) {
            DB.get(message.guild.id).modules.GOODNAME = "Ruby"
        }

        switch (true) {

            case command == "$":
            case command == "ruby":
            case command == "rubys":
                commandFile = require(`./commands/cash.js`);
                break;
            case command == DB.get(message.guild.id).modules.GOODNAME.toLowerCase() + 'rank':
                commandFile = require(`./commands/cashrank.js`);
                break;
            case command == 'incinerate':
                commandFile = require(`./commands/clear.js`);
                break;

            default:
                try {
                    delete require.cache[require.resolve(`./commands/${command}.js`)];
                    commandFile = require(`./commands/${command}.js`);
                } catch (err) { }
                break;

        }

        commandFile.init(message, userDB, DB);

        console.log(("  --== " + command.toUpperCase() + " ==--   ").bgMagenta.yellow.bold)
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




var checkPerms = function (msg) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];
        let commandFile = require(`./commands/${command}.js`);
        return commandFile.perms;

    } catch (err) {}
}



var commCheck = function (msg, userDB, DB) {
    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];

        commands[command].init(msg, userDB, DB);
    } catch (err) {}
};



module.exports = {
    commCheck: commCheck,
    run: deploy,
    pullComms: pullComms,
    pushComms: pushComms,
    checkModule: checkModule,
    checkPerms: checkPerms,
    checkUse: checkUse
};
