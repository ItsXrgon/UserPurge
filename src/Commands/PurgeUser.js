'use strict';

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('PurgeUser')
		.setDescription('Deletes ALL messages of a user.')
		.addUserOption(option => option.setName('user').setDescription('The user to delete msgs of').setRequired(true)),

	async execute(interaction) {

		const user = interaction.options.getUser('user');
        
        async function fetchAllMessages() {
            const channel = client.channels.cache.get("1006988314563334163");
            let messages = [];
            // Create message pointer
            let message = await channel.messages.fetch({
                limit: 1
            }).then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
            while (message) {
                await channel.messages.fetch({
                    limit: 100,
                    before: message.id
                }).then(messagePage => {
                    messagePage.forEach(msg => messages.push(msg));
                    messages = messages.filter(msg => msg.author.id === user.id);
                    message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
                });
            }
            return messages;
        }

        const allMessages = await fetchAllMessages();
        for (let i = 0; i < allMessages.length; i++) {
            const msg = allMessages[i];
            if (msg.author.id === authorIdToDelete) {
            await new Promise(resolve => setTimeout(resolve, 80));
            await msg.delete();
            console.log(`Deleted ${i + 1} messages.`);
            }
        }
    }
}

