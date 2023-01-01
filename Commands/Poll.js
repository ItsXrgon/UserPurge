const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Sends a poll!')
        .addStringOption(option =>
			option
				.setName('title')
				.setDescription('Question of poll')
				.setRequired(true))
        .addStringOption(option =>
            option
                .setName('option1')
                .setDescription('Poll Option 1')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('option2')
                .setDescription('Poll Option 2')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('option3')
                .setDescription('Poll Option 3')
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName('option4')
                .setDescription('Poll Option 4')
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName('option5')
                .setDescription('Poll Option 5')
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName('option6')
                .setDescription('Poll Option 6')
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName('option7')
                .setDescription('Poll Option 7')
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName('option8')
                .setDescription('Poll Option 8')
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName('option9')
                .setDescription('Poll Option 9')
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName('option10')
                .setDescription('Poll Option 10')
                .setRequired(false)),

	async execute(interaction) {
        let options = [];
        let option = interaction.options.getString("option1");
        for(i=2; option != null; i++) {
            options.push(option);
            option = interaction.options.getString(`option${i}`);
        }
        numbers = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        let buttons = new ActionRowBuilder();
        for(let i=1; i<options.length+1; i++) {
            buttons.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`option ${i}`)
                            .setLabel("Option " + numbers[i])
                            .setStyle(ButtonStyle.Primary),
                    );
        }
        text = "**" + interaction.options.getString("title") + "**";
        for(let i=0; i<options.length; i++) {
            text += '\n'+ (i+1) +'- '+options[i];
        }
        await interaction.reply({ content: text, components: [buttons] });
	},
};