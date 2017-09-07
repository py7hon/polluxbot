const Discord = require("discord.js");
var gear = require("../../gearbox.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'NOT_DISABLEABLE';
const cfg = require('../../../config.js');
var init = function (evento,logtype,Server,DB,extras) {
var LANG = DB.get(Server.id).modules.LANGUAGE;

//-------MAGIC----------------


  console.log("LOG GO")
   try {


            let chanpoint = false;
            let logchan = DB.get(Server.id).modules.LOGCHANNEL
            let advchan = DB.get(Server.id).modules.ADVLOG
            let actchan = DB.get(Server.id).modules.ACTLOG
            let modchan = DB.get(Server.id).modules.MODLOG


                switch (true){
                  case logchan && Server.channels.has(logchan):
                    chanpoint = Server.channels.get(logchan);
                    break;
                  case logtype == "act" && actchan && Server.channels.has(actchan):
                    chanpoint = Server.channels.get(actchan);
                    break;
                  case advchan && logtype == "adv" && Server.channels.has(advchan):
                    chanpoint = Server.channels.get(advchan);
                    break;
                  case logtype == "mod" && modchan && Server.channels.has(modchan):
                    chanpoint = Server.channels.get(modchan);
                    break;
                  default:
                    chanpoint = false;
                  }

              function createLog(icon,title,flavor,event,footer,color,image){

                const ember = new Discord.RichEmbed;

                if (title)            ember.setTitle(title);
                if (flavor)           ember.setDescription(icon + " " + flavor);
                if (event&&footer)    ember.setFooter(event,footer)
                if (event&&!footer)   ember.setFooter(event)
                if (image)            ember.setThumbnail(image)
                ember.setColor((color||"#4c63e2"))
                var ts = new Date
                ember.setTimestamp(ts)
                return ember

              }

              //%1 user %2 channel %3 server %4 role
                let P = {lngs:[LANG,"en"]}

                const logItems= {


                        userJoin: {
                          icon: ":inbox_tray:",
                          title: undefined,
                          flavor: mm("logs.userJoin",P),
                          event: mm("website.userJoin",P),
                          footer: undefined,
                          color: "#36b244",
                          image: undefined
                        },

                        userLeave: {
                          icon: ":outbox_tray:",
                          title: undefined,
                          flavor: mm("logs.userLeave",P),
                          event: mm("website.userLeave",P),
                          footer: undefined,
                          color: "#e32222",
                          image: undefined
                        }
                          ,
                        messDel: {
                          icon: ":x:",
                          title: undefined,
                          flavor: mm("logs.messDel",P),
                          event: mm("website.messDel",P),
                          footer: undefined,
                          color: "#e82525",
                          image: undefined
                        },
                        messEdit: {
                          icon: " ",
                          title: undefined,
                          flavor: mm("logs.messEdit",P),
                          event: mm("website.messEdit",P),
                          footer: undefined,
                          color: "#edc726",
                          image: undefined
                        },



                        usrBan: {
                          icon: ":hammer:",
                          title: undefined,
                          flavor: mm("logs.userJoin",P),
                          event: mm("website.userJoin",P),
                          footer: undefined,
                          color: "#36b244",
                          image: undefined
                        },
                        usrKick: {
                          icon: ":boot:",
                          title: undefined,
                          flavor: mm("logs.userJoin",P),
                          event: mm("website.userJoin",P),
                          footer: undefined,
                          color: "#36b244",
                          image: undefined
                        },
                        usrMute: {
                          icon: ":mute:",
                          title: undefined,
                          flavor: mm("logs.usrMute",P),
                          event: mm("website.usrMute",P),
                          footer: undefined,
                          color: "#3640b2",
                          image: undefined
                        },
                        usrUnmute: {
                          icon: ":loud_sound:",
                          title: undefined,
                          flavor: mm("logs.usrUnmute",P),
                          event: mm("website.usrUnmute",P),
                          footer: undefined,
                          color: "#3640b2",
                          image: undefined
                        },

                        newChan: {
                          icon: ":hash:",
                          title: undefined,
                          flavor: mm("logs.newChan",P),
                          event: mm("website.newChan",P),
                          footer: undefined,
                          color: "#4e6def",
                          image: undefined
                        },
                        newRole: {
                          icon: ":hash:",
                          title: undefined,
                          flavor: mm("logs.newRole",P),
                          event: mm("website.newRole",P),
                          footer: undefined,
                          color: "#4e6def",
                          image: undefined
                        },
                        permsEdit: {
                          icon: "::",
                          title: undefined,
                          flavor: mm("logs.permsEdit",P),
                          event: mm("website.permsEdit",P),
                          footer: undefined,
                          color: undefined,
                          image: undefined
                        },
                        revokeBan: {
                          icon: "::",
                          title: undefined,
                          flavor: mm("logs.revokeBan",P),
                          event: mm("website.revokeBan",P),
                          footer: undefined,
                          color: undefined,
                          image: undefined
                        },
                        uptRole: {
                          icon: "::",
                          title: undefined,
                          flavor: mm("logs.uptRole",P),
                          event: mm("website.uptRolen",P),
                          footer: undefined,
                          color: undefined,
                          image: undefined
                        },
                        delChan: {
                          icon: ":hash:",
                          title: undefined,
                          flavor: mm("logs.delChan",P),
                          event: mm("website.delChan",P),
                          footer: undefined,
                          color: undefined,
                          image: undefined
                        },
                  updtChan: {
                          icon: ":hash:",
                          title: undefined,
                          flavor: mm("logs.updtChan",P),
                          event: mm("website.updtChan",P),
                          footer: undefined,
                          color: undefined,
                          image: undefined
                        },
                        usrNick: {
                          icon: "::",
                          title: undefined,
                          flavor: mm("logs.usrNick",P),
                          event: mm("website.usrNickn",P),
                          footer: undefined,
                          color: undefined,
                          image: undefined
                        },
                        usrPhoto: {
                          icon: "::",
                          title: undefined,
                          flavor: mm("logs.usrPhoto",P),
                          event: mm("website.usrPhoto",P),
                          footer: undefined,
                          color: "#36b244",
                          image: undefined
                        },
                        usrRoles: {
                          icon: "::",
                          title: undefined,
                          flavor: mm("logs.usrRoles",P),
                          event: mm("website.usrRoles",P),
                          footer: undefined,
                          color: undefined,
                          image: undefined
                        }
                      }



                if (chanpoint) {

                  let a=logItems[evento]
                  let emb = createLog(a.icon,a.title,a.flavor.replace("%2%",extras),a.event,a.footer,a.color,a.image)


                chanpoint.send({embed:emb}).catch(e=> {console.log(e)})

              }

        } catch (err) {
            console.log(err)
        }


}

 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'dev'};

