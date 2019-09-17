
// Get click event for #search-btn and generate a function
var searchCity = $("#search-input").val();

// Events from API requests are gonna be stored in this array as objects
var events = [];
var music = [];
var sports = [];

$("#search-btn").on("click", function() {
  event.preventDefault();

  var ticketMasterURL = "http://app.ticketmaster.com/discovery/v2/events.json?&size=200&city=" + searchCity + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";
  

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
          console.log("is music");
          music.push(newEvent);
          display();

        } else if (response._embedded.events[i].classifications[0].segment.name === "Sports") {
          console.log("is sports");
          sports.push(newEvent);
          display();
        }
      }
      
    });

});


function display(){
  console.log("-----");
  //console.log(events.length);
  //console.log("-----");

   
//  var ievents =[{ date: "2019-12-13",
//  info: "A very special performance for families with very young children. Toddlers under 4 are welcome! At just the right length, this one hour show is perfect for introducing the joy of dance to children of all ages. All children over 12 months old must have a ticket with an assigned seat. $5.00 Lap Tickets will be available at the Theatre Ticket Office the day of the show for parents wishing to bring any child under 12 months of age to this Two week delivery delay, to be lifted 6/17",
//  name: "California Ballet Presents The Nutcracker Family Friendly Performance",
//  time: "14:00:00",
//  venue: "San Diego Civic Theatre"}];

if(events.length === 0){
  var noResultsMsg = $("<p>");
  console.log("No Results to Display");
  $("#result-section").append(noResultsMsg.text("No Results to Display"));

} else {
  for(var s=0; s<events.length; s++) {
    console.log("display event"+ events[s].date, events[s].info, events[s].name, events[s].time, events[s].venue);
    console.log(s);
    var eventImage = $("<img class='card-img-top'>");// add source and alttext
    eventImage.attr("src",events[s].image);
    eventImage.attr("alt","image text");
    var eventName = $("<li class='list-group-item'>");
    eventName.text(events[s].name);
    var eventInfo = $("<li class='list-group-item'>");
    eventInfo.text(events[s].info);
    var eventDate= $("<li class='list-group-item'>");
    eventDate.text(events[s].date);
    var eventTime= $("<li class='list-group-item'>");
    eventTime.text(events[s].time);
    var eventVenue = $("<li class='list-group-item'>");
    eventVenue.text(events[s].venue);
   var newUl= $("<ul list-group>");
   newUl.append(eventName,eventInfo,eventDate,eventTime,eventVenue);
    var newCard = $("<div class='card' style='width: 18rem;'>");
    //newCard.attr( );
    newCard.append(eventImage,newUl);
    console.log ("new div added" + newCard);
    $("#result-section").append(newCard);
  }
}
}
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

