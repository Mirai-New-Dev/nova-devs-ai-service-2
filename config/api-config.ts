// This allows easy management of models, base URL, and API settings

export const API_CONFIG = {
  // Base URL for the API - change this to your deployed domain
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-domain.vercel.app",

  // OpenRouter API configuration
  OPENROUTER: {
    API_KEY: "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",
    API_URL: "https://openrouter.ai/api/v1/chat/completions",
  },

  // Rate limiting configuration
  RATE_LIMIT: {
    MAX_RETRIES: 3,
    BASE_DELAY: 1000, // milliseconds
  },
}

// Model configuration - Add or remove models here
export const MODELS_CONFIG = {
  chat: [
    { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B Instruct", context: "131K", provider: "Meta" },
    {
      id: "meta-llama/llama-3.2-90b-vision-instruct",
      name: "Llama 3.2 90B Vision",
      context: "131K",
      provider: "Meta",
    },
    {
      id: "meta-llama/llama-3.2-11b-vision-instruct",
      name: "Llama 3.2 11B Vision",
      context: "131K",
      provider: "Meta",
    },
    { id: "meta-llama/llama-3.2-3b-instruct:free", name: "Llama 3.2 3B Instruct", context: "131K", provider: "Meta" },
    {
      id: "meta-llama/llama-3.1-405b-instruct:free",
      name: "Llama 3.1 405B Instruct",
      context: "131K",
      provider: "Meta",
    },
    { id: "meta-llama/llama-3.1-70b-instruct:free", name: "Llama 3.1 70B Instruct", context: "131K", provider: "Meta" },
    { id: "meta-llama/llama-3.1-8b-instruct:free", name: "Llama 3.1 8B Instruct", context: "131K", provider: "Meta" },
    { id: "google/gemini-flash-2.0-exp:free", name: "Gemini 2.0 Flash Exp", context: "1.05M", provider: "Google" },
    {
      id: "google/gemini-flash-2.0-thinking-exp:free",
      name: "Gemini 2.0 Flash Thinking",
      context: "1.05M",
      provider: "Google",
    },
    { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B IT", context: "131K", provider: "Google" },
    { id: "google/gemma-3-12b-it:free", name: "Gemma 3 12B IT", context: "33K", provider: "Google" },
    { id: "google/gemma-3-4b-it:free", name: "Gemma 3 4B IT", context: "33K", provider: "Google" },
    { id: "google/gemma-2-9b-it:free", name: "Gemma 2 9B IT", context: "8K", provider: "Google" },
    { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B Instruct", context: "33K", provider: "Mistral AI" },
    {
      id: "mistralai/mistral-small-3.1-24b:free",
      name: "Mistral Small 3.1 24B",
      context: "128K",
      provider: "Mistral AI",
    },
    { id: "mistralai/ministral-8b:free", name: "Ministral 8B", context: "128K", provider: "Mistral AI" },
    { id: "mistralai/ministral-3b:free", name: "Ministral 3B", context: "128K", provider: "Mistral AI" },
    { id: "microsoft/phi-4:free", name: "Phi-4", context: "16K", provider: "Microsoft" },
    { id: "microsoft/phi-3.5-mini-instruct:free", name: "Phi-3.5 Mini", context: "128K", provider: "Microsoft" },
    { id: "microsoft/phi-3-mini-128k-instruct:free", name: "Phi-3 Mini 128K", context: "128K", provider: "Microsoft" },
    {
      id: "microsoft/phi-3-medium-128k-instruct:free",
      name: "Phi-3 Medium 128K",
      context: "128K",
      provider: "Microsoft",
    },
    { id: "qwen/qwen-2.5-72b-instruct:free", name: "Qwen 2.5 72B Instruct", context: "33K", provider: "Qwen" },
    { id: "qwen/qwen-2.5-7b-instruct:free", name: "Qwen 2.5 7B Instruct", context: "33K", provider: "Qwen" },
  ],

  coding: [
    { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B Instruct", context: "131K", provider: "Meta" },
    {
      id: "meta-llama/llama-3.1-405b-instruct:free",
      name: "Llama 3.1 405B Instruct",
      context: "131K",
      provider: "Meta",
    },
    { id: "meta-llama/llama-3.1-70b-instruct:free", name: "Llama 3.1 70B Instruct", context: "131K", provider: "Meta" },
    {
      id: "mistralai/mistral-small-3.1-24b:free",
      name: "Mistral Small 3.1 24B",
      context: "128K",
      provider: "Mistral AI",
    },
    { id: "mistralai/codestral-mamba:free", name: "Codestral Mamba", context: "256K", provider: "Mistral AI" },
    { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B IT", context: "131K", provider: "Google" },
    { id: "google/gemini-flash-2.0-exp:free", name: "Gemini 2.0 Flash Exp", context: "1.05M", provider: "Google" },
    { id: "qwen/qwen-2.5-coder-32b-instruct:free", name: "Qwen 2.5 Coder 32B", context: "33K", provider: "Qwen" },
    { id: "qwen/qwen-2.5-72b-instruct:free", name: "Qwen 2.5 72B Instruct", context: "33K", provider: "Qwen" },
  ],

  thinking: [
    {
      id: "nousresearch/hermes-3-llama-3.1-405b:free",
      name: "Hermes 3 405B",
      context: "131K",
      provider: "Nous Research",
    },
    {
      id: "google/gemini-flash-2.0-thinking-exp:free",
      name: "Gemini 2.0 Flash Thinking",
      context: "1.05M",
      provider: "Google",
    },
    { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B Instruct", context: "131K", provider: "Meta" },
    {
      id: "meta-llama/llama-3.1-405b-instruct:free",
      name: "Llama 3.1 405B Instruct",
      context: "131K",
      provider: "Meta",
    },
    {
      id: "mistralai/mistral-small-3.1-24b:free",
      name: "Mistral Small 3.1 24B",
      context: "128K",
      provider: "Mistral AI",
    },
    { id: "qwen/qwq-32b-preview:free", name: "QwQ 32B Preview", context: "33K", provider: "Qwen" },
    { id: "qwen/qwen-2.5-72b-instruct:free", name: "Qwen 2.5 72B Instruct", context: "33K", provider: "Qwen" },
  ],

  vision: [
    { id: "nvidia/nemotron-nano-12b-v2-vl:free", name: "Nemotron Nano 12B 2 VL", context: "128K", provider: "NVIDIA" },
    { id: "amazon/nova-2-lite-v1:free", name: "Amazon Nova 2 Lite", context: "1M", provider: "Amazon" },
    { id: "google/gemini-flash-2.0-exp:free", name: "Gemini 2.0 Flash Exp", context: "1.05M", provider: "Google" },
    {
      id: "meta-llama/llama-3.2-90b-vision-instruct:free",
      name: "Llama 3.2 90B Vision",
      context: "131K",
      provider: "Meta",
    },
    {
      id: "meta-llama/llama-3.2-11b-vision-instruct:free",
      name: "Llama 3.2 11B Vision",
      context: "131K",
      provider: "Meta",
    },
    { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B IT", context: "131K", provider: "Google" },
    { id: "google/gemma-3-12b-it:free", name: "Gemma 3 12B IT", context: "33K", provider: "Google" },
    { id: "google/gemma-3-4b-it:free", name: "Gemma 3 4B IT", context: "33K", provider: "Google" },
    {
      id: "mistralai/mistral-small-3.1-24b:free",
      name: "Mistral Small 3.1 24B",
      context: "128K",
      provider: "Mistral AI",
    },
    { id: "mistralai/pixtral-12b:free", name: "Pixtral 12B", context: "128K", provider: "Mistral AI" },
    { id: "qwen/qwen-2-vl-72b-instruct:free", name: "Qwen 2 VL 72B", context: "33K", provider: "Qwen" },
    { id: "qwen/qwen-2-vl-7b-instruct:free", name: "Qwen 2 VL 7B", context: "33K", provider: "Qwen" },
  ],

  search: [
    { id: "google/gemini-flash-2.0-exp:free", name: "Gemini 2.0 Flash Exp", context: "1.05M", provider: "Google" },
    { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B Instruct", context: "131K", provider: "Meta" },
    {
      id: "meta-llama/llama-3.1-405b-instruct:free",
      name: "Llama 3.1 405B Instruct",
      context: "131K",
      provider: "Meta",
    },
    {
      id: "nousresearch/hermes-3-llama-3.1-405b:free",
      name: "Hermes 3 405B",
      context: "131K",
      provider: "Nous Research",
    },
    { id: "qwen/qwen-2.5-72b-instruct:free", name: "Qwen 2.5 72B Instruct", context: "33K", provider: "Qwen" },
  ],

  // Uncensored models - No content filtering
  uncensored: [
    { id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free", name: "mistral unscencored", context: "2K", provider: "Venice" }
  ],
}

// Get all models across all categories
export const getAllModels = () => {
  return Object.entries(MODELS_CONFIG).flatMap(([category, models]) => models.map((model) => ({ ...model, category })))
}

// Get models by category
export const getModelsByCategory = (category: keyof typeof MODELS_CONFIG) => {
  return MODELS_CONFIG[category] || []
}

// Get default model for each category
export const getDefaultModel = (category: keyof typeof MODELS_CONFIG) => {
  const models = MODELS_CONFIG[category]
  return models.length > 0 ? models[0].id : null
}
