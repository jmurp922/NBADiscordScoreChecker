const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const apiCallout = require('../constructGameObject.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nba')
		.setDescription('NBA scores'),
	async execute(interaction) {
        createEmbedArr(interaction);
	},
};

async function createEmbedArr(interaction) {
    apiCallout.nbaScoreboard
    .then(result => embedArray(result, interaction))
    .then(embedArr => {return embedArr});
}

async function embedArray(gamesArr, interaction) {
    for (game of gamesArr) {
        buildEmbed = new EmbedBuilder()
        .setColor(game.homeTeamHex)
        .setTitle(game.teams)
        .setDescription(`${game.teams}. The overunder is : ${game.overUnder}, and the betting odds are ${game.teamOdds}`)
        .setThumbnail(game.homeTeamLogo)
        .addFields(
            { name : 'Home Team', value : game.homeTeamName, inline:true},
            { name : 'Away Team', value : game.awayTeamName, inline: true},
            { name : '\b', value: '\b' },
            { name : 'Home Score', value : game.totalScoreHome, inline : true},
            { name : 'Away Score', value : game.totalScoreAway, inline: true},
            { name : '\b', value: '\b' },
            { name : 'Home Quarters', value: game.homeTeamName, inline : false},
            { name : 'Quarter 1', value : game.q1ScoreHome, inline:true},
            { name : 'Quarter 2', value : game.q2ScoreHome, inline:true},
            { name : 'Quarter 3', value : game.q3ScoreHome, inline:true},
            { name : 'Quarter 4', value : game.q4ScoreHome, inline:true},
            { name : '\b', value: '\b' },
            { name : 'Away Quarters', value: game.awayTeamName, inline : false},
            { name : 'Quarter 1', value : game.q1ScoreAway, inline:true},
            { name : 'Quarter 2', value : game.q2ScoreAway, inline:true},
            { name : 'Quarter 3', value : game.q3ScoreAway, inline:true},
            { name : 'Quarter 4', value : game.q4ScoreAway, inline:true}
        )
        .setTimestamp()
        .setFooter({text: 'Daily Discord NBA Bot'});
        await interaction.reply({
            embeds : [buildEmbed]
        });

    }
}