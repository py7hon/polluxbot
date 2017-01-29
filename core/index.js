const discord = require('discord.js');
const fs = require('fs');
const cfg = require('../config.js');
const pkg = require('../package.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const path = require('path');
const oneLine = require('common-tags').oneLine;


 var sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const Commando = require('discord.js-commando');
const token = cfg.token
const getter = require('booru-getter');
const sortJson = require('sort-json');
const arraySort = require('array-sort');
const Jimp = require("jimp");
const cleverbot = require("cleverbot");

const client = new Commando.Client({
    owner: '88120564400553984'
    , commandPrefix: 'falk.'
    ,selfbot: true
});
module.exports = {
    Client: require('./client')
    , CommandoClient: require('./client')
    , Command: require('./commands/base')
    , CommandArgument: require('./commands/argument')
    , CommandGroup: require('./commands/group')
    , CommandMessage: require('./commands/message')
    , ArgumentType: require('./types/base')
    , FriendlyError: require('./errors/friendly')
    , CommandFormatError: require('./errors/command-format')
    , util: require('./util')
    , version: require('../package').version
    , SettingProvider: require('./providers/base')
    , get SQLiteProvider() {
        return require('./providers/sqlite');
    }
};

client.login(token);
bot.login(token);
client.registry
	.registerGroup('math', 'Math')
	.registerDefaults()
	//.registerCommandsIn(path.join(__dirname, 'commands'));
    // Registers your custom command groups
    .registerGroups([
        ['fun', 'Fun commands'],
        ['some', 'Some group'],
        ['other', 'Some other group']
    ])


client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db =>new Commando.SQLiteProvider(db))

).catch(console.error);



client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnect', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});




require('./extensions/guild').applyToClass(discord.Guild);
/**
 * @external Channel
 * @see {@link https://discord.js.org/#/docs/main/master/class/Channel}
 */
/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/master/class/Client}
 */
/**
 * @external ClientOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions}
 */
/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/main/master/class/Collection}
 */
/**
 * @external Guild
 * @see {@link https://discord.js.org/#/docs/main/master/class/Guild}
 */
/**
 * @external GuildMember
 * @see {@link https://discord.js.org/#/docs/main/master/class/GuildMember}
 */
/**
 * @external GuildResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/GuildResolvable}
 */
/**
 * @external Message
 * @see {@link https://discord.js.org/#/docs/main/master/class/Message}
 */
/**
 * @external MessageAttachment
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageAttachment}
 */
/**
 * @external MessageEmbed
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageEmbed}
 */
/**
 * @external MessageReaction
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageReaction}
 */
/**
 * @external MessageOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/MessageOptions}
 */
/**
 * @external Role
 * @see {@link https://discord.js.org/#/docs/main/master/class/Role}
 */
/**
 * @external StringResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/StringResolvable}
 */
/**
 * @external User
 * @see {@link https://discord.js.org/#/docs/main/master/class/User}
 */
/**
 * @external Emoji
 * @see {@link https://discord.js.org/#/docs/main/master/class/Emoji}
 */
/**
 * @external ReactionEmoji
 * @see {@link https://discord.js.org/#/docs/main/master/class/ReactionEmoji}
 */
/**
 * @external Webhook
 * @see {@link https://discord.js.org/#/docs/main/master/class/Webhook}
 */
/**
 * @external RichEmbed
 * @see {@link https://discord.js.org/#/docs/main/master/class/RichEmbed}
 */
/**
 * @external ShardingManager
 * @see {@link https://discord.js.org/#/docs/main/master/class/ShardingManager}
 */
/**
 * @external RequireAllOptions
 * @see {@link https://www.npmjs.com/package/require-all}
 */
