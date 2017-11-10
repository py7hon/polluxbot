const gear = require("../../gearbox.js");
const paths = require("../../paths.json");
const locale = require('../../../utils/multilang_b');
const eko = require("../../archetypes/ekonomist.js")
const mm = locale.getT();

const cmd = 'drop';

const init = async function (message, userDB, DB) {

  const Server = message.guild;
  const Channel = message.channel;
  const Author = message.author;
  const MSG = message.content;
  const bot = message.botUser
  const args = MSG.split(' ').slice(1)
  const LANG = message.lang;


  let P={lngs:message.lang}
  if(gear.autoHelper([mm("helpkey",P)],{cmd,message,opt:this.cat}))return;

  let userData = Author.dDATA.modules

  var emojya = gear.emoji("rubine")
  let GOODMOJI = emojya
  let GOOD = 'Rubine'

  var dropAmy = Math.abs(parseInt(args[0])) || -1;
  if (dropAmy <= 0) return message.channel.send(":warning: Minimun 1");

  if (userData.rubines >= dropAmy) {
      await eko.pay(dropAmy, Author, {
        type: 'drops'
      });
      await gear.paramIncrement(Author, 'rubines', -Math.abs(dropAmy));
      await gear.paramIncrement(msg.botUser.user, 'rubines', Math.abs(dropAmy));

    message.channel.send(mm('$.userDrop', {
      lngs: LANG,
      amt: dropAmy,
      emoji: GOODMOJI,
      good: GOOD,
      user: Author.username,
      prefix: message.prefix
    }).replace(/\&lt;/g, "<").replace(/\&gt;/g, ">"), {
      files: [paths.BUILD + 'rubine.png']
    }).then(function (r) {

      if (isNaN(Channel.DROPSLY)) {
        Channel.DROPSLY = dropAmy
      } else {
        Channel.DROPSLY += dropAmy
      }
      message.delete(1000);


        let oldDropsly = Channel.DROPSLY;
        let responses = await Channel.awaitMessages(msg2 =>
          msg2.content === message.prefix + 'pick' ||
          msg2.content === guild.dDATA.modules.PREFIX + 'pick', {
            maxMatches: 1
          }
        ).catch("DROP.JS 67 -- ERROR");

        if (responses.size === 0) {} else {
          if (oldDropsly > Channel.DROPSLY) {
            return resolve(true);
          }

          let Picker = responses.first().author
          console.log("----------- SUCCESSFUL PICK by" + Picker.username)
          message.channel.send(mm('$.pick', {
            lngs: LANG,
            good: GOOD,
            user: Picker.username,
            count: Channel.DROPSLY,
            emoji: ""
          }) + " " + emojya).then(function (c) {
            c.delete(500000).catch(e => {
              let a = (new Error);
              gear.errLog(e, __filename, a.stack.toString())
            })
            r.delete(0).catch(e => {
              let a = (new Error);
              gear.errLog(e, __filename, a.stack.toString())
            })
          }).catch(e => {
            let a = (new Error);
            gear.errLog(e, __filename, a.stack.toString())
          });

          await gear.paramIncrement(Picker, 'rubines', Math.abs(Channel.DROPSLY));
          await eko.receive(Channel.DROPSLY, Picker, {
            type: 'drops'
          });

          Channel.DROPSLY = 0
          return resolve(true);
        }
        return resolve(true);

    }).catch(e => {
      let a = (new Error);
      gear.errLog(e, __filename, a.stack.toString())
    })

  } else {
    message.reply(mm('$.cantDrop', {
      lngs: LANG,
      goods: GOOD
    })).catch(e => {
      let a = (new Error);
      gear.errLog(e, __filename, a.stack.toString())
    });
  }
}

module.exports = {
  pub: true,
  cmd: cmd,
  perms: 3,
  init: init,
  cat: 'misc'
}
