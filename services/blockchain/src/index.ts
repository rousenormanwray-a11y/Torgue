import express from 'express';

const app = express();
app.use(express.json());

app.get('/gas-price', (_req, res) => {
  return res.json({ chain: 'BSC', gwei: 3 });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4130;
app.listen(port, () => console.log(`blockchain service listening on :${port}`));

