
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