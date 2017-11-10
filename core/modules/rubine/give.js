const gear = require("../../gearbox.js");
const eko = require("../../archetypes/ekonomist.js");
const paths = require("../../paths.json");
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();

const cmd = 'give';

const init =  async function (message,userDB,DB) {

    const Author = message.author;
    const Target = message.mentions.users.first() || Author;
    const bot = message.botUser
    const args = message.content.split(/ +/).slice(1)
    const LANG = message.lang;

  //HELP TRIGGER
  const P = {lngs: message.lang}
  if(gear.autoHelper([mm("helpkey",P),'noargs',''],{cmd,message,opt:this.cat}))return;
  //------------
  if(args.length<2||args[0].includes("<"))return gear.autoHelper('force',{cmd,message,opt:this.cat});

  let donate = parseInt(Math.round(args[0]));
  donate=Math.abs(donate);

  if (args.lenght < 2 || isNaN(donate) || message.mentions.size === 0){
      return gear.usage(cmd,message,this.cat)
  }
  if (gear.checkGoods(donate, Author) == true) {

    await eko.pay(donate,Author.id,{target:Target.id});

    return  message.channel.send(gear.emoji('rubine') + mm('$.giveGoods' , {lngs:LANG, donate:donate, target:Target.username,author:Author.username })).then(function (c) {
      message.delete(5000).catch();
    });
  } else {
    message.reply(mm('$.noFundsGeneric',{lngs:LANG,goods:GOOD}))
  };

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: '$'
};
