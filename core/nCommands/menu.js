const fs = require("fs");
const Discord = require("discord.js")
const Jimp = require("jimp");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'menu';

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
        var LANG = message.lang;

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
        if (message.channel.type == 'dm') {
            message.reply(nope)
            return
        }
Author.menuproc = true
        emb = new Discord.RichEmbed();

        message.author.order = []

        emb.setColor('#e0579b')
        emb.title = "MENU"

        a = gear.randomize(2, 4)
            //emb.setAuthor('Pollux Statistics',bot.user.avatarURL,'https://github.com/LucasFlicky/polluxbot')
            //emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/'+a+'.gif?raw=true')

emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/skynet.png")
        //emb.setThumbnail("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/display.png")
        // emb.setImage("https://raw.githubusercontent.com/LucasFlicky/polluxbot/master/avis/2.png")
        emb.description = "Ask your orders naturally, e.g.'I'd like a cake, please!'"

        emb.addField(':cake: Cake', "24 gems :gem:", true)
        emb.addField(':coffee: Coffee', "8 gems :gem:", true)
        emb.addField(':doughnut: Donut', "15 gems :gem:", true)

        var ongoing = false
        var menu = [
            [24, ":cake:",200],
            [8, ":coffee:",50],
            [12, ":doughnut:",100],
            [100, ":eggplant:",100],
        ]

        message.channel.sendEmbed(emb)








 var entrega;







            message.author.order = []
            var f = (mess => {
                var crit = false
if (mess.author!=Author) return;
                function cO(inut) {
                    return mess.content.toLowerCase().includes(inut)
                }



                if (cO("cake") || cO(":cake:")) {
                    console.log('keiki')
                    message.author.order.push(0)

                    console.log(message.author.order)
                    crit = true
                }
                if (cO("coffee") || cO(":coffee:") || cO("café")) {

                    message.author.order.push(1)
                    crit = true
                }
                  if (cO("donut") || cO(":doughnut:") || cO("doughnut")) {

                    message.author.order.push(2)
                    crit = true
                }
                  if (cO("berinjela") || cO(":eggplant:") || cO("eggplant")) {

                    message.author.order.push(3)
                    crit = true
                }

                return crit;
            })








            Channel.awaitMessages(f, {max:1}).then(col => {

                if (col.size == 0){
                Author.menuproc = false
                return console.log("timeout");
                }

    var total = 0
                var go = ""
                var ex = 0

                for (i = 0; i < message.author.order.length; i++) {

                    total += menu[message.author.order[i]][0]
                    go += menu[message.author.order[i]][1] + " "
                    ex += menu[message.author.order[i]][2]
                             console.log(go)
                }

                message.reply(`it will be **` + total + `** :gem:.
type \`ok\` to confirm, or \`c\` Cancel`)


                   var ff = filtV =>  (filtV.content.toLowerCase() == ('ok')||filtV.content.toLowerCase() == ('c')) && filtV.author == message.author


            Channel.awaitMessages(ff, {max:1,time:10000}).then(cola => {

     if (cola.size == 0){
                Author.menuproc = false
                return console.log("timeout");
                }
                if (cola.first().content=="c" )return message.reply("Cancelled");
                                var factor = gear.randomize(10, 50)
                                message.channel.sendMessage("Ive charged " + total + " :gem: from your account. be back in a minute with yout order!")
                                gear.paramIncrement(Author, "goodies", -total)
                                ongoing = false
                                 entrega = "There you go: " + go +". \n `you got "+ex+" bonus EXP `";
                                gear.paramIncrement(Author,"exp",ex)
                                message.author.order = []
                                setTimeout(function(){
                                    message.reply(entrega)
                                     Author.menuproc = false
                                }, 1000*factor)


                                 /*
                                     var fff = filtVa => {
                                         if (filtVa.author != message.author) return false;

                                         switch (true){
                                             case filtVa.content.toLowerCase().includes('cade o meu'):
                                             case filtVa.content.toLowerCase().includes('cade meu'):
                                             case filtVa.content.toLowerCase().includes('onde ta'):
                                             case filtVa.content.toLowerCase().includes('e o meu'):
                                             case filtVa.content.toLowerCase().includes('meu pedido'):
                                             case filtVa.content.toLowerCase().includes('meu cafe'):
                                             case filtVa.content.toLowerCase().includes('meu rango'):
                                             case filtVa.content.toLowerCase().includes('que eu pedi'):
                                             case filtVa.content.toLowerCase().includes('cade as'):
                                             case filtVa.content.toLowerCase().includes('vai demorar'):
                                             case filtVa.content.toLowerCase().includes('tá demorando'):
                                             case filtVa.content.toLowerCase().includes('ta demorando'):
                                             case filtVa.content.toLowerCase().includes('que demora'):
                                                                         return true;
                                                 break;
                                             default:
                                                 return false;
                                                 break


                                         }
                                     }

            Author.menuproca = 0
                                     bot.once("message",colad=> {
                                         if (colad.author == Author) return;
                                         if (Author.menuproc == true)
                                         Author.menuproca++


                                         if (colad.size == 0) return console.log("timeout 3");
                var resp = [
                    "Calma, já vai sair :confounded:",
                    "Só mais um pouquinho",
                    "Só um instante, já trago",
                    "Tá quase pronto, peraí",
                    "Já vai, já vai...",
                    "Tá saindo, aguarda aí",
                    "ESPERA PORRA CACETE CARALHO SENÃO VOU CUSPIR EM TUDO"
                ]
                Channel.sendMessage(resp[Author.menuproca])


                                     }).catch()
 */

                        }).catch()


            }).catch()



           // message.channel.sendMessage("Vou dar uma volta, quando te decidir me chama")

              }




        module.exports = {
            pub: true,
            cmd: cmd,
            perms: 3,
            init: init,
            cat: 'misc'
        };
