var cmd = 'ahegao';
var gear = require("../gearbox.js");
var fs = require("fs");

var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var init = function (message,userDB,DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var LANG = message.lang;
    var MSG = message.content
    //-------MAGIC----------------





//HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (MSG.split(" ")[1]==helpkey || MSG.split(" ")[1]=="?"|| MSG.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}
//------------
try{
  fs.readdir(paths.BUILD+"otaco/", function (err, files) {
      let rand = gear.randomize(0,files.length-1);
      let filepath = paths.BUILD+"otaco/"+files[rand]
    message.channel.send({files:[filepath]})
  })

}catch(err){console.log(err)}


};

 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'misc'};


