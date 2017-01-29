exports.run = (bot, message, args) => {
        console.log(ongoing)
        if (ongoing) {
            message.reply("você já está jogando comigo. Primeiro termine esse.")
            return;
        }
        stuff = message.content.toLowerCase().split(' ')
        if (isNaN(parseInt(stuff[1], 10))||stuff[1]==0) {
            message.reply("Você precisa apostar alguma coisa, chuchu~")
            return;
        }
        if (checkCookies(stuff[1], userData) == false) {
            message.reply("Oxe, você não tem cookies suficientes pra cobrir essa aposta...")
            return;
        }
        var bet = stuff[1]
        userData.cookies-=bet


        ongoing = true
        var deck = []
        var naipes = ['H/', 'D/', 'S/', 'C/']
        var naipesB = [':hearts:', ':diamonds:', ':spades:', ':clubs:']
        var cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
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
        var pile = shuffle(deck)
        var end = false
        var bank = []
        var play = []
        var playQ = 0
        var bankQ = 0
        var round = 0
        if (end) return;
        //// SETUP------------------------------------------------------------------------------------------SETUP
        bank = [pile[0], pile[2], pile[4], pile[6], pile[8]]
            //pile.splice(0, 0)
        play = [pile[1], pile[3], pile[5], pile[7], pile[9]]
            //pile.splice(0, 0)
        draw(bank, 'banc')
        draw(play, caller)
        setTimeout(function () {
            message.channel.sendMessage("Ok, vamos jogar blackjack! Quem fizer 21 ou o mais próximo vence!")
        }, 500);
        setTimeout(function () {
            message.channel.sendMessage("`Embaralhando...`").then(function (kik) {
                kik.edit("`Embaralhando..`")
                kik.edit("`Embaralhando.`")
                kik.edit("`Embaralhando`")
                    //
                setTimeout(function () {
                    kik.delete()
                    message.channel.sendFile(`${paths.BUILD}/cards/${caller+round}_bj.png`, "card.png", "Sua carta é " + play[round].icon)
                    if (end == false) {
                        message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+round}_bj.png`, "card.png", "Minha carta é " + bank[round].icon).then(function (thread) {
                            if (end) {
                                ongoing = false
                                console.log(ongoing + " ongo")
                                console.log(end + " end")
                                return;
                            }
                            for (crd = 0; crd <= round; crd++) {
                                bankQ += bank[crd].value
                            }
                            for (crd = 0; crd <= round; crd++) {
                                playQ += play[crd].value
                            }
                            //-----------------------------------------------------------------------------------REPLY
                            message.channel.sendMessage(":one:Seguir :two:Parar.Eu tenho:" + bankQ + ", você:" + playQ)
                            bot.on("message", newmsg => {
                                if (end) {
                                    ongoing = false
                                    console.log(ongoing)
                                    return;
                                }
                                //1 pick
                                //2 hold
                                bankQ = 0;
                                playQ = 0;
                                // pick
                                if (newmsg.author == message.author && newmsg.content == "1") {
                                    round++
                                    if (end) {
                                        ongoing = false
                                        console.log(ongoing)
                                        return;
                                    }
                                    message.channel.sendFile(`${paths.BUILD}/cards/${caller+round}_bj.png`, "card.png", "Sua carta é " + play[round].icon)
                                    for (crd = 0; crd <= round; crd++) {
                                        console.log(play[crd].value + "+")
                                        playQ += play[crd].value
                                    }
                                    if (playQ > 21) {
                                        message.reply("**Você passou de 21**")
                                        end = true;
                                        ongoing = false
                                        console.log(ongoing)
                                        return;
                                    }
                                    for (crd = 0; crd <= round-1; crd++) {
                                            console.log(bank[crd].value + "+")
                                            bankQ += bank[crd].value
                                        }
                                    if (bankQ < 13) {
                                        message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+round}_bj.png`, "card.png", "Minha carta é " + bank[round].icon)
                                        for (crd = 0; crd <= round; crd++) {
                                            console.log(bank[crd].value + "+")
                                            bankQ += bank[crd].value
                                        }
                                    }
                                    else {
                                        message.reply("Eu paro...")
                                        if (bankQ >= playQ || bankQ == 21) {
                                            message.reply("Eba, ganhei!")
                                            end = true;
                                            ongoing = false
                                            console.log(ongoing)
                                            return;
                                        }
                                        else {
                                            message.channel.sendMessage("Você venceu!")
                                            message.channel.sendMessage("Toma aqui, **"+bet*2+"**:cookie: de prêmio!")
                                             userData.cookies+=bet*2

                                            end = true;
                                            ongoing = false
                                            console.log(ongoing)
                                            return;
                                        }
                                    }
                                    console.log(bankQ)
                                    if (bankQ > 21) {
                                        message.channel.sendMessage("Ops... me dei mal")
                                          message.channel.sendMessage("Toma aqui, **"+bet*2+"**:cookie: de prêmio!")
                                             userData.cookies+=bet*2
                                        end = true;
                                        ongoing = false
                                        console.log(ongoing)
                                        return;
                                    } setTimeout(function () {
                                    message.reply(":one:Seguir :two:Parar.Eu tenho:" + bankQ + ", você:" + playQ)
                                     }, 100);
                                    //check blow
                                }
                                else if (newmsg.author == message.author && newmsg.content == "2") {
                                    round++

                                    //hold
                                    if (end) {
                                        ongoing = false
                                        console.log(ongoing)
                                        return;
                                    }
                                    bankQ=0
                                      for (crd = 0; crd <= round-1; crd++) {
                                        bankQ += bank[crd].value
                                    }

                                     if (bankQ < 13) {
                                         console.log(bankQ)
                                        message.channel.sendFile(`${paths.BUILD}/cards/${'banc'+round}_bj.png`, "card.png", "Eu tirei um " + bank[round].icon)
                                        bankQ=0
                                        for (crd = 0; crd <= round; crd++) {
                                            console.log(bank[crd].value + "+")
                                            bankQ += bank[crd].value
                                        }
                                    }
                                    else {
                                        message.channel.sendMessage("Eu paro")
                                         console.log(bankQ)
                                         bankQ=0
                                          for (crd = 0; crd <= round-1; crd++) {
                                        bankQ += bank[crd].value
                                    }
                                        if (bankQ >= playQ || bankQ == 21) {
                                             console.log(bankQ)
                                            message.channel.sendMessage("Venci!")
                                            end = true;
                                            ongoing = false
                                            console.log(ongoing)
                                            return;
                                        }
                                        else {
                                            message.channel.sendMessage("Perdi :(")
                                              message.channel.sendMessage("Toma aqui, **"+bet*2+"**:cookie: de prêmio!")
                                             userData.cookies+=bet*2
                                             console.log(bankQ)
                                            end = true;
                                            ongoing = false
                                            console.log(ongoing)
                                            return;
                                        }
                                    }


                                    //if (end) return;

                                  playQ=0
                                    for (crd = 0; crd <= round - 1; crd++) {
                                        playQ += play[crd].value
                                    }
                                    //  message.reply("1 pick 2 hold, Current sum is me:" + bankQ + " you:" + playQ)
                                    //check blow
                                    if (bankQ > 21) {
                                        message.channel.sendMessage("Ops... me dei mal")
                                          message.channel.sendMessage("Toma aqui, **"+bet*2+"**:cookie: de prêmio!")
                                             userData.cookies+=bet*2
                                         console.log(bankQ)
                                        console.log("bank blow")
                                        end = true;
                                        ongoing = false
                                        console.log(ongoing)
                                        return;
                                    }
                                    //check higher
                                    if (bankQ >= playQ) {
                                        message.channel.sendMessage("Yay! Venci")
                                        console.log("I win")
                                        end = true;
                                        ongoing = false
                                        console.log(ongoing)
                                        return;
                                    }
                                    else {
                                        message.reply("Você ganhou!")
                                          message.channel.sendMessage("Toma aqui, **"+bet*2+"**:cookie: de prêmio!")
                                             userData.cookies+=bet*2
                                        console.log("I win")
                                        end = true;
                                        ongoing = false
                                        console.log(ongoing)
                                        return;
                                    }
                                    return;
                                }
                                else {
                                    // end = true;
                                    // ongoing = false
                                    // console.log(ongoing)
                                    return;
                                };
                            });
                        });
                    }
                }, 500);
            });
        }, 300);
    }
