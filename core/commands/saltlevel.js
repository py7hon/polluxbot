exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

let saltmoji = message.guild.emojis.find('name','salty')

    //let target = message.mentions.users.first();
    var multiplier = 1
    try{if (message.mentions.users.first().id == "248435798179971072"){
        multiplier = 23
    }}catch(err){}
    r = gear.randomize(1,100)
    message.channel.sendMessage('O nivel de sal de '+caller+' é **'+(r*multiplier)+'%** '+saltmoji)
}
