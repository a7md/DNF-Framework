// Bot Commands.

const axios = require('axios');
const Discord = require('discord.js')
const fs = require('fs')



// Simple Command That Gives The User Stored Data.
const whoami = function (msg){
        var Users = JSON.parse(fs.readFileSync('./data/users.json','utf8'))
        console.log(Users)
        msg.reply(Users[msg.author.id].description)
}


//Simple Command That Checks for Existins of Instagram Username.
const searchig = function (msg){
    let ig = (msg.content).match(/^\s*(\S+)\s*(.*?)\s*$/).slice(1)[1];
    axios.get(`https://instagram.com/${ig}`)
    .then(function (res) {
        msg.reply(`Username @${ig} Is Not Available.`)
    })
    .catch(function (err) {
        if(ig.length <= 4){
            msg.reply(`Username @${ig} is Available Or Banned`)
        }else{
            msg.reply(`Username @${ig} is Available`)
        }
    })
}


//Simple Command That ping a link - Path.
const ping = function (msg){
    let link = (msg.content).match(/^\s*(\S+)\s*(.*?)\s*$/).slice(1)[1];
    axios.get(link).then(function (res){
        msg.reply(`${link} Is Alive. (${res.status})`)
    }).catch(function (err){
        msg.reply(`${link} is Down. (${err.response ? err.response.status : 'Invaild Domain.'})`)
    })
}

//Change User Data Description :)
const changeDescription = function (msg){
    let Users = JSON.parse(fs.readFileSync('./data/users.json','utf8'))
    Users[msg.author.id]['description'] = (msg.content).match(/^\s*(\S+)\s*(.*?)\s*$/).slice(1)[1];
    fs.writeFileSync('./data/users.json',JSON.stringify(Users))
    msg.reply("Your Description Has Been Changed Successfully.")
}

const avatar = function (msg){
    let user =  msg.mentions.members.first() ? msg.mentions.members.first().user : msg.author;
    let embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle("Download User Avatar")
    .setAuthor(`${user.tag} Avatar`)
    .setURL(user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
    .setImage(user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
    msg.channel.send({ embeds: [embed] });
}


//Export Modules.
module.exports = {
    whoami, searchig, ping, changeDescription, avatar
}