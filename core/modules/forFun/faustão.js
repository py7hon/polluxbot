const Discord = require('discord.js');
var gear = require("../../gearbox.js");
var cmd = 'fausto';
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
var init = function (message,userDB,DB) {


    //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (message.content.split(" ")[1]==helpkey || message.content.split(" ")[1]=="?"|| message.content.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}
//------------
//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
    try{


        var fausto=[
            "ERROOOU!",
            "TÁ PEGANDO FOGO BICHO!",
            "ESSA FERA AÍ MEU!",
            "OLOCO!",
            "ELE MORREU!",
            "NO PASSADO INVADIU O BRASIL!",
            "DERROTOU O BRASIL NA ÚLTIMA COPA!",
            "SEU IDIOMA É O HOLANDES!",
            "ESSA FERA "+message.guild.member(message.author).displayName.toUpperCase()+" AQUI NO DOMINGÃO!",
           // "ESSA FERA "+message.guild.members.random().displayName.toUpperCase()+" AQUI NO DOMINGÃO!",
            "ESSA FERA "+message.guild.members.random().user+" AQUI NO DOMINGÃO!",
            "QUEM SABE FAZ AO VIVO!",
            "VOCÊ DESTRUIU MEU OVO!",
            "NINGUÉM ACERTOU!",
            "É UM PAÍS DA EUROPA!",
            "ORRA MEU!",
            "CHURRASQUEIRA DE CONTROLE REMOTO!",
        ]
let f= "https://abrilvejasp.files.wordpress.com/2016/12/faustao-popp.jpg?quality=70&strip=info&w=600"
message.channel.createWebhook('Faustão',"http://static2.blastingnews.com/media/photogallery/2015/4/21/660x290/b_290x290/globo-fara-programa-para-revelar-novo-faustao_309513.jpg")
 .then(async w => {
    await w.edit("Faustão",f)
    w.send(fausto[gear.randomize(0,11)])
    w.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})
})
 .catch(e=>{

    let emb = new gear.Discord.RichEmbed
    emb.setDescription(fausto[gear.randomize(0,11)]);
    emb.setAuthor("Faustão");
    emb.setThumbnail(f);
    emb.setFooter("Permissões de Webhook Negadas");
    emb.setColor("#3157ad");
    message.channel.send({embed:emb}).catch(e=>{message.reply("Faustão mandou dizer que não visita Server cheio de restrição idiota. Libere Webhooks ou Incorporar Links que ele vem.")})

})
    }catch(e){gear.hook.send(e.error)}

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};


