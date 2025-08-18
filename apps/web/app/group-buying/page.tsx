"use client";
import * as React from 'react';
import { createGroupPurchase, getGroupPurchase, joinGroupPurchase } from '@torque/sdk';

const SOCIAL_URL = process.env.NEXT_PUBLIC_SOCIAL_URL || 'http://localhost:4050';

export default function GroupBuyingPage() {
  const [groupId, setGroupId] = React.useState<string>('');
  const [group, setGroup] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  async function createDemo() {
    setLoading(true);
    try {
      const res = await createGroupPurchase(SOCIAL_URL, {
        listing_id: 'demo-listing-1',
        initiator_id: 'user_demo',
        target_quantity: 10,
        discount_percent: 15
      });
      setGroupId(res.id);
      setGroup(res);
    } finally {
      setLoading(false);
    }
  }

  async function fetchGroup() {
    if (!groupId) return;
    setLoading(true);
    try {
      const res = await getGroupPurchase(SOCIAL_URL, groupId);
      setGroup(res);
    } finally {
      setLoading(false);
    }
  }

  async function join() {
    if (!groupId) return;
    setLoading(true);
    try {
      const res = await joinGroupPurchase(SOCIAL_URL, groupId, { user_id: 'user_' + Math.random().toString(36).slice(2, 6) });
      setGroup(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Group Buying</h1>
      <p>Team up with other Nigerians to unlock wholesale prices — save 20–60%.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={createDemo} disabled={loading}>Create Demo Group</button>
        <input placeholder="Group ID" value={groupId} onChange={(e) => setGroupId(e.target.value)} />
        <button onClick={fetchGroup} disabled={loading || !groupId}>Load Group</button>
        <button onClick={join} disabled={loading || !groupId}>Join Group</button>
      </div>
      {group && (
        <div style={{ marginTop: 16 }}>
          <h3>Deal</h3>
          <p>Target: {group.target_quantity}</p>
          <p>Joined: {group.current_quantity}</p>
          <p>Discount: {group.discount_percent}%</p>
          <p>Status: {group.status}</p>
          <p>Closes: {new Date(group.expires_at).toLocaleString()}</p>
        </div>
      )}
    </main>
  );
}

