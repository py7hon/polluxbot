var cmd = 'name';

var init = function (message) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    var Member = message.guild.member(Author);
    var serverRoles = message.guild.roles;
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    if (Author.bot) return;

    var modPass = false

    if (Server.mods.MODROLE && Server.mods.MODROLE.size >= 1){
        modPass = Member.roles.has(Server.mods.MODROLE);
    }else if(Member.hasPermission("MANAGE_SERVER")){
        modPass = true;
    };


    var tgt = message.guild.member(Target)
    if (modPass) {

        Server.defaultChannel.sendMessage(`:mega:  **Anúncio**
` + MSG.substr(10))

    } else {
        message.reply("Somente Admins e Mods podem criar anúncios");
    }

};

module.exports = {
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'misc'
};
