
var gear = require("../../gearbox.js");
var cmd = 'color';
var paths = require("../../paths.js");


var init = function (message,userDB,DB) {
         var Server = message.guild;
            var Channel = message.channel;
            var Author = message.author;
            if (Author.bot) return;
            var Member = Server.member(Author);
            var Target = message.mentions.users.first() || Author;
            var MSG = message.content;
            var bot = message.botUser
            var args = MSG.split(' ').slice(1)[0]
          //  var input = args[0].toUpperCase()


            try{
            //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}}catch(e){gear.hook.send(e.error)}
//------------
message.reply(gear.emoji("check"))
            gear.paramDefine(Author,"favcolor",args)
         var hex = parseInt((args+"FF").replace(/^#/, ''), 16);

                var image = new gear.Jimp(126, 126,  hex, function (err, img) {
                    gear.Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
                    img.mask(lenna, 0, 0)
  img.getBuffer(gear.Jimp.MIME_PNG, function (err, image) {
                    message.channel.send({files:[{attachment:image,name:"file.png"}]})



  })
  })

});


}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};
