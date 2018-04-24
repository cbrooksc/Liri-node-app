// Read and set environment variables
 require("dotenv").config();

 //_____________Variables____________//
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var paramsSpotify = ({
    id: 'cbrooks-204',
  });
var Twitter = require("twitter");
 var client = new Twitter(keys.twitter);
 var paramsTwitter = {
     screen_name: 'cwbrooks_b',
 }
 var require = require("request");
 var nodeArgs = process.argv;
 var movieName = ""; /* Empty variable for holding the movies */

 
 
//  var str = JSON.stringify(obj, null, 2)

//Fuunction that grabs the movie grabs the 20 tweets
 function twitterFingers() {
 client.get('statuses/user_timeline',  paramsTwitter, function(error, tweets, response) {
         debugger;
     //If there is no error
     if (!error) {
        //Return 20 of the users most recent tweets
        for(var i = 1; i < tweets.length; i++){
          console.log('============================');
          console.log('TWEET number ' + i);
          console.log(tweets[i].created_at);
          console.log(tweets[i].text);
          console.log('============================');
        }
    }
    //Else, display an error
    else {
      console.log(error);
    }  
 });

 }
//This function will get the artists,playlist,albums and uri ....
 function musicList() {
debugger;

    spotify.search({ type: 'artist', query: paramsSpotify }, function(err, data) {
        if (!err) {
          for (var i = 0; i < data.length; i++);

                console.log(data[i].artits);
                console.log(data[i].playlist);
                console.log(data[i].albums);
                console.log(data[i].uri);

        }else if(data[i] === ""){
          console.log("The Sign by Ace of Base.");
      } else {
          console.log(err);
      }
      });
 }

function movieTime(){
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
//Loop through all the words in node argument
for(var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        movieName = movieName = +  "+" + nodeArgs[i];

    }else{
        movieName +=nodeArgs[i];
    }
}
// This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error,response, body){

        if(!error && response.statusCode === 200) {

            //Prints out the movie information
            console.log("Title: " + JSON.parse(body).Title + "\nYear: "  + JSON.parse(body).Year + 
        "\nImdbRating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Rating.value  + 
          "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot  + 
        "\nActors: " + JSON.parse(body).Actors);
        
      } else {
          console.log(error);
      } 

    });
}

function file() {
var fs = require("fs");
fs.readFile("random.txt", "utf8", function(error,data) {

    if(error) {
        return console.log(error);
    }
    //Print the content of data     
        console.log(data);
});
}


var comm = process.argv[2];

switch (comm) {
    case "my-tweets":
        twitterFingers();
        break;
    case "spotify-this-song":
        musicList();  
        break;
    case "movie-this":
        movieTime();
        break;
    case "do-what-it-says":
        file(); 
        break; 
    default:
        console.log('I dont understand you.');
}
