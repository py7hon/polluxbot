var cmd = 'report';

var init = function (message,userDB,DB) {

//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
try{
 a = message.botUser.users.get("88120564400553984")
 b = message.botUser.guilds.get("277391723322408960").channels.find("name","log-radar")

   let essage = `
__**BUG REPORT FILED**__

**Author:** ${message.author} (${message.author.username}#${message.author.discriminator})
**Server:** ${message.guild.name}

**Report Message:**
*${message.content}*

`

   a.send(essage)
   b.send(essage)
    message.reply(":fax: **A BUG REPORT HAS BEEN ISSUED DIRECTLY TO THE CREATOR AND AT THE SUPPORT SERVER, EXPECT AN ANSWER SOON. IF THIS WAS A TEST, YOU JUST GOT BANNED FROM USING THIS COMMAND EVER AGAIN **")

}catch(e){gear.hook.send(e.error)}
}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
