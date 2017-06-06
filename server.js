var RiotApi = require('riot-api');
var api = new RiotApi('303ccbe7-3c57-4d13-a389-d109963f4535');

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(1337);

var pws = new Set();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
    /*var n = req.param('pw');
    if (pws.has(n) || (n === 'root')) {
        console.log("Correct Link. Forwarding...");
        res.sendfile(__dirname + '/static/index.html');
    } else {
        console.log("Wrong Link. ACCESS DENIED");
        res.send('You have no authentication right to access this page');
    }*/
});


app.use(express.static(__dirname + '/client/'));

var getChampions = function () {
    api.getChampions({
        'region': 'EUW',
        'filter': {
            'freeToPlay': true
        }
    }, function (data) {
        console.log('These champions are currently free to play:');
        data.forEach(function (champion) {
            console.log('Name: ' + champion.name + ', Difficulty: ' + champion.difficultyRank);
        });
    });
}

function getRecentGames() {
    api.getRecentGames({
        'region': 'EUW',
        'summonerName': 'realwasabi'
    }, function (data) {
        checkStatus(data);
        var summonerId = data['summonerId'];
        var games = data['games'];

        for (var key in games) {
            //keys are from [1-9]
            var game = games[key];
            var gameResult = "Game No. " + JSON.stringify(key) + ": ";
            //console.log("Game Object " + JSON.stringify(obj));
            var gameId = game["gameId"];
            var gameMode = game["gameMode"];
            var subType = game["subType"];
            var championId = game["championId"];
            var gameStats = game["stats"];

            var gameOutcome = gameStats["win"];
            gameResult += "Tuan has ";
            if (gameOutcome) gameResult += "won";
            else gameResult += "lost";

            console.log(gameResult + " the game hahaha rofl!");
        }
    });
}

var s = getRecentGames();

var checkStatus = function (data) {
    if (data.hasOwnProperty('status')) {
        console.log("ERROR >> ");
        console.log(data['status']);
    } else {
        console.log("SUCCESS >>");
    }
}

console.log("Server is running at port: 1337");
