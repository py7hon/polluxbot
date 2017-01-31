var paths = require("../paths.js");
var gear = require("../gearbox.js");
const fs = require("fs");
exports.run = (bot, message, args, userData, caller, gear, points) => {
      console.log(gear.ongoing)
        if (gear.ongoing) {
            message.reply("você já está jogando comigo. Primeiro termine esse.")
            return;
        }
        var stuff = message.content.toLowerCase().split(' ')
        if (isNaN(parseInt(stuff[1], 10))||stuff[1]==0) {
            message.reply("Você precisa apostar alguma coisa, chuchu~")
            return;
        }
        if (gear.checkCookies(stuff[1], userData) == false) {
            message.reply("Oxe, você não tem cookies suficientes pra cobrir essa aposta...")
            return;
        }
        var bet = stuff[1]
        userData.cookies-=bet


        gear.ongoing = true

        var naipes = ['H/', 'D/', 'S/', 'C/']
        var naipesB = [':hearts:', ':diamonds:', ':spades:', ':clubs:']
        var cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

         let deck = []
        for (i = 0; i < 4; i++) {
            for (x = 0; x < 13; x++) {
                var card = {
                    card: naipes[i] + cards[x]
                    , value: x + 1
                    , icon: "**"+cards[x]+"**" + naipesB[i]
                }
                deck.push(card)
            }
        }
        var pile = gear.shuffle(deck)


    let playerSum = 0;
    let dealerSum = 0;
    let playerHand = [pile[1], pile[3], pile[5], pile[7], pile[9]];
    let dealerHand = [pile[0], pile[2], pile[4], pile[6], pile[8]];
    let playerKeepgo = true;
    let dealerKeepgo = true;
    let ongoing = true;
    let playerWin = false;
    let dealerWin = false;
    let round = 0;


        //if (end) return;

        gear.draw(dealerHand, 'banc')
        gear.draw(playerHand, caller)
        setTimeout(function () {
            message.channel.sendMessage("Ok, vamos jogar blackjack! Quem fizer 21 ou o mais próximo vence!")
        }, 500);


















}
