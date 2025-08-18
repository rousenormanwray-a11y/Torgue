import fetch from 'cross-fetch';

export interface CreateCryptoEscrowRequest {
  buyer_wallet: string;
  seller_wallet: string;
  token: string;
  amount_crypto: string;
  blockchain: string;
  auto_convert_naira?: boolean;
}

export async function createCryptoEscrow(baseUrl: string, payload: CreateCryptoEscrowRequest) {
  const response = await fetch(`${baseUrl}/crypto-escrows`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Failed: ${response.status}`);
  return response.json();
}

// Group purchase SDK
export interface CreateGroupPurchaseRequest {
  listing_id: string;
  initiator_id: string;
  target_quantity: number;
  discount_percent: number;
  expires_at?: number;
}

export async function createGroupPurchase(socialBaseUrl: string, payload: CreateGroupPurchaseRequest) {
  const response = await fetch(`${socialBaseUrl}/group-purchases`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Failed: ${response.status}`);
  return response.json();
}

export async function getGroupPurchase(socialBaseUrl: string, id: string) {
  const response = await fetch(`${socialBaseUrl}/group-purchases/${id}`);
  if (!response.ok) throw new Error(`Failed: ${response.status}`);
  return response.json();
}

export async function joinGroupPurchase(socialBaseUrl: string, id: string, user: { user_id?: string; phone?: string }) {
  const response = await fetch(`${socialBaseUrl}/group-purchases/${id}/join`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(user)
  });
  if (!response.ok) throw new Error(`Failed: ${response.status}`);
  return response.json();
}


