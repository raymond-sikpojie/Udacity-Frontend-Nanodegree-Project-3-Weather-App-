/* Global Variables */
const generateButton = document.querySelector("#generate");
const zipInput = document.querySelector("#zip");
const textareaInput = document.querySelector("#feelings");
const theTemperature = document.querySelector("#temp");
const userResponse = document.querySelector("#content");
const date = document.querySelector("#date");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()} - ${d.getDate()} - ${d.getFullYear()}`;

// Creating variables
let feelings;
let temperature;
const apiKey = "4ff2ad9a8c64852f9b757c9af917f216";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

// MAKE GET REQUEST TO Openweather API
const getWeather = async (url, zip, key) => {
  const response = await fetch(`${url}?zip=${zip},us&appid=${key}`);
  try {
    const data = await response.json();
    return (temperature = data.main.temp);
  } catch (error) {
    console.log(error);
  }
};

// CREATE A POST REQUEST TO LOCAL SERVER
const postRequest = async (data) => {
  const response = await fetch("/", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const data = (await response).json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// UPDATE THE USER INTERFACE
const updateInterface = async () => {
  const response = await fetch("/weather");
  try {
    const data = await response.json();
    theTemperature.innerHTML = `Temperature: ${data.temp}`;
    userResponse.innerHTML = `Your feelings today: ${data.userFeedback}`;
    date.innerHTML = `Date: ${newDate}`;
  } catch (error) {
    console.log(error);
  }
};

// THE FUNCTION WHICH RUNS THE GET AND POST REQUESTS
const runProgram = () => {
  let zipCode = zipInput.value;
  feelings = textareaInput.value;

  // Run GET request from Openweather API
  getWeather(baseUrl, zipCode, apiKey)
    // Run POST request to local server
    .then(() => {
      postRequest({
        date: newDate,
        temp: temperature,
        userFeedback: feelings,
      });
    })

    // Updating the UI
    .then(() => {
      updateInterface();
    });
};

const clearInputFields = () => {
  textareaInput.value = "";
  zipInput.value = "";
};

// Add event listener to "Generate" button which runs the function
generateButton.addEventListener("click", () => {
  runProgram();
  clearInputFields();
});
