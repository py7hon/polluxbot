
const Discord = require("discord.js")
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();


module.exports = {


    run: function run (cmd,m, third){

    let emb = new Discord.RichEmbed
     emb.setColor("#c65fe5")
        if (third == "nsfw") {
            emb.setThumbnail("https://rlv.zcache.com/nsfw_square_sticker-rea0c876a9755416f8e088671fe163335_v9i40_8byvr_324.jpg");
             emb.setColor("#240d12")
        }

        if (third == "mod") {
            emb.setThumbnail("http://www.freeiconspng.com/uploads/letter-m-icon-png-5.png")
             emb.setColor("#322be5")
        }

        emb.setAuthor(mm("help.commUsage",{lngs:m.lang})+m.prefix+cmd,m.botUser.user.avatarURL,"http://Pollux.fun/commands")
        emb.setDescription(mm("help."+cmd,{lngs:m.lang})+"\n\n")
        emb.addField("**"+mm("dict.usage",{lngs:m.lang})+"**",mm("usage."+cmd,{lngs:m.lang, prefix:m.prefix}),false)

        m.channel.send({embed:emb})
    }


}
