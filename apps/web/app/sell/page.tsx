"use client";
import * as React from 'react';

export default function SellPage() {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [location, setLocation] = React.useState('');
  return (
    <main style={{ padding: 16 }}>
      <h1>Sell With Confidence</h1>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <p>Buyers see your verified profile + escrow protection</p>
      <button>Post My Item</button>
      <section style={{ marginTop: 16 }}>
        <h2>Listing Live!</h2>
        <p>Your buyers know their money is safe. Sell faster with escrow protection.</p>
      </section>
    </main>
  );
}

