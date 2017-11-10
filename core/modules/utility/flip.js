const paths = require("../../paths.json");
const gear = require("../../gearbox.js");
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();
const cmd = 'flip';

const init = function (message,userDB,DB) {
const Channel = message.channel;
const LANG = message.lang;
const coin = gear.randomize(1, 2);
if (coin == 1) {
message.channel.send(mm('dict.coinHeads', {
lngs: LANG
}),{files:[paths.BUILD + 'heads.png']}).catch()
}
else {
message.channel.send(mm('dict.coinTails', {
lngs: LANG
}),{files:[paths.BUILD + 'tails.png']})
}
}
module.exports = {
pub:true,
cmd: cmd
, perms: 0
, init: init
, cat: 'games'
};
