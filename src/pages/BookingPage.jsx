import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm.jsx';
import { initializeTimes, updateTimes } from '../times.js';
import { submitAPI } from '../api.js';

export default function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(values) {
    setSubmitError('');
    try {
      if (submitAPI(values)) {
        navigate('/confirmed', { state: values });
      } else {
        setSubmitError('We could not save your reservation. Please try again.');
      }
    } catch {
      setSubmitError('Something went wrong. Please try again in a moment.');
    }
  }

  return (
    <section className="panel" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a table</h1>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={handleSubmit}
        submitError={submitError}
      />
    </section>
  );
}
