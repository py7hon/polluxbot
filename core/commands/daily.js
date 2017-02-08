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

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

        if(!gear.moduleCheck('RUBY',message)){
        message.reply(':no_entry_sign: Sistema de Rubys foi desabilitado aqui.');
        return;
    }
    
const RUBYMOJI = message.guild.emojis.find('name','ruby')
    // day one 1485938511477 + 86400000

const D = 1000 * 60 * 60 * 24 * 1

var now = new Date().getTime();
var day = 86400000
var dly = userData.daily
1486025790272
if((now-dly)>=day){
      if((now-dly)<(day*2)){
        userData.dyStreak+=1
    }else{
         userData.dyStreak=0
    }

    message.reply( RUBYMOJI+' Você recebeu 100 rubys de bônus diário~')
     if(userData.dyStreak==10){
        message.channel.sendMessage(RUBYMOJI+' Você recebeu mais 500 rubys por coletar 10 dias seguidos!')
    }
    userData.rubys+=100

    userData.daily=now

}else{
    var r = day-(now-dly)
    var remain = (r/1000 + "").toHHMMSS();
    message.reply( RUBYMOJI+' Você já pegou seu bônus diário, ele estará disponível novamente em: **'+remain+'**')
}




}
