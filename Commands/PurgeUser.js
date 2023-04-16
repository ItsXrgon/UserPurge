const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('purgeuser')
		.setDescription('Deletes ALL messages of a user.')
		.addUserOption(option => option.setName('user').setDescription('The user to delete msgs of').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('The channel to delete msgs from').setRequired(true)),

	async execute(interaction,) {

        await interaction.deferReply({ ephemeral: true }); // let Discord know we will respond later

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        }

		const user = interaction.options.getUser('user');
        const channel = interaction.options.getChannel('channel');

        if (!user || !channel) {
            return interaction.reply({ content: 'User or Channel not found', ephemeral: true });
        }

        // Fetch message pointer to start from initially 
        startingMessage = await channel.messages.fetch({
            limit: 1
        })

        await deleteMessages(startingMessage) 

        /**
         *  Recursive function to delete all messages from a user given the starting point
         * @param {Message} startingMessage 
         * 
         */
        async function deleteMessages(startingMessage) {

            const allMessages = [startingMessage].concat(await channel.messages.fetch({
                limit: 100, // EDIT THIS IF YOU WANNA CHANGE BATCH SIZE
                after: startingMessage.id // starting point of messages we're getting
            }));

            if(allMessages.length === 0) { // If end of channel reached, stop recursion
                return
            }

            if(startingMessage.author.id === user.id) { // If starting message author was user, delete it
                await startingMessage.delete();
            } 

            const nextStartingMessage =  allMessages.pop() // Removes last element since its next starting point so dont delete it

            userMessages = allMessages.filter(msg => msg.author.id === user.id); // Filter messages authored by user

            for (let i = 0; i < userMessages; i++) { // Delete all messages by user in the batch
                const msg = userMessages[i]; 
                setTimeout(async () => {
                    try{      
                        await msg.delete();
                        console.log(`Deleted ${i + 1} messages. ${msg.content}.`);
                    } catch(DiscordAPIError) {
                        console.log(`Couldnt delete message ${msg.content}`)
                    }
                }, 80);
            }

            deleteMessages(nextStartingMessage)

        }

        await interaction.editReply(`Deleting!`);
    }
}

