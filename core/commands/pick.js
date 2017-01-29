exports.run = (bot, message, args, userData, caller) => {

if (message.content.startsWith(prefix + "pick")) {
        //aaa.message.delete()
        ///console.log(aaa)
        console.log("Pick trial by" + caller)
        if (drops > 0) {
            console.log("----------- SUCCESSFUL PICK by" + caller)
            userData.cookies += drops
            message.channel.sendMessage("**" + message.author.username + "** pegou " + drops + " Cookie(s)").then(function (c) {
                message.delete()
                c.delete(500000)
            });
            //  message.channel.bulkDelete(vacuum);
            //    message.guild.defaultChannel.bulkDelete(vacuum);
            for (i in vacuum) {
                vacuum[i].delete()
            }
            //   message.channel.bulkDelete(vacuum);
            drops = 0
        }
        else {
            console.log("----------- FAILED PICK by" + caller)
                //   message.channel.bulkDelete(vacuum);
                //   message.guild.defaultChannel.bulkDelete(vacuum);
            for (i in vacuum) {
                vacuum[i].delete()
            }
            //message.channel.sendMessage("No Cookie");
        }
    };


}
