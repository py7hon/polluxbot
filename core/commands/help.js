exports.run = (bot, message, args) => {

        var helptxt = `
**Comandos disponíveis:**

\`+avi\`
Retorna o seu avatar, só isso.

\`+adm [@user]\`
Verifica se você ou @fulaninho é um Adm

\`+gear.glassify\`
Faz umas viadage com teu avatar

\`+profile [@user]\`
Mostra o Profilecard seu ou de @fulaninho

\`+bar <1-100>\`
Uma barra X% cheia

\`+say <texto>\`
Repete <texto>

\`+joined [@user]\`
Retorna a data que você ou @fulaninho entrou no Server

\`+vidal\`
VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL VIDAL

\`+salty\`
QUIPE BOTE CARALHO

\`+safe [tags]\`
Imagens bonitas do Safebooru.

\`+rule34 [tags]\`
Putaria, usar no canal NSFW ou serás mutado.

\`+help\`
Abre isso

\`+pick\`
Pega cookies largados

\`$cook\`
Veja quantos cookies você tem

\`+personaltxt <texto>\`
Uma frase pro seu Profile Card

[] = _Argumento Opcional_
<> = _Argumento Obrigatório_

Invite: https://discordapp.com/oauth2/authorize?client_id=271394014358405121&scope=bot
`
        message.author.sendMessage(helptxt)
        console.log("HELP INVOKED")
        message.reply("Te enviei uns lance em pvt, dá um zóio.")
    };
