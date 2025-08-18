import express from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

const CreateCryptoEscrowSchema = z.object({
  buyer_wallet: z.string(),
  seller_wallet: z.string(),
  token: z.string(),
  amount_crypto: z.string(),
  blockchain: z.string(),
  auto_convert_naira: z.boolean().optional()
});

app.post('/crypto-escrows', (req, res) => {
  const parsed = CreateCryptoEscrowSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  // Placeholder response
  return res.status(201).json({ id: 'escrow_123', ...parsed.data });
});

app.post('/crypto-escrows/:id/connect-wallet', (req, res) => {
  const { id } = req.params;
  const { wallet_provider, signature } = req.body ?? {};
  if (!wallet_provider || !signature) {
    return res.status(400).json({ error: 'wallet_provider and signature are required' });
  }
  return res.json({ id, connected: true, wallet_provider });
});

app.post('/crypto-escrows/:id/convert', (req, res) => {
  const { id } = req.params;
  const { target_currency, exchange } = req.body ?? {};
  if (!target_currency || !exchange) {
    return res.status(400).json({ error: 'target_currency and exchange are required' });
  }
  return res.json({ id, converted: true, target_currency, exchange });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4020;
app.listen(port, () => console.log(`crypto-escrow service listening on :${port}`));

