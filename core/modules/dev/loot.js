        var gear = require("../../gearbox.js");
var cmd = 'say';

var LOOT = require("../../Archetypes/lootbox.js")

var init = async function (message,userDB,DB) {

console.log("ok")

    let arg = message.content.split(/\s+/)[1];
    var bauzin = new LOOT.Lootbox(arg)

//    Channel.sendCode(bauzin).then()
    console.log("-------------------")
    await bauzin.open()
    console.log(bauzin)

            let bauzinB = require("util").inspect(bauzin);

    let bay=[]
    for (var i in bauzin.prizes){

        let yL = bauzin.prizes[i].length

        for (var y=0;y<yL;y++){


            let itm= bauzin.prizes[i][y];


            bay.push({type:i,good:itm})

        }

    }

    message.channel.send(`
**Item 1**
${bay[0].type}
${bay[0].good}

**Item 2**
${bay[1].type}
${bay[1].good}

**Item 3**
${bay[2].type}
${bay[2].good}



`)

    return
      message.channel.sendCode("js", gear.clean(bauzinB)).then(coda=>ungra(coda))




    async function ungra(coda){


          const r = await coda.channel.awaitMessages(ms=>ms.author.id===message.author.id&&(ms.content=="ok"||ms.content=="reroll"),{max:1})

          let rr=r.first().content

          if (rr == "ok")return message.channel.send(`**LOOTBOX Done**`);
          if (rr == "reroll"){

              if (bauzin.stakes>=5)return message.channel.send(`**NO MORE REROLLS**`);;

              await bauzin.reroll()
                  let bauzinC = require("util").inspect(bauzin);
              message.channel.send(`**Reroll ${bauzin.stakes}/5**`);
      message.channel.sendCode("js", gear.clean(bauzinC)).then(coda=>ungra(coda))
          }

    }

    }
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};

