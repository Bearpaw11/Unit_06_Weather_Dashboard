 const apiKey = "28b7e85b8b0a5c73119d203cfee4ea59"

 $(document).ready(function() {
   
$(".getWeather").on("click", function(event) {

        event.preventDefault();
        var NowMoment = moment();
        $(".currentDate").text(NowMoment.format("MMMM Do YYYY, h:mm a"));
        
        const cityWeather = $(".city").val();

        
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + cityWeather + ",Burundi&units=imperial&appid=" + apiKey;
       

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log (response)
          $(".city").html("<h2>" + response.name + " Weather</h2>");
          var iconcode = response.weather[0].icon;
          var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
          $('#wicon').attr('src', iconurl);
          $(".temp").text("Temperature (F): " + response.main.temp);
          $(".windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
          $(".humidity").text("Humidity: " + response.main.humidity);
          var lonLat = response.coord.lon + "," + response.coord.lat + "/" 
          console.log (lonLat)
          var time = response.clouds.dt 
          console.log (time)
        //   uvIndex= "http://api.openweathermap.org/v3/uvi/" + lonLat + "/2017-01-02T12:00:00Z.json?appid=28b7e85b8b0a5c73119d203cfee4ea59"
        //   console.log (uvIndex)
        });
        
     

      });

     
    });

