exports.run= function channelSetup(element,args) {

    let guild = element.guild
    console.log('Setting Up Channel:'.green + element.name + " from " + guild.name)

    const chanele = args.defaults.cdfal
    chanele.name = element.name
    chanele.ID = element.id

    args.gear.superDefine(element.guild,"channel."+element.id,chanele)

  }

