const Discord = require("discord.js");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');


module.exports = {
    runb: function dropGoodies(event, DB, userDB) {

        var mm = locale.getT();





        var hook = gear.hook
        var message = event
        var Server = event.guild


        var CHN = event.channel
        if (DB.get(Server.id).channels[CHN.id].modules.DROPS == false) return;
        var GLD = event.guild
        var LANG = event.lang;
        let GOODMOJI = gear.emoji("ruby")
        let GOOD = 'Ruby'
        if (DB.get(Server.id).modules) {
            GOODMOJI = DB.get(Server.id).modules.GOODMOJI
        }
        if (DB.get(Server.id).modules) {
            GOOD = DB.get(Server.id).modules.GOODNAME
        }
        if (typeof CHN.DROPSLY != 'number') {
            CHN.DROPSLY = 0
        }
        var droprate = gear.randomize(1, 10000)
        if (GLD.name == "Discord Bots") return;
        console.log(droprate)
        if (droprate == 1234 ||
            droprate == 2525 ||
            droprate == 8714 ||
            droprate == 8586 ||
            droprate == 3223 ||
            droprate == 4321) {
            console.log('DROP')
            var pack;
            var prefie = DB.get(Server.id).modules.PREFIX || "+"

            CHN.send(mm('$.goodDrop', {
                lngs: LANG,
                good: GOOD,
                emoji: GOODMOJI,
                prefix: prefie
            }).replace(/\&lt;/g, "<").replace(/\&gt;/g, ">"), {
                files: [paths.BUILD + 'ruby.png']
            }).catch(e => {
                CHN.send(mm('$.goodDrop', {
                    lngs: LANG,
                    good: GOOD,
                    emoji: GOODMOJI,
                    prefix: prefie
                }).replace(/\&lt;/g, "<").replace(/\&gt;/g, ">")).then(m => processDrop(m))

            }).then(m => processDrop(m))
        }



        if (droprate == 777) {
            var mm = multilang.getT();
            event.channel.send(mm('$.rareDrop', {
                lngs: LANG,
                good: GOOD,
                emoji: GOODMOJI,
                prefix: event.DB.get(Server.id).modules.PREFIX
            }).replace(/\&lt;/g, "<").replace(/\&gt;/g, ">"), {
                files: [paths.BUILD + 'rubypot.png']
            }).then(m => processDropRare(m)).catch(e => {
                event.channel.send(mm('$.rareDrop', {
                    lngs: LANG,
                    good: GOOD,
                    emoji: GOODMOJI,
                    prefix: event.DB.get(Server.id).modules.PREFIX
                }).replace(/\&lt;/g, "<").replace(/\&gt;/g, ">")).then(m => processDropRare(m)).catch(e => console.log(e))
            })
        }



        async function processDropRare(r) {
            try {
                if (isNaN(CHN.DROPSLY)) {
                    CHN.DROPSLY = 500
                } else {
                    CHN.DROPSLY += 500

                }
                console.log("------------=========== ::: NATURAL RARE DROP ::: ===".bgGreen.yellow.bold)

                return new Promise(async resolve => {

                    var oldDropsly = CHN.DROPSLY
                    const responses = await CHN.awaitMessages(msg2 =>
                        msg2.author.id === message.author.id && (msg2.content === message.prefix+'pick'), {
                            maxMatches: 1
                        }
                    );
                    if (responses.size === 0) {} else {
                        if (oldDropsly > CHN.DROPSLY) {
                            r.delete();
                            return resolve(true);
                        }
                        let Picker = responses.first().author


                        console.log("----------- SUCCESSFUL PICK by" + Picker.username)
                        message.channel.send(mm('$.pick', {
                            lngs: LANG,
                            good: GOOD,
                            user: Picker.username,
                            count: CHN.DROPSLY,
                            emoji: ""
                        }) + " " + gear.emoji("ruby")).then(function (c) {
                            message.delete().catch(e => {
                                let v = "Couldnt Delete Message at 377"
                                console.log(v);
                                hook.send(v)
                            });
                            c.delete(500000).catch(e => {
                                let v = "Couldnt Delete R at 382"
                                console.log(v);
                                hook.send(v)
                            });
                        }).catch(e => {
                            let v = "Couldnt Send PickPot at 388"
                            console.log(v);
                            hook.send(v)
                        });

                        gear.paramIncrement(Picker, 'goodies', CHN.DROPSLY)
                        gear.paramIncrement(Picker, 'earnings.drops', CHN.DROPSLY)
                        CHN.DROPSLY = 0
                        r.delete().catch(e => {
                            let v = "Couldnt Delete R at 396"
                            console.log(v);
                            hook.send(v)
                        });
                        return resolve(true);

                    }
                })
            } catch (e) {
                let v = "Ruby Send Forbidden: " + r.guild.name + " C: " + r.channel.name
                console.log(e);
                hook.send(v)
            }
        }


        async function processDrop(r) {

            try {
                if (isNaN(CHN.DROPSLY)) {
                    CHN.DROPSLY = 10
                } else {
                    CHN.DROPSLY += 10
                }
                console.log("------------=========== ::: NATURAL DROP".bgGreen.white)

                return new Promise(async resolve => {

                    var oldDropsly = CHN.DROPSLY
                    const responses = await CHN.awaitMessages(msg2 =>
                        msg2.content === message.prefix+'pick', {
                            maxMatches: 1
                        }
                    );

                    if (responses.size === 0) {} else {
                        if (oldDropsly > CHN.DROPSLY) {
                            r.delete().catch(e => {
                                let v = "Couldnt Delete R at 295"
                                console.log(v);
                                hook.send(v)
                            });
                            return resolve(true);
                        }
                        let Picker = responses.first().author

                        console.log("----------- SUCCESSFUL PICK by" + Picker.username)
                        message.channel.send(mm('$.pick', {
                            lngs: LANG,
                            good: GOOD,
                            user: Picker.username,
                            count: CHN.DROPSLY,
                            emoji: ""
                        }) + " " + gear.emoji("ruby")).then(function (c) {
                            message.delete()
                            c.delete(500000)
                        }).catch();

                        gear.paramIncrement(Picker, 'goodies', CHN.DROPSLY)
                        gear.paramIncrement(Picker, 'earnings.drops', CHN.DROPSLY)
                        CHN.DROPSLY = 0

                        r.delete().catch(e => {
                            let v = "Couldnt Delete R at 322"
                            console.log(v);
                            hook.send(v)
                        });
                        return resolve(true);
                    }
                })
            } catch (e) {
                let v = "Ruby Send Forbidden: " + r.guild.name + " C: " + r.channel.name
                console.log(e);
                hook.send(v)
            }
        }



    }


}
