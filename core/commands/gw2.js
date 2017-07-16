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



var cmd = 'gw2';
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


var search = MSG.substr("+gw2 ".length)

var query ="";
if (search.includes('_')){
search = search.split("_")
for (i = 0; i < search.length;i++){
    var a = search[i][0].toUpperCase()
    var b = search[i].substr(1)
    var c;
    i == search.length-1 ? c = "" : c = "_";
    query = query + a + b + c
}
    search=query

}
  if (search.includes(' ')){
search = search.split(" ")
for (i = 0; i < search.length;i++){
    var a = search[i][0].toUpperCase()
    var b = search[i].substr(1)
    var c;
    i == search.length-1 ? c = "" : c = "_";
    query = query + a + b + c
}
    search=query

}

        //-------MAGIC----------------
    request('https://wiki.guildwars2.com/wiki/'+search, function (error, response, html) {

  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('.infobox dd').each(function(i, element){

       console.log("-\n\n\n\n---------------------------------\n")
       console.log(i)
      //  console.log(element.firstChild)
      var a = $(this).children()[0]//[0];




      switch (i){

          case 0:
               console.log(element.firstChild.attribs.title)
              break;

          case 1:
               console.log(element.firstChild.attribs.title)
               console.log(element.firstChild.data)

              break;

              case 2:
               console.log(element.firstChild.next.children[0].children[0].data)

              break;

              case 3:
               console.log(element.firstChild.data)

              break;

              case 4:
               console.log(element.firstChild.data)

              break;

              case 5:
               console.log(element.firstChild.data)

              break;

              case 6:

              break;




               }





    });




var thumb;


 emb =    new Discord.RichEmbed();



        emb.setColor('#9b57e0')
    emb.title = "X"

//a = gear.randomize(2,4)
  //  emb.setAuthor('Pollux Statistics',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')
//    emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/'+a+'.gif?raw=true')


  emb.setThumbnail(thumb)
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
   emb.description = "Y"



            emb.addField('X',`Y`, true)


    message.channel.send({embed:emb})








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



