//js for project 3: jQuery
//Fixed some errors from project 2 and used jQuery

//Get theaters to dropdown
function loadTheaters() {
  $.get("https://www.finnkino.fi/xml/TheatreAreas/", function (data) {
    $(data)
      .find("TheatreArea")
      .each(function () {
        var idTheater = $(this).find("ID").text();
        var nameTheater = $(this).find("Name").text();

        $("#Theater").append(
          '<option value="' + idTheater + '">' + nameTheater + "</option>"
        );
      });
  });
}
loadTheaters();

//Get dates to dropdown
function loadDates() {
  var dates = $.get(
    "https://www.finnkino.fi/xml/ScheduleDates/",
    function (dates) {
      $(dates)
        .find("dateTime")
        .each(function () {
          var xDate = $(this).text();
          var day = xDate.substring(8, 10);
          var month = xDate.substring(5, 7);
          var year = xDate.substring(0, 4);
          var pretty = day + "." + month + "." + year;

          $("#Date").append(
            '<option value="' + pretty + '">' + pretty + "</option>"
          );
        });
    }
  );
}
loadDates();

//On click show movies by selections
$("#letMeIn").click(function () {
  var movies = $.get(
    "https://www.finnkino.fi/xml/Schedule/?area=" +
      $("#Theater").val() +
      "&dt=" +
      $("#Date").val(),
    function (movies) {
      var out =
        "<div class='table-responsive'><table class='table table-striped table-dark'>";

      $(movies)
        .find("Show")
        .each(function () {
          var prettyTime = $(this)
            .find("dttmShowStart")
            .text()
            .substring(11, 16);
          var showTitle = $(this).find("Title").text();
          var showGenres = $(this).find("Genres").text();
          var showWhere = $(this).find("TheatreAndAuditorium").text();
          var showPortrait = $(this).find("EventSmallImagePortrait").text();

          out += "<tr>";
          out += "<td><h5>" + prettyTime + "</h5></td>";
          out += "<td><h5>" + showTitle + "</h5></td>";
          out += "<td><img src='" + showPortrait + "'></td>";
          out += "<td>" + showGenres + "</td>";
          out += "<td>" + showWhere + "</td>";
          out += "</tr>";
        });
      out += "</table></div>";

      $("#Results").html(out);

      //Animate for smoother results
      $("#Results").animate(
        {
          opacity: "1",
        },
        "slow"
      );
    }
  );
});

//After theater selection: update dates!
$("#Theater").change(function () {
  $("#Results").html(""); //Reset old results (movies)
  var dates = $.get(
    "https://www.finnkino.fi/xml/ScheduleDates/?area=" + $("#Theater").val(),
    function (dates) {
      $("#Date").html("");
      $(dates)
        .find("dateTime")
        .each(function () {
          var xDate = $(this).text();
          var day = xDate.substring(8, 10);
          var month = xDate.substring(5, 7);
          var year = xDate.substring(0, 4);
          var pretty = day + "." + month + "." + year;

          $("#Date").append(
            '<option value="' + pretty + '">' + pretty + "</option>"
          );
        });
    }
  );
});

//Changing date reduces opacity of wrong results
$("#Date").click(function () {
  $("#Results").animate(
    {
      opacity: "0.7",
    },
    "slow"
  );
});
//Mouseover for button
$("#letMeIn").mouseover(function () {
  $("#letMeIn").animate({
    opacity: "0.9",
  });
  $("#letMeIn").css({ color: "green" });
});
//Mouseout for button
$("#letMeIn").mouseout(function () {
  $("#letMeIn").animate({
    opacity: "1",
  });
  $("#letMeIn").css({ color: "white" });
});
//Mouseover for date selection
$("#Date").mouseover(function () {
  $("#Date").animate({
    opacity: "0.9",
  });
  $("#Date").css({ color: "green" });
});
//Mouseout for date selection
$("#Date").mouseout(function () {
  $("#Date").animate({
    opacity: "1",
  });
  $("#Date").css({ color: "black" });
});
//Mouseover for theater selection
$("#Theater").mouseover(function () {
  $("#Theater").animate({
    opacity: "0.9",
  });
  $("#Theater").css({ color: "green" });
});
//Mouseout for theater selection
$("#Theater").mouseout(function () {
  $("#Theater").animate({
    opacity: "1",
  });
  $("#Theater").css({ color: "black" });
});
//Mouseover for man behind the mess
$("#footer").mouseover(function () {
  $("#footer").css({ color: "red" });
});
//Mouseout for man behind the mess
$("#footer").mouseout(function () {
  $("#footer").css({ color: "black" });
});
//Animate for smoother results
$("#Results").animate(
  {
    opacity: "0.7",
  },
  "slow"
);
