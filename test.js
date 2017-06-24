

     const Discord = require('discord.js')
     var bot = new Discord.Client()
     var cfg = require('./config.js');


const fs = require('fs')
const PersistentCollection = require('djs-collection-persistent');
const DB2 = new PersistentCollection({name: "DB"});
const userDB2 = new PersistentCollection({name: 'userDB'});






bot.on('message',m=>{

   // console.log(DB2.get("277391723322408960").name+"\nKÉO")
    console.log(DB2)


})
bot.login(cfg.beta)
