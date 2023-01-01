const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Returns value heads or tails.')
        .addStringOption((option) => 
            option.setName('guess')
                .setDescription('Enter heads or tails.')
                .setRequired(false)
                .addChoices(
                    { name: 'Heads', value: 'Heads'},
                    { name: 'Tails', value: 'Tails'}
                )),

    async execute(interaction) {
        let coinflip = Math.floor((Math.random() * 2));
        let result = 'Tails';
        if (coinflip == 1){
            result = 'Heads';
        }
        let guess = interaction.options.getString('guess');
        let guessedmessage = ""
        if(guess != null) {
            if(result == guess) {
                guessedmessage = 'You guessed it correct!';
            } else {
                guessedmessage = 'You guessed it wrong!';
            }
        }
          
        await interaction.reply(`The coin landed on ${result}! ${guessedmessage}`);
    }
}