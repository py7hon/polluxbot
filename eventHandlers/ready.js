
const polx = require("../pollux.js")
var defaults = require("../utils/defaults.js") // Database Defaults
const fx = require("../core/functions.js")

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

        //   bot.user.setGame(`coding Pollux`, 'https://www.twitch.tv/theFlicky').then().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});

        //bot.user.setGame(`Neverwinter Nights`).then().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});

        /*    async.parallel(bot.guilds.forEach(G => serverSetup(G)))*/

        fx.run("userSetup",bot.user)

        let name = 'Pollux Core Reporter';

        let tx = `All systems go! I am ready to rock, master!`;
        let color = '#3ed844';

        await gear.sendSlack(name, tx, undefined, color)

        if (bot.user.id != "278993643531141120") {
            polx.postGCount(bot.guilds.size)
        }



    }
}
