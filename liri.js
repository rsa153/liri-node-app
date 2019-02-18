// fs is a core Node package for reading and writing files
var fs = require('fs');

//requires .env file
require("dotenv").config();

//requires keys.js
var keys = require("./keys.js");

//requires axios for omdb and bandsintown api
var axios = require("axios");

//requires moment
var moment = require("moment");

//Import the Spotify API
var Spotify = require("node-spotify-api");

//Create a Spotify Client
var spotify = new Spotify(keys.spotify);

//defining command as the user input in process.argv[2]
var command = process.argv[2];

//Switch statement used to select one of the four code blocks to be executed based on user process.argv[2] input.
switch (command) {
    
    // code to be executed if process.argv[2] is equal to concert-this;
    case "concert-this":
        
        //will remove the first 3 items in the "argv" array and join the remaining items with %20
        var name = process.argv.slice(3).join("%20");
        
        //if nothing is inputted after concert-this, a message is displayed to the user.
        if (!name) {
            console.log("You must input the name of an artist. Please try again.");
        }
        
        //otherwise, the concertThis function will run
        else {
            concertThis(name);
        }
        break;

    //code to be executed if process.argv[2] is equal to spotify-this-song
    case "spotify-this-song":
    
        //will remove the first 3 items in the "argv" array and join the remaining items with "+"
        var name = process.argv.slice(3).join("+");
        
        //if nothing is inputted after concert-this, the user will be presented information for Ace of Base's "The Sign".
        if (!name) {
            console.log("You didn't chose a song so we chose one for you. Here is The Sign by Ace of Base." +
                "\n========================");
            console.log(spotifyThis("The+Sign+Ace+of+Base"))
        }

        //otherwise, the spotifyThis function will run
        else {
            spotifyThis(name);
        }
        break;

    //code to be executed if process.argv[2] is equal to movie-this
    case "movie-this":
        
        //will remove the first 3 items in the "argv" array and join the remaining items with "+"
        var name = process.argv.slice(3).join("+");
        
        //if nothing is inputted after concert-this, the user will be presented information about Mr. Nobody.
        if (!name) {
            console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>" +
                "\nIt's on Netflix!" +
                "\n========================");
        }
         
        //otherwise, the movieThis function will run
        else {
            movieThis(name);
        }
        break;

    //code to be executed if process.argv[2] is equal to do-what-it-says
    case "do-what-it-says":
        
         //The doThis function will run
        doThis();
        break;

    //default specifies the code to run if the user does not input process.argv[2]
    default:
        console.log("Please input concert-this or spotify-this-song or movie-this or do-what-it-says")
}
//Concert-this function
function concertThis(name) {

    //bandsintown url
    var URL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp"

    //Using get method to start an HTTP request
    axios.get(URL).then(function (response) {

            //try statement allows testing of a block of code for errors. If no errors, occur display 5 results
            try {
                for (var i = 0; i < 5; i++) {
                    var concertInfo = [
                        "Venue Name: " + response.data[i].venue.name,
                        "Venue Location: " + response.data[i].venue.city,
                        "Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"),
                        "========================"
                    ].join("\n");
                    console.log(concertInfo);
                }
            }

            //Catch statement allows handling of error.
            catch (err) {
                console.log("There is an error. Please try again.")
            }
        })
}

//Search method using spotfy API
function spotifyThis(name) {

    //search function that specifies type and the query
    spotify.search({
        type: "track",
        query: name,
    }, function (err, data) {

        //If an error occurs, do this
        if (err) {
            console.log("Error occured: " + err);
        }

        //otherwise, return 5 search results 
        else {
            for (var i = 0; i < 5; i++) {
                var songInfo = data.tracks.items[i];
                var songInfo = [
                    "Artist: " + songInfo.artists[0].name,
                    "Song Name: " + songInfo.name,
                    "Album Name: " + songInfo.album.name,
                    "Preview link: " + songInfo.preview_url,
                    "========================"
                ].join("\n");
                console.log(songInfo);
            }
        }
    })
}

//Movie-this function
function movieThis(name) {

    //Omdb url
    var URL = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy"
    
    //Using get method to start an HTTP request
    axios.get(URL).then(function (response) {

        //try statement allows testing of a block of code for errors. If no errors occur, display movie info
        try {
            var movieInfo = [
                "========================",
                "Movie Title: " + response.data.Title,
                "Movie Year: " + response.data.Year,
                "IMDB Rating: " + response.data.imdbRating,
                "Rotten Tomatos Rating: " + response.data.tomatoRating,
                "Country of Production: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors in Movie: " + response.data.Actors,
                "========================"
            ].join("\n");
            console.log(movieInfo);
        }

        //Catch statement allows handling of error.
        catch (err) {
            console.log("There is an error.")
        }
    })
}

//doThis function
function doThis() {

    //Read random.txt file.
    fs.readFile("./random.txt", "utf8", function (error, data) {
        
        //Split the data separated wiith ","
        var dataSplit = data.split(",");

        //the first position of the data will be called doThat
        var doThat = dataSplit[0];
        
        //the second position of the data will be called name and the "" will be removed by slicing.
        var name = dataSplit[1].slice(1, -1);;
        
        //if doThat equals concert-this, run the concertThis function
        if (doThat === "concert-this") {
            concertThis(name);
        
        //if doThat equals spotify-this-song, run the spotifyThis function
        } else if (doThat === "spotify-this-song") {
            spotifyThis(name);

        //if doThat equals movie-this, run the movieThis function
        } else if (doThat === "movie-this") {
            movieThis(name);
        }
    })
}
