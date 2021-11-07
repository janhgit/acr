//import packages

const fs = require("fs");
var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
	'api_key' : 'ed5f590df9db6045ca75745cc2891b44',
	'secret' : ''
});


const sample = fs.readFileSync('./sound/mac.mp3');
const acrcloud = require("acrcloud");
 // connect to acr cloud 
const acr = new acrcloud({
  host: "identify-eu-west-1.acrcloud.com",
  access_key: "569fa397c2cc0bd745d6279b8442619d",
  access_secret: ""
});

lfm.setSessionCredentials('janh07', '');


// send the sample file to the api server
acr.identify(sample).then(metadata => {
  var song = {
    artist: metadata.metadata.music[0].artists[0].name,
    track: metadata.metadata.music[0].title,
    album: metadata.metadata.music[0].album.name}
    console.log(song)
// add the track to the last.fm account
    lfm.track.scrobble({
      'artist' : song.artist,
      'track' : song.track,
      'timestamp': Math.floor((new Date()).getTime() / 1000) - 300,
    
    }, function (err, scrobbles) {
      if (err) { return console.log('We\'re in trouble', err); }
    
      console.log('We have just scrobbled:', scrobbles);
    });



});

