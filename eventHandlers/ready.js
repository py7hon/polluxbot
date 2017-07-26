
const polx = require("../pollux.js")
var defaults = require("../utils/defaults.js") // Database Defaults


module.exports = {
    run: async function run(gear, DB, userDB, bot) {


        require("../core/cherry.js").listen(bot, DB, userDB, gear)

        /*

         bot.guilds.forEach(async g => {
             if (!DB.get(g.id)) return serverSetup(g);
             await gear.normaliseGUILD(g, DB)

             g.members.forEach(async m => {
                 if (!userDB.get(m.id)) return userSetup(m.user);
                 await gear.normaliseUSER(m, userDB, DB)

             })
         })*/
        bot.user.setStatus('online')

        //   bot.user.setGame(`coding Pollux`, 'https://www.twitch.tv/theFlicky').then().catch();

        //bot.user.setGame(`Neverwinter Nights`).then().catch();

        /*    async.parallel(bot.guilds.forEach(G => serverSetup(G)))*/

        userSetup(bot.user)

        let name = 'Pollux Core Reporter';

        let tx = `All systems go! I am ready to rock, master!`;
        let color = '#3ed844';

        await gear.sendSlack(name, tx, undefined, color)

        if (bot.user.id != "278993643531141120") {
            polx.postGCount(bot.guilds.size)
        }


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


    }
}
