import express from 'express';

const app = express();
app.use(express.json());

app.post('/fiat-escrows', (req, res) => {
  return res.status(201).json({ id: 'fiat_escrow_123', ...req.body });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4040;
app.listen(port, () => console.log(`fiat-escrow service listening on :${port}`));

