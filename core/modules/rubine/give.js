var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'give';

var init = function (message,userDB,DB) {


        //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (message.content.split(" ")[1]==helpkey || message.content.split(" ")[1]=="?"|| message.content.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}
//------------

    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;
    var userData = userDB.get(Author.id).modules
    var tgtData = userDB.get(Target.id).modules


try{
var emojya = bot.emojis.get('276878246589497344')
    let GOODMOJI = emojya
    let GOOD = 'Ruby'
    if (DB.get(Server.id).modules.GOODMOJI) {
        GOODMOJI = DB.get(Server.id).modules.GOODMOJI
    }
    if (DB.get(Server.id).modules.GOODNAME) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }


    var donate = parseInt(args[0])
  donate=Math.abs(donate)

    if (args.lenght < 2 || isNaN(donate) || message.mentions.size === 0){
        return gear.usage(cmd,message,mm)
    }

    if (gear.checkGoods(donate, Author) == true) {


        // message.guild.defaultChannel.send()
        gear.paramIncrement(Author, 'goodies', -donate)
        gear.paramIncrement(Author, 'expenses.trade', donate)
        gear.paramIncrement(Target, 'goodies', donate)
        gear.paramIncrement(Target, 'earnings.trade', donate)

       return  message.channel.send( mm('$.giveGoods' , {lngs:LANG, donate:donate, emoji:gear.emoji('ruby'), target:Target.username,author:Author.username })).then(function (c) {
            message.delete(5000).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})
        })
       // gear.writePoints(points, caller)
    } else {
        message.reply(mm('$.noFundsGeneric',{lngs:LANG,goods:GOOD}))
        return;
    }



}catch(e){message.reply(e.stack)}}

 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};
