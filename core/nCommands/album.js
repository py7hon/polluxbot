
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


var cmd = 'album';
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




var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
  clientId : 'd8128df98a944dea8655c170783ecf83',
  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
   redirectUri : ''
});
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    message.reply('The access token expires in ' + data.body['expires_in']);
   message.reply('The access token is ' + data.body['access_token']);


    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
         message.reply( err);
  });

     message.reply('The access token is ' + spotifyApi.getAccessToken());
 message.reply('The refresh token is ' + spotifyApi.getRefreshToken());
 message.reply('The redirectURI is ' + spotifyApi.getRedirectURI());
 message.reply('The client ID is ' + spotifyApi.getClientId());
 message.reply('The client secret is ' + spotifyApi.getClientSecret());




var emb =    new Discord.RichEmbed();
   message.reply("OKS")

spotifyApi.searchAlbums('Love')
  .then(function(data) {
        var album = data.body.albums.items[0]
    spotifyApi.getAlbumTracks(album.id, { limit : 5, offset : 0 })
  .then(function(dataB) {
   // message.reply('Search artists by "Love"'+ data.body.albums.items[0].album_type);









        emb.setColor('#529b31')
    emb.title = album.name


  //  emb.setAuthor('SPOTIFY',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')
    emb.setThumbnail(album.images[0].url)


  //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
  // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
    emb.description = album.artists[0].name

      emb.addField('Type',album.album_type, true)
       //  emb.setFooter("via **Spotify**")
      emb.addField('Listen',album.external_urls.spotify, true)


        for (var i =0;i<dataB.body.items.length;i++){

        emb.addField('Tracks',dataB.body.items[i].name, true)
        }


    message.channel.sendEmbed(emb)


  }, function(err) {
    console.log('ERR', err);
  });

      //emb.addField(':cityscape:   Servers',bot.guilds.size, true)
      //emb.addField(':busts_in_silhouette:   Users',bot.users.size, true)
     // emb.addField(':satellite_orbital:   Ping',parseFloat(Math.round(bot.ping * 100) / 100).toFixed(0)+'ms', true)
   //   emb.addField(':electric_plug:   Uptime',uptime, true)
// emb.addField('More Info','POLLUX Support: https://discord.gg/ay48h7Q', true)
 //emb.addField('Invite','https://goo.gl/info/qkGqqU', true)












  //  console.log(data)
  }, function(err) {
     message.reply(err);
  });



}







                 module.exports = {
                    pub:true,
                    cmd: cmd,
                    perms: 3,
                    init: init,
                    cat: 'misc'
                };




