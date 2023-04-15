const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Creates a test case.'),

	async execute(interaction) {
		// Send messages in batches of 100 with a delay of 2000ms between them
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 100; j++) {
				setTimeout(() => {
					interaction.channel.send(`Message ${(i * 100) + j}`);
				}, 2000);
			}
		}
	}
}


