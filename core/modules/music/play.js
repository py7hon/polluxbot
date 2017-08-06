var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
const yt = require('ytdl-core');
var cmd = 'play';

var init = async function (message, userDB, DB) {

    if (message.author.id != "88120564400553984" && message.guild.id != "277391723322408960" && message.guild.id != "337574844524789760" && message.guild.owner.id != "88120564400553984") {
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


//if(Author.id === "282546525836541963") return message.send("Elevation too low");//


    if (DB.get(Server.id).playlist != undefined) {
        SPL = DB.get(Server.id).playlist
    } else {

        SPL = []
    }

    var search = require('youtube-search');

    var opts = {
        maxResults: 10,
        type: "video",
        key: ''
    };


    search(args, opts, function (err, results) {
        if (err) return console.log(err);

        var list = ""
        var playle = []
        var link = []
        for (i = 0; i < results.length; i++) {
            list += "**" + (i + 1) + "**: :small_blue_diamond:  " + results[i].title + "\n"
            playle.push(results[i].title)

            link.push(results[i].link)

        }

        list += "**c**: :small_blue_diamond: Cancel \n"
      //  message.delete()
        message.channel.send(list).then(async msg => {


            return new Promise(async resolve => {
                const responses = await Channel.awaitMessages(msg2 =>
                    msg2.author.id === Author.id && msg2.author === Author && ((
                            parseInt(msg2.content) > 0 &&
                            parseInt(msg2.content) < 11 &&
                            !isNaN(parseInt(msg2.content))) ||
                        msg2.content === "c"), {
                        maxMatches: 1,
                        timeout: 20000
                    }
                );

                if (responses.size === 0) {
                    message.reply("timeout")
                    return resolve(true)

                } else {

msg.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})

                    if (responses.first().content === "c") {
                        message.reply("cancel");
                        return resolve(true)
                    }
                    var voiceChannel = message.member.voiceChannel;



                }
                if (!voiceChannel) {
                    message.reply(`Enter a Voice Channel!`);
                    return resolve(true)
                }

                var botvoice = message.member.voiceChannel

                if (!message.guild.voiceConnections) {

                    await botvoice.join().then(connection => {


                        var a = link[parseInt(responses.first().content) - 1]
                        var b = playle[parseInt(responses.first().content) - 1]
                        var c = message.author.tag
                        SPL.push([a, b, c])

                        gear.superDefine(Server, "playlist", SPL)

responses.first().delete()
                        if (connection.speaking) {

                            message.channel.send(":new: Playing next: **" + b + "**");
                            message.delete()
                            msg.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})
                            responses.first().delete();
                            return resolve(true)

                        }
        message.channel.send(":arrow_forward:  Now playing: **" + SPL[0][1] + "**")
                        play(connection, Server, SPL)
                        return resolve(true)
                    })
                }



            })
        })
    })
return

    function play(conn, guild, pl) {

        guild.dispatcher = conn.playStream(yt(SPL[0][0], {
            audioonly: true,
            quality: "lowest"
        }))




        guild.dispatcher.on("end", () => {
                SPL.shift();

                if (SPL[0]) play(conn, guild);
                else conn.disconnect();
            gear.superDefine(Server, "playlist", SPL)
                console.log(DB.get(Server.id).playlist)

            }

        );

    }





}
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'music'
};
