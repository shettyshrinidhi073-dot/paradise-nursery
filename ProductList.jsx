import React, { useMemo, useState } from "react";

const plantProducts = [
  { id: 1, name: "Snake Plant", category: "Air Purifying", price: 18, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=600", description: "A hardy indoor plant that adds a fresh touch to your room." },
  { id: 2, name: "Peace Lily", category: "Air Purifying", price: 22, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=600", description: "An elegant leafy plant for bright indoor spaces." },
  { id: 3, name: "Monstera", category: "Indoor Plants", price: 28, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600", description: "A tropical favourite with distinctive split leaves." },
  { id: 4, name: "Aloe Vera", category: "Succulents", price: 14, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600", description: "A low-maintenance succulent for a sunny spot." },
  { id: 5, name: "Jade Plant", category: "Succulents", price: 16, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600", description: "A compact succulent with rounded green leaves." },
  { id: 6, name: "Golden Pothos", category: "Indoor Plants", price: 12, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600", description: "A trailing plant that looks lovely on shelves." },
  { id: 7, name: "Rubber Plant", category: "Indoor Plants", price: 25, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600", description: "Glossy leaves make this plant a striking feature." },
  { id: 8, name: "Areca Palm", category: "Air Purifying", price: 30, image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600", description: "A graceful palm that brings a tropical feel indoors." },
  { id: 9, name: "Echeveria", category: "Succulents", price: 10, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600", description: "A small rosette-shaped succulent." }
];

function ProductList({
  onAddToCart = () => {},
  cartItems = [],
  products = plantProducts
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedIds, setAddedIds] = useState([]);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((plant) => plant.category))],
    [products]
  );

  const visiblePlants =
    selectedCategory === "All"
      ? products
      : products.filter((plant) => plant.category === selectedCategory);

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const handleAdd = (plant) => {
    onAddToCart(plant);
    setAddedIds((current) =>
      current.includes(plant.id) ? current : [...current, plant.id]
    );
  };

  return (
    <main className="product-list" id="products" style={{ padding: "32px 5%", color: "#26352b" }}>
      <header className="product-list__header" style={{ textAlign: "center", marginBottom: 28 }}>
        <p style={{ letterSpacing: 2, color: "#527b58" }}>GROW YOUR GREEN SPACE</p>
        <h1>Our Plants</h1>
        <p>Choose your favourite plants and bring nature into your home.</p>
        <p aria-live="polite">Items in cart: <strong>{cartCount}</strong></p>
      </header>

      <nav className="product-list__filters" aria-label="Filter plants by category"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 28 }}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={selectedCategory === category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
            style={{ padding: "9px 16px", borderRadius: 20, border: "1px solid #527b58", cursor: "pointer" }}
          >
            {category}
          </button>
        ))}
      </nav>

      {visiblePlants.length === 0 ? (
        <p>No plants found in this category.</p>
      ) : (
        <section className="product-list__grid" aria-label="Plant products"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
          {visiblePlants.map((plant) => {
            const alreadyInCart = cartItems.some((item) => item.id === plant.id);
            const wasAdded = addedIds.includes(plant.id) || alreadyInCart;

            return (
              <article className="plant-card" key={plant.id}
                style={{ border: "1px solid #dce5dc", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
                <img src={plant.image} alt={plant.name}
                  style={{ width: "100%", height: 190, objectFit: "cover" }} />
                <div className="plant-card__details" style={{ padding: 16 }}>
                  <p style={{ color: "#527b58", fontSize: 13 }}>{plant.category}</p>
                  <h2 style={{ fontSize: 20 }}>{plant.name}</h2>
                  <p>{plant.description}</p>
                  <strong style={{ display: "block", margin: "12px 0" }}>${plant.price.toFixed(2)}</strong>
                  <button
                    type="button"
                    disabled={wasAdded}
                    onClick={() => handleAdd(plant)}
                    style={{ width: "100%", padding: 11, border: 0, borderRadius: 6, background: wasAdded ? "#8b9b8d" : "#2f6b3c", color: "#fff", cursor: wasAdded ? "default" : "pointer" }}
                  >
                    {wasAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export { plantProducts };
export default ProductList;
