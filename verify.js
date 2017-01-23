const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const getter = require('booru-getter')
var Jimp = require("jimp");
bot.login("MjcxMzk0MDE0MzU4NDA1MTIx.C2Fy7Q.R4Fmoe-fKNsbPML_9zsBDzvQ6KA");
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));
const prefix = "+";
var responseObject = {
    "ayy": "Ayy, lmao!"
    , "wat": "Say what?"
    , "lol": "roflmaotntpmp"
};

var counter = 0

bot.on("message", message => {
    // if(message.content.startsWith(prefix)) return;
    //if (message.author.bot) return;
    if (!points[message.author.id]) points[message.author.id] = {
        points: 0
        , level: 0
    };
    let userData = points[message.author.id];
    userData.points++;
    console.log("Points given to " + message.author.username)
    if(message.author.username =="RoboEd" && counter==0){
         counter++
        setTimeout(function () {
            message.reply("Vai tomar no teu cu e não enche!")

          }, 3000);
    }
    var xisde = ""
    if (message.content.includes(prefix + "jubify")) {
        img = message.author.avatarURL.substr(0, message.author.avatarURL.length - 10)
       // message.channel.sendFile(img)
      //  aImg = Jimp.read(img, function (err, image) {});

        Jimp.read("./juba.png").then(function (lenna) {
    //image.composite( aImg, 0, 0 )
          Jimp.read(img).then(function (lennaB) {

              lenna.composite( lennaB, 0, 0 )
              lenna.write("./new.png");

            console.log("foi");

});
        });


     setTimeout(function () { message.channel.sendFile("./new.png") }, 2000);

    };



    let curLevel = Math.floor(0.25 * Math.sqrt(userData.points));
    if (curLevel > userData.level) {
        // Level up!
        userData.level = curLevel;
        message.reply(`AE CARALHO! Cê upou pro level **${curLevel}**! Sabe o que isso significa?`);
        setTimeout(function () {
            message.channel.sendMessage("NADA");
        }, 5000);
    }
    if (message.content.startsWith(prefix + "level")) {
        message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
    }
    fs.writeFile('./points.json', JSON.stringify(points), (err) => {
        if (err) console.error(err)
    });
    if (message.content.startsWith(prefix + "rule34")) {
       try{
           console.log(1)
           getter.getRandomLewd(message.content.substr(8), (url) => {
               console.log(2)
            message.reply(url)
           })}catch(err){
             message.reply("Teus pornô são tão bizarro que nem achei essa merda.")
       }

    };
if (message.content.startsWith(prefix + "salty")) {
    message.channel.sendFile("./juba.png")
    };
    if (message.content.startsWith(prefix + "vidal")) {
    message.channel.sendFile("./vidaru.png")
    };
});
/*

bot.on('guildMemberAdd', (member) => {
  member.guild.defaultChannel.sendMessage(`Ae galera, ${member.user.username} acabou de entrar!`)
});
bot.on('guildMemberRemove', (member) => {
  member.guild.defaultChannel.sendMessage(` ${member.user.username} vazou!`)
});

var date = new Date();
var current_hour = date.getHours();
var counter = false;

bot.on("message", msg => {
    console.log("going")
    if (msg.content.includes("salty")) {
    msg.channel.sendFile("./juba.png")
    };
     if(responseObject[message.content]) {
    message.channel.sendMessage(responseObject[message.content]);
  }


if(current_hour==23&&counter<1){
    msg.guild.defaultChannel.sendMessage("Vão dormir seus caralho!")
    counter=true
    console.log("teste")
}
    else if(current_hour!=23){
    counter=false}
});



*/
bot.on('ready', () => {
    console.log('START');
  //  var aa = new Date();
    //console.log(aa.getHours());
});
