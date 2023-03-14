const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Sends a poll!')
        .addStringOption(option =>
			option
				.setName('title')
				.setDescription('Question of poll')
				.setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('duration')
                .setDescription('Duration of poll in hours (less than 7 days & 24h if not selected)')
                .setRequired(false))
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

        let options = [];   // Collect options from slash command input
        let option = interaction.options.getString("option1");
        for(i=2; option != null; i++) { 
            options.push([option,0]);
            option = interaction.options.getString(`option${i}`);
        }

        //  Setup buttons to add to poll msg
        numbers = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
        let buttons1 = new ActionRowBuilder();
        let buttons2 = new ActionRowBuilder();
        for(let i=0; i<options.length; i++) {
            if(i<5){
                buttons1.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`option ${i+1}`)
                            .setLabel("Option " + numbers[i])
                            .setStyle(ButtonStyle.Primary),
                    );
            } else {
                buttons2.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`option ${i+1}`)
                        .setLabel("Option " + numbers[i])
                        .setStyle(ButtonStyle.Primary),
                );
            }    
        }

        //  Formatting poll msg
        text = "";
        for(let i=0; i<options.length; i++) {
            text += `\n${(i+1)} - ${options[1][0]}   -   [ ${options[i][1]} ]`;
        }
        const Embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("**" + interaction.options.getString("title") + "**")
            .setDescription(text)
            .setFooter({ text: `Poll created by: ${interaction.user.username }`})
            .setTimestamp()

        await interaction.reply({ embeds: [Embed], components: [buttons1] }); //    Poll :D


        //  Setup collector for poll votes
        let time = interaction.options.getInteger("time")*3600000;
        if(time > 604800000) { //  If inputted duration is above 7 days, lower it to 7 days
            time = 604800000;
        }

        const collector = message.channel.createMessageComponentCollector({
            time: time // The amount of time the collector is valid for in milliseconds
        });


        
        collector.on("collect", (interaction) => {
            interaction.reply("Clicked!"); // Run a piece of code when the user clicks on the button
        });
	},
};