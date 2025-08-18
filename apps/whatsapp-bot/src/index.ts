import express from 'express';

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  return res.json({ received: true });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4070;
app.listen(port, () => console.log(`whatsapp-bot listening on :${port}`));

