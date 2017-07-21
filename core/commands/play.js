var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
const yt = require('ytdl-core');
var cmd = 'play';

var init = async function (message, userDB, DB) {
try{
    if(message.guild.id!="277391723322408960"||message.guild.owner.id!="88120564400553984"){
        return message.reply("Sorry, since this command is still very performance-consuming, it is a Patron-Only command.")
    }


    console.log("VAPOR")
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.substr(message.prefix.length + 4)
    var LANG = message.lang;

    //-------MAGIC----------------

     if (!Server.playlist){
          Server.playlist=[]
     }

if(message.content.includes("RAPE")){
    return message.reply("Vai tomar no teu cu Kuroi")
}
    if(message.content.includes("gemi")){
    return message.reply("Vai tomar no teu cu Kuroi")
}
    if(message.content.includes("zap")){
    return message.reply("Vai tomar no teu cu Kuroi")
}
    if(message.content.includes("windows")){
    return message.reply("Vai tomar no teu cu Kuroi")
}

    var search = require('youtube-search');

    var opts = {
        maxResults: 10,
        type:"video",
        key: 'AIzaSyB459p_ith_k86GLNPUHaq6EfsfEOOOKoU'
    };

    search(args, opts, function (err, results) {
        if (err) return console.log(err);

        var list = ""
        var play = []
        var link = []
        for (i = 0; i < results.length; i++) {
            list += "**" + (i + 1) + "**: :small_blue_diamond:  " + results[i].title + "\n"
            play.push(results[i].title)
            link.push(results[i].link)

        }
            list += "**c**: :small_blue_diamond: Cancel \n"
        message.channel.send(list).then(async msg => {

            return new Promise(async resolve => {


                const responses = await Channel.awaitMessages(msg2 =>
                    msg2.author.id === Author.id && msg2.author === Author &&        ((
                    parseInt(msg2.content) > 0 &&
                    parseInt(msg2.content) < 11 &&
                    !isNaN(parseInt(msg2.content)))
                ||msg2.content==="c") , {
                        maxMatches: 1,
                        timeout: 10000
                    }
                );









                if (responses.size === 0) {
                   return message.reply("timeout")

                } else {


                    if (responses.first().content ==="c"){
                        return message.reply("cancel")
                    }
                    var voiceChannel = message.member.voiceChannel;

                    console.log(voiceChannel.id)


                    Server.playlist.push([link[parseInt(responses.first().content) - 1],play[parseInt(responses.first().content) - 1]])


                }
                if (!voiceChannel) {
                    message.reply(`Enter a Voice Channel!`);
                    return resolve(true);
                }
                var botvoice = bot.voiceConnections.get(voiceChannel)
                console.log(botvoice)

                if (!botvoice) {
                    console.log("OJK")
                   botvoice =  await voiceChannel.join()

                    console.log("OJK2")

                }

            //    botvoice = bot.voiceConnections.get(voiceChannel.id)

                    if(botvoice.speaking){

                         message.channel.send(":arrow_forward:  `Playing next: **" + play[parseInt(responses.first().content) - 1]+"**");
                          message.delete()
                         msg.delete()
                        responses.first().delete()
                        return;
                    }


                message.channel.send(":arrow_forward:  Now playing: **" + play[parseInt(responses.first().content) - 1]+"**")
                //  message.reply(`Joining your voice channel and playing some vape!`);

                var connection = botvoice

               // console.log(botvoice)
                console.log(connection+"\n CONNECT")

                message.delete()
               responses.first().delete()

               msg.delete()
                let stream = yt(Server.playlist[0][0], {
                    audioonly: true,
                    quality:"lowest"
                });

                const dispatcher = connection.playStream(stream);

                dispatcher.on('end', async() => {
                    if (Server.playlist.length==1) {
                        let stream = yt(Server.playlist[0][0], {
                            audioonly: true,
                            quality: "lowest"
                        });
                        setTimeout(()=>{return connection.playStream(stream);},1000)
                    } else {
                       await Server.playlist.shift()
                        let stream = yt(Server.playlist[0][0], {
                            audioonly: true,
                            quality: "lowest"
                        });
                          setTimeout(()=>{return connection.playStream(stream);},1000)
                    }
                });




            })

        })
    });


}catch(e){console.log(e)}



}
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 2,
    init: init,
    cat: 'master'
};
