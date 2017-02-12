const fs = require("fs");
exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    if (!args || args.size < 1) return message.channel.reply(`Faltou coisa ae magrão.`);
    try{
        var a = args.split(' ')}catch(err){var a = args}
    if (a[0] == "*") {
        if (a[1] != "-verbose") {
            try {
                message.channel.sendMessage('Ok, bora lá...')
                var count = 0
                var filesa = 0
                fs.readdir("./commands/", (err, files) => {
                    files.forEach(file => {
                        filesa++
                    })
                    files.forEach(file => {
                        console.log(file)
                        delete require.cache[require.resolve(`./${file}`)];
                        let eventName = file.split(".")[0];

                        count++
                        if (count == filesa) {
                            message.channel.sendMessage(":white_check_mark:  Feito! **" + count + "** Comandos atualizados")
                        }
                    });
                })
            }
            catch (err) {}
        }
        else {
            try {
                message.channel.sendMessage('Ok, bora lá...')
                var count = 0
                var filesa = 0
                fs.readdir("./commands/", (err, files) => {
                    files.forEach(file => {
                        filesa++
                    })
                    files.forEach(file => {
                        console.log(file)
                        delete require.cache[require.resolve(`./${file}`)];
                        let eventName = file.split(".")[0];
                        message.channel.sendMessage(`Atualizando **+${eventName}** `);
                        count++
                        if (count == filesa) {
                            message.channel.sendMessage(":white_check_mark:  Feito! **" + count + "** Comandos atualizados")
                        }
                    });
                })
            }
            catch (err) {}
        }
    }
    else {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
        message.reply(`Comando **+${args[0]}** foi atualizado`);
    }
};
