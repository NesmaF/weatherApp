let cityName = document.getElementById("cityName");
let cityDegree = document.getElementById("cityDegree");
let condition = document.getElementById("condition");
let icon = document.getElementById("icon");
let dayAnother = document.getElementById("dayAnother");

async function getData(city = "alex") {
  let myReq = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=cb6d486d782140cfa5d145806230708&q=${city}&days=3`
  );

  let data = await myReq.json();

  displayToday(data.location, data.current);
  displayAnother(data.forecast.forecastday);

  cityName.innerHTML = data.location.name;
  cityDegree.innerHTML = data.current.temp_c + "°C";
  condition.innerHTML = data.current.condition.text;
  icon.innerHTML = data.current.condition.icon;

  data.forecast.forecastday.forEach((el) => {
    new Date(el.date);
  });
}
getData();
// search
document.getElementById("search").addEventListener("keyup", (city) => {
  getData(city.target.value);
});

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displayToday(data, myReq) {
  let info = new Date(myReq.last_updated.replace(" ", "T"));
  let temp = ` <div class="col-md-4 p-0 ">
                       
                            <div class="header-today d-flex justify-content-between align-items-center p-3">
                                <p id="day" class="text-white ">${
                                  days[info.getDay()]
                                }</p>
                                <p id="month" class="text-white">${
                                  info.getDate() + monthNames[info.getMonth()]
                                }</p>
                            </div>
                            <div class="body-today time px-4">
                                <p id="cityName" class="city text-header text mb-0 pt-3">${
                                  data.name
                                }</p>
                               
                                    <p id="cityDegree" class="text-white   d-inline" style="font-size: 80px;">${
                                      myReq.temp_c + "°C"
                                    }</p>
                                    <img id="icon" src="${`http://`+
                                      myReq.condition.icon
                                    }" alt="icon" class="mb-4 ms-3">
                               
                                <p id="condition" class="condition text-white m-0 mb-4">${
                                  myReq.condition.text
                                }</p>
                                 <div class="d-flex pb-3">
                                <div>
                                    <i class="fa-solid fa-umbrella fa-lg" style="color:#bfc1c8;"></i>
                                    <span class="custom">20%</span>
                                </div>
                                <div class="mx-4">
                                    <i class="fa-solid fa-wind fa-lg" style="color:#bfc1c8;"></i>
                                    <span class="custom" id="wind">18km/h</span>
                                </div>
                                <div>
                                    <i class="fa-regular fa-compass fa-lg" style="color:#bfc1c8;"></i>
                                    <span class="custom">East</span>
                                </div>
                            </div>

                               
                            </div>
                </div>`;

  document.getElementById("forecast").innerHTML = temp;
}
function displayAnother(data) {
  let cartona = "";
  for (let i = 1; i < data.length; i++)
    cartona += ` <div class="col-md-4 p-0 ">
                       
                     <div class="header-tomorrow d-flex justify-content-between align-items-center  p-3">
                       <p id="dayAnother" class="text-header m-auto ">${
                         days[new Date(data[i].date.replace(" ", "T")).getDay()]
                       }</p>

                    </div>
                    <div class="body-tomorrow pt-5 text-center">
                                <img src="${
                                  `http://` + data[i].day.condition.icon
                                }" alt="" width="48" class="m-auto mb-3 icon-weather">
                                <div class="card-text ">
                                    <p id="tempMax" class="text-white fs-5">${
                                      data[i].day.maxtemp_c
                                    }</p>
                                    <p id="tempMin" class="text-white fs-6">${
                                      data[i].day.mintemp_c
                                    }</p>
                                <p id="conditionAnother" class="text-white condition pb-4 text-center">${
                                  data[i].day.condition.text
                                }</p>
                             </div>
                      </div>
                  </div>`;

  document.getElementById("forecast").innerHTML += cartona;
}
