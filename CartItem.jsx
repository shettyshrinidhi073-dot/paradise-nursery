import React from "react";

function CartItem({
  cartItems = [],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onContinueShopping = () => {},
  onCheckout = () => {}
}) {
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="shopping-cart">
        <h1>Your Shopping Cart</h1>
        <p>Your cart is currently empty.</p>
        <button type="button" onClick={onContinueShopping}>Continue Shopping</button>
      </main>
    );
  }

  return (
    <main className="shopping-cart">
      <h1>Your Shopping Cart</h1>
      <div className="shopping-cart__items">
        {cartItems.map((item) => (
          <article className="cart-row" key={item.id}>
            {item.image && <img src={item.image} alt={item.name} />}
            <div className="cart-row__info">
              <h2>{item.name}</h2>
              <p>${Number(item.price).toFixed(2)} each</p>
              <div className="cart-row__quantity">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${item.name}`}
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >−</button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${item.name}`}
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >+</button>
              </div>
            </div>
            <strong>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</strong>
            <button type="button" onClick={() => onRemoveItem(item.id)}>Remove</button>
          </article>
        ))}
      </div>

      <section className="shopping-cart__summary">
        <h2>Cart Total: ${total.toFixed(2)}</h2>
        <button type="button" onClick={onContinueShopping}>Continue Shopping</button>
        <button type="button" onClick={onCheckout}>Checkout</button>
      </section>
    </main>
  );
}

export default CartItem;
