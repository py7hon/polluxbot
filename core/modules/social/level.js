const fs = require("fs");
const gear = require('../../gearbox.js')
const paths = require("../../paths.json");
const Pixly = require("pixel-util");
const Canvas = require("canvas");
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();
const userDB=gear.userDB
const DB=gear.serverDB

const cmd = 'level';

const init= async function (msg) {

const canvas = new Canvas.createCanvas(220, 100);
const ctx = canvas.getContext('2d');

const P={lngs:msg.lang}
const v={
  LEVEL: mm("website.level",P)
  ,GLOBAL: mm("website.global",P)
  ,SERVER: mm("discord.server",P)
}

const Server = msg.guild;

const Target      = msg.mentions.users.first() || msg.author;
const TARGET_DB   = await userDB.findOne({id:Target.id});
const SV_DB       = await DB.findOne({id:Server.id});

const favcolor    = (TARGET_DB.modules.favcolor || "#eb11da")


let avi = Target.avatarURL||Target.defaultAvatarURL;
const propic      = avi.replace(/gif/g,"png");
avi = Server.iconURL||Server.defaultIconURL
const serpic      = typeof avi=="string"? avi.replace(/jpg/g,"png"):false;


const exp         = TARGET_DB.modules.exp     ||0;
const level       = TARGET_DB.modules.level   ||0;
const exptoNex    = Math.trunc(Math.pow((level + 1) / 0.0427899, 2));
const exptoThis   = Math.trunc(Math.pow(level) / 0.0427899, 2);
const frameofact  = exptoNex - exptoThis;
const percent     = exp/exptoNex;

const SVFAC       = SV_DB.modules.UPFACTOR || 1;

let l_exp,
   l_level,
   l_exptoNex,
   l_exptoThis,
   l_frameofact,
   l_percent;

  try{

    l_exp           = SV_DB.modules.LOCALRANK[Target.id].exp  || 0
    l_level         = SV_DB.modules.LOCALRANK[Target.id].level|| 0
    l_exptoNex    = Math.trunc(Math.pow((l_level + 1) / (SVFAC), 2))
    l_exptoThis   = Math.trunc(Math.pow(l_level) / (SVFAC), 2)
    l_frameofact  = l_exptoNex - l_exptoThis
    l_percent     = l_exp/l_exptoNex

  }catch(e){

    l_exp           =  0
    l_level         =  0
    l_frameofact  = 0
    l_percent     = 0

  }

  async function XChart(size, pcent, colorX,pic,lvthis,tx) {
    const color = TColor(colorX);
    const pi = Math.PI;
    let startR = pi * 3 / 2, endR = pToR(pcent) * pi;
    if (pcent == "1") { endR = pi * 7 / 2; }
    const rx = size / 2, ry = rx;
    const canvas_proto = new Canvas.createCanvas(size,size);
    const context = canvas_proto.getContext('2d');
    function TColor(rgbColor) {
        rgbColor = rgbColor.replace(/\s/g, "");
        const arrRGB = new Array(3);
        if (rgbColor.indexOf("rgb") > -1) {
            const colorReg = /\s*\d+,\s*\d+,\s*\d+/i;
            const t = colorReg.exec(rgbColor)[0].split(",");
            for (let i = 0; i < arrRGB.length; i++) {
                arrRGB[i] = t[i];
            }
        }
        else if (rgbColor.indexOf("#") > -1) {
            if (rgbColor.length > 4)//"#fc0,#ffcc00"
            {
                let j = 1;
                for (let i = 0; i < arrRGB.length; i++) {
                    arrRGB[i] = parseInt(rgbColor.substr((i + j), 2), 16);
                    j += 1;
                }
            } else {
                for (let i = 0; i < arrRGB.length; i++) {
                    const t = rgbColor.substr((i + 1), 1);
                    t = t + t;
                    arrRGB[i] = parseInt(t, 16);
                }
            }
        }
        return arrRGB.join(",") ;
    }
    function pToR(p) {
        const r = (p * 2) % 2 + 1.5;
        if (r >= 0 && r <= 2) return r;
        return Math.abs((2 - r) % 2);
    }
  function arcDraw(r, color) {
        context.beginPath();
        context.arc(rx, ry, r, startR, endR, false);
        context.fillStyle = color;
        context.lineTo(rx, ry);
        context.closePath();
        context.fill();
    }
    canvas_proto.width = canvas_proto.height = size;



    context.beginPath();
    context.arc(rx, ry, rx - 5, 0, pi * 2, true);
    context.strokeStyle = 'rgba(' + color + ',0.25)';
    context.lineWidth = 4;
    context.stroke();
    arcDraw(rx - 0, 'rgba(' + color + ',1)');

    context.beginPath();
    context.arc(rx, ry, rx - 7, 0, pi * 2, false);
    context.fillStyle = 'rgba(255,255,255,1)';
    context.lineTo(rx, ry);
    context.closePath();
    context.fill();

    if(pic){
      context.clip();
      let picture = await gear.getCanvas(pic);
      context.drawImage(picture, 0, 0,size,size);
      context.restore()
    }

    context.fillStyle = 'rgba(255,255,255,.5)';
    context.fill();
    context.fillStyle = 'rgba(' + color + ',1)'; ;



    context.font = "900 14px WhitneyHTF-BoldSC";

    const t = (pcent * 100).toFixed(0) + "%";
    let WW =  context.measureText(t+"%").width
    context.fillText(t, size/2+15-WW/2, size-15);



    let label = await gear.tag(context,tx||v.LEVEL.toUpperCase(),"900 10px WhitneyHTF-Black","#222")
    let tg = await gear.tag(context,lvthis,"900 50px WhitneyHTF-Black","#363636")

    let f = .8
    let lx = (size/2) - (label.width/2/f)
    let ly = (size/2) - (label.height*1.5)
    let lh=label.height/f
    let lw=label.width/f

    let x = (size/2) - (tg.width/2)
    let y = (size/2) - (tg.height/2)

    await context.drawImage(label.item,lx,15,lw,lh)
    await context.drawImage(tg.item,x,y,tg.width,tg.height)

    return canvas_proto

}

  let global_roundel = await XChart(100,percent,favcolor||"#dd5383",propic,level,v.GLOBAL)
  let local_roundel = await XChart(100,l_percent,"#9459af",serpic||false,l_level,v.SERVER)

  ctx.drawImage(local_roundel,0,0)
  ctx.drawImage(global_roundel,120,0)

  await msg.channel.send({
                    files: [{
                        attachment: await canvas.toBuffer(),
                        name: "leveli.png"
                    }]
                })

}


 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'misc'};

