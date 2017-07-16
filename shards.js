const Discord = require('discord.js');
const cfg = require('./config.js');
const Manager = new Discord.ShardingManager('./pollux.js',{token:cfg.token});
Manager.spawn();
