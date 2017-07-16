var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
const yt = require('ytdl-core');
var cmd = 'vapor';

var init = function (message, userDB, DB) {

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
        message.channel.send(list).then(msg => {

            return new Promise(async resolve => {


                const responses = await Channel.awaitMessages(async msg2 =>
                    msg2.author.id === message.author.id && ((
                    parseInt(msg2.content) > 0 &&
                    parseInt(msg2.content) < 11 &&
                    parseInt(msg2.content) != undefined
                )||msg2.content==="c"), {
                        maxMatches: 1,
                        timeout: 10000
                    }
                );
                if (responses.size === 0) {
                    message.reply("timeout")
                    return resolve(true);
                } else {
                    if (responses.first().content ==="c"){
                        return message.reply("cancel")
                    }
                    var voiceChannel = message.member.voiceChannel;

                    console.log(voiceChannel.id)


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



                message.channel.send(":arrow_forward:  Now playing: **" + play[parseInt(responses.first().content) - 1]+"**")
                //  message.reply(`Joining your voice channel and playing some vape!`);

                var connection = botvoice

               // console.log(botvoice)
                console.log(connection+"\n CONNECT")

                message.delete()
               responses.first().delete()
               msg.delete()
                let stream = yt(link[parseInt(responses.first().content) - 1], {
                    audioonly: true,
                    quality:"lowest"
                });
                const dispatcher = connection.playStream(stream);

                dispatcher.on('end', () => {
                    voiceChannel.playStream(stream);
                });




            })

        })
    });






}
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 2,
    init: init,
    cat: 'master'
};
