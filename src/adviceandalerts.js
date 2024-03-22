export function analyzeWeatherData(temperature, precipitation, humidity) {
  /* used to hold the specific information about the following variables to be outputted */
    const advice = {
        planting: "",
        irrigation: "",
        general: "",
    };
  
    /* Check the temperatures and store information about planting */
    if (temperature > 10 && temperature < 30) {
        advice.planting = "Planting: (" +Math.round(temperature)+ "°) is optimal for planting.";
    } else {
        advice.planting = "Planting: (" +Math.round(temperature)+ "°) not in optimal range.";
    }
    /* Check the precipitation and store information about irrigation */
    if (precipitation < 10) {
        advice.irrigation = "Irrigation: low rain, consider irrigating.";
    } else {
        advice.irrigation = "Irrigation: adequate rain, not required.";
    }
   /* Check the humidity and store information about general advice */
    if (humidity > 80) {
        advice.general = "Humidity: high, monitor for pests.";
    } else if (humidity < 30) {
        advice.general = "Humidity: low, hydrate crops ASAP.";
    } else {
        advice.general = "Humidity: acceptable range.";
    }
  
    return [advice.planting , advice.irrigation , advice.general];
}

export function extremeWeather(temperature, precipitation){
  /* Advice is storing information about the temperature and rainfall to help produce alerts */
    const advice = {
      temps: "",
      rains: ""
    };
    /* Used to check for a heatwave and the severity of it */
    if (temperature >= 32.2 && temperature < 39.4){
      advice.temps = "Take Extreme Caution - Heatwave.";
    }
    if (temperature >= 39.4 && temperature < 51.1){
      advice.temps = "Danger - Heatwave. Stay hydrated.";
    }
    if(temperature >= 51.7){
      advice.temps = "Extreme Danger - Heatwave."
    }
    /* Used to check for frost or snow */
    if(temperature <= 0){
      advice.temps = "Beware of frost or snow";
    }
     /* Used to check for the rainfall and its severity */
    if (precipitation >= 7.6 && precipitation <= 50){
      advice.rains = "Heavy Rain Expected";
    }
    if (precipitation >= 50.1 && precipitation < 100){
      advice.rains = "Very Heavy Rain Expected";
    }
    if (precipitation >= 100){
      advice.rains = "Extreme Rain Expected";
    }
    /* Checks if information needs to be outputted or not */
    if (advice.rains === "" && advice.temps === ""){
      return "No Weather Alerts"; 
    }
    if (advice.temps === "" && advice.rains !== ""){
      return advice.rains;
    }
    if (advice.temps !== "" && advice.rains === ""){
      return advice.temps;
    }
    else{
      return advice.temps + " " + advice.rains;
    }
}
  