
// Get click event for #search-btn and generate a function

// Events from API requests are gonna be stored in this array as objects

var music = [];
var sports = [];

$("#search-btn").on("click", function() {
  event.preventDefault();

  $("#music-results").empty();
  $("#sports-results").not("h5").not("p").empty();

  var searchCity = $("#search-input").val();
  var ticketMasterURL = "http://app.ticketmaster.com/discovery/v2/events.json?&size=200&city=" + searchCity + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";

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

      }
    });

});


function display(events, type){
  console.log("-----");
    
    var eventImage = $("<img class='card-img-top'>");// add source and alttext
    eventImage.attr("src",events.imageURL);
    eventImage.attr("alt","image text");
    var eventName = $("<li class='list-group-item'>");
    eventName.text(events.name);
    var eventInfo = $("<li class='list-group-item'>");
    eventInfo.text(events.info);
    var eventDate= $("<li class='list-group-item'>");
    eventDate.text(events.date);
    var eventTime= $("<li class='list-group-item'>");
    eventTime.text(events.time);
    var eventVenue = $("<li class='list-group-item'>");
    eventVenue.text(events.venue);
   var newUl= $("<ul list-group>");
   newUl.append(eventName,eventDate,eventTime,eventVenue,eventInfo);
    var newCard = $("<div class='card' style='width: 18rem;'>");
    //newCard.attr( );
    newCard.append(eventImage,newUl);

    if (type === "Music"){
      $("#music-results").append(newCard);
    } else if (type === "Sports") {
      $("#sports-results").append(newCard);
    }
}

