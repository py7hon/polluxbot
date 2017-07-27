const Discord = require('discord.js');
const cfg = require('./config.js');
const Manager = new gear.Discord.ShardingManager('./pollux.js',{token:cfg.token});
Manager.spawn();
