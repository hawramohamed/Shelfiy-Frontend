import './Landing.css';

const Landing = () => {
  return (
    <main className="landing">
      <section className="hero">
        <h1>Welcome to Shelfiy 📦</h1>
        <p className="subtitle">
          Your smart inventory management app — simple, scalable, and secure.
        </p>
        <div className="cta-buttons">
          <button onClick={() => window.location.href='/sign-up'}>Get Started</button>
          <button onClick={() => window.location.href='/sign-in'}>Sign In</button>
        </div>
      </section>

      <section className="features">
        <h2>Why Shelfiy?</h2>
        <ul>
          <li> Track products and suppliers with ease</li>
          <li> Clean, intuitive dashboard for quick insights</li>
        </ul>
      </section>
    </main>
  );
};

export default Landing;