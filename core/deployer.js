var commands = {};
const fs = require('fs');
const path = require('path');
var cfg = require('../config.js');


var deploy = function (message, userDB, DB) {

    var bot = message.botUser
    var command = message.content.substr(DB.get(message.guild.id).modules.PREFIX.length).split(' ')[0]
    let commandFile;
    try {
       // console.log(command)
    //    console.log(DB[message.guild.id].modules.GOODNAME.toLowerCase())





if (!DB.get(message.guild.id).modules){
DB.get(message.guild.id).modules.GOODNAME = "Ruby"
}



        switch (true) {
            //case command == DB[message.guild.id].modules.GOODNAME.toLowerCase():
            //case command == DB[message.guild.id].modules.GOODNAME.toLowerCase() + "s":
            case command == "$":
             case command == "ruby":
             case command == "rubys":
        commandFile = require(`./nCommands/cash.js`);
        break;
        case command == DB.get(message.guild.id).modules.GOODNAME.toLowerCase() + 'rank':
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

    if (command == DB[message.guild.id].modules.GOODNAME.toLowerCase()||command == DB[message.guild.id].modules.GOODNAME.toLowerCase()+"s"||command=="$") {

        commandFile = require(`./nCommands/cash.js`);


    } else if (command == DB[message.guild.id].modules.GOODNAME.toLowerCase() + 'rank') {

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
var checkUse = function (msg, DB, userDB) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];

        let commandFile = require(`./nCommands/${command}.js`);

console.log(DB.get(msg.guild.id).channels[msg.channel.id])
        switch (true) {

            case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cat):
            case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cmd):
                return "DISABLED";
                break;
            case userDB.get(msg.author.id).modules.PERMS > commandFile.perms:
                return "NO PRIVILEGE";
                break;
            default:
                return true;
                break;
        }


    } catch (err) {
        console.log((err.stack).red)
         if (msg.guild.name.includes("POLLUX")){

     //   msg.channel.sendMessage("```"+err.stack+"```")
        }
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
