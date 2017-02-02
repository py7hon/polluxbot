var Countdown = require("countdown-js");
 String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var days   = Math.floor(hours / 24);

    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+'h '+minutes+'m '+seconds+'s';
        days > 1 ? time = days+" dias " : time = time
    return time;
}

exports.run = (bot, message, args, userData, caller, gear, points) => {

    // day one 1485938511477 + 86400000

const D = 1000 * 60 * 60 * 24 * 1

var now = new Date().getTime();
var day = 86400000
var dly = userData.daily
1486025790272
if((now-dly)>=day){
    message.reply(':cookie:  Você recebeu 200 cookies de bônus diário~')
    userData.cookies+=200
    userData.daily=now
}else{
    var r = day-(now-dly)
    var remain = (r/1000 + "").toHHMMSS();
    message.reply(':cookie:  Você já pegou seu bônus diário, ele estará disponível novamente em: **'+remain+'**')
}




}
