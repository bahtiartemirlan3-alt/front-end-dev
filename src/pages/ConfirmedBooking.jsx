import { Link, useLocation } from 'react-router-dom';

export default function ConfirmedBooking() {
  const booking = useLocation().state;

  // Edge case: page opened directly, without a booking.
  if (!booking) {
    return (
      <section className="panel">
        <h1>No reservation found</h1>
        <p>Make a reservation first.</p>
        <Link className="button" to="/booking">Reserve a table</Link>
      </section>
    );
  }

  return (
    <section className="panel" aria-labelledby="confirmed-title">
      <h1 id="confirmed-title">Your table is booked</h1>
      <p role="status">
        Thank you, {booking.name}. We expect {booking.guests} {Number(booking.guests) === 1 ? 'guest' : 'guests'} on {booking.date} at {booking.time}.
      </p>
      <Link className="button" to="/">Back to home</Link>
    </section>
  );
}
