import clearicon from './assets/images/01_sunny_color.svg';
import two from './assets/images/02d.svg';
import twon from './assets/images/02n.svg';
import onen from './assets/images/01n.svg';
import three from './assets/images/03d.svg';
import four from './assets/images/04d.svg';
import nine from './assets/images/09d.svg';
import ten from './assets/images/10d.svg';
import eleven from './assets/images/11d.svg';
import thirteen from './assets/images/13d.svg';
import fifty from './assets/images/50d.svg';
// Converts epoch time to hours and AM/PM separately
export const convertEpochTimeToReadable = (epochTime) => {
    const date = new Date(epochTime * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const hour = hours % 12 || 12; // Convert 0 (midnight) to 12 and keep 1-11 as is
    const period = hours < 12 ? 'AM' : 'PM';
  
    return { hour, period };
  };
export function epochToDay(epoch) {
    var date = new Date(epoch * 1000);
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayOfWeek = days[date.getDay()];
    return dayOfWeek;
  }
export function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}
export function mpstomph(metersPerSecond) {
    const milesPerHour = metersPerSecond * 2.23694;
    return Math.round(milesPerHour);
}
const iconMapping = {
  '01d': clearicon,
  '02d': two,
  '03d': three,
  '04d': four,
  '09d': nine,
  '10d': ten,
  '11d': eleven,
  '13d': thirteen,
  '50d': fifty,
  '01n': onen,
  '02n': twon,
  '03n': three,
  '04n': four,
  '09n': nine,
  '10n': ten,
  '11n': eleven,
  '13n': thirteen,
  '50n': fifty,

};

export const getWeatherIcon = (condition) => {
  return iconMapping[condition] || `https://openweathermap.org/img/wn/${condition}@2x.png`; // Use a default icon as a fallback
};

export function capitalise(words){
  let wordsplits = words.split(" ");
  for (let i = 0; i < wordsplits.length; i++){
    wordsplits[i] = wordsplits[i].charAt(0).toUpperCase() + wordsplits[i].slice(1);
  }
  return wordsplits.join(" "); 
}