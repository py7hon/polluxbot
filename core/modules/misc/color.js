var gear = require("../../gearbox.js");
var cmd = 'color';
var paths = require("../../paths.js");

var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

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


            var regExp = new RegExp(/[0-9A-Fa-f]{6}/g);

    try {
        //HELP TRIGGER
        let helpkey = mm("helpkey", {
            lngs: message.lang
        })
        if (!regExp.test(args)||!args||args===undefined||MSG.split(" ")[1] == helpkey || MSG.split(" ")[1] == "?" || MSG.split(" ")[1] == "help") {
            return gear.usage(cmd, message);
        }
    } catch (e) {
       console.log(e)

        // gear.hook.send(e.error)
    }
    //------------


         var hex = parseInt((args+"FF").replace(/^#/, ''), 16);

                var image = new gear.Jimp(126, 126,  hex, function (err, img) {
                    gear.Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
                    img.mask(lenna, 0, 0)
  img.getBuffer(gear.Jimp.MIME_PNG, function (err, image) {
      console.log(image)
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
