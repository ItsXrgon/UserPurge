const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('purgeuser')
		.setDescription('Deletes ALL messages of a user.')
		.addUserOption(option => option.setName('user').setDescription('The user to delete msgs of').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('The channel to delete msgs from').setRequired(true)),

	async execute(interaction) {

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        const channel = interaction.options.getChannel('channel');

        if (!user || !channel) {
            return interaction.reply({ content: 'User or Channel not found', ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true }); // let Discord know we will respond later

        /**
         *  Recursive function to delete all messages from a user given the starting point
        */
        async function deleteMessages(startingMessage) {

            const allMessages = [];

            let nextStartingMessage;

            await channel.messages
            .fetch({ limit: 100, before: startingMessage.id })
            .then(messagePage => {
                messagePage.forEach(msg => allMessages.push(msg));

                // Update our message pointer to be last message in page of messages
                nextStartingMessage = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
            })

            if(startingMessage != null && startingMessage.author.id === user.id) { // If starting message exits & author was user, delete it
                startingMessage.delete();
            } 

            if(allMessages.length === 0 || startingMessage === null) { // If end of channel reached, stop recursion
                return;
            }

            const userMessages = allMessages.filter(msg => msg.author.id === user.id); // Filter messages authored by user

            for (let i = 0; i < userMessages.length; i++) { // Delete all messages by user in the batch
                const msg = userMessages[i]; 
                setTimeout(async () => {
                    try{
                        if(!(msg.id == nextStartingMessage.id)) { // Not to delete next starting message if its authored by user
                            await msg.delete()
                        };
                    } catch(DiscordAPIError) {
                        console.log(`Couldnt delete message ${msg.content}`)
                    }
                }, 20); // 50 requests per second ---> 1 request every 20 milliseconds
            }

            await deleteMessages(nextStartingMessage);

        }

        // Fetch message pointer to start from initially 
        const messages = await channel.messages.fetch({ limit: 1 });
        if (messages.size === 0) {
            return interaction.reply({ content: 'No messages found in channel', ephemeral: true });
        }
        const startingMessage = messages.first();

        await deleteMessages(startingMessage);

        await interaction.editReply(`Deleting!`);
    }
}