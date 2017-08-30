
const fs = require("fs");
const gear = require('../../gearbox.js')
const paths = require("../../paths.js");
const PixelCore = require('canvasutil').PixelCore
const pixelProcessor = new PixelCore();
const Pixly = require("pixel-util");
const Jimp = require("jimp");
const Canvas = require("canvas");
const opentype = require("opentype.js");
const drawText = require("node-canvas-text").default;
const locale = require('../../../utils/multilang_b');


const mm = locale.getT();



var cmd = 'say';

var LOOT = require("../../Archetypes/lootbox.js")

var init = async function (message,userDB,DB) {



    Canvas.registerFont(paths.FONTS + "/product-sans-bold.ttf", {
            family: 'Product',
            weigth: "bold"
        });
        Canvas.registerFont(paths.FONTS + "/product-sans-reg.ttf", {
            family: 'Product',
            weigth: "normal"
        });
        //



console.log("ok")

    let arg = message.content.split(/\s+/)[1];
    var bauzin = new LOOT.Lootbox(arg)

//    Channel.sendCode(bauzin).then()
    console.log("-------------------")
    await bauzin.open()
   // console.log(bauzin)

            let bauzinB = require("util").inspect(bauzin);

    let bay=[]
    for (var i in bauzin.prizes){

        let yL = bauzin.prizes[i].length

        for (var y=0;y<yL;y++){


            let itm= bauzin.prizes[i][y];
//console.log(i)

            bay.push({type:i,good:itm})

        }

    }




const    prize = {

    bgs:{
        C:"BG",
        U:"BG",
        R:"BG",
        SR:"BG",
        UR:"BG"
    },
        stamps:{
        C:"STAMP",
        U:"STAMP",
        R:"STAMP",
        SR:"STAMP",
        UR:"STAMP"
    },
        medals:{
        C:"COLOR",
        U:"MEDAL",
        R:"MEDAL",
        SR:"MEDAL",
        UR:"MEDAL"
    },
        rubines:{
        C:"RUBINE_C",
        U:"RUBINE_U",
        R:"RUBINE_R",
        SR:"RUBINE_SR",
        UR:"RUBINE_UR"
    },
        jades:{
        C:"JADE_C",
        U:"JADE_U",
        R:"JADE_R",
        SR:"JADE_SR",
        UR:"JADE_UR"
    },

}




async function renderBG(rarity) {

console.log("Raritu:"+rarity)
    let files = gear.fs.readdirSync(paths.BUILD + "backdrops/"+rarity)

    let rand = gear.randomize(0, files.length - 1);
    var filepath = paths.BUILD + "backdrops/" +rarity+"/" +files[rand]

    const incanv = new Canvas(150, 150);
    const ctx = incanv.getContext('2d');

    let I = new Canvas.Image;
    I.src = await Pixly.createBuffer(filepath).then(b => {return b;});
    let J = new Canvas.Image;
    J.src = await Pixly.createBuffer(paths.BUILD+"LOOT/BG.png").then(b => {return b;});
        await ctx.rotate(0.16)
       await ctx.drawImage(I, 18, 40,130,69);
        await ctx.rotate(-0.16)
       await ctx.drawImage(J, 0, 0);

    return incanv

}
async function renderMedal(medal) {

console.log(medal)
    let medalfolder = gear.fs.readdirSync(paths.MEDALS)

   // let rand = gear.randomize(0, files.length - 1);

    var filepath = paths.MEDALS + medal.icon + ".png"

    const incanv = new Canvas(150, 150);
    const ctx = incanv.getContext('2d');

    let I = new Canvas.Image;
    I.src = await Pixly.createBuffer(filepath).then(b => {return b;});
    let J = new Canvas.Image;
    J.src = await Pixly.createBuffer(paths.BUILD+"LOOT/MEDAL.png").then(b => {return b;});
        await ctx.drawImage(J, 0, 0);
        //await ctx.rotate(0.16)
        await ctx.drawImage(I, 62, 76);
        //await ctx.rotate(-0.16)

    return incanv

}



    let LOOTS = []
    let Max = bay.length

    const canvas = new Canvas(400, 300);
    const base = canvas.getContext('2d');
    for (i = 0; i < Max; ++i) {

        let img = new Canvas.Image;
        const rarity = new Canvas.Image;

        img.src = await Pixly.createBuffer(paths.BUILD + "LOOT/" + prize[bay[i].type][bay[i].good[0]] + ".png").then(b => {
                return b;
            });

        if (bay[i].type == "rubines" || bay[i].type == "jades") {
            img.src = await Pixly.createBuffer(paths.BUILD + "LOOT/" + prize[bay[i].type][bay[i].good[0]] + ".png").then(b => {
                return b;
            });
        } else if (bay[i].type == "bgs") {
            img = await renderBG(bay[i].good[0])
        }else if (bay[i].type == "medals") {


          img = await renderMedal(bay[i].good[1])
        } else {
            img.src = await Pixly.createBuffer(paths.BUILD + "LOOT/" + prize[bay[i].type][bay[i].good[0]] + ".png").then(b => {
                return b;
            });
        }

        let qtd
        rarity.src = await Pixly.createBuffer(paths.BUILD + "LOOT/rarity/" + bay[i].good[0] + ".png").then(b => {
            return b;
        });
        if (bay[i].type == "rubines" || bay[i].type == "jades") qtd = await gear.tag(base, "x" + bay[i].good[1], '18px Product,Sans', "#a0a0a0");
        let name = await gear.tag(base, bay[i].type.toUpperCase(), '18px Product,Sans', "#d0d0d0");

        let item = {
            N: name,
            I: img,
            R: rarity,
            Q: qtd || false
        }
       // console.log(item)
        LOOTS.push(item)
    }

   // console.log(bay)


        const V = new Canvas.Image;
            V.src = await Pixly.createBuffer(paths.BUILD + "LOOT/baseline.png").then(b => {
            return b;
        });

      await base.drawImage(V, 0, 0);





    let lootman = [
        {
            x: 125,
            y: 25
        },
        {
            x: 25,
            y: 125
        },
        {
            x: 400 - 150 - 25,
            y: 125
        },
    ]
    let rareman = [
        {
            x: 175,
            y: 45
        },
        {
            x: 75,
            y: 150
        },
        {
            x: 275,
            y: 150
        },
    ]
    let tagman = [
        {
            x: 275,
            y: 100
        },
        {
            x: 175,
            y: 200
        },
        {
            x: 375,
            y: 200
        },
    ]
    let nameman = [
        {
            x: 125,
            y: 150
        },

        {
            x: 25,
            y: 250
        },

        {
            x: 225,
            y: 250
        },
    ]

    let sq = 35
    let shift = (50-sq)/2

    for (i=0;i<LOOTS.length;++i){

        console.log(LOOTS[i])
      await base.drawImage(LOOTS[i].I, lootman[i].x, lootman[i].y);
      await base.drawImage(LOOTS[i].R, rareman[i].x+shift, rareman[i].y, sq,sq);
      if (LOOTS[i].Q) await base.drawImage(LOOTS[i].Q.item, tagman[i].x-LOOTS[i].Q.width-25, tagman[i].y+10+25);
      await base.drawImage(LOOTS[i].N.item, nameman[i].x+(150-LOOTS[i].N.width)/2, nameman[i].y+10);

    }





     message.channel.send("Loot", {
                    files: [{
                        attachment: await canvas.toBuffer(),
                        name: "loot.png"
                    }]
                })


/*
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
*/
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

