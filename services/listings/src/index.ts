import express from 'express';

const app = express();
app.use(express.json());

app.get('/search', (_req, res) => {
  return res.json({ results: [], total: 0 });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4030;
app.listen(port, () => console.log(`listings service listening on :${port}`));

