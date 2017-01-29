if(message.content.startsWith(prefix+"eval")) {
    try {
      var code = params.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
