var request = require('request');
var cheerio = require('cheerio');
var rotation = [[]]
const fs = require("fs");
const Jimp = require("jimp");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
const Discord = require("discord.js");


var cmd = 'rotation-hots';
var LANG = ""
var init = function (message, userDB, DB) {
        var Server = message.guild;
        var Channel = message.channel;
        var Author = message.author;
        if (Author.bot) return;
        var Member = Server.member(Author);
        var Target = message.mentions.users.first() || Author;
        var MSG = message.content;
        var bot = message.botUser
        var args = MSG.split(' ').slice(1)
        LANG = message.lang;

        var nope = mm('CMD.noDM', {
            lngs: LANG
        });
        var gener = mm('builds.genProf', {
            lngs: LANG
        });
        var inf = mm('dict.infinite', {
            lngs: LANG
        });

        //-------MAGIC----------------
    request('http://heroesofthestorm.gamepedia.com/Free_rotation', function (error, response, html) {

  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('.hero-tile').each(function(i, element){

        //console.log(element)
      //  console.log(this)
      var a = $(this).children()[0]//[0];
       if (i<10){
     rotation[0].push(a.attribs.title);
           }else{
        rotation.push(a.attribs.title);
           }
    });
      console.log(rotation)






 emb =    new Discord.RichEmbed();



        emb.setColor('#9b57e0')
    emb.title = "Heroes of the Storm"

//a = gear.randomize(2,4)
  //  emb.setAuthor('Pollux Statistics',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')
//    emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/'+a+'.gif?raw=true')


  emb.setThumbnail("http://www.mpcgaming.com/img/hotsicon.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
   emb.description = "Weekly Hero Rotation"

      emb.addField('All Levels',`${rotation[0][0]}
${rotation[0][1]}
${rotation[0][2]}
${rotation[0][3]}
${rotation[0][4]}
`, true)
            emb.addField('.',`${rotation[0][5]}
${rotation[0][6]}
${rotation[0][7]}
${rotation[0][8]}
${rotation[0][9]}
`, true)
            emb.addField('Level 5',`${rotation[1]}`, true)
            emb.addField('Level 7',`${rotation[2]}`, true)
            emb.addField('Level 12',`${rotation[3]}`, true)
            emb.addField('Level 15',`${rotation[4]}`, true)


    message.channel.sendEmbed(emb)








  }

});



}

                 module.exports = {
                    pub:true,
                    cmd: cmd,
                    perms: 3,
                    init: init,
                    cat: 'misc'
                };



