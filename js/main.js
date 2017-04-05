/* global appendClock, updateClock, success, error */

// On DOM load
$(document).ready(() => {
  // append clock and start updating clock
  appendClock();
  updateClock();
  // animate loading message
  const loading = setInterval(() => {
    $('#loading').append('.');
    // stop animation after 15 seconds if loading message has not been cleared due to an error
    if ($('#loading').length > 0 && $('#loading')[0].childNodes.length > 15) {
      clearInterval(loading);
      $('#loading').replaceWith('<h4 id="loading">Looks like there was a problem! Try refreshing your browser.</h4>')
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
