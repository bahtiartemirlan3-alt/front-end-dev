// Mock booking API. Replace with real HTTP calls when a backend exists.

/** Today's date as YYYY-MM-DD in the user's local time zone. */
export function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

// Small seeded generator: the same date always yields the same slots.
function seededRandom(seed) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return () => (s = (s * a) % m) / m;
}

/**
 * Returns available time slots for a date ("YYYY-MM-DD").
 * Invalid input returns an empty list instead of throwing.
 */
export function fetchAPI(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const random = seededRandom(Number(date.slice(-2)));
  const slots = [];
  for (let hour = 17; hour <= 23; hour++) {
    if (random() < 0.5) slots.push(`${hour}:00`);
    if (random() < 0.5) slots.push(`${hour}:30`);
  }
  return slots;
}

/** Pretends to save a reservation. Returns true on success. */
export function submitAPI(formData) {
  return Boolean(formData);
}
