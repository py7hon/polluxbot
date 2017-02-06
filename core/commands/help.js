exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

        var helptxt = `
**Comandos disponíveis:**

\`+avi\`
Retorna o seu avatar, só isso.

\`+daily\`
Rubys de graça todo dia.

\`+adm [@user]\`
Verifica se você ou @fulaninho é um Adm

\`+gear.glassify\`
Faz umas viadage com teu avatar

\`+profile [@user]\`
Mostra o Profilecard seu ou de @fulaninho


\`+say <texto>\` INATIVO
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
Pega rubys largados

\`+ruby\`
Veja quantos rubys você tem

\`+personaltxt <texto>\`
Uma frase pro seu Profile Card

\`+blackjack <aposta>\`
Blackjack Estilo Vegas. Apostando Rubys

\`+rps [aposta] [@desafiado]\`
Pedra papel e tesoura

\`+switch [numero]\`
Troca a foto do bot.
*Menu será implementado logo.*

\`+stats\`
info aleatoria

[] = _Argumento Opcional_
<> = _Argumento Obrigatório_

Qualquer problema só chamar @Flicky praquele inútil me consertar. :heart:

Invite (experimental): https://discordapp.com/oauth2/authorize?client_id=271394014358405121&scope=bot
New Support Discord: https://discord.gg/ay48h7Q
`
        message.author.sendMessage(helptxt)
        console.log("HELP INVOKED")
        message.reply("Te enviei uns lance em pvt, dá um zóio.")
    };
