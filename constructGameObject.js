class Game {
    teams = null;
    homeTeamName = null;
    awayTeamName = null;
    homeTeamLogo = null;
    awayTeamLogo = null;
    totalScoreHome = null;
    totalScoreAway = null;
    q1ScoreHome = null;
    q2ScoreHome = null;
    q3ScoreHome = null;
    q4ScoreHome = null;
    q1ScoreAway = null;
    q2ScoreAway = null;
    q3ScoreAway  = null;
    q4ScoreAway  = null;
    homeTeamHex = null;
    teamOdds = null;
    overUnder = null;

    set teamOdds(odds) {
        this.teamOdds = odds;
    }

    set overUnder(ou) {
        this.overUnder = ou;
    }

    set homeTeamHex(hex) {
        this.homeTeamHex = hex;
    }

    set q1ScoreHome(q1) {
        this.q1ScoreHome = q1;
    }

    set q2ScoreHome(q2) {
        this.q2ScoreHome = q2;
    }

    set q3ScoreHome(q3) {
        this.q3ScoreHome = q3;
    }

    set q4ScoreHome(q4) {
        this.q4ScoreHome = q4;
    }

    set q1ScoreAway(q1) {
        this.q1ScoreAway = q1;
    }

    set q2ScoreAway(q2) {
        this.q2ScoreAway = q2;
    }

    set q3ScoreAway(q3) {
        this.q3ScoreAway = q3;
    }

    set q4ScoreAway(q4) {
        this.q4ScoreAway = q4;
    }

    set teamNames(teamName) {
        this.teams = teamName;
    }

    set homeTeamLogo(url) {
        this.homeTeamLogo = url;
    }

    set awayTeamLogo(url) {
        this.awayTeamLogo = url;
    }

    set homeScore(homeScore){
        this.totalScoreHome = homeScore;
    }

    set awayScore(awayScore) { 
        this.totalScoreAway = awayScore;
    }

    set homeTeamName(name) {
        this.homeTeamName = name;
    }

    set awayTeamName(name) {
        this.awayTeamName = name;
    }
}

let gameArr = [];

const nbaScoreboard = 
    fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard')
    .then(response =>  response.json())
    .then(data =>  {
        for (eve of data.events) {
            let gameEntry = new Game();
            gameEntry.teamNames = eve.name;
            for (comp of eve.competitions) {
                gameEntry.overUnder = comp.odds[0].overUnder;
                gameEntry.teamOdds = comp.odds[0].details;
                for (team of comp.competitors) {
                    if (team.homeAway === 'home') {
                        gameEntry.homeScore = team.score;
                        gameEntry.homeTeamName = team.team.displayName;
                        gameEntry.homeTeamLogo = team.team.logo;
                        gameEntry = setHomeLineScores(gameEntry, team);
                    }
                    else {
                        gameEntry.awayScore = team.score;
                        gameEntry.awayTeamName = team.team.displayName;
                        gameEntry.awayTeamLogo = team.team.logo;
                        gameEntry = setAwayLineScores(gameEntry, team);
                    }
                }
            }
            gameArr.push(gameEntry);
        }
    })
    .then(() => {
        return gameArr;
    })
   .catch(err => console.log(err));


setHomeLineScores = (gameEntry, team) => {
    if (team.linescores !== undefined) {
        gameEntry.q1scoreHome = team.linescores[0].value;
        gameEntry.q2ScoreHome = team.linescores[1].value;
        gameEntry.q3ScoreHome = team.linescores[2].value;
        gameEntry.q4ScoreHome = team.linescores[3].value;
    } else {
        gameEntry.q1ScoreHome = '0';
        gameEntry.q2ScoreHome = '0';
        gameEntry.q3ScoreHome = '0';
        gameEntry.q4ScoreHome = '0';
     }
     return gameEntry;
}

setAwayLineScores = (gameEntry, team) => {
    if (team.linescores !== undefined) {
        gameEntry.q1scoreAway = team.linescores[0].value;
        gameEntry.q2ScoreAway = team.linescores[1].value;
        gameEntry.q3ScoreAway = team.linescores[2].value;
        gameEntry.q4ScoreAway = team.linescores[3].value;
    } else {
        gameEntry.q1ScoreAway = '0';
        gameEntry.q2ScoreAway = '0';
        gameEntry.q3ScoreAway = '0';
        gameEntry.q4ScoreAway = '0';
     }
     return gameEntry;
}

exports.gameArr = gameArr;
exports.setAwayLineScores = this.setAwayLineScores;
exports.setHomeLineScores = this.setHomeLineScores;
exports.Game = Game;
exports.nbaScoreboard = nbaScoreboard;