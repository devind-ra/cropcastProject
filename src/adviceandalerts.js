export function analyzeWeatherData(temperature, precipitation, humidity) {
    const advice = {
        planting: "",
        irrigation: "",
        general: "",
    };
  
    // Example conditions - these should be adjusted based on real crop needs
    if (temperature > 10 && temperature < 30) {
        advice.planting = "Planting: (" +Math.round(temperature)+ "°) is optimal for planting.";
    } else {
        advice.planting = "Planting: (" +Math.round(temperature)+ "°) not in optimal range.";
    }
  
    if (precipitation < 10) {
        advice.irrigation = "Irrigation: low rain, consider irrigating.";
    } else {
        advice.irrigation = "Irrigation: adequate rain, not required.";
    }
  
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
    const advice = {
      temps: "",
      rains: ""
    };
    if (temperature >= 32.2 && temperature < 39.4){
      advice.temps = "Take Extreme Caution - Heatwave.";
    }
    if (temperature >= 39.4 && temperature < 51.1){
      advice.temps = "Danger - Heatwave. Stay hydrated.";
    }
    if(temperature >= 51.7){
      advice.temps = "Extreme Danger - Heatwave."
    }
    if(temperature <= 0){
      advice.temps = "Beware of frost or snow";
    }
    if (precipitation >= 7.6 && precipitation <= 50){
      advice.rains = "Heavy Rain Expected";
    }
    if (precipitation >= 50.1 && precipitation < 100){
      advice.rains = "Very Heavy Rain Expected";
    }
    if (precipitation >= 100){
      advice.rains = "Extreme Rain Expected";
    }
  
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
  