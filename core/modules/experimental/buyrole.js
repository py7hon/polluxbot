var ff = require("../functionfest.js");

var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'buyrole';

var init = function (message, userDB, DB) {
        var Server = message.guild;
        var Channel = message.channel;
        var Author = message.author;
        if (Author.bot) return;
        var Member = Server.member(Author);
        var Target = message.mentions.users.first() || Author;
        var MSG = message.content;
        var bot = message.botUser
        var args = MSG.substr(cmd.length+message.prefix.length+1)


        var LANG = message.lang;
        try {

var a = Server.roles.find('name', args);
            if (a==undefined) return message.reply("Ops, não achei essa role...")

            let tagg = a.id
        var pricetab = {
            "335006349601538048":500
        }
price = pricetab[a.id]
 let cashpass = gear.checkGoods(price,Author)


    if (!cashpass) {
        return message.reply("Desculpa, você não tem Rubys pra comprar esta Role, ela custa "+price+ff.emoji("ruby"));
    }

            //-------MAGIC----------------

            Target = Server.member(Author)


            //--------------------------------------


            var On = ff.emoji("check")
            var Off = ff.emoji("xmark")

            var rolenotfound = mm('CMD.nosuchrole', {
                lngs: LANG
            });


            //--------------------------------------

            var noPermsMe = mm('CMD.unperm', {
                lngs: LANG
            })



gear.paramIncrement(Author,"goodies",price)
            return fR(args, Server.member(Target))

            function fR(role, memb) {
                message.delete(50000).catch()
                var a = Server.roles.find('name', role);
               // message.reply(role)
                if (a == undefined) return message.reply("Não encontrei este cargo :c");
                var roleadd_confirm = On + " Agora você faz parte de **"+a.name+"**!"
                memb.addRole(a).then(a => message.channel.send(roleadd_confirm)).then(e => e.delete(600000)).catch(e => message.channel.send(noPermsMe))
            }
        } catch (e) {
            gear.hook.send(e.error)
        }
        }

        module.exports = {
            pub: false,
            cmd: cmd,
            perms: 3,
            init: init,
            cat: 'info'
        };
