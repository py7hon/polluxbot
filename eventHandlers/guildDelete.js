const Discord = require("discord.js");
const polx = require("../pollux.js")
var defaults = require("../utils/defaults.js") // Database Defaults

module.exports = {
    run: function run(gear, DB, userDB, bot, guild) {

        var PolluxS = bot.guilds.get("277391723322408960")
        var rad = PolluxS.channels.get("332025773521371137")

        var emb = new Discord.RichEmbed;

        emb.setThumbnail(guild.iconURL)
        emb.setDescription(`:outbox_tray: Removed from **${guild.name}**`);
        emb.addField("Members", guild.members.size, false)
        emb.addField("Owner", guild.owner, true)
        emb.addField("Owner Tag", guild.owner.username + "#" + guild.owner.discriminator, true)
        emb.setColor("#c92525");
        var ts = new Date
        emb.setTimestamp(ts)
        rad.send({
            embed: emb
        }).catch()

        DB.delete(guild.id).catch(e => {
            console.log(e)
            console.log("POLLUX 740".red)
        })
    }
}
