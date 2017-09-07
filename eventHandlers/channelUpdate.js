
const polx = require("../pollux.js")
const fx = require("../core/functions.js")


module.exports = {
    run:  function run(gear,DB,userDB,bot, ch) {

          try{
          gear.sendLog("updtChan","adv",ch.guild,DB,ch.name)
          gear.superDefine(ch,"name",ch.name)
          }catch(e){
            console.log(e)
          }
    }
}
