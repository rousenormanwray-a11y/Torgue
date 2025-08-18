import express from 'express';

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
  return res.status(202).json({ accepted: true, count: Array.isArray(req.body) ? req.body.length : 1 });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4060;
app.listen(port, () => console.log(`analytics service listening on :${port}`));

