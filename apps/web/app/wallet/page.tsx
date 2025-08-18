export default function WalletPage() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Wallet</h1>
      <p>Balance: ₦2,500</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button>Add Money</button>
        <button>Withdraw</button>
        <button>History</button>
      </div>
      <section style={{ marginTop: 16 }}>
        <h3>Wallet Explainer</h3>
        <p>Think of TORQUE Wallet like your personal shopping account. Add once, spend anytime, no failed transfers.</p>
      </section>
    </main>
  );
}

