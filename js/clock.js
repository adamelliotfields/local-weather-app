/* global moment */

// Update clock and word time every second
const clock = () => {
  const time = {
    minute: {
      0: 'o\u2019clock',
      1: 'o\u2019one', 
      2: 'o\u2019two',
      3: 'o\u2019three',
      4: 'o\u2019four',
      5: 'o\u2019five',
      6: 'o\u2019six',
      7: 'o\u2019seven',
      8: 'o\u2019eight',
      9: 'o\u2019nine',
      10: 'ten',
      11: 'eleven',
      12: 'twelve',
      13: 'thirteen',
      14: 'fourteen',
      15: 'fifteen',
      16: 'sixteen',
      17: 'seventeen',
      18: 'eighteen',
      19: 'nineteen',
      20: 'twenty',
      21: 'twenty-one',
      22: 'twenty-two',
      23: 'twenty-three',
      24: 'twenty-four',
      25: 'twenty-five',
      26: 'twenty-six',
      27: 'twenty-seven',
      28: 'twenty-eight',
      29: 'twenty-nine',
      30: 'thirty',
      31: 'thirty-one',
      32: 'thirty-two',
      33: 'thirty-three',
      34: 'thirty-four',
      35: 'thirty-five',
      36: 'thirty-six',
      37: 'thirty-seven',
      38: 'thirty-eight',
      39: 'thirty-nine',
      40: 'forty',
      41: 'forty-one',
      42: 'forty-two', 
      43: 'forty-three',
      44: 'forty-four',
      45: 'forty-five',
      46: 'forty-six',
      47: 'forty-seven',
      48: 'forty-eight',
      49: 'forty-nine',
      50: 'fifty',
      51: 'fifty-one',
      52: 'fifty-two',
      53: 'fifty-three',
      54: 'fifty-four',
      55: 'fifty-five',
      56: 'fifty-six',
      57: 'fifty-seven',
      58: 'fifty-eight',
      59: 'fifty-nine',
      60: 'sixty'
    },
    hour: {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten',
      11: 'eleven',
      12: 'twelve'
    },
    period() {
      // returns morning, afternoon, or evening based on time
      if ($.inArray(moment().hour(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) !== -1) {
        return 'morning';
      } else if ($.inArray(moment().hour(), [12, 13, 14, 15, 16, 17]) !== -1) {
        return 'afternoon';
      } else if ($.inArray(moment().hour(), [18, 19, 20, 21, 22, 23]) !== -1) {
        return 'evening';
      }
    }
  };

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
  let hour = moment().format('h');
  let minute = moment().format('m');
  let period = time.period();
  $('#time').replaceWith(`<p class="lead" id="time">It is <span id="${hour}">${time.hour[hour]}</span> <span id="${minute}">${time.minute[minute]}</span> in the <span id="${period}">${period}</span>.</p>`);

  // update clock and word time
  setInterval(() => {
    const now = moment();
    const clockSecond = now.seconds() * 6;
    const clockMinute = now.minutes() * 6 + clockSecond / 60;
    const clockHour = ((now.hours() % 12) / 12) * 360 + 90 + clockMinute / 12;
    hour = moment().format('h');
    minute = moment().format('m');
    period = time.period();

    // update clock
    $('#hour').css('transform', `rotate(${clockHour}deg)`);
    $('#minute').css('transform', `rotate(${clockMinute}deg)`);
    $('#second').css('transform', `rotate(${clockSecond}deg)`);

    // update word time
    if ($('#time').children()[0].id !== hour) {
      $('#time').children()[0].id = hour;
      $('#time').children()[0].innerText = time.hour[hour];
    } else if ($('#time').children()[1].id !== minute) {
      $('#time').children()[1].id = minute;
      $('#time').children()[1].innerText = time.minute[minute];
    } else if ($('#time').children()[2].id !== period) {
      $('#time').children[2].id = period;
      $('#time').children()[2].innerText = period;
    }
  }, 1000);
};
