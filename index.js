 const apiKey = "893c6340b3ebe569233d6eaa2bb7981b"

 $(document).ready(function() {

     var search = []
     var storage = localStorage.getItem("city")
     
     if (storage) {
         search = JSON.parse(storage)
 
     }
     renderside()
     searchcity(search[search.length - 1])




     $(".getWeather").on("click", function(event) {

         event.preventDefault();
         var NowMoment = moment();
         $(".currentDate").text(NowMoment.format("MMMM Do YYYY, h:mm a"));

         const cityWeather = $(".city").val();
         console.log("--->", search.indexOf(cityWeather))



         searchcity(cityWeather)
     })

     function searchcity(cityWeather) {
         const queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
             "q=" + cityWeather + ",Burundi&units=imperial&appid=" + apiKey;


         $.ajax({
             url: queryURL,
             method: "GET"
         }).then(function(response) {


             if (search.indexOf(cityWeather) === -1) {
                 search.push(cityWeather)
                 renderside()


                 localStorage.setItem("city", JSON.stringify(search))  
             }
             $(".city").html("<h2>" + response.name + " Weather</h2>");
             var iconcode = response.weather[0].icon;
             var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
             $('#wicon').attr('src', iconurl);
             $(".temp").text("Temperature (F): " + response.main.temp);
             $(".windSpeed").text("Wind Speed (MPH): " + response.wind.speed);
             $(".humidity").text("Humidity (%): " + response.main.humidity);
             var lat = response.coord.lat
             var lon = response.coord.lon

             var uvIndexQuery = "https://api.openweathermap.org/data/2.5/uvi?&appid=893c6340b3ebe569233d6eaa2bb7981b&lat=" + lat + "&lon=" + lon


             console.log(uvIndexQuery)
             $.ajax({
                 url: uvIndexQuery,
                 method: "GET"
             }).then(function(response) {
                 console.log(response)
                 $(".uvIndex").text("UV: " + response.value);
             })


         });
         var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityWeather + '&appid=893c6340b3ebe569233d6eaa2bb7981b&units=imperial'
         $.ajax({
             url: url,
             method: "GET"
         }).then(function(response) {
             $("#forecast").empty();
             console.log(response)
             for (let i = 0; i < response.list.length; i++) {
                 if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                     console.log(response.list[i])
                     var iconcode = response.list[i].weather[0].icon;
                     console.log(iconcode)
                     var card = `<div class="col-7 col-lg-2 all"><div class="card bg-primary text-white">
           <div class="card-body">
           <h5 class="card-title">${response.list[i].dt_txt.split(" ")[0]}</h5>
                <img src=${"http://openweathermap.org/img/w/" + iconcode + ".png"} class="icon2" alt="...">
                  <h6 class="card-title"> Temp (F): ${response.list[i].main.temp}</h6>
                  <h6 class="card-title"> Humidity (%): ${response.list[i].main.humidity} </h6>
                </div>
              </div>
              </div>`

                     $('#forecast').append(card)
                 }

             }


         })

     };


     function renderside() {

         let max = search.length > 5 ? 5 : search.length;

         $("#list").empty()
         let j = 0
         for (let i = search.length - 1; j < max; i--) {
             $("#list").append(`<li class="list-group-item topcities" city=${i}>${search[i]}</li>`)
             j++
         }


         $(".topcities").on("click", function() {
             let index = $(this).attr("city")
             console.log(index, search)
             let cityWeather = search[index]
             console.log(cityWeather)
             searchcity(cityWeather)

         })
     }

 });





