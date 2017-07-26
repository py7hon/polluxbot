const Discord = require("discord.js");
const polx = require("../pollux.js")
const fs = require("fs")
var defaults = require("../utils/defaults.js") // Database Defaults


module.exports = {
    run: function run(gear, DB, userDB, bot, member) {

        var Server = member.guild
        let locale = DB.get(Server.id).modules.LANGUAGE || "en";

        var chanpoint = false;
        try {

            let logchan = DB.get(Server.id).modules.LOGCHANNEL
            let advchan = DB.get(Server.id).modules.ADVLOG
            let actchan = DB.get(Server.id).modules.ACTLOG
            let modchan = DB.get(Server.id).modules.MODLOG

            // if( advchan && Server.channels.has(advchan)){chanpoint = Server.channels.get(advchan)}
            if (logchan && Server.channels.has(logchan)) {
                chanpoint = Server.channels.get(logchan)
            }
            if (actchan && Server.channels.has(actchan)) {
                chanpoint = Server.channels.get(actchan)
            }
            // if( modchan && Server.channels.has(modchan)){chanpoint = Server.channels.get(modchan)}

            if (chanpoint) {
                var id = member.id
                var emb = new Discord.RichEmbed;
                var left = JSON.parse(fs.readFileSync("../utils/lang/" + locale + "/translation.json", 'utf8')).leftServ;
                emb.setDescription(`:outbox_tray: **${member.user.username+"#"+member.user.discriminator}** ${left}`);

                emb.setColor("#c92525");
                var ts = new Date
                emb.setFooter("Leave", member.user.avatarURL)
                emb.setTimestamp(ts)

                chanpoint.send({
                    embed: emb
                }).catch()

            }

        } catch (err) {
            console.log(err)
        }

        if (Server) {
            let defaultgreetB = {
                hi: false,
                joinText: "%username% has left us!",
                greetChan: ""
            }
            if (!DB.get(Server.id).modules.FWELL || DB.get(Server.id).modules.FWELL === undefined) {
                gear.paramDefine(Server, "FWELL", defaultgreetB)
            }
            if (DB.get(Server.id).modules.FWELL.hiDEL === undefined) {
                gear.paramDefine(Server, "FWELL.hiDEL", 5000)
            }

            let delTime = DB.get(Server.id).modules.FWELL.hiDEL || 5000;

            if (typeof (DB.get(Server.id).modules.FWELL.hi) !=== 'undefined' && DB.get(Server.id).modules.FWELL.joinText !=== '' && DB.get(Server.id).modules.FWELL.hi == true) {

                let channels = member.guild.channels.filter(c => {
                    return (c.id === DB.get(Server.id).modules.FWELL.greetChan)
                });
                let channel = channels.first();
                let content = DB.get(Server.id).modules.FWELL.joinText.replace(/%user%/g, member.user).replace(/%username%/g, member.username);
                content = content.replace(/%server%/g, member.guild.name);
                try {
                    channel.send(content).then(m => {
                        if (typeof delTime === "number" && delTime > 0) {
                            m.delete(delTime).catch(e => {
                                console.log(e)
                                console.log("DELTIME FWELL 915".red)
                            })
                        }
                    });
                } catch (e) {}
            }
        }

    }
}
