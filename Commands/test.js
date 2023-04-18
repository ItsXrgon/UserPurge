const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Sends 1000 numbered messages as a test case for the bot.'),

	async execute(interaction) {

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        }
        
        await interaction.deferReply({ ephemeral: true }); // let Discord know we will respond later
		// Send messages in batches of 100 with a delay of 20ms between them
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 100; j++) {
				setTimeout(async () => {
					await interaction.channel.send(`Message ${(i * 100) + j}`);
				}, 20);
			}
		}
        await interaction.editReply(`Done!`);
	}
}


