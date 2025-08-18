import express from 'express';
import cors from 'cors';

interface GroupPurchase {
  id: string;
  listing_id: string;
  initiator_id: string;
  target_quantity: number;
  current_quantity: number;
  discount_percent: number;
  expires_at: number; // epoch ms
  participants: string[]; // user ids or phones
  status: 'active' | 'completed' | 'expired';
}

const app = express();
app.use(cors({ origin: [/\.vercel\.app$/, /localhost:\d+$/], credentials: false }));
app.use(express.json());

// In-memory store for demo purposes
const groups = new Map<string, GroupPurchase>();

function computeStatus(g: GroupPurchase): GroupPurchase['status'] {
  const now = Date.now();
  if (now > g.expires_at && g.current_quantity < g.target_quantity) return 'expired';
  if (g.current_quantity >= g.target_quantity) return 'completed';
  return 'active';
}

app.post('/social/whatsapp/sync-catalog', (req, res) => {
  return res.json({ synced: true, business_id: req.body?.business_id });
});

// Create group purchase
app.post('/group-purchases', (req, res) => {
  const { listing_id, initiator_id, target_quantity, discount_percent, expires_at } = req.body || {};
  if (!listing_id || !initiator_id || !target_quantity || !discount_percent) {
    return res.status(400).json({ error: 'listing_id, initiator_id, target_quantity, discount_percent are required' });
  }
  const id = 'group_' + Math.random().toString(36).slice(2, 10);
  const group: GroupPurchase = {
    id,
    listing_id,
    initiator_id,
    target_quantity: Number(target_quantity),
    current_quantity: 1,
    discount_percent: Number(discount_percent),
    expires_at: expires_at ? Number(expires_at) : Date.now() + 1000 * 60 * 60 * 24, // default 24h
    participants: [initiator_id],
    status: 'active'
  };
  group.status = computeStatus(group);
  groups.set(id, group);
  return res.status(201).json(group);
});

// List group purchases
app.get('/group-purchases', (_req, res) => {
  return res.json({ items: Array.from(groups.values()).map(g => ({ ...g, status: computeStatus(g) })) });
});

// Get group purchase
app.get('/group-purchases/:id', (req, res) => {
  const g = groups.get(req.params.id);
  if (!g) return res.status(404).json({ error: 'not found' });
  g.status = computeStatus(g);
  return res.json(g);
});

// Join group purchase
app.post('/group-purchases/:id/join', (req, res) => {
  const g = groups.get(req.params.id);
  if (!g) return res.status(404).json({ error: 'not found' });
  g.status = computeStatus(g);
  if (g.status === 'expired') return res.status(400).json({ error: 'group expired' });
  if (g.status === 'completed') return res.status(400).json({ error: 'group already completed' });
  const userId = req.body?.user_id || req.body?.phone || 'anon_' + Math.random().toString(36).slice(2, 8);
  if (!g.participants.includes(userId)) {
    g.participants.push(userId);
    g.current_quantity = g.participants.length;
  }
  g.status = computeStatus(g);
  return res.json(g);
});

app.get('/discover/feed', (req, res) => {
  return res.json({ items: [], location: req.query.location });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4050;
app.listen(port, () => console.log(`social service listening on :${port}`));

