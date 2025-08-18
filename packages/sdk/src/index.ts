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

