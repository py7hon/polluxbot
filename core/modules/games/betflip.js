const paths = require("../../paths.json");
const gear = require("../../gearbox.js");
const fs = require("fs");
const eko = require("../../archetypes/ekonomist.js")
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();

const cmd = 'betflip';

let mony;
const init = async function (message) {

    const Channel = message.channel;
    const Author = message.author;
    const MSG = message.content;
    const bot = message.botUser
    const BOT = message.botUser.user

    let P={lngs:message.lang}
    if(gear.autoHelper([mm("helpkey",P)],{cmd,message,opt:this.cat}))return;

    let rubinemoji = bot.emojis.get('343314186765336576')

    let bet = MSG.toLowerCase().split(/ +/);
    const prompts = {
        error1: mm('$.insuFloor', {
            lngs: message.lang,
            goods: "Rubine",
            number: 3,
            emoji: ""
        }),
        error2: mm('CMD.incorrectUsage', {
            lngs: message.lang,
            usage: "`+beflip ["+mm('dict.qnt',{lngs: message.lang})+"] ["+mm('dict.res',{lngs: message.lang})+"]`",
            example: "`+betflip 5 "+mm('dict.coinHeads',{lngs: message.lang})+"`"
        }),
         error3: mm('$.insuBet', {
            lngs: message.lang,
            number: 3
        }),
          noFunds: mm('$.noFunds', {
            lngs: message.lang,
            number: Author.dDATA.modules.rubines,
            goods: ""
        }),
    };

let coinHeads = mm('dict.coinHeads',{lngs: message.lang});
let coinTails = mm('dict.coinTails',{lngs: message.lang});
mony = Author.dDATA.modules.rubines / 2 +1000;

    if (await eko.checkFunds(3, Author) == false) {
        message.reply(prompts.error1+ rubinemoji);
        return;
    }
    if (bet.length <= 2) {
        message.reply(prompts.error2);
        return;
    }
    if (isNaN(parseInt(bet[1], 10))) {
        message.reply(prompts.error2);
        return;
    };
    bet[1] = parseInt(bet[1], 10)
    if (bet[1] < 3) {
       message.reply(prompts.error3);
        return;
    };
    if ( eko.checkFunds(parseInt(bet[1]), Author) == false) {
        message.reply(prompts.noFunds + rubinemoji);
        return;
    };

    if (bet[2] != coinHeads && bet[2] != coinTails) {
       message.reply(prompts.error2+ rubinemoji);
        return;
    }
            let valid=parseInt(bet[1]);
            await eko.pay(valid,message.author.id, {type: 'gambling'});

    let coin = gear.randomize(0, 500)+gear.randomize(1, 500);
        coin = gear.randomize(0, 500)+gear.randomize(1, 500);
        coin = gear.randomize(0, 500)+gear.randomize(1, 500);
    let res = ""
    let ros = ""
    let actual =  bet[2] == coinHeads ? "heads" : "tails"
    let actual_res = bet[2] == coinHeads ? coinHeads : coinTails
    let opposite_img = bet[2] == coinHeads ? "tails" : "heads"
    let opposite_res = bet[2] == coinHeads ? coinTails : coinHeads

    if(coin == 400){
    res =  'side'
    ros = 'side.png'
    }
    else if(coin<400){
    res = actual_res
    ros = actual+'.png'
    }else{
    res = opposite_res
    ros = opposite_img+'.png'
    }
    if (bet > 2000){
          res = opposite_res
          ros = opposite_img+'.png'
    }
    if (res.toLowerCase() == bet[2]) {
        let vicPrompt = mm('$.coinVictory', {
            lngs: message.lang,
            result:res,
            prize: Math.ceil(bet[1]*1.5),
            emoji: ""
        })+rubinemoji
        message.channel.send(vicPrompt,{files:[paths.BUILD + ros]})

            let valid_ceil =Math.ceil(parseInt(bet[1])*1.5);
            await eko.receive(valid_ceil,message.author.id, {type: 'gambling'});

    }else if (res=='side'){
        message.channel.send("The coin landed on its side??? Wat? Get away from me! And take "+Math.ceil(parseInt(bet[1] * 3))+"rubines!",{files:[paths.BUILD + ros]})
            let valid_ceil =Math.ceil(parseInt(bet[1])*3);
            await eko.receive(valid_ceil,message.author.id, {type: 'gambling'});
              }else {
        let dftPrompt = mm('$.coinDefeat', {
            lngs: message.lang,
            result:res
        })
        message.channel.send(dftPrompt,{files:[paths.BUILD + ros]})
      }
}

 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'gambling',
   cool: mony||3500
};
