var request = require('request');
var cheerio = require('cheerio');
var rotation = []
const fs = require("fs");
const Jimp = require("jimp");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
const Discord = require("discord.js");


var cmd = 'rotation-lol';
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
    request('http://leagueoflegends.wikia.com/wiki/Free_champion_rotation', function (error, response, html) {

        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('span.champion-icon').each(function (i, element) {

                var a = $(this).children()[1]
                if (i < 10) {
                    rotation.push(a.children[0].attribs.title);

                }
            });
            console.log(rotation)
        }

        emb = new Discord.RichEmbed();
        emb.setColor('#395790')
        emb.title = "League of Legends"

        emb.setThumbnail("https://vignette1.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343")

        emb.description = "Weekly Champion Rotation"

        for (i = 0; i < rotation.length; i++) {

            emb.addField(rotation[i], `_`, true)
        }

        message.channel.send({embed:emb})

    })
}

module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
