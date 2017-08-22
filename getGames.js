var http = require('http');
function getGames (steamid, key,free, callback){
	var path = '/IPlayerService/GetOwnedGames/v0001?key='+key+'&include_appinfo=1&steamid='+steamid
	if(free == 1){
		path += '&include_played_free_games='+free;
	}
	path += '&format=json'
	http.get({hostname:'api.steampowered.com', path:path}, function(res){
		var agg = '';
		res.on('data', function(bit){
			agg += bit;
		});
		res.on('end', function(){
			var games = JSON.parse(agg);
			callback(games)
		});
	});
}
module.exports = getGames;
