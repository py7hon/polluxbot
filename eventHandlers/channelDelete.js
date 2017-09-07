
const polx = require("../pollux.js")
const fx = require("../core/functions.js")


module.exports = {
    run:  function run(gear,DB,userDB,bot, ch) {

        gear.paramRemove(ch.guild,"channels",ch.id)
        gear.logChannel(ch,"DELETED",DB)

    }
}
