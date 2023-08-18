const { SlashCommandBuilder } = require('discord.js');
const { OpenAIApi } = require('openai');
const { Configuration } = require('openai')

const openai = new OpenAIApi(new Configuration({
    // apiKey: process.env.API_KEY,
    apiKey: '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'
}));


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`call`)
        .setDescription(`Calls for a response`)
        .addStringOption(option =>
            option.setName('input')
                .setDescription("User input")),
    async execute(interaction) {
        console.log(interaction.options.getString('input'))
        const prompt = interaction.options.getString('input');  // replace with your actual prompt
        const maxTokens = 60;  // adjust as needed

        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",  // update to the current model version
            messages: [{
                role: "user",
                content: prompt
            }],
        });

        const chatGptReply = chatResponse.data.choices[0].message.content;

        await interaction.reply(chatGptReply);








        // await interaction.reply("hello!");

    }
}
