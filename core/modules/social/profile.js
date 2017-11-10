const fs = require("fs");
const gear = require('../../gearbox.js')
const paths = require("../../paths.json");
const Pixly = require("pixel-util");
const Canvas = require("canvas");
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();
const arraySort = require("array-sort")
const DB=gear.serverDB;
const userDB=gear.userDB;

  var line = 0;



function getTier(Author,bot) {
        let emblem;

      let thisguy = bot.guilds.get("277391723322408960").member(Author)
if(!thisguy)return false;
      if (thisguy.roles.find("name", "Aluminium")) {
        emblem = "aluminium"
      };
      if (thisguy.roles.find("name", "Iridium")) {

        emblem = "iridium"
      };
      if (thisguy.roles.find("name", "Palladium")) {
        emblem = "palladium"
      };
      if (thisguy.roles.find("name", "Uranium")) {
        emblem = "uranium"
      };
    return emblem;
  };

const init= async function run(msg) {

  try{

    var start = Date.now();

    const canvas = new Canvas.createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    async function getImage(path){
        let neo = await new Canvas.Image;
        neo.src = await Pixly.createBuffer(path).then(b => {return b;});
        return neo;
  };

  //if(msg.author.id!="88120564400553984") return msg.reply("Under Mantainance | Em Manutenção");

  const P={lngs:msg.lang}
  const v={
    LEVEL: mm("website.level",P)
    ,GLOBAL: mm("website.global",P)
    ,SERVER: mm("discord.server",P)

  }
const Server = msg.guild
       const Target   = msg.mentions.users.first() || msg.author
        let TARGET_DB   = Target.dDATA || await userDB.findOne({id:Target.id}) ;
        const SV_DB   = await DB.findOne({id:Server.id});

if (TARGET_DB.modules.bgID == undefined) {
   TARGET_DB.modules.bgID = "5zhr3HWlQB4OmyCBFyHbFuoIhxrZY6l6";
}
if (TARGET_DB.modules.rep == undefined) {
   TARGET_DB.modules.rep = 0;
}
if (TARGET_DB.modules.bgInventory == undefined) {
   TARGET_DB.modules.bgInventory = ["5zhr3HWlQB4OmyCBFyHbFuoIhxrZY6l6"];
}
if (TARGET_DB.modules.medalInventory == undefined) {
   TARGET_DB.modules.medalInventory = [];
}
if (TARGET_DB.modules.medals == undefined) {
   TARGET_DB.modules.medals = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}
    // console.log('here1')
    // console.log(TARGET_DB.modules.medals.length )

if (TARGET_DB.modules.medals.length < 9) {

  let lent =  9-TARGET_DB.modules.medals.length
  for(i=0;i<lent;i++){
    //await gear.paramAdd(Target, "medals", 0);
  }
  TARGET_DB   = await userDB.findOne({id:Target.id});
}


let  originals=["370610552403132416","271394014358405121"]

if (Target.bot && !originals.includes(Target.id)) {
  console.log('here')
    gear.paramDefine(Target, "bgID", "bot")
}


//let querypoolGlobal =await userDB.find()


let querypoolLocal= SV_DB.modules.LOCALRANK;
/*

        const ranked = querypoolGlobal.map(u=>{
          try{

            const rankItem = {}
            rankItem.exp = u.modules.exp
            rankItem.id = u.id
            return rankItem;
          }catch(e){

          }
        })
  */
       const Sranked= []
             for(i in querypoolLocal){

            const SrankItem = {}
            if (Server.members.has(i)){

            if(SV_DB.modules.LOCALRANK[i]){
            SrankItem.exp = SV_DB.modules.LOCALRANK[i].exp
            }else{
            SrankItem.exp = 0
            }

          SrankItem.id = i
            Sranked.push( SrankItem);
            }
        }


     //   arraySort(ranked,  'exp', {reverse: true})
        arraySort(Sranked, 'exp', {reverse: true})

let flair = TARGET_DB.modules.flairTop || 'default';

    let favcolor    = (TARGET_DB.modules.favcolor || "2211EB")
    let  backgroundId    = (TARGET_DB.modules.bgID|| "5zhr3HWlQB4OmyCBFyHbFuoIhxrZY6l6")
    if(Target.bot)backgroundId="IlyEEDBj0GLLlFl8n6boPLSkADNuBwke";
    let persotex    = (TARGET_DB.modules.persotext || "I have no personal text because i'm lazy as a sloth.")
    const nametag     = Target.tag
    let nickname    = msg.mentions.members.first() ? msg.mentions.members.first().displayName : msg.member.displayName
    const rubines     = TARGET_DB.modules.rubines || 0
   // let globalrank  = "#"+((ranked.findIndex(i => i.id === Target.id))+1)

    let serverank ;
let globalrank;
    if(!Target.bot){
    serverank   = "#"+((Sranked.findIndex(i => i.id === Target.id))+1)
    globalrank  = "#"+((await userDB.find({"modules.exp": { "$gt" : TARGET_DB.modules.exp}})).length+1)
    }


    const rep         = TARGET_DB.modules.rep
    let propic;
    try{

     propic = Target.avatarURL.replace(/gif/g,"png") || Target.defaultAvatarURL
    }catch(e){
      propic=Target.defaultAvatarURL;
    }

    let medals      = TARGET_DB.modules.medals  || [0,0,0,0,0,0,0,0,0]
    let sticker     = TARGET_DB.modules.sticker

    const exp         = TARGET_DB.modules.exp     ||0
    let level       = TARGET_DB.modules.level   ||0
    const exptoNex    = Math.trunc(Math.pow((level + 1) / 0.0427899, 2))
    const exptoThis   = Math.trunc(Math.pow(level) / 0.0427899, 2)
    const frameofact  = exptoNex - exptoThis
    let percent     = exp/exptoNex



    const SVFAC         = SV_DB.modules.UPFACTOR || 0.472899;

     let l_exp,
           l_level,
           l_exptoNex,
           l_exptoThis,
           l_frameofact,
           l_percent

  try{
console.log(SV_DB.modules.LOCALRANK[Target.id])
    l_exp           = SV_DB.modules.LOCALRANK[Target.id].exp  || 0;
    l_level         = SV_DB.modules.LOCALRANK[Target.id].level|| 0;
    l_exptoNex    = Math.trunc(Math.pow((l_level + 1) / (SVFAC), 2))
    l_exptoThis   = Math.trunc(Math.pow(l_level) / (SVFAC), 2)
    l_frameofact  = l_exptoNex - l_exptoThis
    l_percent     = l_exp/l_exptoNex

  }catch(e){
    //console.log(e)
    l_exp           =  0
    l_level         =  0
    l_frameofact  = 0
    l_percent     = 0

  }

  if (Target.id == "271394014358405121") {
    backgroundId = "plxx";
    sticker = "../medals/pumpxd"
    nickname = "P o l l u x"
    l_level = 999
    level = 999
    percent = 1
    l_percent = 1
    globalrank= "∞"
    serverank= "∞"
    favcolor = "#a22db7"
    persotex = "Happy Halloween!\nCustomise your profile and more at http://www.pollux.fun \nType p!help for commands!"
    medals = [
              "halloween_2017","ghostling","skreamer",

              "treatskull","pollux","witch_hat",

              "pentagram","jackskell1","pumpkin"

             ]
  }
  if (Target.id == "370610552403132416") {
    backgroundId = "medic";

    nickname = "Lt. Morales | The Medic"
    l_level = 128
    level = 500
    percent = 1
    l_percent = 1
    globalrank= "∞"
    serverank= "∞"
    favcolor = "#ef1942"
    persotex = "Where's the Emergency?"
    medals = [
              0,0,0,

              0,"starcraft","heroes",

              0,0,0

             ]
  }


    /*====*______________________________________________. ''' .
    |     |                                             / LEVEL \
    | REP |                                            |    #    |
    | --- |                         SORRY,              \  XX%  /
    |     |                 AN ERROR HAS OCCURRED        ' ... '|
    |     |            BUT HAVE THIS ASCII CARD INSTEAD         |
    |     |              IT IS ALMOST THE SAME THING,           |
    |     .` ^ `.            JUST MORE "VINTAGE"                |
    |   /         \                                             |
    |  |           |_,---.______________________________________|_
    |  |           | | F | DISPLAYNAME                            |
    |   \         /--'___'----------------------------------------+
    |     '. _ .'     \.                         |               |/
    |     |            |   GLOBALRANK     ####%  |  [0] [1] [2]  |
    |     |  [STICKER] |   LOCALRANK    L_ROUNDEL|               |
    |     |            |                         |  [3] [4] [5]  |
    | F-B |____________||'''''''''''''''''''''|| |               |
    |     |   RUBINES  ||  P E R S O T E X T  || |  [6] [7] [8]  |
    |  D  |      XXX<| || D O E S N'T   F I T || |               |
    +-----+------------++=====================++-+--------------*/




  async function XChart(size, pcent, colorX,pic,lvthis) {
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
      let a = await getImage(pic);
      context.drawImage(a, 0, 0,size,size);
      context.restore()

    }
    context.fillStyle = 'rgba(255,255,255,.5)';
    context.fill();
    context.fillStyle = 'rgba(' + color + ',1)'; ;



    context.font = "900 18px WhitneyHTF-BoldSC";

    const t = (pcent * 100).toFixed(0) + "%";
    let WW =  context.measureText(t+"%").width
    context.fillText(t, size/2+15-WW/2, size-15);



    let label = await gear.tag(context,v.LEVEL.toUpperCase(),false,"#222");
    let tg = await gear.tag(context,lvthis,"900 56px WhitneyHTF-Black","#363636");

    let f = .8
    let lx = (size/2) - (label.width/2/f)
    let ly = (size/2) - (label.height*1.5)
    let lh=label.height/f
    let lw=label.width/f

    let x = (size/2) - (tg.width/2)
    let y = (size/2) - (tg.height/2)

    await context.drawImage(label.item,lx,15,lw,lh);
    await context.drawImage(tg.item,x,y,tg.width,tg.height);

    return canvas_proto

}
  async function Hex(size,picture) {
    let globalOffset = 0
    size = size/2
    let x  = size+10
    let y=  -size

    let cw=size
    let ch=size


    let hex= new Canvas.createCanvas (size*2+20,size*2+20)
    let c=hex.getContext("2d")
    c.rotate(1.5708)
    c.save();
    c.beginPath();
    c.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (side=0; side < 7; side++) {
      c.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    }

     c.fillStyle = "rgb(248, 248, 248)";
    c.fill();
 if(picture){
    c.clip();
    let a = await getImage(picture);
      c.rotate(-1.5708)
      c.drawImage(a, 0, x-size,size*2,size*2);
      c.restore()


c.globalCompositeOperation='xor';

c.shadowOffsetX = 0;
c.shadowOffsetY = 0;
c.shadowBlur = 10;
c.shadowColor = 'rgba(30,30,30,1)';

c.beginPath();
  for (side=0; side < 7; side++) {
      c.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    }
c.stroke();
c.stroke();
c.stroke();

c.globalCompositeOperation='destination-atop';


 }else{
    c.shadowColor = "rgba(34, 31, 39, 0.77)"
    c.shadowBlur = 10

 }
       c.fill();

    return hex

  }

  //==================================================================
  //==================================================================
  //==================================================================
  //==================================================================
  //==================================================================


  const offset_hex  = 15
  const AVATAR_HEX  = {x:24 ,y:146}
  const G_ROUNDEL   = {x:680,y:10 }
  const L_ROUNDEL   = {x:465,y:380}
  const DISPLAYNAME = {x:0  ,y:0  }
  const _MEDALS     = {x:580  ,y:370  }
  const _STICKER    = {x:120  ,y:400  }
  const _BG         = {x:90  ,y:28  }
  const G_RANK      = {x:430  ,y:390  }
  const L_RANK      = {x:430  ,y:440  }
  const _RUBINES    = {x:236  ,y:535  }
  const _EXP        = {x:0  ,y:0  }
  const _REP        = {x:55  ,y:60  }
  const _FT        = {x:260  ,y:275  }

  //=========================================


  let mainframe = await getImage(paths.BUILD+"/profile/mainframe.png");


  let _bg = await getImage(paths.BUILD+"/backdrops/"+backgroundId+".png");

  let _flairTop = await getImage(paths.BUILD+"/flairs/top/"+flair+".png");

  let medals_images = []
  let valid_images = []
  let valid_medals  = 0
  for(i=0;i<medals.length;i++){

    let md = medals[i].constructor == Array ? medals[i][0] : medals[i]
    if (md==0||md==undefined) md = "undefined";
    else{
    valid_medals++;
    valid_images.push(await getImage(paths.MEDALS+md+".png"));
    }

    medals_images.push(await getImage(paths.MEDALS+md+".png"));
  }


  let global_roundel = await XChart(120,percent,favcolor||"#dd5383",false,level);
  let pre_a = Server.iconURL||Server.defaultIconURL
  let serpic = pre_a.replace("jpg","png")

  let local_roundel = await XChart(120,l_percent,"#9459af",serpic,l_level);
  let hex_frame = await Hex(250);
  let hex_pic =   await Hex(220,propic);
  //let moray = await XChart(100,percent,"#ea47a5","#FF0000")



  let label = await gear.tag(ctx,nickname.toUpperCase(),"900 40px Whitney","#222")

// new Font(paths.FONTS + "/visitor1.ttf", {family: 'Visitor'});


   let _rep = await gear.tag(ctx,rep,"40px DejaVu Sans","#fff")

   let rep_displace= _rep.width/2


  ctx.drawImage(_bg,_BG.x,_BG.y,687,340);




  let colorstrap = new Canvas.createCanvas(82,600)
  let cx = colorstrap.getContext("2d")

  cx.fillStyle = favcolor
  cx.fillRect(0, 0, 82, 570);
  cx.globalAlpha = 0.9
  cx.globalCompositeOperation = "destination-atop";
  cx.drawImage(mainframe,-10,-10)

  cx.globalCompositeOperation = "multiply";
  cx.drawImage(mainframe,-10,-10)


  ctx.drawImage(mainframe,0,0)
  ctx.drawImage(colorstrap,10,10)


  ctx.globalCompositeOperation = "source-over";

  let labw = label.width > 440? 440:label.width
  ctx.drawImage(label.item,320,295,labw,label.height)
  ctx.drawImage(_rep.item,_REP.x-rep_displace,_REP.y)


  if(sticker){
    let sticky = await getImage(paths.BUILD+sticker+".png");
    ctx.drawImage(sticky,_STICKER.x,_STICKER.y+8)
  }else{
    let polluxi = await getImage(paths.BUILD+"/polluxi.png");
    ctx.drawImage(polluxi,_STICKER.x,_STICKER.y-20)
  }

   let personal = await gear.block(ctx,persotex,"18px Arial, sans-serif","#000",275,70)
   ctx.drawImage(personal.item,290,490)

  let rubicount = await gear.tag(ctx,gear.miliarize(rubines),
                                 "900 30px Whitney,Sans","#2b2b2b")
  ctx.drawImage(rubicount.item,_RUBINES.x-rubicount.width,_RUBINES.y)

    let grank = await gear.tag(ctx,gear.miliarize(globalrank),
                               "900 22px Whitney,Sans","#2b2b2b")
  ctx.drawImage(grank.item,G_RANK.x-grank.width,G_RANK.y)

    let lrank = await gear.tag(ctx,gear.miliarize(serverank),
                               "900 22px Whitney,Sans","#2b2b2b")
  ctx.drawImage(lrank.item,L_RANK.x-lrank.width,L_RANK.y)



  if(valid_medals==1){
    let x=_MEDALS.x + (200 / 2 - 50)
    let y=_MEDALS.y + (200 / 2 - 50)

    await ctx.drawImage(valid_images[0],x,y)

  }else if(valid_medals==2){

    let x=_MEDALS.x
    let y=_MEDALS.y + (200 / 2 - 50)
      await ctx.drawImage(valid_images[0],x,y);
      await ctx.drawImage(valid_images[1],x+100,y);

    }else if(valid_medals==3){

    let x=_MEDALS.x
    let x1=_MEDALS.x + (200 / 2 - 50)
    let y=_MEDALS.y
      await ctx.drawImage(valid_images[0],x1,y);
      await ctx.drawImage(valid_images[1],x,y+100);
      await ctx.drawImage(valid_images[2],x+100,y+100);

    }else if(valid_medals==4){

    let x=_MEDALS.x
    let y=_MEDALS.y
      await ctx.drawImage(valid_images[0],x,y);
      await ctx.drawImage(valid_images[1],x+100,y);
      await ctx.drawImage(valid_images[2],x,y+100);
      await ctx.drawImage(valid_images[3],x+100,y+100);

  }else{

    let x=_MEDALS.x
    let y=_MEDALS.y

    let ind = 0
    let row = 0
    while(ind<8){
      let col = 0
        while(col<3){
          await ctx.drawImage(medals_images[ind],x+68*col,y+68*row, 64,64);
          ind++;
          col++;
        }
        row++;
    }


  }


  //ctx.drawImage(medals_images[1],_MEDALS.x+100,_MEDALS.y)


  await ctx.drawImage(local_roundel,L_ROUNDEL.x,L_ROUNDEL.y,96,96);
  await ctx.drawImage(global_roundel,G_ROUNDEL.x,G_ROUNDEL.y);
  await ctx.drawImage(hex_frame,AVATAR_HEX.x,AVATAR_HEX.y);
  await ctx.drawImage(hex_pic,AVATAR_HEX.x+offset_hex,AVATAR_HEX.y+offset_hex);
    let tier = getTier(Target,msg.botUser);
    if(tier){
    let tierframe = await getImage(paths.BUILD+"profile/donortiers/"+tier+".png");
    await ctx.drawImage(tierframe,32,154)
    }

    if(tier=='uranium'){
ctx.globalCompositeOperation='lighter';
      ctx.globalAlpha = .5;
    let burst = await getImage(paths.BUILD+"burst.png");
    ctx.drawImage(burst,0,35)
      ctx.globalAlpha = 1;
ctx.globalCompositeOperation='source-atop';
    }


  ctx.drawImage(_flairTop,_FT.x,_FT.y)
        var stop = Date.now();
        var diff = (stop - start);

   await msg.channel.send({
                    files: [{
                        attachment: await canvas.toBuffer(),
                        name: "profile-"+Target.tag+".png"
                    }]
                })


  }catch(e){
    console.log(e)
    msg.channel.send("```ml"+`
    /*====*______________________________________________. ''' .
    |     |                                             / LEVEL \
    | REP |                                            |    #    |
    | --- |                         'SORRY,             \  XX%  /
    |     |                  AN ERROR HAS OCCURRED       ' ... '|
    |     |            BUT HAVE THIS ASCII CARD INSTEAD         |
    |     |              IT IS ALMOST THE SAME THING,           |
    |     .` ^ `.            JUST MORE 'VINTAGE'                |
    |   /         \                                             |
    |  |           |_,---.______________________________________|_
    |  |           | | F | DISPLAYNAME                            |
    |   \         /--'___'----------------------------------------+
    |     '. _ .'     \.                         |               |/
    |     |            |   GLOBALRANK     ####%  |  [0] [1] [2]  |
    |     |  [STICKER] |   LOCALRANK    L_ROUNDEL|               |
    |     |            |                         |  [3] [4] [5]  |
    | F-B |____________||´''''''''''''''''''''|| |               |
    |     |   RUBINES  ||  P E R S O T E X T  || |  [6] [7] [8]  |
    |  D  |      XXX<| || D O E S N´T   F I T || |               |
    +-----+------------++=====================++-+--------------*/
`+"```")
  }//end catch 1

}//end block


module.exports = {
    pub: true,
    cmd: "profile",
    perms: 3,
    init: init,
    cat: 'social',
    cool:800
};
