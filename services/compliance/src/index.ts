import express from 'express';

const app = express();
app.use(express.json());

app.post('/kyc/check', (req, res) => {
  return res.json({ risk: 'low', details: { name: req.body?.name ?? 'unknown' } });
});

app.get('/aml/watchlist', (_req, res) => res.json({ entries: [] }));

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4120;
app.listen(port, () => console.log(`compliance service listening on :${port}`));

