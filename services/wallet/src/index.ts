import express from 'express';
import { z } from 'zod';
import { PaymentProviderFactory, type ProviderName } from '@torque/wallet-core';

const app = express();
app.use(express.json());

const InitializeSchema = z.object({
  provider: z.enum(['monnify', 'paystack']).optional(),
  preferred_banks: z.array(z.string()).optional()
});

app.post('/api/wallet/initialize', (req, res) => {
  const parsed = InitializeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const providerName: ProviderName = (parsed.data.provider || (process.env.PRIMARY_PAYMENT_PROVIDER as ProviderName) || 'monnify');
  const provider = PaymentProviderFactory.create(providerName);
  return res.status(201).json({ provider: provider.name, initialized: true });
});

app.get('/api/wallet/details', (_req, res) => {
  return res.json({ balance_kobo: 0, reserved_balance_kobo: 0, available_balance_kobo: 0 });
});

app.get('/api/wallet/transactions', (req, res) => {
  const { page = '1', limit = '20', type } = req.query as Record<string, string>;
  return res.json({ page: Number(page), limit: Number(limit), type: type || 'all', items: [] });
});

const WithdrawSchema = z.object({
  amount: z.number().int().positive(),
  bank_account: z.string(),
  bank_code: z.string(),
  narration: z.string().optional()
});

app.post('/api/wallet/withdraw', (req, res) => {
  const parsed = WithdrawSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  return res.status(202).json({ reference: 'wd_' + Date.now(), status: 'pending' });
});

app.get('/api/wallet/virtual-accounts', (_req, res) => {
  return res.json({ accounts: [] });
});

const CreateVASchema = z.object({ bank_codes: z.array(z.string()).optional(), restrictions: z.record(z.any()).optional() });
app.post('/api/wallet/virtual-accounts', (req, res) => {
  const parsed = CreateVASchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  return res.status(201).json({ created: true, preferred_banks: parsed.data.bank_codes || [] });
});

// Webhook handlers
app.post('/webhooks/monnify', (req, res) => {
  const signature = (req.headers['monnify-signature'] || req.headers['x-monnify-signature']) as string | undefined;
  const service = PaymentProviderFactory.create('monnify');
  const valid = service.verifyWebhook(req.body, signature || '');
  if (!valid) return res.status(400).json({ error: 'invalid signature' });
  const event = service.parseWebhookEvent(req.body);
  return res.json({ processed: true, event });
});

app.post('/webhooks/paystack', (req, res) => {
  const service = PaymentProviderFactory.create('paystack');
  const valid = service.verifyWebhook(req.body, (req.headers['x-paystack-signature'] as string) || '');
  if (!valid) return res.status(400).json({ error: 'invalid signature' });
  const event = service.parseWebhookEvent(req.body);
  return res.json({ processed: true, event });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4150;
app.listen(port, () => console.log(`wallet service listening on :${port}`));

