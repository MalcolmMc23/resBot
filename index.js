import dotenv from 'dotenv'
dotenv.config();

import { Client, Events, GatewayIntentBits } from 'discord.js'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ]
})
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN)

client.on("messageDelete", async (message) => {
    console.log("gere")
    if (!message?.author.bot) {
        message.author.send(`Echo ${message.content}`)
    }
})

