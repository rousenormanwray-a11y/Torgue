import express from 'express';

const app = express();
app.use(express.json());

app.post('/moderate', (_req, res) => {
  return res.json({ ok: true, flags: [] });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4140;
app.listen(port, () => console.log(`ai-content service listening on :${port}`));

