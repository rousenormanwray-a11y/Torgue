export default function HomeScreen() {
  const name = 'Friend';
  const city = 'Lagos';
  const balance = 2500;
  return (
    <main style={{ padding: 16 }}>
      <h1>Good morning, {name}</h1>
      <p>Shopping in {city}</p>
      <p>Wallet Balance: ₦{balance.toLocaleString()}</p>
      <input placeholder="What are you looking for today?" />
      <nav style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
        <a href="/search">Shop</a>
        <a href="/sell">Sell</a>
        <a href="/group-buying">Groups</a>
        <a href="/orders">Orders</a>
      </nav>
      <section>
        <h3>Trending in {city}</h3>
        <p>Hot deals about to sell out</p>
      </section>
      <section>
        <h3>For You</h3>
        <p>Based on your recent searches</p>
      </section>
      <section>
        <h3>Nearby Sellers</h3>
        <p>Trusted shops close to you</p>
      </section>
      <footer style={{ marginTop: 24 }}>Home | Explore | Sell | Orders | Me</footer>
    </main>
  );
}

