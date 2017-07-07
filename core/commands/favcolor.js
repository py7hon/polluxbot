var gear = require("../gearbox.js");
var cmd = 'color';
var paths = require("../paths.js");
 const Jimp = require("jimp");

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
message.reply(gear.emoji("check"))
            gear.paramDefine(Author,"favcolor",args)
         var hex = parseInt((args+"FF").replace(/^#/, ''), 16);

                var image = new Jimp(126, 126,  hex, function (err, img) {
                    Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
                    img.mask(lenna, 0, 0)
  img.getBuffer(Jimp.MIME_PNG, function (err, image) {
                    message.channel.sendFile(image)



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
