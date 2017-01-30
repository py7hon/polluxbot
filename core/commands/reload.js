const fs = require("fs");
exports.run = (bot, message, args, userData, caller) => {
  if(!args || args.size < 1) return message.channel.reply(`Faltou coisa ae magrão.`);


    if (args == "*") {
        fs.readdir("./", (err, files) => {
  if(err) return console.error(err);
  files.forEach(file => {
    delete require.cache[require.resolve(`./${file}`)];
    let eventName = file.split(".")[0];
     message.reply(`Comando **+${eventName}** foi atualizado`);

  });
});
    }else{

  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.reply(`Comando **+${args[0]}** foi atualizado`);
    }



};
