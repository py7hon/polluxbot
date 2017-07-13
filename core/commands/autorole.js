const Discord = require("discord.js");
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var ff = require("../functionfest.js");

var cmd = 'autorole';

var init = function (message, userDB, DB) {




    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.roles.first();
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.toLowerCase().split(' ').slice(1)[0]

    try {

        var argsV = MSG.split(' ').slice(1)[1]
    } catch (e) {
        console.log(e)
    }

    var LANG = message.lang;

    //-------MAGIC----------------



    var AUTROLS = DB.get(Server.id).modules.AUTOROLES


 // message.delete(10000);



    try {
        let dbmod = DB.get(Server.id)
        if (dbmod.modules.AUTOROLES === undefined) {
            gear.paramDefine(Server, "AUTOROLES", [])
        }

    } catch (err) {
        message.reply("Autoroles empty resolve failed. Report this")
        console.log(err)
    }





    if (args === "list" || args === "l") {


        emb = new Discord.RichEmbed();
        emb.setColor('#4ab25a')
        emb.setDescription('Remove: `' + message.prefix + 'roleme out`')
        emb.title = mm('dict.autoRolesforThis', {
            lngs: LANG
        })
        emb.setAuthor(Server.name, Server.iconURL)


        var autorolese = DB.get(Server.id).modules.AUTOROLES
        var output = ""
        var downput = ""
        for (var i = 0; i < autorolese.length; i++) {

            output += ":small_blue_diamond:   "+Server.roles.get(autorolese[i][0]) + " \n"
            downput += ":small_orange_diamond:  : `" + message.prefix + "roleme " + autorolese[i][1] + "`" + " \n"

        }







        a = ff.randomize(2, 4)

        // emb.setThumbnail('https://github.com/LucasFlicky/polluxbot/blob/master/avis/'+a+'.gif?raw=true')


        //  emb.addField('Roles',"```"+(bot.channels.size+8e2)+"```", true)

        if (output == "") {
            output = mm('dict.none', {
                lngs: LANG
            })
            downput = "-"
        }
        emb.addField('Role ', output, true)
        emb.addField('Command ', downput, true)
        message.channel.sendEmbed(emb).catch(e => console.log(e.stack))

    } // LIST



    var modPass = false

    try {

        var modPass = ff.hasPerms(Member,DB);
    } catch (err) {
        console.log(err)
    }

    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }

    ///*


    //================================================

    if (args === "clear") {
        gear.paramDefine(Server, "AUTOROLES", [])
        return message.reply(mm('CMD.rolesCleared', {
            lngs: LANG
        })).catch(console.error);
    }

    var argum;


    try{

    //ADD
    if (message.content.includes("add")) {
        argum = MSG.substr((message.prefix + " add" + cmd).length + 1)
    }
    if (message.content.includes("autorole +")) {
        argum = MSG.substr((message.prefix + " +" + cmd).length + 1)
    }

    if (Server.roles.exists("name", argum)) {
        let a = Server.roles.find("name", argum);
        return addRole(a)
    }
    }catch(e){}


        try{
    //REMOVE
    if (message.content.includes("rem")) {
        argum = MSG.substr((message.prefix + " rem" + cmd).length + 1)
    }
    if (message.content.includes("remove")) {
        console.log("REMOVE")
        argum = MSG.substr((message.prefix + " remove" + cmd).length + 1)
    }
    console.log(argum+" --b")
    if (Server.roles.exists("name", argum)) {
        let a = Server.roles.find("name", argum);
        return remRole(a)
    }

     }catch(e){console.log(e)}






    if (message.mentions.roles.size === 0 && !MSG.includes('list') && args != 'l') {

        return message.reply(mm('CMD.noRolesGiven', { //TEMPORARY
            lngs: LANG
        })).catch(console.error);

    }

    //==--==--==--==--==--


    function isMe(element, index, array) {
        element[0]
    }


    if (args === "add" || args === "+") {





        addRole(Target)



    } // ADD









    if (args === "rem" || args === "remove" || args === "-") {

        message.delete();
        remRole(Target)

    } // REMOVE



    ///*

    function remRole(tgt) {
        for (var i = 0; i < AUTROLS.length; i++) {
            if (AUTROLS[i][0] != tgt.id) {
                return message.reply(mm('CMD.noRoleHere', { //TEMPORARY
                    lngs: LANG
                })).catch(console.error);
            }
            AUTROLS.splice(i, 1)


        }


        gear.paramDefine(Server, "AUTOROLES", AUTROLS)

        return message.reply(mm('CMD.autoroleunAdded', { //TEMPORARY
            lngs: LANG,
            role: tgt.name
        })).catch(console.error);
    }

    function addRole(tgt) {

        for (var i = 0; i < AUTROLS.length; i++) {

            if (AUTROLS[i][0] == tgt.id) {
                return message.reply(mm('CMD.roleAlreadyHere', { //TEMPORARY
                    lngs: LANG
                })).catch(console.error);
            }

        }
        gear.paramAdd(Server, "AUTOROLES", [tgt.id, tgt.name])
        return message.reply(mm('CMD.roleAdded', { //TEMPORARY
            lngs: LANG
        })).then(m=>m.delete(8000)).catch(console.error);
    }



}




module.exports = {
    pub: false,
    cmd: cmd,
    perms: 2,
    init: init,
    cat: 'mod'
};
