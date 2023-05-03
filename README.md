# NBADiscordScoreChecker
A Discord bot that has a user input slash command that will make a request to the ESPN API and display all NBA games being played today

# discord.js
The executable file, connects to discord via your app and allows you to use the slash '/nba' command, which calls the constructGameObject.js file and makes a callout to the ESPN API

# commands/nba.js
The slash command file for '/nba' command, when it's called it calls the nbaScoreBoard from constructGameObject.js, turns the Game object result into an embedded and replies to the user on discord with it

# constructGameObject.js
Makes a GET request to the ESPN API, parses the response and creates a Game object with the data created and returns it to the commands/nba.js file

# command.js 
A POST request has to be made to the Discord API with the app token to create slash commands in channels, this is the file that creates the 'nba' slash command
