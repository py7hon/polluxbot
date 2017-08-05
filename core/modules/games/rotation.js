const fs = require("fs");
const request = require('request');
const paths = require("../../paths.js");
const gear = require("../../gearbox.js");
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();

const cmd = 'rotation';

const init = function (message, userDB, DB) {

    const LANG = message.lang;

    const nope = mm('CMD.noDM', {
        lngs: LANG
    });
    const gener = mm('builds.genProf', {
        lngs: LANG
    });
    const inf = mm('dict.infinite', {
        lngs: LANG
    });

    //-------MAGIC----------------
    let helpkey = mm("helpkey", {
        lngs: message.lang
    })

    const args = message.content.split(/\s+/).slice(1).join(" ").toLowerCase()
    let rotation = []
    let emb = new gear.Discord.RichEmbed();

    if (args === "league of legends" || args === "league" || args === "lol") lol();
    else if (args === "heroes of the storm" || args === "hots" || args === "hos" || args === "heroes") hots();
    else if (args === "smite") smite();
    else if (args === "help" || args === helpkey) smite();
    else commandHelp();

    function commandHelp() {
        return gear.usage(cmd, message);
    }

    function smite() {

        request('https://smite.gamepedia.com/Smite_Wiki', async function (error, response, html) {

            if (!error && response.statusCode == 200) {
                let $ = gear.cheerio.load(html);
                $('#mf-free_rotation').each(function (i, element) {
                    gear.cheerio.load(element)("a").each((i, elm) => {
                        if (i < 5) return;
                        rotation.push(elm.attribs.title)
                    })
                })
            }
            emb.setColor('#ea6f2e')
            emb.setFooter(`© 2014 - ${(new Date).getYear()+1900} | Hi-Rez Studios, Inc.`, "http://www.gamasutra.com/db_area/images/news/2014/Apr/214615/hr.jpg")
            emb.setAuthor("Smite", "http://orig09.deviantart.net/6fc3/f/2013/095/9/a/smite___icon_by_j1mb091-d572cyp.png", "https://smite.gamepedia.com/Smite_Wiki")

            emb.setThumbnail("http://orig12.deviantart.net/8394/f/2016/338/1/2/smite_icon__4__by_malfacio-daqii8u.png")
            emb.description = "Weekly God Rotation"
            emb.addField("●▬▬▬๑۩۩๑▬▬▬●", `
:small_orange_diamond:  ${rotation[0]}
:small_orange_diamond:  ${rotation[1]}
:small_orange_diamond:  ${rotation[2]}
:small_orange_diamond:  ${rotation[3]}
`, true)
            emb.addField("●▬▬▬๑۩۩๑▬▬▬●", `
:small_orange_diamond:  ${rotation[4]}
:small_orange_diamond:  ${rotation[5]}
:small_orange_diamond:  ${rotation[6]}
:small_orange_diamond:  ${rotation[7]}
`, true)
            message.channel.send({
                embed: emb
            })
        })
    }

    function hots() {
        let rotation = [[]]
        request('http://heroesofthestorm.gamepedia.com/Free_rotation', function (error, response, html) {

            if (!error && response.statusCode == 200) {
                var $ = gear.cheerio.load(html);
                $('.hero-tile').each(function (i, element) {

                    var a = $(this).children()[0] //[0];
                    if (i < 10) {
                        rotation[0].push(a.attribs.title);
                    } else {
                        rotation.push(a.attribs.title);
                    }
                });

                emb.setColor('#272791')
                emb.setFooter(`© 2015 - ${(new Date).getYear()+1900} | Blizzard Entertainment, Inc.`, "https://seeklogo.com/images/B/blizzard-entertainment-logo-04FA6ACC79-seeklogo.com.png")
                emb.setAuthor("Heroes of the Storm", "http://www.mpcgaming.com/img/hotsicon.png", "http://heroesofthestorm.gamepedia.com/")
                emb.setThumbnail("http://www.mpcgaming.com/img/hotsicon.png")
                emb.description = "Weekly Hero Rotation"

                emb.addField('All Levels', `
${gear.emoji(rotation[0][0].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][0]}
${gear.emoji(rotation[0][1].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][1]}
${gear.emoji(rotation[0][2].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][2]}
${gear.emoji(rotation[0][3].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][3]}
${gear.emoji(rotation[0][4].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][4]}
`, true)
                emb.addField('.', `
${gear.emoji(rotation[0][5].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][5]}
${gear.emoji(rotation[0][6].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][6]}
${gear.emoji(rotation[0][7].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][7]}
${gear.emoji(rotation[0][8].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][8]}
${gear.emoji(rotation[0][9].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[0][9]}
`, true)
                emb.addField('Level 5', `${gear.emoji(rotation[1].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[1]}`, true)
                emb.addField('Level 7', `${gear.emoji(rotation[2].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[2]}`, true)
                emb.addField('Level 12', `${gear.emoji(rotation[3].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[3]}`, true)
                emb.addField('Level 15', `${gear.emoji(rotation[4].replace(/\./g,"").replace(" ","").toLowerCase())}${rotation[4]}`, true)
                message.channel.send({
                    embed: emb
                })
            }
        });
    }

    function lol() {
        request('http://leagueoflegends.wikia.com/wiki/Free_champion_rotation', function (error, response, html) {

            if (!error && response.statusCode == 200) {
                var $ = gear.cheerio.load(html);
                $('span.champion-icon').each(function (i, element) {

                    var a = $(this).children()[1]
                    if (i < 14) {
                        rotation.push(a.children[0].attribs.title);

                    }
                });
                console.log(rotation)
            }

            emb = new gear.Discord.RichEmbed();
            emb.setColor('#064955')

            emb.setFooter(`© 2006 - ${(new Date).getYear()+1900} | Riot Games, Inc.`, "https://upload.wikimedia.org/wikipedia/en/4/47/Riot_Games_logo.png")
            emb.setAuthor("League of Legends", "https://vignette1.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343", "http://leagueoflegends.wikia.com/wiki/League_of_Legends_Wiki")
            emb.setThumbnail("https://vignette1.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343")
            emb.description = "Weekly Champion Rotation"

            emb.addField("₪₪₪₪₪₪₪₪₪₪₪", `
:small_blue_diamond:  ${rotation[0]}
:small_blue_diamond:  ${rotation[1]}
:small_blue_diamond:  ${rotation[2]}
:small_blue_diamond:  ${rotation[3]}
:small_blue_diamond:  ${rotation[4]}
:small_blue_diamond:  ${rotation[5]}
:small_blue_diamond:  ${rotation[6]}
`, true)
            emb.addField("₪₪₪₪₪₪₪₪₪₪₪", `
:small_blue_diamond:  ${rotation[7]}
:small_blue_diamond:  ${rotation[8]}
:small_blue_diamond:  ${rotation[9]}
:small_blue_diamond:  ${rotation[10]}
:small_blue_diamond:  ${rotation[11]}
:small_blue_diamond:  ${rotation[12]}
:small_blue_diamond:  ${rotation[13]}
`, true)
            message.channel.send({
                embed: emb
            })

        })
    }
}


module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
