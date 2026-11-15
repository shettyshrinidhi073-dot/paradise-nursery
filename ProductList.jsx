import React, { useState } from "react";

const plants = [
  { id: 1, name: "Snake Plant", category: "Air Purifying", price: 18, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=600" },
  { id: 2, name: "Peace Lily", category: "Flowering", price: 22, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=600" },
  { id: 3, name: "Monstera", category: "Indoor", price: 28, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600" },
  { id: 4, name: "Aloe Vera", category: "Succulents", price: 14, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600" },
  { id: 5, name: "Jade Plant", category: "Succulents", price: 16, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600" },
  { id: 6, name: "Pothos", category: "Air Purifying", price: 12, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600" }
];

function ProductList({ onAddToCart = () => {} }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(plants.map((plant) => plant.category))];
  const visiblePlants =
    selectedCategory === "All"
      ? plants
      : plants.filter((plant) => plant.category === selectedCategory);

  return (
    <main className="product-list" id="products">
      <header className="product-list__header">
        <p>GROW YOUR GREEN SPACE</p>
        <h1>Our Plants</h1>
        <span>Choose a plant to bring a little more nature into your home.</span>
      </header>

      <nav className="product-list__filters" aria-label="Filter plants by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <section className="product-list__grid">
        {visiblePlants.map((plant) => (
          <article className="plant-card" key={plant.id}>
            <img src={plant.image} alt={plant.name} />
            <div className="plant-card__details">
              <p>{plant.category}</p>
              <h2>{plant.name}</h2>
              <strong>${plant.price.toFixed(2)}</strong>
              <button type="button" onClick={() => onAddToCart(plant)}>
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default ProductList;
