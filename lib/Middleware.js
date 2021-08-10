// Middleware (The Auth Bars.)
const Admins = require('../data/users.json') 
const commands = require('../data/commands.json')
const fs = require('fs')

const CheckIfAdmin = function(id){
    if(id in Admins){
        return true;
    }
    return false;
}

const CheckExistCreate = function(msg){
    let Admins = JSON.parse( fs.readFileSync('./data/users.json','utf8'))
    if(!(msg.author.id in Admins) && msg.author.id != process.env.DISCORD_BOT_ID){
            var json = Admins;
            var x = 
            {
                    "permissions" : "USER",
                    "description" : "البيانات الأعتيادية"
            }
            json[msg.author.id] = x
            var final = JSON.stringify(json);
            fs.writeFileSync('./data/users.json',final)
    }


}

const CheckPermissions = function(id, permissions){
     let userpermission = JSON.parse(fs.readFileSync('./data/users.json','utf8'))[id]['permissions']
        if(permissions.includes(userpermission)){
            return true;
        }else{
            return false;
        }


}

const CheckCommand = function(msg,msgC){
    let content = msg;
    if(content.includes(' ')){
        content = content.split(' ')[0]
    }
    if(!(content in commands)){
        msgC.reply('The command does not exists')
        return false;
    }
    console.log(msgC);
    if(!CheckPermissions(msgC.author.id,commands[content]['permission'])){
        msgC.reply(`You must be [${commands[content]['permission']}] to do this command.`)
        return false;
    }

    return true;
}

const hasPrefix = function(str,prefixlist) {
    for(let pre of prefixlist)
        if(str.startsWith(pre))
            return true;
    return false;
}

const getPrefix = function(str,prefixlist) {
    for(let pre of prefixlist)
    if(str.startsWith(pre))
        return pre;
return false;
}

module.exports = {
    CheckIfAdmin, CheckPermissions, CheckCommand, hasPrefix, CheckExistCreate, getPrefix
}