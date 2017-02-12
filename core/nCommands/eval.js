var gear = require("../gearbox.js")
var modules = require("../modules.json")
exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {


  if (!message.author.id == '88120564400553984') return;


     const params = message.content.split(" ").slice(1);
    try {
      var code = params.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", gear.clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${gear.clean(err)}\n\`\`\``);
    }
  }
