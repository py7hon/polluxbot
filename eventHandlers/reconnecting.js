const polx = require("../pollux.js")
var defaults = require("../utils/defaults.js") // Database Defaults

module.exports = {
    run: function run(gear, DB, userDB, bot) {

        console.log("Reconnect".bgRed)

        let username = 'Pollux Core Reporter';
        let pretext = `SELF RESTART TRIGGERED! Gimme a second to still myself.`;
        let color = '#ffb249';

        gear.sendSlack(username, pretext, undefined, color)
    }
}
