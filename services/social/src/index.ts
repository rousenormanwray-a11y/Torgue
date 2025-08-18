import express from 'express';

const app = express();
app.use(express.json());

app.post('/social/whatsapp/sync-catalog', (req, res) => {
  return res.json({ synced: true, business_id: req.body?.business_id });
});

app.post('/group-purchases', (req, res) => {
  const id = 'group_' + Math.random().toString(36).slice(2, 8);
  return res.status(201).json({ id, ...req.body });
});

app.get('/discover/feed', (req, res) => {
  return res.json({ items: [], location: req.query.location });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4050;
app.listen(port, () => console.log(`social service listening on :${port}`));

