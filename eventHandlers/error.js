
const polx = require("../pollux.js")
var defaults = require("../utils/defaults.js")  // Database Defaults


module.exports = {
    run:  function run(gear,DB,userDB,bot, err) {

          if (!err    ) return;
let name = "Pollux Core Reporter"
let txb = "Minor error! Check console"
let tx = `
**${err}**


${err.stack}

`
let color =  '#ffdc49'

gear.sendSlack(name, txb, tx, color)

    }
}
