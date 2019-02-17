require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var name = process.argv.slice(3).join("");


switch (command) {
    case "concert-this":
        concertThis(name);
        break;

    case "spotify-this-song":
        spotifyThis(name);
        break;

    case "movie-this":
        movieThis(name);
        break;

    case "do-what-it-says":
        doThis();
        break;

    default:
        console.log("Please input: concert-this or spotify-this-song or movie-this or do-what-it-says")
}

function concertThis(name) {
    var URL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp"
    axios.get(URL)
        .then(function (response) {
            if (response.data = "[]") {
                console.log("There are no entries for this artist. Please try another artist")
            }
            else {
                for (var i = 0; i < response.data.length; i++) {
                    var concertInfo = [
                        "Venue Name: " + response.data[i].venue.name,
                        "Venue Location: " + response.data[i].venue.city,
                        "Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"),
                        "========================"
                    ].join("\n");
                    console.log(concertInfo);
                }
            }
        })
    // .catch(function(err){
    //     console.log(err);
    // })
}
//Search method using soitfy API
function spotifyThis(name) {
    if (!name){
        name = "TheSign";
        console.log(name);
    }
    spotify.search({
        type: "track",
        query: name,
    }, function (err, data) {
        if (err) {
           console.log("Error occured: " + err);
           return;
        }
        else {
            for (var i = 0; i < 5; i++) {
                var songInfo = data.tracks.items[i];
                console.log(name);
                console.log(songInfo.name);
                // var songInfo = [
                //     "Artist: " + track.artists[0].name,
                //     "Song Name: " + track.name,
                //     "Album Name: " + track.album.name,
                //     "Preview link: " + track.preview_url,
                //     "========================"
                // ].join("\n");
                // console.log(songInfo);
                }
                // if (songInfo.preview_url = "null") {
                //     console.log("We could not find a preview link");
                // } 
    }
    });
}