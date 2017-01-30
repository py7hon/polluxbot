exports.run = (bot, message, args, userData, caller) => {

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

    var time = bot.uptime/1000;
    var uptime = (time + "").toHHMMSS();


    message.channel.sendMessage(`:regional_indicator_s::regional_indicator_t::regional_indicator_a::regional_indicator_t::regional_indicator_s:

:desktop:  **${bot.channels.size}** channels

:cityscape:  **${bot.guilds.size}** servers

:busts_in_silhouette:  **${bot.users.size}** users

:satellite_orbital:  **${parseFloat(Math.round(bot.ping * 100) / 100).toFixed(2)}**ms

:electric_plug:  **${uptime}** uptime
`)
}
