/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  const date = new Date(value);
  return date;
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  const date = new Date(value);
  return date;
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  const newDate = new Date(date);
  newDate.setMonth(1);
  newDate.setDate(29);
  if (newDate.getMonth() === 1) {
    return true;
  }
  return false;
}

/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);
  const startDateTime = newStartDate.getTime();
  const endDateTime = newEndDate.getTime();
  const msPerHour = 60 * 60 * 1000;
  const dif = endDateTime - startDateTime;

  const hourDif = Math.floor(dif / msPerHour);
  const minDif = Math.floor((dif - hourDif * msPerHour) / (1000 * 60));
  const secDif = Math.floor((dif - hourDif * msPerHour - minDif * 1000 * 60) / 1000);
  const msDif = Math.round(dif - hourDif * msPerHour - minDif * 1000 * 60 - secDif * 1000);


  let temp = String(hourDif);
  if (hourDif < 10) {
    temp = `0${hourDif}`;
  } else {
    temp = hourDif;
  }
  if (minDif < 10) {
    temp += `:0${minDif}`;
  } else {
    temp += `:${minDif}`;
  }
  if (secDif < 10) {
    temp += `:0${secDif}`;
  } else {
    temp += `:${secDif}`;
  }
  if (msDif < 10) {
    temp += `.00${msDif}`;
  } else if (msDif < 100) {
    temp += `.0${msDif}`;
  } else if (msDif < 1000) {
    temp += `.${msDif}`;
  } else {
    temp += '.000';
  }
  return temp;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  const newDate = new Date(date);
  let hours = newDate.getUTCHours();
  if (hours > 12) {
    hours -= 12;
  }
  const minutes = newDate.getUTCMinutes();
  let angle = Math.abs(0.5 * (60 * hours + minutes) - 6 * minutes);
  if (angle > 180) {
    angle = 360 - angle;
  }
  const angleInRadiant = angle * (Math.PI / 180);

  return angleInRadiant;
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
