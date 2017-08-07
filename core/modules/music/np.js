
var gear = require("../../gearbox.js");
var next = require("./next.js").init;
var cmd = 'np';
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
var init = function (message,userDB,DB) {
var Server = message.guild
//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
    let bot = message.botUser
try{

    const v={}
v.playing = mm("music.playing", {lngs: message.lang})

    Server.playlist = DB.get(Server.id).playlist
    let avatar = Server.playlist[0][4] || message.author.defaultAvatarURL

    let emb = new gear.Discord.RichEmbed
    emb.setDescription(`${gear.emoji("play")} ${v.playing}:
**${Server.playlist[0][1].split("-")[0]}** ${Server.playlist[0][1].split("-")[1]||""}
`)

    emb.setColor("#fbd796")
    if(!Server.playlist[0][3]) Server.playlist[0][3]="http://support.yumpu.com/en/wp-content/themes/qaengine/img/default-thumbnail.jpg";
    emb.setThumbnail(Server.playlist[0][3])
    emb.setFooter(Server.playlist[0][2]+" | "+Server.playlist[0][5],avatar)

    message.channel.send({embed:emb}).then(m=>processVoteskip(m))


}catch(e){gear.hook.send(e.error)}


    async function processVoteskip(m){
        let nex = "⏩"
        let save = bot.emojis.get("343511123242254336")
        let heads = Math.ceil(Server.voiceConnection.channel.members.size/2)
        console.log(heads)
        await m.react(nex).then(r=>{


        return new Promise(async resolve=>{
           const res = await m.awaitReactions(react=>
                react.emoji===nex,


        {maxUsers: heads+1}).catch();

        console.log(res.size)

            if(res.size >= heads ) next(message,userDB,DB,true);

        })
        })
    }


}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'music'
};


















