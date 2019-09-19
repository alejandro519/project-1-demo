
// Get click event for #search-btn and generate a function

// Events from API requests are gonna be stored in this array as objects

var music = [];
var sports = [];

$(document).ready(function () {
  $("#music-results").hide();
  $("#sports-results").hide();


$("#search-btn").on("click", function() {
  event.preventDefault();

  $("#music-results").empty().append('<h5 class="card-title">Music Events</h5>');
  $("#sports-results").empty().append('<h5 class="card-title">Sports Events</h5>');

  var searchCity = $("#search-input").val();
  var ticketMasterURL = "https://app.ticketmaster.com/discovery/v2/events.json?&size=200&city=" + searchCity + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";


  $.ajax({
    url: ticketMasterURL,
    method: "GET"

  }).then(function (response) {
    console.log("searching for events in " + searchCity);
    console.log(response);

    var MAX_EVENTS = 20
    var musicEventsCount = 0
    var sportsEventsCount = 0

    if (response._embedded.events.length === 0) {
      var noResultsMsg = $("<p>");
      console.log("No Results to Display");

      $("#result-section").append(noResultsMsg.text("No Results to Display"));
    } else {

      for (var i = 0; i < response._embedded.events.length; i++) {

        var newEvent = {
          name: response._embedded.events[i].name,
          venue: response._embedded.events[i]._embedded.venues[0].name,
          info: response._embedded.events[i].info,
          date: response._embedded.events[i].dates.start.localDate,
          time: response._embedded.events[i].dates.start.localTime,
          link: response._embedded.events[i].url,
        };

        for (var j = 0; j < response._embedded.events[i].images.length; j++) {
          if (response._embedded.events[i].images[j].ratio === "3_2" && response._embedded.events[i].images[j].url.includes("ARTIST_PAGE")) {
            newEvent.imageURL = response._embedded.events[i].images[j].url;
          }
        }

        if (response._embedded.events[i].classifications[0].segment.name === "Music" && musicEventsCount < MAX_EVENTS) {
          musicEventsCount++;
          display(newEvent, "Music");
        } else if (response._embedded.events[i].classifications[0].segment.name === "Sports" && sportsEventsCount < MAX_EVENTS) {
          sportsEventsCount++;
          display(newEvent, "Sports");
        }
      }


    }
  });

});


function display(events, type) {
  console.log("-----");

  var eventImage = $("<img class='card-img-top '>");
  eventImage.attr("src", events.imageURL);
  eventImage.attr("alt", "image text");
  var eventName = $("<li class='list-group-item li-card'>");
  eventName.text(events.name);
  var eventDate = $("<li class='list-group-item li-card'>");
  eventDate.text(events.date);
  var eventTime = $("<li class='list-group-item li-card'>");
  eventTime.text(events.time);
  var eventVenue = $("<li class='list-group-item li-card'>");
  eventVenue.text(events.venue);

  // NEEDS TO BE CHANGED TO A CLICKABLE LINK
  // var eventURL = $("<li class='list-group-item'>");
  // eventURL.text(events.link);
  // eventURL.html("<a href='" + events.link + "/>" );
  var eventTOO = (`<a class='link-result' href=${events.link} target='_blank'>Learn More!</a>`);

  var newUl = $("<ul list-group>");
  newUl.append(eventName, eventDate, eventTime, eventVenue, eventTOO);

  //NEEDS TO BE APPENDED DIRECTLY TO THE DIV, AND IMG NEEDS TO BE "FLOAT LEFT"
  var newCard = $("<div class='card' style='width: 18rem;'>");

  newCard.append(eventImage, newUl);

  if (type === "Music") {
    $("#music-results").append(newCard);
    $("#music-results").show();
  } else if (type === "Sports") {
    $("#sports-results").append(newCard);
    $("#sports-results").show();
  }
}
  function sticktothetop() {
    var window_top = $(window).scrollTop();
    var top = $('#stick-here').offset().top;
    if (window_top > top) {
      $('.links').addClass('stick');
      $('#stick-here').height($(0).outerHeight());

    } else {
      $('.link').removeClass('stick');
      $('#stick-here').height(0);
    }
  }
  $(function () {
    $(window).scroll(sticktothetop);
    sticktothetop();
  });

});