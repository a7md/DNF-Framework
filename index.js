require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const Middleware = require('./lib/Middleware')
const commands = require('./lib/Commands.js')
const prefixList = ['!a ', '!ahmed',]
const Token = process.env.DISCORD_TOKEN_BOT

client.on('ready', () => {
    console.log(`BOT STARTED ${client.user.tag} | Be Happy.`)
});

client.on('messageCreate', msg => {

if(!msg.author.bot && Middleware.hasPrefix(msg.content, prefixList)){
    Middleware.CheckExistCreate(msg)    
    if(Middleware.CheckCommand(msg)) {
        var command = (msg.content).split(" ")[1];
        if(command.includes('-')){
             command = command.split('-')[0]
        }
        commands[`${command}`](msg)
    } 
}

});

client.login(Token)