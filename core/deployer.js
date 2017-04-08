var commands = {};
const fs = require('fs');
const path = require('path');
var cfg = require('../config.js');
//var DB = JSON.parse(fs.readFileSync('./database/servers.json', 'utf8'));
//var userDB = JSON.parse(fs.readFileSync('./database/users.json', 'utf8'));



var deploy = function (message, userDB, DB) {

    var bot = message.botUser
    var command = message.content.substr(message.guild.mods.PREFIX.length).split(' ')[0]
    let commandFile;
    try {
        console.log(command)
        console.log(message.guild.mods.GOODNAME.toLowerCase())









        switch (true) {
            case command == message.guild.mods.GOODNAME.toLowerCase():
            case command == message.guild.mods.GOODNAME.toLowerCase() + "s":
            case command == "$":
        commandFile = require(`./nCommands/cash.js`);
        break;
        case command == message.guild.mods.GOODNAME.toLowerCase() + 'rank':
            commandFile = require(`./nCommands/cashrank.js`);
            break;
                 case command == 'incinerate':
            commandFile = require(`./nCommands/clear.js`);
            break;

        default:
            try {
                delete require.cache[require.resolve(`./nCommands/${command}.js`)];
                commandFile = require(`./nCommands/${command}.js`);
            } catch (e) {}
            break;

    }

    /*

    if (command == message.guild.mods.GOODNAME.toLowerCase()||command == message.guild.mods.GOODNAME.toLowerCase()+"s"||command=="$") {

        commandFile = require(`./nCommands/cash.js`);


    } else if (command == message.guild.mods.GOODNAME.toLowerCase() + 'rank') {

        commandFile = require(`./nCommands/cashrank.js`);
    } else {
        try {
            delete require.cache[require.resolve(`./nCommands/${command}.js`)];
            commandFile = require(`./nCommands/${command}.js`);
        } catch (e) {}
    }
    */

    //if (commandFile.skynet && message.guild.id!='248285312353173505') return;

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
var checkUse = function (msg) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];

        let commandFile = require(`./nCommands/${command}.js`);


        switch (true) {

            // case msg.guild.mods.DISABLED.includes(commandFile.cat):
            // case msg.guild.mods.DISABLED.includes(commandFile.cmd):
            //        return "DISABLED";
            //      break;
            case msg.channel.mods.DISABLED.includes(commandFile.cat):
            case msg.channel.mods.DISABLED.includes(commandFile.cmd):
                return "DISABLED";
                break;
            case msg.author.mods.PERMS < commandFile.perms:
                return "NO PRIVILEGE";
                break;
            default:
                return true;
                break;
        }


    } catch (err) {
        console.log((err.stack).red)
    }


}
var checkPerms = function (msg) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];
        let commandFile = require(`./nCommands/${command}.js`);
        commandFile.perms;
        console.log(commandFile.perms)
    } catch (err) {
        //console.log(err.stack)
    }
}
var checkModule = function (msg) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];
        let commandFile = require(`./nCommands/${command}.js`);
        commandFile.mod;
        console.log(commandFile.mod)
    } catch (err) {
        //console.log(err.stack)
    }
}


var commCheck = function (msg, userDB, DB) {
    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];

        commands[command].init(msg, userDB, DB);
    } catch (err) {
        //  console.log(err.stack)
    }
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
