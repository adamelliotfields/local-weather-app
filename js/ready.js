/* global clock, success, error */

// On DOM load
$(document).ready(() => {
  // invoke clock()
  clock();
  // animate loading message
  const loading = setInterval(() => {
    $('#loading').append('.');
    // stop animation after 15 seconds if loading message has not been cleared due to an error
    if ($('#loading').length > 0 && $('#loading')[0].childNodes.length > 15) {
      clearInterval(loading);
    }
  }, 1000);
  // invoke getCurrentPosition() if available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, { timeout: 10000 });
  } else {
    // invoke error()
    error();
  }
});
