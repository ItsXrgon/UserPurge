'use strict';

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Test case')
		.setDescription('Creates a test case.'),

	async execute(interaction) {
        // Send messages in batches of 100
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 100; j++) {
                await message.channel.send(`Message ${i * 100 + j}`);
            }
        // Wait for 5 seconds to avoid hitting the rate limit
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
}

