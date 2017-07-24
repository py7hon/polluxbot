const Discord = require("discord.js")
const fs = require('fs');
const path = require('path');
const cfg = require('../config.js');
const hook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);

module.exports = {
    determine: function determine(msg) {
        let query = msg.content.substr(msg.prefix.length).split(' ')[0];
        let aliases = JSON.parse(fs.readFileSync("./core/aliases.json", 'utf8'));

        let command;
        if (aliases[query]) command = aliases[query].toLowerCase();
        else command = query.toLowerCase();

        let path = ""
        let files = fs.readdirSync(__dirname + "/modules")


        for (i = 0; i < files.length; i++) {
            let filedir = __dirname + "/modules/" + files[i]

            let morefiles = fs.readdirSync(filedir)
            if (morefiles.indexOf(command + ".js") > -1) {


                let pathTo = filedir + "/" + command + ".js";

                let comm = require(pathTo)

                return {
                    path: pathTo,
                    cat: comm.cat,
                    module: files[i]
                }

            }
        }
        return false

    },
    checkModule: function checkModuleNEW(DTMN) {

        return DTMN.module
    },
    checkCategory: function checkCategoryNEW(DTMN) {

        return DTMN.cat
    },
    checkUse: function checkUseNEW(DTMN, DB, msg) {
        try {
            let commandFile = require(DTMN.path);
            switch (true) {
                case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cat):
                case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(DTMN.module):
                case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cmd):
                    return "DISABLED";
                    break;
                case msg.author.PLXpems > commandFile.perms:
                    return "NO ELEVATION";
                    break;
                default:
                    return true;
                    break;
            }
        } catch (err) {
            console.log((err.stack).red)
        }
    },
    run: function run(file, message, userDB, DB) {

        try {

            require.cache[require.resolve(file)];
            let command = require(file)


            let commandname = message.content.split(" ")[0]
            command.init(message, userDB, DB);

            console.log(("  --== " + commandname.toUpperCase() + " ==--   ").bgMagenta.yellow.bold)
        } catch (e) {
            console.log(e);
        }
    }
};
