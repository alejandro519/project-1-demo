// Configure database
var firebaseConfig = {
  apiKey: "AIzaSyBYu86lcd8iV7dFoYqD4W9a7G8xgX2pJd8",
  authDomain: "project-1-a5ac9.firebaseapp.com",
  databaseURL: "https://project-1-a5ac9.firebaseio.com",
  projectId: "project-1-a5ac9",
  storageBucket: "",
  messagingSenderId: "160952004435",
  appId: "1:160952004435:web:27f37a971794bc3bfcfba6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Get click event for #search-btn and generate a function
var searchCity = "San Diego"; //placeholder

// Events from API requests are gonna be stored in this array as objects
var events = [];
var searchDateFormat = "MM/DD/YY";
var lastSearch;
var searchDate;

database.ref("/search-date").once("value", function(datesnap) {
  if (datesnap.exists()) {
    lastSearch = datesnap.val().searchDate;
    console.log(lastSearch);

  }
});

database.ref().on("child_added", function(snapshot) {

  if (snapshot.exists()) {

      console.log("downloading from database");
      
      var newEvent = {
        name: snapshot.val().name,
        venue: snapshot.val().venue,
        info: snapshot.val().info,
        date: snapshot.val().date,
        time: snapshot.val().time,
      };
      events.push(newEvent);

  } else if (!snapshot.exists()) {
    console.log("No events to display");
  }
});

$("#search-btn").on("click", getEvents);

//==============================//

function getEvents () {
  
  searchDate = moment().format(searchDateFormat);
  console.log(searchDate, lastSearch);

  if (searchDate !== lastSearch) {
    console.log("different dates, remove data, get API request!");
    database.ref().remove();
    getTicketMasterRequest("events", "keyword=family friendly", searchCity);
  } else if (searchDate === lastSearch) {
    console.log("Same date, use elements stored in the array");
  }
      
}

function getTicketMasterRequest (type, key, city) {
  
  var ticketMasterURL = "http://app.ticketmaster.com/discovery/v2/" + type + ".json?" + key + "&size=200&city=" + city + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";
  
  $.ajax({
    url: ticketMasterURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    if (type === "events") {
      console.log("searching for " +  type + " and " + key);
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
        database.ref("/search-date").set({
          searchDate: moment().format(searchDateFormat)
        });
        database.ref().push(newEvent);
      }
    }

    key = "keyword=children";

    ticketMasterURL = "http://app.ticketmaster.com/discovery/v2/" + type + ".json?" + key + "&size=200&city=" + city + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";
    console.log("about to make request 2");
    $.ajax({
        url: ticketMasterURL,
        method: "GET"
      }).then(function(response) {
        console.log("searching for " +  type + " and " + key);
        
        for (var i = 0;  i < response._embedded.events.length ; i++) {
          var newEvent = {
            name : response._embedded.events[i].name,
            venue : response._embedded.events[i]._embedded.venues[0].name,
            info : response._embedded.events[i].info,
            date : response._embedded.events[i].dates.start.localDate,
            time : response._embedded.events[i].dates.start.localTime,
          };
  
          events.push(newEvent);
          database.ref().push(newEvent);
        }

        key = "includeFamily=yes";

        ticketMasterURL = "http://app.ticketmaster.com/discovery/v2/" + type + ".json?" + key + "&size=200&city=" + city + "&apikey=4tfR2LDAXpAcyulcEgARYYEfWZTLHCUQ";
        
        $.ajax({
          url: ticketMasterURL,
          method: "GET"
        }).then(function(response) {
          console.log("searching for" +  type + " and " + key)

          for (var i = 0;  i < response._embedded.events.length ; i++) {
              if (response._embedded.events[i].classifications[0].family) {
                var newEvent = {
                  name : response._embedded.events[i].name,
                  venue : response._embedded.events[i]._embedded.venues[0].name,
                  info : response._embedded.events[i].info,
                  date : response._embedded.events[i].dates.start.localDate,
                  time : response._embedded.events[i].dates.start.localTime,
                };
        
                events.push(newEvent);
                database.ref().push(newEvent);
              }
          }
        });

      });

  });
    
}

// NOT CALLED! NEEDS AUTHENTICATION
function getEvenbrite () {
  var eventBriteURL = "https://www.eventbriteapi.com/v3/users/me/?token=P2UFY6OEXHWORQKQFMRJE7AQZPMLMEL5DRUT6ALTPZ7ELIITPE";
    // Generate a search request from the API using ajax... then...

      $.ajax({
        url: eventBriteURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        
      });
}