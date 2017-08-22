var http = require('http')
var sem = require('semaphore')(3);
var semfs = require('semaphore')(1);
var games = require(__dirname+'/games.json');
var fs = require('fs');
function getGamePlatform (appid, callback){
  if(games[appid]){
    callback(games[appid])
  } else {
    sem.take(function(){
      http.get({hostname:'store.steampowered.com', path: '/api/appdetails/?appids='+appid+'&cc=EE&l=english&v=1&filters=platforms'}, function(res){
        sem.leave();
        var agg = '';
        res.on('data', function(data){
          agg +=data;
        })
        res.on('end', function(){
          var platforms = JSON.parse(agg);
          platforms = platforms[appid]
          if(!platforms.data){
            callback({
                "linux":false
              }
            )
          } else {
            console.log(platforms.data.platforms)
            games[appid] = platforms.data.platforms;
            callback(platforms.data.platforms)
            semfs.take(function(){
              fs.open(__dirname+ '/games.json','w' ,function(err, fd){
                fs.writeFile(fd, JSON.stringify(games), function(err){
                  fs.close(fd, function(){
                    semfs.leave()
                  });
                })
              })
            })
          }
        })
      })
    })
  }
  }
module.exports = getGamePlatform;
