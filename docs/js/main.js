// Get URL parameters
var day, h, hasDateParams, hour, interval, localTZMinutes, m, messages, minute, month, now, params, randomMessage, second, targetDate, targetDay, targetHour, targetMinute, targetMonth, targetSecond, targetTZHours, targetYear, title, updateCountdown, utc, year;

params = new URLSearchParams(window.location.search);

title = params.get('title');

// Date components
year = params.get('y');

month = params.get('m');

day = params.get('d');

hour = params.get('hour');

minute = params.get('min');

second = params.get('sec');

utc = params.get('utc');

// Check if any date parameters are present
hasDateParams = year || month || day || hour || minute || second;

// Timezone logic
localTZMinutes = -new Date().getTimezoneOffset();

targetTZHours = utc ? parseFloat(utc) : localTZMinutes / 60;

// Countdown logic
if (hasDateParams) {
  now = new Date();
  
  // Set defaults
  targetYear = year ? parseInt(year) : now.getFullYear();
  
  // Month is 0-indexed in JS Date, but 1-indexed in input
  // Clamp month between 1 and 12
  targetMonth = month ? (m = parseInt(month), m < 1 ? 0 : m > 12 ? 11 : m - 1) : now.getMonth();
  targetDay = day ? parseInt(day) : now.getDate();
  
  // Clamp hour between 0 and 23
  targetHour = hour ? (h = parseInt(hour), h < 0 ? 0 : h > 23 ? 23 : h) : now.getHours();
  
  // Clamp minute between 0 and 59
  targetMinute = minute ? (m = parseInt(minute), m < 0 ? 0 : m > 59 ? 59 : m) : 0;
  targetSecond = second ? parseInt(second) : 0;
  // if year, month, and day are not present, set targetDate to now plus the hour, minute, and second
  if (!year && !month && !day) {
    console.log("No date parameters, setting targetDate to now plus the hour, minute, and second");
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + targetHour, now.getMinutes() + targetMinute, now.getSeconds() + targetSecond);
    params.set('y', targetDate.getFullYear());
    params.set('m', targetDate.getMonth() + 1);
    params.set('d', targetDate.getDate());
    params.set('hour', targetDate.getHours());
    params.set('min', targetDate.getMinutes());
    params.set('sec', targetDate.getSeconds());
    params.set('utc', localTZMinutes / 60);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    console.log(`targetDate: ${targetDate}`);
  } else {
    targetDate = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute, targetSecond);
    // Adjust for timezone difference
    targetDate = new Date(targetDate.getTime() + (localTZMinutes - targetTZHours * 60) * 60000);
  }
  if (isNaN(targetDate.getTime())) {
    console.error("Invalid date parameters");
  } else {
    updateCountdown = function() {
      var currentTime, days, distance, hours, minutes, seconds;
      currentTime = new Date().getTime();
      distance = targetDate - currentTime;
      if (distance < 0) {
        clearInterval(interval);
        document.querySelector('.countdown').innerHTML = "EXPIRED";
        return;
      }
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.querySelector('#days .value').textContent = days;
      document.querySelector('#days .label').textContent = days === 1 ? ' Day' : ' Days';
      document.querySelector('#hours .value').textContent = hours;
      document.querySelector('#hours .label').textContent = hours === 1 ? ' Hour' : ' Hours';
      document.querySelector('#minutes .value').textContent = minutes;
      document.querySelector('#minutes .label').textContent = minutes === 1 ? ' Minute' : ' Minutes';
      document.querySelector('#seconds .value').textContent = seconds;
      return document.querySelector('#seconds .label').textContent = seconds === 1 ? ' Second' : ' Seconds';
    };
    interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately
  }
}


// Update title if present
if (title) {
  document.querySelector('h1').textContent = title;
} else {
  // Fallback: Random Hello World
  messages = ["Hello World", "こんにちは世界"];
  randomMessage = messages[Math.floor(Math.random() * messages.length)];
  params.set('title', randomMessage);
  if (!title) {
    document.querySelector('h1').textContent = randomMessage;
  }
}
