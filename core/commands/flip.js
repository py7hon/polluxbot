  if (message.content == (prefix + "flip")) {
        var coin = randomize(1, 2);
        if (coin == 1) {
            message.channel.sendFile(BUILD + 'heads.png', 'heads.png', "Cara!")
        }
        else {
            message.channel.sendFile(BUILD + 'tails.png', 'tails.png', "Coroa!")
        }
    }
