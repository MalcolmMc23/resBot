const { SlashCommandBuilder } = require('discord.js');
// const { OpenAIApi } = require('openai');
// const { Configuration } = require('openai')



module.exports = {
    data: new SlashCommandBuilder()
        .setName(`read`)
        .setDescription(`reads the users messages`),
    async execute(interaction) {

        // `m` is a message object that will be passed through the filter function
        // const collectorFilter = m => m.content.includes('discord');

        // const collector = interaction.channel.createMessageCollector({ max: 10, time: 10000 });

        // collector.on('collect', m => {
        //     console.log(`Collected ${m}`);
        // });

        // collector.on('end', collected => {
        //     console.log(`Collected ${collected.size} items`);
        // });

        interaction.reply({ content: "now reading", fetchReply: true })
            .then(() => {
                interaction.channel.awaitMessages({ max: 1, time: 10000 })
                    .then(collected => {
                        console.log(collected.content + " gooop")
                        interaction.followUp(`${collected} got the correct answer!`);
                    })
                    .catch(collected => {
                        interaction.followUp('Looks like nobody got the answer this time.');
                    });
            })

    }
}
