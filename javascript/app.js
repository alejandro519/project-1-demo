
// Get click event for #search-btn and generate a function

// Events from API requests are gonna be stored in this array as objects

var music = [];
var sports = [];

$(document).ready(function () {
  $("#sports-results").hide();
  $("#music-results").hide();
});

$("#search-btn").on("click", function () {
  event.preventDefault();
  var searchCity = $("#search-input").val();
  var ticketMasterURL = "http://app.ticketmaster.com/discovery/v2/events.json?&size=200&city=" + searchCity + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";

  
  $.ajax({
    url: ticketMasterURL,
    method: "GET"
    
  }).then(function (response) {
    
    console.log("searching for events in " + searchCity);
    for (var i = 0; i < response._embedded.events.length; i++) {
      
      var newEvent = {
        name: response._embedded.events[i].name,
        venue: response._embedded.events[i]._embedded.venues[0].name,
        info: response._embedded.events[i].info,
        date: response._embedded.events[i].dates.start.localDate,
        time: response._embedded.events[i].dates.start.localTime,
        link: response._embedded.events[i].url,
      };
      //response._embedded.events[i].images    ratio: "3_2"
      for (var j = 0; j < response._embedded.events[i].images.length; j++) {
        if (response._embedded.events[i].images[j].ratio === "3_2" && response._embedded.events[i].images[j].url.includes("ARTIST_PAGE")) {
          newEvent.imageURL = response._embedded.events[i].images[j].url;
        }
      }
      
      if (response._embedded.events[i].classifications[0].segment.name === "Music") {
        music.push(newEvent);
        display(music, "Music");
      }
      
      if (response._embedded.events[i].classifications[0].segment.name === "Sports") {
        sports.push(newEvent);
        display(sports, "Sports");
        
        
      }
    }
    
  });
  
});


function display(events, type) {
  console.log("-----");
  
  if (events.length === 0) {
    var noResultsMsg = $("<p>");
    console.log("No Results to Display");
    $("#result-section").append(noResultsMsg.text("No Results to Display"));
    
  } else {
    for (var s = 0; s < events.length; s++) {
      
      var eventImage = $("<img class='card-img-top image-result'>");// add source and alttext
      eventImage.attr("src", events[s].image);
      eventImage.attr("alt", "image text");
      var eventName = $("<li class='list-group-item li-card'>");
      eventName.text(events[s].name);
      var eventInfo = $("<li class='list-group-item info-card'>");
      eventInfo.text(events[s].info);
      var eventDate = $("<li class='list-group-item li-card'>");
      eventDate.text(events[s].date);
      var eventTime = $("<li class='list-group-item li-card'>");
      eventTime.text(events[s].time);
      var eventVenue = $("<li class='list-group-item li-card-last'>");
      eventVenue.text(events[s].venue);
      var eventLink = $("<a class='card-link link-result'>Learn More!</a>");
      eventLink.attr("href", events[s].link);
      eventLink.html();
      var newUl = $("<ul list-group>");
      newUl.append(eventName, eventInfo, eventDate, eventTime, eventVenue, eventLink);
      var newCard = $("<div class='card' style='width: 18rem;'>");
      //newCard.attr( );
      newCard.append(eventImage, newUl);
      
      if (type === "Music") {
        $("#music-results").append(newCard);
        $("#music-results").show();        
      } else if (type === "Sports") {
        $("#sports-results").append(newCard);
        $("#sports-results").show();
      }
      
    }
  }
}

