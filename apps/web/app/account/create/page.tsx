"use client";
import * as React from 'react';

export default function CreateAccount() {
  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState('');
  const [step, setStep] = React.useState<'phone' | 'verify' | 'profile' | 'bonus'>('phone');
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');

  return (
    <main style={{ padding: 16, maxWidth: 560, margin: '0 auto' }}>
      {step === 'phone' && (
        <section>
          <h1>Let’s Get You Started</h1>
          <p>We’ll text you a quick code</p>
          <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep('verify')}>Next</button>
            <button onClick={() => setStep('profile')}>Do this later</button>
          </div>
        </section>
      )}
      {step === 'verify' && (
        <section>
          <h1>Enter Your Code</h1>
          <p>We sent a 6-digit code to {phone || '[phone number]'}</p>
          <input placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value)} />
          <button onClick={() => setStep('profile')}>Verify</button>
        </section>
      )}
      {step === 'profile' && (
        <section>
          <h1>Tell Us About You</h1>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <p>Location helps us show local sellers and deals</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep('bonus')}>Finish</button>
            <button onClick={() => setStep('bonus')}>Skip for now</button>
          </div>
        </section>
      )}
      {step === 'bonus' && (
        <section>
          <h1>Welcome Gift: ₦500</h1>
          <p>We’ve added ₦500 to your wallet. No conditions—spend it now.</p>
          <button onClick={() => (window.location.href = '/')}>Start Shopping</button>
        </section>
      )}
    </main>
  );
}

