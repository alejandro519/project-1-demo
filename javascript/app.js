
// Get click event for #search-btn and generate a function

// Events from API requests are gonna be stored in this array as objects

var music = [];
var sports = [];

$("#search-btn").on("click", function() {
  event.preventDefault();

  $("#music-results").empty();
  $("#sports-results").empty();

  var searchCity = $("#search-input").val();
  var ticketMasterURL = "https://app.ticketmaster.com/discovery/v2/events.json?&size=200&city=" + searchCity + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";

  $.ajax({
    url: ticketMasterURL,
    method: "GET"

  }).then(function(response) {
      console.log("searching for events in " + searchCity);
      console.log(response);

      if(response._embedded.events.length === 0){
        var noResultsMsg = $("<p>");
        console.log("No Results to Display");

        $("#result-section").append(noResultsMsg.text("No Results to Display"));
      } else {

        for (var i = 0;  i < response._embedded.events.length ; i++) {
          
          var newEvent = {
            name : response._embedded.events[i].name,
            venue : response._embedded.events[i]._embedded.venues[0].name,
            info : response._embedded.events[i].info,
            date : response._embedded.events[i].dates.start.localDate,
            time : response._embedded.events[i].dates.start.localTime,
            link : response._embedded.events[i].url,
          };

          for (var j = 0 ; j < response._embedded.events[i].images.length ; j++ ) {
            if (response._embedded.events[i].images[j].ratio === "3_2" && response._embedded.events[i].images[j].url.includes("ARTIST_PAGE")) {
              newEvent.imageURL = response._embedded.events[i].images[j].url;
            }
          }

          if (response._embedded.events[i].classifications[0].segment.name === "Music") {
            display(newEvent, "Music");
          } else if (response._embedded.events[i].classifications[0].segment.name === "Sports") {
            display(newEvent, "Sports");
          }
        }
<<<<<<< HEAD
        if (response._embedded.events[i].classifications[0].segment.name === "Music") {
          console.log("IS MUSIC");
          music.push(newEvent);
          display(music,"Music");
        } else if (response._embedded.events[i].classifications[0].segment.name === "Sports") {
          console.log("is sports");
          sports.push(newEvent);
          display(sports,"Sports");
        }
=======

>>>>>>> 3d6157bd17e6f3c99e0aa80dcdc305b8285d3338
      }
    });

});


<<<<<<< HEAD

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
=======
function display(events, type){
  console.log("-----");
    
    var eventImage = $("<img class='card-img-top'>");
    eventImage.attr("src",events.imageURL);
    eventImage.attr("alt","image text");
    var eventName = $("<li class='list-group-item'>");
    eventName.text(events.name);
    var eventDate= $("<li class='list-group-item'>");
    eventDate.text(events.date);
    var eventTime= $("<li class='list-group-item'>");
    eventTime.text(events.time);
    var eventVenue = $("<li class='list-group-item'>");
    eventVenue.text(events.venue);

    // NEEDS TO BE CHANGED TO A CLICKABLE LINK
    var eventURL = $("<li class='list-group-item'>");
    eventURL.html("<a href='" + events.link + ">" + events.link + "</a>");

   var newUl= $("<ul list-group>");
   newUl.append(eventName,eventDate,eventTime,eventVenue,eventURL);

   //NEEDS TO BE APPENDED DIRECTLY TO THE DIV, AND IMG NEEDS TO BE "FLOAT LEFT"
    var newCard = $("<div style='width: 27rem;'>");

    newCard.append(eventImage,newUl);

    if (type === "Music"){
      $("#music-results").append(newCard);
    } else if (type === "Sports") {
      $("#sports-results").append(newCard);
    }
}
>>>>>>> 3d6157bd17e6f3c99e0aa80dcdc305b8285d3338

