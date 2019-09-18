
// Get click event for #search-btn and generate a function
var searchCity = $("#search-input").val();

// Events from API requests are gonna be stored in this array as objects
var events = [];
var music = [];
var sports = [];

$("#search-btn").on("click", function () {

  event.preventDefault();
  var ticketMasterURL = "http://app.ticketmaster.com/discovery/v2/events.json?includeFamily=only&size=200&city=" + searchCity + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";

  $.ajax({
    url: ticketMasterURL,
    method: "GET"

  }).then(function(response) {
      console.log("searching for events in " + searchCity);
      console.log(response);
      for (var i = 0;  i < response._embedded.events.length ; i++) {
        
        var newEvent = {
          name : response._embedded.events[i].name,
          venue : response._embedded.events[i]._embedded.venues[0].name,
          info : response._embedded.events[i].info,
          date : response._embedded.events[i].dates.start.localDate,
          time : response._embedded.events[i].dates.start.localTime,
          link : response._embedded.events[i].url,
        };
        //response._embedded.events[i].images    ratio: "3_2"
        for (var j = 0 ; j < response._embedded.events[i].images.length ; j++ ) {
          if (response._embedded.events[i].images[j].ratio === "3_2" && response._embedded.events[i].images[j].url.includes("ARTIST_PAGE")) {
            newEvent.imageURL = response._embedded.events[i].images[j].url;
          }
        }
        if (response._embedded.events[i].classifications[0].segment.name === "Music") {
          console.log("IS MUSIC");
          music.push(newEvent);
          display(music,"Music");
        } else if (response._embedded.events[i].classifications[0].segment.name === "Sports") {
          console.log("is sports");
          sports.push(newEvent);
          display(sports,"Sports");
        }
      }
      
    });


  
});



// NOT CALLED! NEEDS AUTHENTICATION
// function getEvenbrite () {
//   var eventBriteURL = "https://www.eventbriteapi.com/v3/users/me/?token=P2UFY6OEXHWORQKQFMRJE7AQZPMLMEL5DRUT6ALTPZ7ELIITPE";
//     // Generate a search request from the API using ajax... then...

//       $.ajax({
//         url: eventBriteURL,
//         method: "GET"
//       }).then(function(response) {
//         console.log(response);

//       });
// }

