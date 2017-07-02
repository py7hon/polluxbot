const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
const gear = require('../gearbox.js')
var locale = require('../../utils/multilang_b');
var mm = locale.getT();
var cmd = 'cashrank';
var init = function (message, userDB, DB) {


    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;
    //-------MAGIC----------------


    var rankItem = []
    var ranked = []




}

module.exports = {
    pub: true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'misc'
};
