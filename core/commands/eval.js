exports.run = (bot, message, args) => {
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
