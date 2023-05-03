const { token } = require('./config.json');

url = "https://discord.com/api/v10/applications/1102568089276665877/commands"

json = {
    "name": "nba",
    "type" : 1,
    "description" : "Todays NBA games"
}

header = {
    'Content-Type': 'application/json',
    "Authorization": 'Bot ' +  token
}

fetch(url, {
    method:'POST',
    headers : header,
    body : JSON.stringify(json),
})
.then(response => response.json())
.then(response => console.log('Response is ', response))
.catch(error => console.log('Error is : ', error));