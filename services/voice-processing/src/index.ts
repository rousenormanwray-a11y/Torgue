import express from 'express';

const app = express();
app.use(express.json());

app.post('/transcribe', (_req, res) => {
  return res.json({ text: 'transcription placeholder', lang: 'pidgin' });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4100;
app.listen(port, () => console.log(`voice-processing service listening on :${port}`));

