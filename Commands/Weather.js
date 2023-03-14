const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription(`Displays weather of city! (replace any space in name with '-')`)
        .addStringOption(option =>
            option
                .setName('country')
                .setDescription('Country chosen')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('city')
                .setDescription('City chosen')
                .setRequired(true)),

    async execute(interaction) {

        const fetch = require("node-fetch");
        const cheerio = require('cheerio');

        const getRawData = (URL) => {
            return fetch(URL)
               .then((response) => response.text())
               .then((data) => {
                  return data;
               });
        };

        const getWeatherData = async () => {
            return await getRawData(URL);
        };

        const re = /r"\d+"/;

        const country = interaction.options.getString("country");
        const city = interaction.options.getString("city");

        let URL = `https://www.timeanddate.com/weather/${country}/${city}`;
            
        try {
            const weatherData = getWeatherData();
            console.log(weatherData);
            const parsedWeatherData = cheerio.load(weatherData);
            console.log("--------");
            console.log(parsedWeatherData("#wt-5hr").text());
        }
        catch {
            console.log("hi");
        }
    }
}