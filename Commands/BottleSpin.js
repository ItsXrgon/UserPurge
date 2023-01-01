const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('bottlespin')
        .setDescription('Spins a bottle and says who its pointing to and from.')
        .addUserOption(option =>
			option
				.setName('player1')
				.setDescription('Player 1')
				.setRequired(true))
        .addUserOption(option =>
            option
                .setName('player2')
                .setDescription('Player 2')
                .setRequired(true))
        .addUserOption(option =>
            option
                .setName('player3')
                .setDescription('Player 3')
                .setRequired(true))
        .addUserOption(option =>
            option
                .setName('player4')
                .setDescription('Player 4')
                .setRequired(false))
        .addUserOption(option =>
            option
                .setName('player5')
                .setDescription('Player 5')
                .setRequired(false))
        .addUserOption(option =>
            option
                .setName('player6')
                .setDescription('Player 6')
                .setRequired(false))
        .addUserOption(option =>
            option
                .setName('player7')
                .setDescription('Player 7')
                .setRequired(false))
        .addUserOption(option =>
            option
                .setName('player8')
                .setDescription('Player 8')
                .setRequired(false))
        .addUserOption(option =>
            option
                .setName('player9')
                .setDescription('Player 9')
                .setRequired(false)),

    async execute(interaction) {
        let players = [];
        let player = interaction.options.getUser("player1");
        for(i=2; player != null; i++) {
            players.push(player);
            player = interaction.options.getUser(`player${i}`);
        }
        
        let bottleFront = 0;
        let bottleBack = 0;

        while(bottleFront == bottleBack) {
            bottleFront = Math.floor(Math.random() * players.length);
            bottleBack = Math.floor(Math.random() * players.length);
        }

        await interaction.reply(`Bottle spun! Its pointing at ${players[bottleFront]} from ${players[bottleBack]}!`);
    }
}