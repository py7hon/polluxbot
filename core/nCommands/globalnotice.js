const Discord = require('discord.js')
let fs = require('fs')
const cfg = require("../../config.js");
//const hook = new Discord.WebhookClient(cfg.annHook.ID, cfg.annHook.token);

var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'globalnotice';

var init = function (message,userDB,DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;
    var bot = message.botUser
    //-------MAGIC----------------

    if (!message.author.id == '88120564400553984') return;

console.log(DB[message.guild.id].modules.announcements)



     emb = new Discord.RichEmbed();
    let ann = message.content.substr('+globalnotice'.length)


        emb.setColor('#e03535')
    emb.title = "UPDATE Announcement"


    emb.setAuthor('Pollux Maintainance',bot.user.avatarURL,'https://discord.gg/ay48h7Q')
    emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/4.gif?raw=true')
    emb.setFooter('Use +mute_notices para desativar estes avisos. +unmute_notices para reativar.')


  //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    //emb.description = "Os Top-5 mais rubificadoss do server"

      emb.description = ann.split('ççç')[0]
      emb.addField('New or Updated Feats',ann.split('ççç')[1], true)
      emb.addField('Disabled/Discontinued Feats',ann.split('ççç')[2], true)
      emb.addField('More Info','POLLUX Support: https://discord.gg/ay48h7Q', true)




    message.channel.sendEmbed(emb)




    for (i = 0; i < bot.guilds.size; i++) {


        if (DB[bot.guilds.array()[i].id].modules.announcements === true) {

            bot.guilds.array()[i].defaultChannel.sendEmbed(emb)


        }
    }

};

module.exports = {
    pub: false,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'adm'
};
