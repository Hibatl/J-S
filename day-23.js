//day-23 challenge;

// List Of Cities To Be Used
const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
  ];
//array of objects cities, including its name, latitude (lat), and longitude (lng).
  
  // Function To Select A City Randomly
  function selectRandomCity(cities) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  }

//takes an array of cities as an argument.
  
  // Function To Fetch Temperature Data
  async function fetchTemperature(city) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const temperature = data.current_weather.temperature;
  
      console.log(`Temperature in ${city.name}: ${temperature}°C`);
    } catch (error) {
      console.error('Error fetching temperature:', error);
    }
  }
  //This is an asynchronous function named fetchTemperature that takes a city object as an argument.
  //It constructs the API URL using the provided latitude and longitude of the city.
  //It uses a try-catch block to handle any potential errors during the fetch operation.
  //If successful, it parses the response as JSON and extracts the temperature from the data.
  //Finally, it logs the temperature along with the city's name to the console.



  
  
  // Select a random city
  const selectedCity = selectRandomCity(cities);
  //These lines of code select a random city by calling the selectRandomCity function and store the result in selectedCity.
  //Then, it calls the fetchTemperature function with the randomly selected city as an argument to fetch the temperature data.




  // Fetch temperature data for the selected city
  fetchTemperature(selectedCity);
  

