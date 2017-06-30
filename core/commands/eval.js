var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'eval';

var init = function (message,userDB,DB) {
var Server = message.guild;
var Channel = message.channel;
var Author = message.author;
if (Author.bot) return;
var Member = Server.member(Author);
var Target = message.mentions.users.first() || Author;
var MSG = message.content;
var bot = message.botUser
var args = MSG.split(' ').slice(1)[1]
var LANG = message.lang;

//-------MAGIC----------------




    try{



  if (Author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');

    if (args = "2+2"){
        return Channel.sendMessage("```Tá me achando com cara de calculadora, palhaço? ```").then(m=>{ setTimeout(c=>Channel.sendMessage("```(A propósito, são 4) ```"),1000 )})
    }


     const params = MSG.split(" ").slice(1);
    try {
      var code = params.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", gear.clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
    }
  }catch(err){console.log(err)}}
module.exports = {pub:false,cmd: cmd, perms: 0, init: init, cat: 'misc'};
