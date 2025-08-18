import fetch from 'cross-fetch';

export type ProviderName = 'monnify' | 'paystack';

export interface User { id: string; first_name: string; last_name: string; email: string; phone: string }

export interface ProviderCustomer {
  customerReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

export interface VirtualAccountOptions {
  reference?: string;
  preferredBanks?: string[];
  restrictions?: Record<string, unknown>;
}

export interface VirtualAccount {
  accountNumber: string;
  bankName: string;
  bankCode: string;
  accountName: string;
  providerReference?: string;
  customerReference?: string;
}

export type TransactionStatus = 'pending' | 'success' | 'failed';

export interface SettlementRequest {
  amountKobo: number;
  destinationAccountNumber: string;
  destinationBankCode: string;
  narration?: string;
}

export interface SettlementResponse { id: string; status: 'pending' | 'processing' | 'completed' | 'failed' }

export interface WebhookEvent {
  type: string;
  reference: string;
  amount: number;
  customerReference?: string;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  metadata?: unknown;
}

export interface PaymentProvider {
  name: ProviderName;
  createCustomer(user: User): Promise<ProviderCustomer>;
  createVirtualAccount(customer: ProviderCustomer, options?: VirtualAccountOptions): Promise<VirtualAccount>;
  listVirtualAccounts(customerRef: string): Promise<VirtualAccount[]>;
  verifyTransaction(reference: string): Promise<TransactionStatus>;
  initiateSettlement(request: SettlementRequest): Promise<SettlementResponse>;
  verifyWebhook(payload: any, signature: string): boolean;
  parseWebhookEvent(payload: any): WebhookEvent;
}

export class MonnifyService implements PaymentProvider {
  public readonly name = 'monnify' as const;
  constructor(
    private apiKey: string,
    private secretKey: string,
    private contractCode: string,
    private baseURL: string
  ) {}

  private async request(path: string, init: RequestInit & { json?: any } = {}) {
    const headers: Record<string, string> = { 'content-type': 'application/json' };
    const body = init.json ? JSON.stringify(init.json) : (init.body as BodyInit | null | undefined);
    const res = await fetch(`${this.baseURL}${path}`, { ...init, headers, body });
    if (!res.ok) throw new Error(`Monnify error: ${res.status}`);
    return res.json();
  }

  async createCustomer(user: User): Promise<ProviderCustomer> {
    const login = await this.request('/api/v1/auth/login', {
      method: 'POST',
      json: { apiKey: this.apiKey, secretKey: this.secretKey }
    });

    const token = login?.responseBody?.accessToken || login.accessToken;
    const customer = {
      customerReference: `TORQUE_${user.id}`,
      customerName: `${user.first_name} ${user.last_name}`.trim(),
      customerEmail: user.email,
      customerPhone: user.phone
    } satisfies ProviderCustomer;

    await this.request('/api/v2/bank-transfer/reserved-accounts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` } as any,
      json: customer
    });
    return customer;
  }

  async createVirtualAccount(customer: ProviderCustomer, options: VirtualAccountOptions = {}): Promise<VirtualAccount> {
    const accountData = {
      accountReference: options.reference || `VA_${Date.now()}`,
      accountName: customer.customerName,
      currencyCode: 'NGN',
      contractCode: this.contractCode,
      customerEmail: customer.customerEmail,
      customerName: customer.customerName,
      getAllAvailableBanks: true,
      preferredBanks: options.preferredBanks || ['044', '057', '033'],
      ...options.restrictions
    };
    const res = await this.request('/api/v2/bank-transfer/reserved-accounts', {
      method: 'POST',
      json: accountData
    });
    const body = res?.responseBody || res;
    return {
      accountNumber: body?.accountNumber || body?.accounts?.[0]?.accountNumber,
      bankName: body?.bankName || body?.accounts?.[0]?.bankName,
      bankCode: body?.bankCode || body?.accounts?.[0]?.bankCode,
      accountName: body?.accountName || customer.customerName,
      providerReference: body?.accountReference,
      customerReference: customer.customerReference
    } as VirtualAccount;
  }

  async listVirtualAccounts(_customerRef: string): Promise<VirtualAccount[]> {
    // Placeholder: Monnify has listing via references; implement when wiring real API
    return [];
  }

  async verifyTransaction(_reference: string): Promise<TransactionStatus> {
    return 'success';
  }

  async initiateSettlement(_request: SettlementRequest): Promise<SettlementResponse> {
    return { id: `set_${Date.now()}`, status: 'pending' };
  }

  verifyWebhook(payload: any, signature: string): boolean {
    // Simple placeholder HMAC (implement real SHA512 based on provider docs)
    const json = JSON.stringify(payload);
    const computed = awaitHmac(this.secretKey, json);
    return computed === signature;
  }

  parseWebhookEvent(payload: any): WebhookEvent {
    return {
      type: payload.eventType,
      reference: payload.transactionReference,
      amount: Math.round((payload.amountPaid || payload.amount) * 100),
      customerReference: payload.product?.reference,
      status: mapMonnifyStatus(payload.paymentStatus),
      metadata: payload
    };
  }
}

export class PaystackService implements PaymentProvider {
  public readonly name = 'paystack' as const;
  constructor(private secretKey: string, private baseURL: string) {}
  async createCustomer(user: User): Promise<ProviderCustomer> {
    return {
      customerReference: `TORQUE_${user.id}`,
      customerName: `${user.first_name} ${user.last_name}`.trim(),
      customerEmail: user.email,
      customerPhone: user.phone
    };
  }
  async createVirtualAccount(customer: ProviderCustomer): Promise<VirtualAccount> {
    return {
      accountNumber: '0000000000',
      bankName: 'Paystack Bank',
      bankCode: '000',
      accountName: customer.customerName,
      customerReference: customer.customerReference
    };
  }
  async listVirtualAccounts(_customerRef: string): Promise<VirtualAccount[]> { return []; }
  async verifyTransaction(_reference: string): Promise<TransactionStatus> { return 'success'; }
  async initiateSettlement(_request: SettlementRequest): Promise<SettlementResponse> { return { id: 'stub', status: 'pending' }; }
  verifyWebhook(_payload: any, _signature: string): boolean { return true; }
  parseWebhookEvent(payload: any): WebhookEvent { return { type: payload.event, reference: payload.reference, amount: payload.amount, status: 'completed' }; }
}

export class PaymentProviderFactory {
  static create(provider: ProviderName): PaymentProvider {
    switch (provider) {
      case 'monnify':
        return new MonnifyService(
          process.env.MONNIFY_API_KEY || '',
          process.env.MONNIFY_SECRET_KEY || '',
          process.env.MONNIFY_CONTRACT_CODE || '',
          process.env.MONNIFY_BASE_URL || 'https://api.monnify.com'
        );
      case 'paystack':
        return new PaystackService(
          process.env.PAYSTACK_SECRET_KEY || '',
          process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co'
        );
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}

function mapMonnifyStatus(status: string | undefined): WebhookEvent['status'] {
  switch ((status || '').toLowerCase()) {
    case 'paid':
    case 'success':
      return 'completed';
    case 'failed':
      return 'failed';
    default:
      return 'pending';
  }
}

// Minimal HMAC placeholder (NOT secure; replace with crypto.subtle/Node crypto)
function awaitHmac(_key: string, payload: string): string {
  let hash = 0;
  for (let i = 0; i < payload.length; i++) hash = (hash * 31 + payload.charCodeAt(i)) >>> 0;
  return hash.toString(16);
}

