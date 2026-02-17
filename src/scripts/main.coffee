# Get URL parameters
params = new URLSearchParams(window.location.search)
title = params.get('title')

# Date components
year = params.get('y')
month = params.get('m')
day = params.get('d')
hour = params.get('hour')
minute = params.get('min')
second = params.get('sec')

# Check if any date parameters are present
hasDateParams = year or month or day or hour or minute or second

# Countdown logic
if hasDateParams
  now = new Date()
  
  # Set defaults
  targetYear = if year then parseInt(year) else now.getFullYear()
  
  # Month is 0-indexed in JS Date, but 1-indexed in input
  # Clamp month between 1 and 12
  targetMonth = if month 
    m = parseInt(month)
    if m < 1 then 0 else if m > 12 then 11 else m - 1
  else 
    now.getMonth()
  
  targetDay = if day then parseInt(day) else now.getDate()
  
  # Clamp hour between 0 and 23
  targetHour = if hour 
    h = parseInt(hour)
    if h < 0 then 0 else if h > 23 then 23 else h
  else
    now.getHours()
  

  # Clamp minute between 0 and 59
  targetMinute = if minute 
    m = parseInt(minute)
    if m < 0 then 0 else if m > 59 then 59 else m
  else
    targetMinute = 0

  targetSecond = if second then parseInt(second) else 0

  # if year, month, and day are not present, set targetDate to now plus the hour, minute, and second
  if not year and not month and not day
    console.log "No date parameters, setting targetDate to now plus the hour, minute, and second"
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + targetHour, now.getMinutes() + targetMinute, now.getSeconds() + targetSecond)
    params.set('y', targetDate.getFullYear())
    params.set('m', targetDate.getMonth() + 1)
    params.set('d', targetDate.getDate())
    params.set('hour', targetDate.getHours() + targetHour)
    params.set('min', targetDate.getMinutes() + targetMinute)
    params.set('sec', targetDate.getSeconds() + targetSecond)
    window.history.replaceState({}, '', "#{window.location.pathname}?#{params}")
    console.log "targetDate: #{targetDate}"
  else
    targetDate = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute, targetSecond)

  if isNaN(targetDate.getTime())
    console.error "Invalid date parameters"
  else
    updateCountdown = ->
      currentTime = new Date().getTime()
      distance = targetDate - currentTime

      if distance < 0
        clearInterval(interval)
        document.querySelector('.countdown').innerHTML = "EXPIRED"
        return

      days = Math.floor(distance / (1000 * 60 * 60 * 24))
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      seconds = Math.floor((distance % (1000 * 60)) / 1000)

      document.querySelector('#days .value').textContent = days
      document.querySelector('#days .label').textContent = if days is 1 then ' Day' else ' Days'
      document.querySelector('#hours .value').textContent = hours
      document.querySelector('#hours .label').textContent = if hours is 1 then ' Hour' else ' Hours'
      document.querySelector('#minutes .value').textContent = minutes
      document.querySelector('#minutes .label').textContent = if minutes is 1 then ' Minute' else ' Minutes'
      document.querySelector('#seconds .value').textContent = seconds
      document.querySelector('#seconds .label').textContent = if seconds is 1 then ' Second' else ' Seconds'
    
    interval = setInterval(updateCountdown, 1000)
    updateCountdown() # Run immediately

# Update title if present
if title
  document.querySelector('h1').textContent = title
else
  # Fallback: Random Hello World
  messages = [
    "Hello World"
    "こんにちは世界"
  ]
  randomMessage = messages[Math.floor(Math.random() * messages.length)]
  params.set('title', randomMessage)
  unless title
    document.querySelector('h1').textContent = randomMessage

# Info toggle
infoToggle = document.getElementById('info-toggle')
infoCard = document.getElementById('info-card')

infoToggle.addEventListener 'click', ->
  infoCard.classList.toggle('hidden')
