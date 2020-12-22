/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
// Personal API Key for OpenWeatherMap API
const apiKey = 'Your-api-key';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const generateBtn = document.getElementById('generate');
generateBtn.style.cursor = 'pointer';
generateBtn.addEventListener('click', performAction);
// Event listener to add function to existing HTML DOM element
function performAction(evt) {
  // test zip code {'94040'}
  const zip = document.getElementById('zip').value;
  // check empty zip code 
  if(zip === ''){
    alert('zip code shouldn\'t be empty');
  }else{
    const feelings = document.getElementById('feelings').value;
     // Use getDataOfWeather to fetch data from api
    getDataOfWeather(baseUrl, zip, apiKey)
      .then(function (data) {
        console.log("after then:", data);
        postData('/setWeatherData', { temp: data['main']['temp'], date: newDate, feelings: feelings })
          .then(
            updateUI()
          );
      }) // if zip code not correct or api key has issue
      .catch(error => alert('zip code or api site has issue'));
  }
}

/**
  * getDataOfWeather function called by event listener
  * @param String baseUrl
  * @param String zip
  * @param String apiKey
  */
getDataOfWeather = async (baseUrl, zip, apiKey) => {
  const result = await fetch(`${baseUrl}zip=${zip},us&units=imperial&appid=${apiKey}`);
  try {
    const data = await result.json();
    //console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

/**
 * updateUI()
 */
const updateUI = async () => {
  const request = await fetch('/getWeatherData');
  
  try {
    const data = await request.json();
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
    document.getElementById('content').innerHTML = `Your feeling: ${data.feelings}`;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Function to POST data 
 */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', // handle data GET, POST, DELETE
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', },
    // body data type must match 'Content-Type' header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    // console.log(newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
}
