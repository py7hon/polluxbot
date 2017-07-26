const Discord = require("discord.js");
const polx = require("../pollux.js")
const defaults = require("../utils/defaults.js") // Database Defaults
const greeting = require('../utils/greeting');

module.exports = {
    run: function run(gear, DB, userDB, bot, guild) {

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

        // LOG INTO CASTLE
        var PolluxS = bot.guilds.get("277391723322408960")
        var rad = PolluxS.channels.get("332025773521371137")

        var emb = new Discord.RichEmbed;
        emb.setThumbnail(guild.iconURL)
        emb.setDescription(`:inbox_tray: Added to **${guild.name}**`);
        emb.addField("Members", guild.members.size, true)
        emb.addField("Region", guild.region, true)
        emb.addField("Owner", guild.owner, true)
        emb.addField("Owner Tag", guild.owner.user.tag, true)
        emb.setColor("#255ec9");
        var ts = new Date
        emb.setTimestamp(ts)
        rad.send({
            embed: emb
        }).catch()

        if (guild.region === "brazil") {
            var greetings = greeting.ownPt
        } else {
            var greetings = greeting.own
        }
        var greetings = greetings.replace(/\{\{server\}\}/g, guild.name)
        guild.owner.send(greetings)

        serverSetup(guild);

    }
}
