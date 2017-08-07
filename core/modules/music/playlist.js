var gear = require("../../gearbox.js");
var cmd = 'playlist';
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
const np = require('./np.js').init
var init = function (message, userDB, DB) {
    try {

        const v = {}
        v.playing = mm("music.playing", {
            lngs: message.lang
        })
        v.upnext = mm("music.upnext", {
            lngs: message.lang
        })


        var Server = message.guild

        Server.playlist = DB.get(Server.id).playlist

        //    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
        var lista = ""

        let emb = new gear.Discord.RichEmbed
        emb.setColor("#72caaf")
        for (i = 0; i < Server.playlist.length && i < 8; i++) {

            let songname = Server.playlist[i][1],
                requester = Server.playlist[i][2],
                duration = Server.playlist[i][5];
            console.log(songname)

            let divider = `**${v.upnext}:**\n`;
            let listing = [gear.emoji("song") + " " + Server.playlist[i][1], " `(" + Server.playlist[i][2] + ")`"];
            let more = "\n*And " + (Server.playlist.length - 7) + " more*...";
            console.log(i)

            if (i == 0) {
                np(message, userDB, DB)
                let tophand = `${gear.emoji("play")}**${v.playing}**
${songname}
\`${requester}\`

`;

            } else if (i === 1) {

                lista += divider + "\n" + listing + "\n";;
            } else {

                lista += listing + "\n";
            }
            if (i == 7) {

                lista += more;
            }
        }

emb.description=lista
        message.channel.send({embed:emb})
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'music'
};
