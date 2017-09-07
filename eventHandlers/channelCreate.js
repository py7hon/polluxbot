//const polx = require("../pollux.js")
const fx = require("../core/functions.js")


module.exports = {
    run:  function run(gear,DB,userDB,bot, ch) {
          fx.run("channelSetup",ch)
          gear.logChannel(ch,"CREATED",DB)
    }
}
