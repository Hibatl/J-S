const fs = require('fs');
const fetch = require('node-fetch');

// Function to fetch temperature data
async function fetchTemperature(city) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const temperature = data.current_weather.temperature;

    return temperature;
  } catch (error) {
    throw new Error(`Error fetching temperature for ${city.name}: ${error.message}`);
  }
}

// Read city name from input.txt file
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading input.txt: ${err.message}`);
    return;
  }

  const cityName = data.trim();

  // Find city object with matching name
  const selectedCity = cities.find(city => city.name === cityName);

  if (!selectedCity) {
    console.error(`City '${cityName}' not found in the list.`);
    return;
  }

  // Fetch temperature data for the selected city
  fetchTemperature(selectedCity)
    .then(temperature => {
      // Delete existing file for chosen city if it exists
      fs.unlink(`${selectedCity.name}.txt`, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error(`Error deleting existing file: ${err.message}`);
        }

        // Write temperature result into a new file named "cityname.txt"
        fs.writeFile(`${selectedCity.name}.txt`, `${temperature}°C`, (err) => {
          if (err) {
            console.error(`Error writing file: ${err.message}`);
            return;
          }
          console.log(`Temperature for ${selectedCity.name} written to file.`);
        });
      });
    })
    .catch(error => {
      console.error(error.message);
    });
});
