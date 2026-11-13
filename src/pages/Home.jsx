import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title">Little Lemon</h1>
        <p className="subtitle">Chicago</p>
        <p>Family-owned Mediterranean cooking with a modern twist. Fresh ingredients, bright flavours, a table waiting for you.</p>
        <Link className="button" to="/booking">Reserve a table</Link>
      </div>
    </section>
  );
}
