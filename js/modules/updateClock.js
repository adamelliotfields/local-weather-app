/* global moment, times */

// update clock and word time
const updateClock = () => {
  setInterval(() => {
    const hour = moment().format('h');
    const minute = moment().format('m');
    const period = times.period();
    const clockSecond = moment().seconds() * 6;
    const clockMinute = moment().minutes() * 6 + clockSecond / 60;
    const clockHour = ((moment().hours() % 12) / 12) * 360 + 90 + clockMinute / 12;

    // update clock
    $('#hour').css('transform', `rotate(${clockHour}deg)`);
    $('#minute').css('transform', `rotate(${clockMinute}deg)`);
    $('#second').css('transform', `rotate(${clockSecond}deg)`);

    // update word time
    if ($('#time').children()[0].id !== hour) {
      $('#time').children()[0].id = hour;
      $('#time').children()[0].innerText = times.hour[hour];
    } else if ($('#time').children()[1].id !== minute) {
      $('#time').children()[1].id = minute;
      $('#time').children()[1].innerText = times.minute[minute];
    } else if ($('#time').children()[2].id !== period) {
      $('#time').children[2].id = period;
      $('#time').children()[2].innerText = period;
    }
  }, 1000);
};
