exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

     if(!gear.moduleCheck('RUBY',message)){
        message.reply(':no_entry_sign: Sistema de Rubys foi desabilitado aqui.');
        return;
    }

    if (message.mentions.users.size === 0) {
        var r = userData.rubys
        var fam = ''
        switch (true) {
                case (r < 10):
                    fam = "Você é um pleb pé rapado"
                    break;
                   case (r < 100):
                    fam = "Você tá bem ok"
                    break;
                case (r < 500):
                    fam = "Você tá bem na fita"
                    break;
                case (r < 1000):
                    fam = "Você é semi-rico"
                    break;
                case (r < 5000):
                    fam = "Você é RYCAAAA"
                    break;
                case (r < 10000):
                    fam = "Você é um fuckin magnata"
                    break;
                case (r > 10000):
                    fam = "Você é um cheater"
                    break;

            }
        return message.reply("voce tem " + userData.rubys + " rubys. "+fam)

    }
    let target = message.mentions.users.first();
    return message.channel.sendMessage(target.username + " tem " + points[target.id].rubys + " rubys")
}
