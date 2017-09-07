exports.run= function serverSetup(guild, args) {

    if (!args.DB.get(guild.id) || args.DB.get(guild.id) == undefined) {

      console.log(('          --- - - - - = = = = = = Setting Up Guild:'.yellow + guild.name).bgBlue)

      args.DB.set(guild.id, args.defaults.gdfal)

      var gg = args.DB.get(guild.id);
      gg.name = guild.name;
      gg.ID = guild.id;
      if (guild.region === 'brazil') gg.modules.LANGUAGE = "dev";
      args.DB.set(guild.id, gg);

      console.log(gg)

      const chn = {}
      guild.channels.forEach(async element => {
        if (element.type != 'voice') {

            //await require("./channelSetup.js").run(element,args)





              console.log('Setting Up Channel:'.green + element.name + " from " + guild.name)

              const channel = args.defaults.cdfal
              channel.name = element.name
              channel.ID = element.id

              const GGD = args.DB.get(element.guild.id)
              console.log("\n\n----")
              console.log(channel)
              console.log("\n\n----")
              gg.channels[element.id] = channel

              args.DB.set(guild.id, GGD)













      }});

    } else {

    }

  }
