export default function Checkout() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Your Cart (2 items)</h1>
      <p>Subtotal: ₦203,500</p>
      <p>TORQUE holds your money safe until you confirm delivery</p>
      <h2>Proceed to Checkout</h2>
      <section>
        <h3>Payment Methods</h3>
        <ul>
          <li>Wallet</li>
          <li>Card</li>
          <li>Bank Transfer</li>
        </ul>
        <p>Delivery Address: [Saved address]</p>
        <p>Seller gets paid only when you confirm delivery</p>
        <button>Pay Securely</button>
      </section>
      <section>
        <h3>Order Placed!</h3>
        <p>Money is locked in escrow until you receive your items</p>
        <button>Track My Order</button>
      </section>
    </main>
  );
}

