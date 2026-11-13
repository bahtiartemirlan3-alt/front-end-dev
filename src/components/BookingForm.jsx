import { useState } from 'react';
import { todayISO } from '../api.js';

const OCCASIONS = ['Birthday', 'Anniversary', 'Other'];
const MAX_GUESTS = 10;

/** Pure validation: returns an object of { field: message }. Empty object = valid. */
export function validate(values, availableTimes) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';

  if (!values.date) errors.date = 'Choose a date.';
  else if (values.date < todayISO()) errors.date = 'Choose today or a later date.';

  if (!values.time) {
    errors.time = availableTimes.length
      ? 'Choose a time.'
      : 'No tables are available on this date. Choose another date.';
  }

  const guests = Number(values.guests);
  if (!values.guests || !Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    errors.guests = `Enter a whole number of guests from 1 to ${MAX_GUESTS}.`;
  }
  return errors;
}

// Label + control + error message, wired together for screen readers.
function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="error" role="alert">{error}</p>}
    </div>
  );
}

export default function BookingForm({ availableTimes, dispatch, onSubmit, submitError }) {
  const [values, setValues] = useState({
    name: '', date: todayISO(), time: '', guests: '2', occasion: OCCASIONS[0], requests: '',
  });
  const [touched, setTouched] = useState({});

  const errors = validate(values, availableTimes);
  const isValid = Object.keys(errors).length === 0;
  // Show an error only after the field was visited.
  const shown = (field) => (touched[field] ? errors[field] : undefined);

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));
  const aria = (field) => ({
    'aria-invalid': Boolean(shown(field)),
    'aria-describedby': shown(field) ? `${field}-error` : undefined,
    onBlur: blur(field),
  });

  function handleDateChange(e) {
    const date = e.target.value;
    setValues((v) => ({ ...v, date, time: '' })); // old time may not exist on the new date
    dispatch({ type: 'UPDATE_TIMES', date });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, date: true, time: true, guests: true });
    if (isValid) onSubmit({ ...values, name: values.name.trim() });
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Table reservation form">
      <Field id="name" label="Name" error={shown('name')}>
        <input id="name" type="text" required autoComplete="name" value={values.name} onChange={set('name')} {...aria('name')} />
      </Field>

      <Field id="date" label="Date" error={shown('date')}>
        <input id="date" type="date" required min={todayISO()} value={values.date} onChange={handleDateChange} {...aria('date')} />
      </Field>

      <Field id="time" label="Time" error={shown('time')}>
        <select id="time" required value={values.time} onChange={set('time')} {...aria('time')}>
          <option value="">Select a time</option>
          {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      <Field id="guests" label="Number of guests" error={shown('guests')}>
        <input id="guests" type="number" required min="1" max={MAX_GUESTS} value={values.guests} onChange={set('guests')} {...aria('guests')} />
      </Field>

      <Field id="occasion" label="Occasion">
        <select id="occasion" value={values.occasion} onChange={set('occasion')}>
          {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>

      <Field id="requests" label="Special requests (optional)">
        <textarea id="requests" rows="3" maxLength="300" value={values.requests} onChange={set('requests')} />
      </Field>

      {submitError && <p className="error" role="alert">{submitError}</p>}

      <button type="submit" className="button" disabled={!isValid} aria-label="Reserve table">
        Reserve table
      </button>
    </form>
  );
}
