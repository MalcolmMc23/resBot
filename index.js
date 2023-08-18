// import dotenv from 'dotenv'
const dotenv = require('dotenv')
const fs = require('fs');
const path = require('path');
dotenv.config();


// const { OpenAIApi } = require('openai');
// const { Configuration } = require('openai')

// const openai = new OpenAIApi(new Configuration({
//     // apiKey: process.env.API_KEY,
//     apiKey: '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'
// }));

// import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
const discord = require('discord.js')
const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.DirectMessages,
    ]
})
//!might need to move this above clinet.commands
client.once(discord.Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});
//!

client.commands = new discord.Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


client.on(discord.Events.MessageCreate, async message => {
    console.log('read message')
    if (message.author.bot) return;

    // Log the content of the message
    console.log(message.content)
    console.log('read message sent')


})

client.on(discord.Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    // console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);

    } catch (error) {
        console.log(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
})


// client.on("interactionCreate", async (message) => {
//     console.log(message);
//     console.log(`here`);

//     // if (!message?.author.bot) {
//     //     message.author.send(`what.`)
//     // }
// })


client.login(process.env.DISCORD_TOKEN)
