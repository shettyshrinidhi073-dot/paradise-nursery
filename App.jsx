import React, { useState } from "react";
import "./App.css";
import ProductList from "./ProductList";
import AboutUs from "./AboutUs";

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <main className="app-container">
      {!showProducts ? (
        <>
          <section className="nursery-home">
            <div className="nursery-home__content">
              <p className="nursery-home__eyebrow">Welcome to</p>
              <h1>Paradise Nursery</h1>
              <p>
                Bring home the beauty of nature. Explore our collection of
                indoor plants and find the perfect green companion for your space.
              </p>
              <button
                type="button"
                onClick={() => setShowProducts(true)}
              >
                Get Started
              </button>
            </div>
          </section>
          <AboutUs />
        </>
      ) : (
        <section>
          <button
            type="button"
            className="back-to-home"
            onClick={() => setShowProducts(false)}
          >
            Back to Home
          </button>
          <ProductList />
        </section>
      )}
    </main>
  );
}

export default App;
