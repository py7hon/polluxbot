
const polx = require("../pollux.js")
var defaults = require("../utils/defaults.js") // Database Defaults


module.exports = {
    run: function run(gear, DB, userDB, bot, member) {

        function serverSetup(guild) {


            if (!DB.get(guild.id) || DB.get(guild.id) == undefined) {

                console.log(('          --- - - - - = = = = = = Setting Up Guild:'.yellow + guild.name).bgBlue)

                DB.set(guild.id, defaults.gdfal)

                var gg = DB.get(guild.id);
                gg.name = guild.name;
                gg.ID = guild.id;
                if (guild.region === 'brazil') gg.modules.LANGUAGE = "dev";
                DB.set(guild.id, gg);

                guild.channels.forEach(element => {
                    if (element.type != 'voice') {
                        console.log('Setting Up Channel:'.white + element.name)

                        var GGD = DB.get(guild.id)
                        GGD.channels[element.id] = defaults.cdfal
                        DB.set(guild.id, GGD)
                        var gg = DB.get(guild.id)
                        gg.channels[element.id].name = element.name
                        DB.set(guild.id, gg)
                    }
                });
            } else {

                gear.normaliseGUILD(guild, DB)
            }

        }

        function channelSetup(element, guild) {

            console.log('Setting Up Channel:'.white + element.name + " from " + guild.name)
            //  DB.get(guild.id).channels[element.id] =
            //element.mods = DB.get(guild.id).channels[element.id].modules;
            var GGD = DB.get(guild.id)
            GGD.channels[element.id] = defaults.cdfal
            DB.set(guild.id, GGD)
            var gg = DB.get(guild.id)
            gg.channels[element.id].name = element.name
            gg.channels[element.id].ID = element.id
            DB.set(guild.id, gg)

        } //DB
        function userSetup(user) {

            if (!userDB.get(user.id)) {
                console.log('Setting Up Member:' + user.username)

                userDB.set(user.id, defaults.udefal)

                var uu = userDB.get(user.id)
                uu.name = user.username
                uu.ID = user.id
                userDB.set(user.id, uu)

            } else {
                gear.normaliseUSER(user, userDB, DB)
            }
        } //DB

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
                var emb = new gear.Discord.RichEmbed;
               var joined = JSON.parse(gear.fs.readFileSync("../utils/lang/"+locale+"/translation.json", 'utf8')).joinServ;

                emb.setDescription(`:inbox_tray: **${member.user.username+"#"+member.user.discriminator}** ${joined}`);
                emb.setColor("#25c9b0");
                var ts = new Date
                emb.setFooter("Join", member.user.avatarURL)
                emb.setTimestamp(ts)

                chanpoint.send({
                    embed: emb
                }).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})
            }
        } catch (err) {
            console.log(err)
        }
        if (Server) {
            let defaultgreet = {
                hi: false,
                joinText: "Welcome to the Server %username%!",
                greetChan: ""
            }
            try {
                if (!DB.get(Server.id).modules.GREET || DB.get(Server.id).modules.GREET === undefined) {
                    gear.paramDefine(Server, "GREET", defaultgreet)
                }
            } catch (e) {
                serverSetup(Server)
            }
            if (typeof (DB.get(Server.id).modules.GREET.hi) !== 'undefined' && DB.get(Server.id).modules.GREET.joinText !== '' && DB.get(Server.id).modules.GREET.hi == true) {
                if (DB.get(Server.id).modules.GREET.hiDEL === undefined) {
                    gear.paramDefine(Server, "GREET.hiDEL", 5000)
                }
                let delTime = DB.get(Server.id).modules.GREET.hiDEL || 5000;

                let channels = member.guild.channels.filter(c => {
                    return (c.id === DB.get(Server.id).modules.GREET.greetChan)
                });
                let channel = channels.first();
                let content = DB.get(Server.id).modules.GREET.joinText.replace(/%user%/g, member.user).replace(/%username%/g, member.username);
                content = content.replace(/%server%/g, member.guild.name);
                try {
                    channel.send(content).then(m => {
                        if (typeof delTime === "number" && delTime > 0) {
                            m.delete(delTime).catch(e => {
                                console.log(e)
                                console.log("DELTIME GREET 829".red)
                            })
                        }
                    });
                } catch (e) {}
            }
        }
    }
}
