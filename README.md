# Little Lemon – Table Reservation App

Front-end capstone project: a React web app for the Little Lemon restaurant with a table booking form.

## Features
- Home page and booking page with client-side routing (React Router)
- Booking form: name, date, time, number of guests (1–10), occasion, special requests
- Validation: required fields, no past dates, guests 1–10 (whole numbers), clear error messages
- Available times update when the date changes (`useReducer` + mock API)
- Confirmation page; friendly message if it is opened without a booking
- Accessibility: semantic HTML (`header`, `nav`, `main`, `footer`), labels for every field, `aria-invalid`, `aria-describedby`, `role="alert"` errors, skip link, visible keyboard focus, `lang` attribute
- Responsive layout (mobile first, flexible widths)
- Unit tests with Vitest and React Testing Library

## Requirements
Node.js 18 or newer.

## Setup
```bash
git clone <your-repository-url>
cd little-lemon
npm install
npm run dev      # start dev server at http://localhost:5173
npm test         # run unit tests
npm run build    # production build in /dist
```

## Project structure
```
src/
  api.js                  mock API: fetchAPI, submitAPI, todayISO
  times.js                reducer helpers: initializeTimes, updateTimes
  App.jsx                 layout and routes
  components/BookingForm  form, validation, tests
  pages/                  Home, BookingPage, ConfirmedBooking
  styles.css              styles
```

## Edge cases handled
- Past or empty date, invalid guest count, no time chosen
- A date with no free tables shows an explanatory message
- Changing the date resets the selected time
- Failed submission shows an error message
- Unknown URL shows a "Page not found" page

## Notes
The booking API is a mock (`src/api.js`). Replace it with real requests when a backend is available.
