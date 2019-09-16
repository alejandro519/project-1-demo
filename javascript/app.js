
// Get click event for #search-btn and generate a function
var searchCity = "Los Angeles"; //placeholder

// Events from API requests are gonna be stored in this array as objects
var events = [];

$("#search-btn").on("click", function() {
  
  var ticketMasterURL = "http://app.ticketmaster.com/discovery/v2/events.json?includeFamily=only&size=200&city=" + searchCity + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";
  
  $.ajax({
    url: ticketMasterURL,
    method: "GET"
  }).then(function(response) {
      console.log("searching for events in " + searchCity);
      console.log(response._embedded.events.length + "responses");
      for (var i = 0;  i < response._embedded.events.length ; i++) {
        var newEvent = {
          name : response._embedded.events[i].name,
          venue : response._embedded.events[i]._embedded.venues[0].name,
          info : response._embedded.events[i].info,
          date : response._embedded.events[i].dates.start.localDate,
          time : response._embedded.events[i].dates.start.localTime,
        };
        events.push(newEvent);
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