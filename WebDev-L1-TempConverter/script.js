const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertButton = document.getElementById("convertBtn");
const errorMessage = document.getElementById("error");
const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");
convertButton.addEventListener("click", function () {
      errorMessage.textContent = "";
    const temperature = parseFloat(temperatureInput.value);
    if ( temperatureInput.value.trim() === "" || isNaN(temperature)) {
        errorMessage.textContent = "Please enter a valid temperature.";
        clearResults();
        return;
    }
    const unit = unitSelect.value;
    let celsius;
    let fahrenheit;
    let kelvin;
    if (unit === "celsius") {
        celsius = temperature;
        if (celsius < -273.15) {
            errorMessage.textContent ="Temperature cannot be below absolute zero (-273.15°C).";
            clearResults();
            return;
        }
        fahrenheit =(celsius * 9 / 5) + 32;
        kelvin =   celsius + 273.15;
    }
    else if (unit === "fahrenheit") {
        fahrenheit = temperature;
        if (fahrenheit < -459.67) {
            errorMessage.textContent ="Temperature cannot be below absolute zero (-459.67°F).";
            clearResults();
            return;
        }
        celsius =
            (fahrenheit - 32) * 5 / 9;
        kelvin =celsius + 273.15;
    }
    else if (unit === "kelvin") {
        kelvin = temperature;
        if (kelvin < 0) {
            errorMessage.textContent ="Temperature cannot be below absolute zero (0 K).";
            clearResults();
            return;
        }
        celsius =kelvin - 273.15;
        fahrenheit =(celsius * 9 / 5) + 32;
    }
    celsiusResult.textContent =celsius.toFixed(2) + " °C";
    fahrenheitResult.textContent =fahrenheit.toFixed(2) + " °F";
    kelvinResult.textContent = kelvin.toFixed(2) + " K";
});
function clearResults() {
    celsiusResult.textContent = "—";
    fahrenheitResult.textContent = "—";
    kelvinResult.textContent = "—";
}