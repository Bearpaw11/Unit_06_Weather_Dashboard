 const apiKey = "893c6340b3ebe569233d6eaa2bb7981b"

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
          var lat = response.coord.lat
          var lon = response.coord.lon  

          var uvIndexQuery= "https://api.openweathermap.org/data/2.5/uvi?&appid=893c6340b3ebe569233d6eaa2bb7981b&lat=" + lat + "&lon=" + lon 
         

          console.log(uvIndexQuery)
          $.ajax({
            url: uvIndexQuery,
            method: "GET"
          }).then(function(response) {
            console.log (response)
            $(".uvIndex").text("UV: " + response.value);
          })
        

        });
        var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityWeather + '&appid=893c6340b3ebe569233d6eaa2bb7981b&units=imperial'
        $.ajax({
          url: url,
          method: "GET"
        }).then(function(response) {
          console.log (response)
          for (let i=0; i< response.list.length; i++){
          if (response.list[i].dt_txt.indexOf("12:00:00") !== -1 ){
            console.log(response.list[i])
            var iconcode = response.list[i].weather[0].icon;
            console.log(iconcode)
           var card= `<div class="col-7 col-lg-2 all"><div class="card bg-primary text-white">
           <div class="card-body">
           <h5 class="card-title">${response.list[i].dt_txt.split(" ")[0]}</h5>
                <img src=${"http://openweathermap.org/img/w/" + iconcode + ".png"} class="icon2" alt="...">
             
                  <h5 class="card-title">Temp (F): ${response.list[i].main.temp}</h5>
           
                  <h5 class="card-title">Humidity: ${response.list[i].main.humidity}</h5>
              
                </div>
              </div>
              </div>`

              $('#forcast').append(card)
          }

          }

          
        })

      });

     
    });

