
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');


module.exports = {

runb:function loot(event, DB, userDB){
    if(event.content!="kéo")return;

    const msg = event
    const message = event

    const MSG = event.content;
    const SVR = msg.guild;
    const CHN = msg.channel;
    const L = msg.lang

    if (DB.get(SVR.id).channels[CHN.id].modules.DROPS == false) return;


    const v = {
        dropLoot:"<:loot:339957191027195905> **LOOT BOX DROP!!!** You all have **__20 Seconds__** to dispute it! `b+pick`",
        disputing:"**This Loot Box will be raffled between:**\n",
        oscarGoesTo:"**Encerrado!** Está lootbox vai para...",
        gratz:"<:loot:339957191027195905> Parabéns pela aquisição! Para consultar seu inventário e abrir Boxes use `*comando*` em um canal com permissões para `*perms* ` habilitadas, ou DM."
    }

    dropLoot(event,DB,userDB,MSG,SVR,CHN,L,v)


    function dropLoot(event){


        //if (SVR.name === "Discord Bots") return;
        var droprate = gear.randomize(1, 10000)
        if (droprate > 0) {

            CHN.send(v.dropLoot, {files: [paths.BUILD + 'chest.png']})
                    .then(dropMsg => event.channel.send(v.disputing)
                            .then(dispMsg=>processDropChest(dropMsg,dispMsg)))
                    .catch(err => {
               CHN.send(v.dropLoot)
                    .then(dropMsg => event.channel.send(v.disputing)
                            .then(dispMsg=>processDropChest(dropMsg,dispMsg)))
                    .catch(err => gear.hook.send("**DROP REFUSES** \n"+err.error))
            })
        }

    }

   async function processDropChest(drop,disp){

        try {
                if (!CHN.loot) {
                    CHN.loot = true
                }

                console.log("------------=========== ::: NATURAL RARE DROP ::: ===".bgGreen.yellow.bold)

                return new Promise(async resolve => {

                    var oldDropsly = CHN.DROPSLY

                    let pickers = new gear.Discord.Collection
                    let responses = await CHN.awaitMessages(async msg2 => {

                                if (!pickers.has(msg2.author.id) && (msg2.content === message.prefix + 'pick' ||
                                        msg2.content === DB.get(msg2.guild.id).modules.PREFIX + 'pick')) {
                                    console.log("aaa")
                                    pickers.set(msg2.author.id,msg2);
                                        console.log(pickers.has(msg2.author.id))
                                    await disp.edit(disp.content + "\n" + msg2.author.username).then(neue => {
                                        disp.content = neue.content;
                                        return true;
                                    })
                                } else {
                                    return false
                                }

                            }, {
                            max: 10,
                            time:20000
                        }
                    );
                    if (pickers.length === 0) {} else {
                        if (oldDropsly > CHN.DROPSLY) {
                            drop.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
                            return resolve(true);
                        }



                            let drama = []
                            let ments = []
                        pickers.forEach(ms=>{
                            drama.push(ms.guild.member(ms.author).displayName)
                            ments.push(ms.author).toString()
                        })

                            let rnd = gear.randomize(0,ments.length-1);


                     //   console.log("----------- SUCCESSFUL PICK by" + Picker.username)



                     await pickers.deleteAll();
                     await drop.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
                     await disp.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});

                        CHN.send(v.oscarGoesTo).then(goes => {


                            CHN.send(drama).then(async dra => {
                                setTimeout(async fn => {
                                    drama[rnd] = ments[rnd]
                                    await dra.edit(drama).then(fin => {

                                        goes.edit(v.gratz)

                                        setTimeout(async fn => {
                                            fin.delete().catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())});
                                        }, 5000)

                                    })
                                    CHN.send("fini")
                                }, 5000)
                            })



                            CHN.loot = false
                            return resolve(true);

                        })
                    }
                })
            } catch (e) {
                let v = "Ruby Send Forbidden: " + drop.guild.name + " C: " + drop.channel.name
                gear.hook.send(e.error);
                hook.send(v)
            }

    }

    }
}
