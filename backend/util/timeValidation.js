const dayjs = require("dayjs");

module.exports = {
  isRestaurantClosedDay,
  isRestaurantClosedTime,
};

// ======================================
// Check Closed Day
// ======================================
function isRestaurantClosedDay(
  closedDays,
  bookingDate
) {
  const selectedDay = dayjs(bookingDate).format(
    "dddd"
  );

  return closedDays.includes(selectedDay);
}

// ======================================
// Check Closed Time
// ======================================
function isRestaurantClosedTime(
  bookingTime,
  openingTime,
  closingTime
) {
  const booking = convertToMinutes(bookingTime);

  const open = convertToMinutes(openingTime);

  const close = convertToMinutes(closingTime);

  return booking < open || booking > close;
}

// ======================================
// Convert Time to Minutes
// Example: "10:30" → 630
// ======================================
function convertToMinutes(time) {
  const [hours, minutes] = time
    .split(":")
    .map(Number);

  return hours * 60 + minutes;
}