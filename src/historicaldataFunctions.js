export function groupDataByDay (data) {
    const groupedData = {};
  
    data.forEach (item => {
      const date = new Date (item.dt * 1000);
      // Get dateString in 'YYYY-MM-DD' format
      const dateString = date.toISOString().split('T')[0];
  
      // Check if already existing array for date
      if (!groupedData[dateString]) {
        // If not, create new array for new date
        groupedData[dateString] = [];
      }
      // Push current data to array corresponding to date
      groupedData[dateString].push(item);
    });
    return groupedData;
}
  
export  function convertToDate (unixTimeStamp) {
  // Converts the date in UNIX to a standard date
    const milliseconds = unixTimeStamp * 1000;
    const date = new Date(milliseconds);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
  
    return `${day}/${month}`;
}
  
export function getTemps (apiResponse, date) {
  // Used to retrieve the temperatures in terms of historical data
    const temps = [];
    const tempEntries = apiResponse[Object.keys(apiResponse)[date]];
    if (tempEntries && tempEntries.length > 0) {
      for (const entry of tempEntries) {
        // pushes all entries of temperature 
        const temp = entry.main.temp;
        temps.push(temp);
      }
    }
    return temps;
}
  
export function getRains(apiResponse, date) {
  // Used to retrieve rainfall information from historical data
    const rains = [];
    const rainEntries = apiResponse[Object.keys(apiResponse)[date]];
    if (rainEntries && rainEntries.length > 0) {
      for (const entry of rainEntries) {
        // Check if the 'rain' property exists and has '1h' property inside it
        const rain = entry.rain && entry.rain['1h'] !== undefined ? entry.rain['1h'] : 0;
        rains.push(rain);
      }
    }
    return rains;
}
  
export function getWinds (apiResponse, date) {
  // Used to retrieve wind speeds from historical data 
    const winds = [];
    const windEntries = apiResponse[Object.keys(apiResponse)[date]];
    if (windEntries && windEntries.length > 0) {
      for (const entry of windEntries) {
        const wind = entry.wind.speed;
        winds.push(wind);
      }
    }
    return winds;
}
  
export function calcAvgData (data) {
  // calculates average of the data produced to be in a correct format to be outputted 
    if (data.length > 0) {
      const dataSum = data.reduce((sum, data) => sum + data, 0);
      const avgData = dataSum / data.length;
      const roundedData = Math.round(avgData * 10) / 10;
      return roundedData;
    } else {
      return null;
    }
}