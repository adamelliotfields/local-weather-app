/* global moment, times */

const appendClock = () => {
  // append clock
  $('#clock').replaceWith(`
    <div class="clock-circle mt-4 mb-4">
      <div class="clock-face">
        <div id="hour" class="clock-hour"></div>
        <div id="minute" class="clock-minute"></div>
        <div id="second" class="clock-second"></div>
      </div>
    </div>
  `);

  // append word time
  const hour = moment().format('h');
  const minute = moment().format('m');
  const period = times.period();
  $('#time').replaceWith(`<p class="lead" id="time">It is <span id="${hour}">${times.hour[hour]}</span> <span id="${minute}">${times.minute[minute]}</span> in the <span id="${period}">${period}</span>.</p>`);
};
