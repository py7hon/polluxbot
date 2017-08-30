var express = require('express');
var router = express.Router();
var fs = require('fs');
const sv= require("../../core/gearbox.js")
// DATABASE



/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user)



var user = sv.userDB.get("88120564400553984").modules

  let updir = __dirname+"/../"
    var rerities = ["UR","SR","R","U","C"]

    let imgbox = {}
    let imn = []
    let TAGS = JSON.parse(fs.readFileSync(updir+"public/js/grimoire.json","utf8"))
    for (let i=0;i<5;++i){
     let RAR = rerities[i]
      imgbox[RAR] = []
     let path = "../../resources/imgres/build/backdrops/"
    let files = fs.readdirSync(updir+"public/"+path+RAR)
    for (let y=0;y<files.length;++y){

      imn = files[y].split(".")[0]
    var filepath = "backdrops/" +RAR+"/"+ files[y]
    imgbox[RAR].push([filepath,imn])
    }
    }
//console.log(imgbox)


   let USR = req.user
  console.log("\n\n\n\n\n\nUSR")
  console.log(USR)

        let userinfo = {

        }

    if (USR){
        let UDB =  sv.userDB.get(USR.id)
       userinfo = {
         pix:`https://cdn.discordapp.com/avatars/${USR.id}/${USR.avatar}.png`,
      name:`${USR.username}#${USR.discriminator}`,
        uname: USR.username,
        discriminator: USR.discriminator,
      rubys:UDB.modules.goodies,
      exp:UDB.modules.exp,
      level:UDB.modules.level
       }
    }
  console.log("USINFO:")
  console.log(userinfo)

  res.render('bgs', {
    title: 'Pollux: Profile Backgrounds',
    imgboxe: imgbox,
    tags: TAGS,
    user: user,
    userinfo:userinfo

  });

});

module.exports = router;
