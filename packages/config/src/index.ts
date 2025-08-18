export const NIGERIA_NETWORK_OPTIMIZATION = {
  image_compression: "webp_75_quality",
  api_compression: "gzip",
  offline_mode: "service_worker_cache",
  progressive_loading: "above_fold_first"
} as const;

export const LANGUAGE_SUPPORT = {
  languages: ["english", "pidgin", "hausa", "yoruba", "igbo"],
  voice_recognition: ["pidgin_accent", "nigerian_english"],
  text_to_speech: "african_accent_optimized"
} as const;

export const PAYMENT_PRIORITY = {
  priority_order: [
    "bank_transfer",
    "ussd",
    "pos_agents",
    "mobile_money",
    "crypto",
    "cards"
  ]
} as const;

