var express = require('express');
var router = express.Router();
const sv= require("../../core/gearbox.js")

router.get('/', async function(req, res, next) {
    console.log(req.user)


   //  if (!req.isAuthenticated()) return  res.send('not logged in :(');

    console.log(req)



    let USR = req.user
    let UDB =  sv.userDB.get(USR.id)

    if (UDB == undefined){
        return "SHIT"
    }


    res.render(__dirname+'/dash.html', {
      pix:`https://cdn.discordapp.com/avatars/${USR.id}/${USR.avatar}.png`,
      name:`${USR.username}#${USR.discriminator}`,
        uname: USR.username,
        discriminator: USR.discriminator,
      rubys:UDB.modules.goodies,
      exp:UDB.modules.exp,
      level:UDB.modules.level,
      ptxt:UDB.modules.persotext,
      background:`http://files.pollux.fun/${UDB.modules.bgID}.png`,

    });
   // res.json(req.user);
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();


     res.send('not logged in :(');
}

module.exports = router;
