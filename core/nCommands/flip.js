var paths = require("../paths.js");
var gear = require("../gearbox.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'flip';
var init = function (message, userDB, DB) {
        var Channel = message.channel;
        var LANG = message.lang;
        var coin = gear.randomize(1, 2);
        if (coin == 1) {
            message.channel.sendFile(paths.BUILD + 'heads.png', 'heads.png', mm('dict.coinHeads', {
                lngs: LANG
            }))
        }
        else {
            message.channel.sendFile(paths.BUILD + 'tails.png', 'tails.png', mm('dict.coinTails', {
                lngs: LANG
            }))
        }
}
        module.exports = {
            pub:true,
            cmd: cmd
            , perms: 0
            , init: init
            , cat: 'games'
        };
