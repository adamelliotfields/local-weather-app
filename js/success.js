/* global forecast */

// Call Dark Sky API on successful getCurrentPosition() lookup
const success = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  forecast(lat, lon);
};
