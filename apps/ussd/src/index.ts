import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: false }));

// Minimal USSD flow mock
app.post('/ussd', (req, res) => {
  const { text = '' } = req.body ?? {};
  if (!text) return res.send('CON Welcome to TORQUE\n1. Buy\n2. Sell');
  if (text === '1') return res.send('CON Enter product code');
  if (text === '2') return res.send('CON Enter listing title');
  return res.send('END Goodbye');
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4080;
app.listen(port, () => console.log(`ussd app listening on :${port}`));

