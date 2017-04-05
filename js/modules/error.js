/* global forecast */

// Get coordinates from Info IP API and call Dark Sky API on successful response
const error = () => {
  $.getJSON('https://api.infoip.io?callback=?', (position) => {
    const lat = position.latitude;
    const lon = position.longitude;
    forecast(lat, lon);
  });
};
