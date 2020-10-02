import "./style.css"
import "bootstrap/dist/css/bootstrap.css"

const URL = "http://restcountries.eu/rest/v1/alpha?codes=";
let lastId = "";

document.getElementById("map").addEventListener("click", getCountryData);

/**
 * Had to change the Russia ID back and forth
 * because it has to be 'RU' for fetching and
 * 'ru-main' for using its style property. 
 */
function getCountryData(e) {
  let countryId = e.target.id;

  if (lastId !== "" && lastId !== countryId) {
    if (lastId === "RU") {
      lastId = "ru-main";
    }
  document.getElementById(lastId).style.fill = "rgb(192, 192, 192)";
  }

  document.getElementById(countryId).style.fill = "red";

  if (countryId === "ru-main") {
    countryId = "RU";
  }

  fetch(URL + countryId)
  .then(res => res.json())
  .then(countryArray => {
    let country = countryArray[0];
    document.getElementById("countryInfo").innerHTML = 
    `Country: ${country.name}<br>
     Population: ${country.population}<br>
     Area: ${country.area}<br>
     Region: ${country.region}<br>
     Borders: ${country.borders}<br>
    `;
  })
  lastId = countryId;
}


