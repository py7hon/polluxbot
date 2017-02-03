const Discord = require("discord.js");
const arraySort = require('array-sort')
const fs = require("fs");
var paths = require("../paths.js");

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {

let rub = message.guild.emojis.find('name','ruby')
let doughnut = message.guild.emojis.find('name','doughnut')
let ruby = message.guild.emojis.find('name','ruby')
let lollipop = message.guild.emojis.find('name','lollipop')
let hamburger = message.guild.emojis.find('name','hamburger')
let potato = message.guild.emojis.find('name','potato')
let bacon = message.guild.emojis.find('name','bacon')
let egg = message.guild.emojis.find('name','egg')
let peanuts = message.guild.emojis.find('name','peanuts')
 message.channel.fetchMessage('276877187976790016').then(target => {

    target.react(doughnut)
    target.react(ruby)
    target.react(lollipop)
    target.react(hamburger)
    target.react(potato)
    target.react(bacon)
    target.react(egg)
    target.react(peanuts)
    target.react(rub)
 })
message.delete()
}
