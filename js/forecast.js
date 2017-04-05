/* global api, Skycons, loading, moment */

// Call Dark Sky API using latitude and longitude
const forecast = (lat, lon) => {
  // GET weather data as JSONP
  $.getJSON(`https://api.darksky.net/forecast/${api.key}/${lat},${lon}?callback=?`, (json) => {
    const tempF = Math.round(json.currently.temperature);
    const tempC = Math.round((tempF - 32) * 5 / 9);
    const maxF = Math.ceil(json.daily.data[0].temperatureMax);
    const maxC = Math.round((maxF - 32) * 5 / 9);
    const minF = Math.floor(json.daily.data[0].temperatureMin);
    const minC = Math.round((minF - 32) * 5 / 9);
    const daily = json.daily.data[0].summary;
    const summary = json.daily.summary;
    const precipitation = Math.round(json.daily.data[0].precipProbability * 100);
    const icon = json.daily.data[0].icon;
    // GET city and state from Google Maps
    $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}`, (location) => {
      const city = location.results[0].address_components[2].long_name;
      const state = location.results[0].address_components[4].short_name;
      // stop loading animation
      clearInterval(loading);
      // append temperature and city to jumbotron div
      $('#loading').replaceWith(`<p class="lead" id="temperature">The temperature is ${tempF}\u00b0 <a href="#">F</a> in ${city}, ${state}.</p>`);
      // add temperature conversion click handler
      $('.jumbotron').on('click', 'a', (event) => {
        if (event.target.text === 'F') {
          $('#temperature').replaceWith(`<p class="lead" id="temperature">The temperature is ${tempC}\u00b0 <a href="#">C</a> in ${city}, ${state}.</p>`);
          $('span.text-danger').replaceWith(`<span class="text-danger"><b>${maxC}\u00b0</b></span>`);
          $('span.text-primary').replaceWith(`<span class="text-primary"><b>${minC}\u00b0</b></span>`);
        }
        if (event.target.text === 'C') {
          $('#temperature').replaceWith(`<p class="lead" id="temperature">The temperature is ${tempF}\u00b0 <a href="#">F</a> in ${city}, ${state}</p>`);
          $('span.text-danger').replaceWith(`<span class="text-danger"><b>${maxF}\u00b0</b></span>`);
          $('span.text-primary').replaceWith(`<span class="text-primary"><b>${minF}\u00b0</b></span>`);
        }
      });
      // append forecasts to main container div
      $('#main').append(`
          <div class="col-md-12 bg-primary rounded-top rounded-bottom-mobile">
            <h3 class="text-white text-center py-3" id="day-1">${moment().format('dddd')}, ${moment().format('MMMM')} ${moment().format('Do')}</h3>
            <div class="row">
              <div class="col-md-4 col-lg-3 bg-faded text-center rounded-bottom-left pt-3">
                <canvas id="skycon-1" width="196" height="196"></canvas>
              </div>
              <div class="col-md-8 col-lg-9 bg-faded rounded-bottom-right rounded-bottom-mobile pt-3" id="forecast-1">
                <p class="pb-2 mb-2" style="border-bottom: 1px solid rgba(0, 0, 0, .125);"><b>${daily} ${summary}</b></p>
                <p class="pb-2 mb-2" style="border-bottom: 1px solid rgba(0, 0, 0, .125);">High of <span class="text-danger"><b>${maxF}\u00b0</b></span>.</p>
                <p class="pb-2 mb-2" style="border-bottom: 1px solid rgba(0, 0, 0, .125);">Low of <span class="text-primary"><b>${minF}\u00b0</b></span>.</p>
                <p class="pb-2 mb-2"><b>${precipitation}%</b> chance of precipitation.</p>
              </div>
            </div>
          </div>
        `);
      // create a new Skycons instance
      const skycons = new Skycons({ color: '#292b2c' });
      // get the skycon for the condition code and append the skycon to each card
      skycons.add('skycon-1', icon);
      // start skycon animation
      skycons.play();
    });
  });
};
