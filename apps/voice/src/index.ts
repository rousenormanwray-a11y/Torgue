import express from 'express';

const app = express();
app.use(express.json());

// Placeholder Twilio webhook handlers
app.post('/voice/incoming', (req, res) => {
  return res.type('text/xml').send(`<Response><Say>Welcome to Torque</Say></Response>`);
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4090;
app.listen(port, () => console.log(`voice app listening on :${port}`));

