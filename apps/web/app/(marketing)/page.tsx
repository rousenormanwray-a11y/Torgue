import Link from 'next/link';

export default function Landing() {
  return (
    <main>
      <section style={{ padding: '40px 16px', textAlign: 'center' }}>
        <h1>Shop Smarter. No Scams. No Stress.</h1>
        <p>Nigeria’s first marketplace that protects every kobo until you’re satisfied.</p>
        <p>Get your ₦500 welcome bonus today and shop scam-free with escrow. Choose item, money stays safe, release after delivery.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="#how-it-works" className="btn">See How It Works</Link>
          <Link href="/auth/signup" className="btn-primary">Claim My ₦500 Bonus</Link>
        </div>
      </section>
      <section id="how-it-works" style={{ padding: '24px 16px' }}>
        <h2>Simple. Safe. Stress-Free.</h2>
        <ol>
          <li>Browse thousands of verified sellers.</li>
          <li>Pay securely into TORQUE escrow (seller can’t touch it).</li>
          <li>Seller ships — you get tracking updates.</li>
          <li>Confirm delivery → TORQUE releases payment.</li>
        </ol>
        <p>“It’s like buying from a trusted friend who holds the money for you.”</p>
      </section>
      <section style={{ padding: '24px 16px' }}>
        <h2>Why Nigerians Love TORQUE</h2>
        <ul>
          <li>Over 50,000+ scam-free purchases already</li>
          <li>₦2.3m saved by shoppers in your city last month</li>
          <li>Verified sellers only, with real reviews</li>
          <li>24-hour refund promise if seller doesn’t deliver</li>
        </ul>
      </section>
      <section style={{ padding: '24px 16px' }}>
        <h2>Value</h2>
        <ul>
          <li><strong>Escrow Protection:</strong> Never worry about “money don go”.</li>
          <li><strong>Group Buying:</strong> Team up to unlock wholesale prices (save 20–60%).</li>
          <li><strong>Wallet & Instant Payments:</strong> Add once, shop everywhere.</li>
        </ul>
      </section>
      <section style={{ padding: '24px 16px' }}>
        <h2>Social Proof</h2>
        <blockquote>“I finally bought my iPhone without fear. Money stayed safe until I checked it was real.” — Michael, Lagos</blockquote>
        <blockquote>“From ₦80k/month on Instagram to ₦650k on TORQUE. Customers trust me now.” — Adaobi, Enugu</blockquote>
        <blockquote>“Hair straightener for ₦28k instead of ₦45k. Group buying saved me plenty.” — Grace, Kano</blockquote>
      </section>
      <section style={{ padding: '24px 16px', textAlign: 'center' }}>
        <h2>Don’t Wait — Deals Dey Hot</h2>
        <p>First 1,000 Nigerians get premium features free for life. ₦500 bonus expires in 7 days if unused.</p>
        <Link href="/auth/signup" className="btn-primary">Start Shopping Safely Today</Link>
      </section>
      <section style={{ padding: '24px 16px', textAlign: 'center' }}>
        <h2>Join the Smart Shoppers of Nigeria</h2>
        <p>Protected money, verified sellers, lowest prices through group buys.</p>
        <Link href="/auth/signup" className="btn-primary">Claim Your ₦500 & Shop Scam-Free</Link>
      </section>
    </main>
  );
}

