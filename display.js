function display(event,type) {

    console.log("-----");
    //console.log(events.length);
    //console.log("-----");
  var type 
  
    //  var ievents =[{ date: "2019-12-13",
    //  info: "A very special performance for families with very young children. Toddlers under 4 are welcome! At just the right length, this one hour show is perfect for introducing the joy of dance to children of all ages. All children over 12 months old must have a ticket with an assigned seat. $5.00 Lap Tickets will be available at the Theatre Ticket Office the day of the show for parents wishing to bring any child under 12 months of age to this Two week delivery delay, to be lifted 6/17",
    //  name: "California Ballet Presents The Nutcracker Family Friendly Performance",
    //  time: "14:00:00",
    //  venue: "San Diego Civic Theatre"}];
    
    if (events.length === 0) {
      var noResultsMsg = $("<p>");
      console.log("No Results to Display");
      $("#result-section").append(noResultsMsg.text("No Results to Display"));
  
    } else {
      
      for (var s = 0; s < events.length; s++) {
        console.log("display event" + events[s].date, events[s].info, events[s].name, events[s].time, events[s].venue);
        console.log(s);
        var eventImage = $("<img class='card-img-top'>");// add source and alttext
        eventImage.attr("src", events[s].image);
        eventImage.attr("alt", "image text");
        var eventName = $("<li class='list-group-item'>").text("Event: " + events[s].name);
        var eventInfo = $("<li class='list-group-item'>").text("Info: " + events[s].info);
        var eventDate = $("<li class='list-group-item'>").text("Date: " + events[s].date);
        var eventTime = $("<li class='list-group-item'>").text("Tiem: " + events[s].time);
        var eventVenue = $("<li class='list-group-item'>").text("Venue: " + events[s].venue);
        var newUl = $("<ul list-group>");
        newUl.append(eventName, eventInfo, eventDate, eventTime, eventVenue);
        var newCard = $("<div class='card' style='width: 18rem;'>");
        //newCard.attr( );
        newCard.append(eventImage, newUl);
        console.log("new div added" + newCard);
        $("#result-section").append(newCard);
      }
    }
  }