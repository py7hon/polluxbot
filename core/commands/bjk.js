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
    if (isNaN(parseInt(stuff[1], 10)) || stuff[1] == 0) {
        message.reply("Você precisa apostar alguma coisa, chuchu~")
        return;
    }
    if (gear.checkCookies(stuff[1], userData) == false) {
        message.reply("Oxe, você não tem cookies suficientes pra cobrir essa aposta...")
        return;
    }
    var bet = stuff[1]
    userData.cookies -= bet
    gear.ongoing = true
    var naipes = ['H/', 'D/', 'S/', 'C/']
    var naipesB = [':hearts:', ':diamonds:', ':spades:', ':clubs:']
    var cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
    let deck = []
    for (i = 0; i < 4; i++) {
        for (x = 0; x < 13; x++) {
            x < 10 ? val = x + 1 : val = 10;
            var card = {
                card: naipes[i] + cards[x],
                value: val,
                icon: "**" + cards[x] + "**" + naipesB[i]
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
    let playerRound = 1;
    let dealerKeepgo = true;
    let dealerRound = 0;
    let ongoing = true;
    let playerWin = false;
    let dealerWin = false;
    let round = 0;
    //if (end) return;
    //  gear.draw(dealerHand, 'banc')
    gear.draw(playerHand, caller)
    gear.draw(dealerHand, 'banc')
        //setTimeout(function () {
    message.channel.sendMessage("Ok, vamos jogar blackjack! Quem fizer 21 ou o mais próximo vence!")
        //}, 500);
    function newCard(receiver, pos) {
        receiver.push(pos)
    }

    function sumCards(receiver, pos) {
        var x = 0
        for (i = 0; i < pos + 1; i++) {
            x += receiver[i].value
        }
        return x;
    }
    //Keep playing while ongoing= true
    // while (ongoing) {

    //newCard(playerHand, pile[1]);
    playerSum = sumCards(playerHand, playerRound);
    dealerSum = sumCards(dealerHand, dealerRound);
    setTimeout(function () {
        message.channel.sendFile(`${paths.BUILD}/cards/${caller+playerRound}_bj.png`, "card.png", "Essas são suas cartas. Somando " + playerSum)
        setTimeout(function () {
            message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", "Minhas cartas são estas. Somando " + dealerSum)
        }, 50)
    }, 1400)


    setTimeout(function () {
        message.channel.sendMessage("1 hit 2 stand")
    }, 800)
    let collector = function (m, collector) {
        if (m.content == '1' || m.content == '2' && m.author == message.author) {
            return true;
        } else {
            return false;
        }
    };

    message.channel.awaitMessages(collector, {
        max: 1,
        time: 60000,
        errors: ['time']
    }).then(collected => {
        if (collected.first().content == '1') {
            playerKeepgo = true
            playerRound++

        } else if (collected.first().content == '2') {
            playerKeepgo = false
        }

        if (playerKeepgo) {


            playerSum = sumCards(playerHand, playerRound);
            setTimeout(function () {
                message.channel.sendFile(`${paths.BUILD}/cards/${caller+playerRound}_bj.png`, "card.png", "Essas são suas cartas. Somando " + playerSum)
                setTimeout(function () {
                    message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", " :gem: Minhas cartas são estas. Somando " + dealerSum)
                }, 50)
            }, 100)

            setTimeout(function () {
                switch (true) {
                    case (playerSum == 21):
                        message.reply('win')
                        playerWin = true
                        ongoing = false
                        break;
                    case (playerSum > 21):
                        message.reply('busted')
                        dealerWin = true
                        ongoing = false
                        break;
                }
            }, 500)
        }


        //take 2
        if (ongoing == false) {
            return
        };
        setTimeout(function () {
            message.channel.sendMessage("1 hit 2 stand")
        }, 800)


        message.channel.awaitMessages(collector, {
            max: 1,
            time: 60000,
            errors: ['time']
        }).then(collected => {
            if (collected.first().content == '1') {
                playerKeepgo = true
                playerRound++

            } else if (collected.first().content == '2') {
                playerKeepgo = false
            }
            if (playerKeepgo) {


                playerSum = sumCards(playerHand, playerRound);
                setTimeout(function () {
                    message.channel.sendFile(`${paths.BUILD}/cards/${caller+playerRound}_bj.png`, "card.png", "Essas são suas cartas. Somando " + playerSum)
                    setTimeout(function () {
                        message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", " :gem: Minhas cartas são estas. Somando " + dealerSum)
                    }, 50)
                }, 100)

                setTimeout(function () {
                    switch (true) {
                        case (playerSum == 21):
                            message.reply('win')
                            playerWin = true
                            ongoing = false
                            break;
                        case (playerSum > 21):
                            message.reply('busted')
                            dealerWin = true
                            ongoing = false
                            break;
                    }
                }, 500)
            }
            if (ongoing == false) {
                return
            };

            setTimeout(function () {
                message.channel.sendMessage("1 hit 2 stand")
            }, 800)


            message.channel.awaitMessages(collector, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(collected => {
                if (collected.first().content == '1') {
                    playerKeepgo = true
                    playerRound++

                } else if (collected.first().content == '2') {
                    playerKeepgo = false
                }
                if (playerKeepgo) {


                    playerSum = sumCards(playerHand, playerRound);
                    setTimeout(function () {
                        message.channel.sendFile(`${paths.BUILD}/cards/${caller+playerRound}_bj.png`, "card.png", "Essas são suas cartas. Somando " + playerSum)
                        setTimeout(function () {
                            message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", " :gem: Minhas cartas são estas. Somando " + dealerSum)
                        }, 50)
                    }, 100)

                    setTimeout(function () {
                        switch (true) {
                            case (playerSum == 21):
                                message.reply('win')
                                playerWin = true
                                ongoing = false
                                break;
                            case (playerSum > 21):
                                message.reply('busted')
                                dealerWin = true
                                ongoing = false
                                break;
                        }
                    }, 500)
                }
                if (ongoing == false) {
                    return
                };
            }).catch(collected => {
                console.log(`capturado ${collected.size} de 1 `)
                message.reply(' seu vadio, me deixou plantada aqui, tô confiscando teus cookie pra deixar de ser trouxa.')
                return ongoing = false;
            })



        }).catch(collected => {
            console.log(`capturado ${collected.size} de 1 `)
            message.reply(' seu vadio, me deixou plantada aqui, tô confiscando teus cookie pra deixar de ser trouxa.')
            return ongoing = false;
        })

    }).catch(collected => {
        console.log(`capturado ${collected.size} de 1 `)
        message.reply(' seu vadio, me deixou plantada aqui, tô confiscando teus cookie pra deixar de ser trouxa.')
        return ongoing = false;
    })


}

/*







if (playerKeepgo == true) {
    setTimeout(function () {
        message.channel.sendFile(`${paths.BUILD}/cards/${caller+playerRound}_bj.png`, "card.png", "Essas são suas cartas. Somando " + playerSum)
        setTimeout(function () {
            //  message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", " :gem: Minhas cartas são estas. Somando " + dealerSum)
        }, 50)
    }, 300)
}
setTimeout(function () {
    switch (true) {
        case (playerSum == 21):
            message.reply('play == 21')
            playerWin = true
            ongoing = false
            return
            break;
        case (playerSum > 21):
            message.reply('play + 21')
            dealerWin = true
            ongoing = false
            return
            break;
    }
}, 500)
if (dealerSum >= 17 || (playerKeepgo == false && playerSum > dealerSum)) {
    message.reply('deal stop')
    dealerKeepgo = false;
} else {
    message.reply('deal keep')
    dealerKeepgo = true;
    dealerRound++
    message.reply('dealround ' + dealerRound)
}
dealerSum = sumCards(dealerHand, dealerRound)
if (dealerKeepgo == true) {
    setTimeout(function () {
        message.channel.sendMessage('Minha vez');
        message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", ":eggplant:Minhas cartas são estas. Somando " + dealerSum)
        setTimeout(function () {
            //    message.channel.sendFile(`${paths.BUILD}/cards/${caller+playerRound}_bj.png`, "card.png", "Essas são suas cartas. Somando " + playerSum)
        }, 50)
    }, 500)
} else {
    setTimeout(function () {
        message.channel.sendMessage('Eu paro');
        setTimeout(function () {
            message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", ":eggplant:Minhas cartas são estas. Somando " + dealerSum)
        }, 50)
    }, 500)
}
setTimeout(function () {
        switch (true) {
            case (dealerSum == 21):
                message.reply('deal == 21')
                dealerWin = true
                ongoing = false
                return
                break;
            case (dealerSum > 21):
                message.reply('deal + 21')
                playerWin = true
                ongoing = false
                return
                break;
        }
    }, 100)
    //return;
setTimeout(function () {
    if (ongoing == false) {
        return
    };
}, 200)
setTimeout(function () {
    message.channel.sendMessage("1 keep 2 hold").then(function (m) {
        console.log('waiting')
    })
}, 1000)
message.channel.awaitMessages(collector, {
    max: 1,
    time: 60000,
    errors: ['time']
}).then(collected => {
    if (collected.first().content == '1') {
        playerKeepgo = true
        playerRound += 1
        message.reply('playround ' + playerRound)
    } else if (collected.first().content == '2') {
        playerKeepgo = false
    }
    //return console.log('continua')
    playerSum = sumCards(playerHand, playerRound);
    if (playerKeepgo == true) {
        setTimeout(function () {
            //  message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", " :gem: Minhas cartas são estas. Somando " + dealerSum)
            setTimeout(function () {
                message.channel.sendFile(`${paths.BUILD}/cards/${caller+playerRound}_bj.png`, "card.png", "Essas são suas cartas. Somando " + playerSum)
            }, 50)
        }, 500)
    }
    setTimeout(function () {
        switch (true) {
            case (playerSum == 21):
                message.reply('play == 21')
                playerWin = true
                ongoing = false
                return
                break;
            case (playerSum > 21):
                message.reply('play + 21')
                dealerWin = true
                ongoing = false
                return
                break;
        }
    }, 800)
    if (dealerSum >= 17 || (playerKeepgo == false && playerSum > dealerSum)) {
        console.log('deal stop')
        dealerKeepgo = false;
    } else {
        console.log('deal keep')
        dealerKeepgo = true;
        dealerRound++
        message.reply('dealround ' + dealerRound)
    }
    dealerSum = sumCards(dealerHand, dealerRound)
    if (dealerKeepgo == true) {
        setTimeout(function () {
            message.channel.sendMessage('Minha vez');
            setTimeout(function () {
                message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", ":eggplant:Minhas cartas são estas. Somando " + dealerSum)
            }, 50)
        }, 800)
    } else {
        setTimeout(function () {
            message.channel.sendMessage('Eu paro');
            setTimeout(function () {
                message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+dealerRound}_bj.png`, "card.png", ":eggplant:Minhas cartas são estas. Somando " + dealerSum)
            }, 50)
        }, 800)
    }
    setTimeout(function () {
            switch (true) {
                case (dealerSum == 21):
                    message.reply('deal == 21')
                    dealerWin = true
                    ongoing = false
                    return
                    break;
                case (dealerSum > 21):
                    message.reply('deal + 21')
                    playerWin = true
                    ongoing = false
                    return
                    break;
            }
        }, 200)
        //return;
    setTimeout(function () {
        if (ongoing == false) {
            return
        };
    }, 250)
    setTimeout(function () {
        message.channel.sendMessage("1 keep 2 hold").then(function (m) {
            console.log('waiting')
        })
    }, 600)
  /*  message.channel.awaitMessages(collector, {
        max: 1,
        time: 60000,
        errors: ['time']
    }).then(collected => {}).catch(collected => {
        console.log(`capturado ${collected.size} de 1 `)
        message.reply(' seu vadio, me deixou plantada aqui, tô confiscando teus cookie pra deixar de ser trouxa.')
        return ongoing = false;
    }) */


//ongoing
