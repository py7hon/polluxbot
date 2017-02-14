const Discord = require('discord.js');
var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'cloneGuildRoles';


var init = function (message, userDB, DB) {

    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    var bot = message.botUser;
    var args = message.content.split(' ').slice(1)[0];
    var LANG = message.lang;

    var originServer = bot.guilds.get(args.toString())
    if (originServer.owner == originServer.member(Author) && Server.owner == Server.member(Author)) {

        Channel.sendMessage('This Server: ' + Server.name + ", Owner: " + Server.owner);
        Channel.sendMessage('That Server: ' + originServer.name + ", Owner: " + originServer.owner);
        Channel.sendMessage('Great, you own both!');

    } else {

        Channel.sendMessage('This Server: ' + Server.name + ", Owner: " + Server.owner);
        Channel.sendMessage('That Server: ' + originServer.name + ", Owner: " + originServer.owner);
        return Channel.sendMessage('Whoops, you dont own both servers!');

    };

    if (!Server.member(bot.user).hasPermission('ADMINISTRATOR')) {
        return Channel.sendMessage('Oh, i do not have admin rights for this :/');
    };

    var roleList = "";
    var sack = [];

    originServer.roles.forEach(R => {
        sack.push(R)
        roleList += `**${R.name}** - Permissions Hash: ${R.permissions}
`
    });

    Channel.sendMessage('__**All these roles are being cloned from that server:**__');
    Channel.sendMessage(roleList + "\n");
    Channel.sendMessage('Confirm? `!yes` or `!no`').then(m => {

        var filterV = false;
        var filter = ma => ma.content.startsWith('!yes') && ma.author == message.author && filterV != true;
            filterV = me => me.content.startsWith('!no') && me.author == message.author && filter != true;

        message.channel.awaitMessages(filter, {max: 1,time: 10000}).then(c => {

            if (sack.length == 0) return;
            if (!originServer.available) return;

            for (i = 0; i < sack.length; i++) {
                var role = {
                    name: sack[i].name,
                    color: sack[i].color,
                    hoist: sack[i].hoist,
                    position: sack[i].position,
                    permissions: message.akairo.util.resolvePermissionNumber(sack[i].permissions),
                    mentionable: sack[i].mentionable
                };
                Server.createRole(role);
                role = {};
            };

            message.reply('Done!, i cloned a total of ' + sack.length + ' roles!');
            sack = [];
            m.delete();
            return;

        }).catch();

        message.channel.awaitMessages(filterV, {max: 1,time: 10000}).then(cc => {
            message.reply('Ok, aborted!');
            sack = [];
            return;

        }).catch();
    });
};


module.exports = {pub: false,cmd: cmd,perms: 0,init: init,cat: 'misc'};
