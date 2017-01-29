exports.run = (bot, message, args) => {
if (message.content.startsWith(prefix + "personaltxt")) {
        userData.persotext = message.content.substr(13)
        message.reply(`Seu texto pessoal mudou para:

*` + message.content.substr(13) + `*

Digite \`+profile\` para visualizar ele em seu Profile Card~`)
    }
}
