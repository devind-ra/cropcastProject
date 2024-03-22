export function changeBackground(weather) {
    // Changes the background of the information displayed based on the weather conditions
    // Each case represents the weather output from the API 
    const container = document.querySelector('.main-container'); 
    switch (weather) {
        case '13d':
        case '13n':
            //SNOW WEATHER
            container.style.background = "url('https://gifdb.com/images/high/snow-falling-black-background-x06pri4zj5snb00g.gif') repeat";
            container.style.backgroundSize = "contain";
  
            break;
        case '04d':
        case '03d':
        case '03n':
        case '04n':
            //CLOUDS WEATHER
            container.style.background = "linear-gradient(177deg, rgb(94, 106, 129), rgb(0 25 47)) center center / contain no-repeat";
            container.style.backgroundSize = "contain"; 
            break;
        case '02d':
        case '01d':
            //SUNNY WEATHER 
            container.style.background = "linear-gradient(95deg, rgb(54 93 255), rgb(72 169 255)) center center / contain no-repeat";
            container.style.backgroundSize = "contain";
            break;
            
        case '11d':
        case '11n':
          //THUNDERSTORM WEATHER
          container.style.background = "#526477 url('https://i.gifer.com/Gler.gif') no-repeat";
          container.style.backgroundSize = "contain";        
          break;
        case '09d':
        case '10d':
        case '09n':
        case '10n':
            //RAIN WEATHER
            container.style.background = "black url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/222ab078-7308-4a90-8ec5-216da66a9726/d11mmzc-8c8cf43f-27a6-4bb5-8e41-23999c28b069.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMmFiMDc4LTczMDgtNGE5MC04ZWM1LTIxNmRhNjZhOTcyNlwvZDExbW16Yy04YzhjZjQzZi0yN2E2LTRiYjUtOGU0MS0yMzk5OWMyOGIwNjkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.uTOe7S9khk1FRKfEOv9S8hB0Zmq8bQMmbTuVQzzWexg') repeat";
            container.style.backgroundSize = "contain"; 
            break;
        case '02n':
        case '01n':
            //NIGHT DISPLAY
            container.style.background = "black url('https://i.gifer.com/Xkjj.gif') no-repeat";
            container.style.backgroundSize = "contain";
            break;
        default: //IF NONE WORK 
          container.style.background = "background: linear-gradient(136.79deg, #010042, #5e0183)";
    }
  }