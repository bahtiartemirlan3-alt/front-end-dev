import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BookingPage from './pages/BookingPage.jsx';
import ConfirmedBooking from './pages/ConfirmedBooking.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <Link to="/" className="logo" aria-label="Little Lemon, home">Little Lemon</Link>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/booking">Reservations</NavLink>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
          <Route path="*" element={<section className="panel"><h1>Page not found</h1><Link to="/">Back to home</Link></section>} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>Little Lemon · 123 Lemon Street, Chicago</p>
        <p><a href="tel:+13125550123">(312) 555-0123</a></p>
      </footer>
    </>
  );
}
