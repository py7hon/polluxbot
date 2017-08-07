var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
const yt = require('ytdl-core');
const rq = require('request');
const cmd = 'play';
    const EventEmitter = require("events").EventEmitter;
    const body = new EventEmitter();

var init = async function (message, userDB, DB) {

  const v={}
v.playing = mm("music.playing", {lngs: message.lang})
v.comingnext = mm("music.comingnext", {lngs: message.lang})



    if (message.author.id != "88120564400553984" && message.guild.id != "277391723322408960" && message.guild.id != "337574844524789760" && message.guild.owner.id != "88120564400553984") {
        return message.reply("Sorry, since this command is still very performance-consuming, it is a Patron-Only command.")
    }

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
        videoSyndicated : true,
        key: 'AIzaSyB459p_ith_k86GLNPUHaq6EfsfEOOOKoU'
    };


    await search(args, opts, async function (err, results) {
        if (err) return console.log(err);
          message.channel.startTyping()
           // console.log(results[0])
        var list = ""
        var playle = []
        var link = []
        var mini = []
        var T = []
        let r
        results.length > 10 ? r = 10 : r = results.length

            for (let i = 0; i < r; i++) {
                await prepro(i)
            }
        async function prepro(i) {
              return new Promise(async resolve => {
                let rqORG = {
                    url: `https://www.googleapis.com/youtube/v3/videos?id=${results[i].id}&part=contentDetails&key=${opts.key}`,
                    method: 'GET',
                    json: true
                };

                rq(rqORG, async function (e, r, d) {

                    body.data = d;
                    body.emit('update');
                })

                body.once('update', function () {

                    let t = body.data.items[0].contentDetails
                        .duration.replace("PT", "")
                        .replace("H", "h")
                        .replace("M", "m")
                        .replace("S", "s")

                    list += "**" + (i + 1) + "**: :small_blue_diamond:  " + results[i].title + " `" + t + "`\n "
                    "\n"
                    playle.push(results[i].title)
                    link.push(results[i].link)
                    T.push(t)
                    mini.push(results[i].thumbnails.default.url)

                    return resolve(true)
                })
                })
            }


        list += "**c**: :small_blue_diamond: Cancel \n"
      //  message.delete()
        message.channel.send(list).then(async msg => {
message.channel.stopTyping(true)

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
                        var c = Author.tag
                        var d = mini[parseInt(responses.first().content) - 1]
                        var e = Author.avatarURL || Author.defaultAvatarURL
                        var f = T[parseInt(responses.first().content) - 1]
                        SPL.push([a, b, c, d,e,f])

                        gear.superDefine(Server, "playlist", SPL)

responses.first().delete()
                        if (connection.speaking) {

                            message.channel.send(gear.emoji("song")+" "+v.playing+": **" + b + "**");

                            message.delete()
                            msg.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})
                            responses.first().delete();
                            return resolve(true)

                        }
        message.channel.send(gear.emoji("play")+" "+v.comingnext+": **" + SPL[0][1] + "**")
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
