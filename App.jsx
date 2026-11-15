import React from "react";
import "./App.css";

function App() {
  const handleGetStarted = () => {
    window.location.href = "#products";
  };

  return (
    <main>
      <section className="nursery-home">
        <div className="nursery-home__content">
          <p className="nursery-home__eyebrow">Welcome to</p>
          <h1>Paradise Nursery</h1>
          <p>Bring home the beauty of nature. Explore our collection of indoor plants and find the perfect green companion for your space.</p>
          <button type="button" onClick={handleGetStarted}>Get Started</button>
        </div>
      </section>
    </main>
  );
}

export default App;
