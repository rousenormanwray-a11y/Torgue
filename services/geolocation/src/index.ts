import express from 'express';

const app = express();
app.use(express.json());

app.get('/places', (req, res) => {
  const { q = '', near = 'lagos' } = req.query as Record<string, string>;
  return res.json({ query: q, near, results: [] });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4110;
app.listen(port, () => console.log(`geolocation service listening on :${port}`));

