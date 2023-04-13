// Define NASA API Key
var apiKey = 'IdhEQmJ0pvqTZ08ahEnAOjtXq76C7KUTmYlZMpdI';

// DOM elements
var displayImage = document.getElementById('display-image');
var currentDateElement = document.getElementById('current-date');
var dateSelector = document.getElementById('date-selector');

// Current date
var today = dayjs().format('YYYY-MM-DD');

// Set MAX attribute of the date selector
// API only has images available for past dates, not future
dateSelector.setAttribute('max', today);

// Fetch the image for chosen date
function fetchImage(date) {
  //Fetch request API with the specified date and API key
  fetch('https://api.nasa.gov/planetary/apod?api_key=' + apiKey + '&date=' + date)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      // Display image and title
      displayImage.innerHTML = '<h2>' + data.title + '</h2>' +
                                '<img src="' + data.url + '" alt="' + data.title + '">' +
                                '<p>' + data.explanation + '</p>';
    })
    .catch(function(error) {
      console.log(error);
    });
}

// Get current date & display
// Subtract one to allow for US timezone
var currentDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
currentDateElement.textContent = dayjs().subtract(1, 'day').format('MMMM D, YYYY');

// Fetch image for the current date
fetchImage(currentDate);

// Add event listener on date selector
dateSelector.addEventListener('change', function() {
  var selectedDate = dateSelector.value;
  currentDateElement.textContent = dayjs(selectedDate).format('MMMM D, YYYY');
  fetchImage(selectedDate);
});
