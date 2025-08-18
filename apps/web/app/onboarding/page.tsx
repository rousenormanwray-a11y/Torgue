"use client";
import * as React from 'react';

export default function Onboarding() {
  const [step, setStep] = React.useState(1);
  return (
    <main style={{ padding: 16, maxWidth: 560, margin: '0 auto' }}>
      {step === 1 && (
        <section>
          <h1>Safe Shopping Every Time</h1>
          <p>Your payment is locked until you confirm delivery</p>
          <button onClick={() => setStep(2)}>Next</button>
        </section>
      )}
      {step === 2 && (
        <section>
          <h1>Join 50,000+ Nigerians</h1>
          <p>Real people, verified reviews, scam-free protection</p>
          <button onClick={() => setStep(3)}>Next</button>
        </section>
      )}
      {step === 3 && (
        <section>
          <h1>Shop by Voice</h1>
          <p>Example: “Black shoes, size 40, under 8k in Lagos”</p>
          <button onClick={() => setStep(1)}>Get Started</button>
        </section>
      )}
    </main>
  );
}

