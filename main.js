const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', function(e){
    console.log(`Logged in as ${client.user.tag}!`)
})
// Authenticate
client.login("MTA1NzIzNTM2NTM5MzYwODczNQ.GphI87.QsZpv9-hof-dRT1dq7KlalGKjgELr9Lj27eDGI")

//Example Functionality
client.on('message',
    function(msg){
        if(msg.content === "Hello!"){
            msg.reply("Hello yourself!")
        }
    })