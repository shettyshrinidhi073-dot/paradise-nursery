import React from "react";

function CartItem({
  cartItems = [],
  items,
  onUpdateQuantity,
  updateQuantity,
  onRemoveItem,
  removeItem,
  onContinueShopping = () => {},
  onCheckout = () => {}
}) {
  const products = Array.isArray(items) ? items : cartItems;
  const updateHandler = onUpdateQuantity || updateQuantity || (() => {});
  const removeHandler = onRemoveItem || removeItem || (() => {});

  const total = products.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const totalItems = products.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const handleQuantityChange = (item, nextQuantity) => {
    if (nextQuantity <= 0) {
      removeHandler(item.id);
    } else {
      updateHandler(item.id, nextQuantity);
    }
  };

  if (products.length === 0) {
    return (
      <main className="shopping-cart" style={{ maxWidth: 900, margin: "40px auto", padding: 24, textAlign: "center" }}>
        <h1>Your Shopping Cart</h1>
        <p>Your cart is currently empty.</p>
        <button type="button" onClick={onContinueShopping}>Continue Shopping</button>
      </main>
    );
  }

  return (
    <main className="shopping-cart" style={{ maxWidth: 1000, margin: "30px auto", padding: 24, color: "#26352b" }}>
      <header>
        <h1>Your Shopping Cart</h1>
        <p>{totalItems} item(s) in your cart</p>
      </header>

      <div className="shopping-cart__items">
        {products.map((item) => (
          <article className="cart-row" key={item.id}
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18, padding: "18px 0", borderBottom: "1px solid #dce5dc" }}>
            {item.image && (
              <img src={item.image} alt={item.name}
                style={{ width: 110, height: 100, objectFit: "cover", borderRadius: 8 }} />
            )}
            <div className="cart-row__info" style={{ flex: "1 1 180px" }}>
              <h2>{item.name}</h2>
              <p>Price: ${Number(item.price || 0).toFixed(2)}</p>
              <div className="cart-row__quantity" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button type="button" aria-label={`Decrease quantity of ${item.name}`}
                  onClick={() => handleQuantityChange(item, Number(item.quantity || 1) - 1)}>−</button>
                <span aria-live="polite">{item.quantity}</span>
                <button type="button" aria-label={`Increase quantity of ${item.name}`}
                  onClick={() => handleQuantityChange(item, Number(item.quantity || 0) + 1)}>+</button>
              </div>
            </div>
            <strong>Subtotal: ${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}</strong>
            <button type="button" onClick={() => removeHandler(item.id)}>Remove</button>
          </article>
        ))}
      </div>

      <section className="shopping-cart__summary" style={{ textAlign: "right", paddingTop: 24 }}>
        <h2>Cart Total: ${total.toFixed(2)}</h2>
        <button type="button" onClick={onContinueShopping} style={{ marginRight: 10 }}>
          Continue Shopping
        </button>
        <button type="button" onClick={onCheckout}>Checkout</button>
      </section>
    </main>
  );
}

export default CartItem;
