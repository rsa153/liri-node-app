# **LIRI Application**

## **What the project does**
LIRI uses the axios package to grab data from the Bands in Town, Spotify and OMDB APIs and returns information to the user in the terminal.

**How to Search these APIs**

 You can use these commands to search these APIs in two ways:
    1. Using your command line by entering the following commands: concert-this, spotify-this-song, movie-this,
    2. Using a linked random.txt file where you can also input your command

**What Each Command Does**

*concert-this*

    Input the following in your command line: `node liri.js concert-this <artist/band name here>`. LIRI will return the following information from the Bands in Town API:
        * Venue Name
        * Venue Location
        * Date of the Event (MM/DD/YYYY)

*spotify-this-song*

    Input the following in your command line: `node liri.js spotify-this-song <song name here>`. LIRI will return the following information from the Spotify API:
        * Artist(s)
        * Song's name
        * Album Name
        * Preview link of the song
        * Note: *If no song is provided then you will be presented information for "The Sign" by Ace of Base.*

*movie-this*

    Input the following in your command line: `node liri.js movie-this <movie name here>`. LIRI will return the following information from the OMDB API:
        * Movie Title
        * Movie Year
        * IMDB Rating
        * Rotten Tomatoes Rating
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
        * Note: *If no movie is provided then you will be presented information for the move "Mr. Nobody".*

*do-what-it-says*

    Input the following in your command line: `node liri.js do-what-it-says`. LIRI will access the linked random.txt file and read the "concert-this", "spotify-this-song", or "movie-this" command and the artist/song/movie name. LIRI will run the command referenced in the random.txt file. As an example, I've included the spotify-this-song command and the song "I Want it That Way" in the random.txt file.

## **To get started with LIRI**
 In order to get started with this application, you must supply your own `.env` file and you most install node and all applicable node packages (axios, moment, dotenv) and APIs (Spotify). To use the spotify-this-song command, you must register for a Spotify API key. 

## **For more Information**
In order to access this application from my portfolio, please visit: https://rsa153.github.io/bootstrap-portfolio/portfolio.html and click on the `LIRI Code App` link.
In order to see how this application works, please visit: https://drive.google.com/file/d/15EFxMRrjNBzMLJdBFzatAakPIg3IEoj4/view
