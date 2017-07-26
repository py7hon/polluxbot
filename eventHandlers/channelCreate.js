
const polx = require("../pollux.js")
var defaults = require("../utils/defaults.js")  // Database Defaults


module.exports = {
    run:  function run(gear,DB,userDB,bot, ch) {
          gear.logChannel(ch,"CREATED",DB)
    }
}
