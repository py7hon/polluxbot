var gear = require("../../gearbox.js");
var cmd = 'say';
var colors = require('colors');

var init = async function (message,userDB,DB) {
    var bot = message.botUser

//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
Array.prototype.removeire = function () {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


    return


userDB.forEach(async us=>{
     //  try{
     var user = await JSON.parse(us);






    if (user.modules.bgID === "0"||user.modules.bgID == undefined){




        user.modules.bgID="5zhr3HWlQB4OmyCBFyHbFuoIhxrZY6l6"
    }
        user.modules.bgInventory = ["5zhr3HWlQB4OmyCBFyHbFuoIhxrZY6l6"]
        try{

        delete user.modules['expenses.jogatina']
        delete user.modules['earnings.jogatina']
        delete user.modules['expenses.drops']
        delete user.modules['earnings.drops']
        delete user.modules['expenses.trade']
        delete user.modules['earnings.trade']
        delete user.modules['expenses.putaria']
        }catch(e){

        }

        if (user.ID){
            if (bot.users.get(user.ID)==undefined){
                userDB.delete(user.ID)
                return console.log(`
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>         UNDEF

`)
            }
            user.name= bot.users.get(user.ID).username
            user.username= bot.users.get(user.ID).username
            user.discriminator= bot.users.get(user.ID).discriminator


       await userDB.set(user.ID,user)
        }else(console.log(`
--------------
NO ID PROVIDED
--------------
`))


 //}catch(e){console.log("ERR >>>" + user.name +" "+user.ID)}

/*

   console.log(`

++++++++++++++++++++++++++++++++++++++++++
NORMALISING: ${user.name}, ${user.username}#${user.discriminator} >>
ID:${user.ID}

bgID:${user.modules.bgID}
bgInventory:${user.modules.bgInventory}

++++++++++++++++++++++++++++++++++++++


`.bgBlue)

      */


    })



}



 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
