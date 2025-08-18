import express from 'express';

// Minimal mock KYC endpoints for tiers
const TIERS = {
  T0: { requirements: ["phone_otp"] },
  T1: { requirements: ["bvn", "selfie", "address"] },
  T2: { requirements: ["nin", "bank_statement", "cac_certificate"] }
};

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/kyc/tiers', (_req, res) => res.json(TIERS));
app.post('/kyc/verify', (req, res) => {
  return res.json({ verified: true, tier: req.body?.tier ?? 'T0' });
});

const port = process.env.PORT || 4010;
app.listen(port, () => console.log(`auth service listening on :${port}`));

