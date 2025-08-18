export const APP_NAME = "TORQUE";

export type KycTier = "T0" | "T1" | "T2";

export interface KycConfigTier {
  requirements: string[];
  limits: string;
  crypto_limit: string;
  features?: string[];
}

export const KYC_CONFIG: Record<KycTier, KycConfigTier> = {
  T0: {
    requirements: ["phone_otp"],
    limits: "₦50,000/month",
    crypto_limit: "$100/month"
  },
  T1: {
    requirements: ["bvn", "selfie", "address"],
    limits: "₦2,000,000/month",
    crypto_limit: "$5,000/month"
  },
  T2: {
    requirements: ["nin", "bank_statement", "cac_certificate"],
    limits: "unlimited",
    crypto_limit: "unlimited",
    features: ["business_dashboard", "bulk_payouts", "api_access"]
  }
};

