var gear = require("../../gearbox.js");
var cmd = 'roll';
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var init = function (message,userDB,DB) {

const v={}

 let regex = /(([0-9]+|)d([0-9]+))((\s+|)(\+|-|\*|\/)(\s+|)([0-9]+)|)/g

 if(message.content.length > 12)return message.reply("Sorry, I bought all the dices I could find in local markets but there wasn't enough to do this roll");

   let match = regex.exec(message.content)
   const args = message.content.split(/\s+/).slice(1).join(" ").replace(regex,"$1$6$8")

   let NAME
   try{
        NAME= message.member.displayName
   }catch(e){
        NAME=message.author.username
   }
        let thrill = 1000
    if (message.content.includes("-t")){
        thrill += parseInt(message.content.substr(message.content.indexOf("-t")+2))*1000
        console.log(thrill)
    }



    const Channel=message.channel;

  if(!regex.test(args))return Channel.send("ERROR");

    let dies = parseInt(match[2]) || 1

    let rolls = []
    let sum = 0

    let die = gear.emoji("d"+match[3])


    if (dies <= 100) {
        for (i = 0; i < dies; i++) {
            res = gear.randomize(1, parseInt(match[3]))
            rolls.push("`" + res + "`")
            sum += res;
        }

    } else {
        for (i = 0; i < dies; i++) {
            res = gear.randomize(1, parseInt(match[3]))
            sum += res;
        }

    }


    // (gear.randomize(1,parseInt(match[3])))
    let a
    args.split(" ")[1] == "down" ? a = 0 : a = 1;
    var moresum = Math.floor(eval(sum + match[6] + parseInt(match[8]))) + a
    if (match[6]) {

        if (dies <= 100) tell(match[1], sum, rolls, moresum, match[6], match[8]);
        else tell(match[1], sum, "", moresum, match[6], match[8]);


    } else {
        if (dies <= 100) tell(match[1], sum, rolls, moresum);
        else tell(match[1], sum, "", moresum);

    }


    function tell(dices, result, pool, fullsum, operator, extra) {


        v.rolled = mm("games.dice.someoneRolledX", {lngs: message.lang})
        v.rolls =  mm("games.dice.rollsWere", {lngs: message.lang})
        v.andGot =  mm("games.dice.andGot", {lngs: message.lang,val:result})

        Channel.send(die+v.rolled.replace("%D%",dices).replace("%U%",NAME)).then(async m => {

            await setTimeout(() => {
                m.edit(m.content + v.andGot ).then(async mm => {
                    await setTimeout(() => {

                        if (pool == "") {
                           if(operator) mm.edit(mm.content + "\n" + sum + operator + extra + " = **" + fullsum + "!**");
                        } else {

                            mm.edit(mm.content + "\n" + v.rolls + "\n" + pool).then(mmm => {

                                if(operator)mmm.edit(mmm.content + "\n" + sum + operator + extra + " = **" + fullsum + "!**");
                            })
                        }

                    }, 1000)

                })
            }, thrill)
        })

    }






    //

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
