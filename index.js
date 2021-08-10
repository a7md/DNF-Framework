require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const Middleware = require('./lib/Middleware')
const commands = require('./lib/Commands.js')
const prefixList = process.env.DISCORD_PREFIX
const Token = process.env.DISCORD_TOKEN_BOT

client.on('ready', () => {
    console.log(`BOT STARTED ${client.user.tag} | Be Happy.`)
});

client.on('messageCreate', msg => {

if(!msg.author.bot && Middleware.hasPrefix(msg.content, prefixList)){
    let prefix = Middleware.getPrefix(msg.content,prefixList)
    Middleware.CheckExistCreate(msg)    
    var command = (msg.content).split(prefix)[1];
    if(Middleware.CheckCommand(command,msg)) {
        if(command.includes(' ')){
             command = command.split(' ')[0]
        }
        commands[`${command}`](msg)
    } 
}

});

client.login(Token)