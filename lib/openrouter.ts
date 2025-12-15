// OpenRouter API integration with rate limiting and retry logic

import { API_CONFIG } from "@/config/api-config"

export interface OpenRouterMessage {
  role: "user" | "assistant" | "system"
  content: string | Array<{ type: "text" | "image_url"; text?: string; image_url?: { url: string } }>
}

export interface OpenRouterRequest {
  model: string
  messages: OpenRouterMessage[]
  temperature?: number
  max_tokens?: number
  stream?: boolean
}

export interface OpenRouterResponse {
  id: string
  model: string
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

const OPENROUTER_API_KEY = API_CONFIG.OPENROUTER.API_KEY
const OPENROUTER_API_URL = API_CONFIG.OPENROUTER.API_URL

// Retry with exponential backoff for rate limiting
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = API_CONFIG.RATE_LIMIT.MAX_RETRIES,
): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options)

    if (response.status === 429) {
      // Rate limited, wait and retry
      const waitTime = Math.pow(2, i) * API_CONFIG.RATE_LIMIT.BASE_DELAY
      console.log(`[v0] Rate limited, waiting ${waitTime}ms before retry ${i + 1}/${maxRetries}`)
      await new Promise((resolve) => setTimeout(resolve, waitTime))
      continue
    }

    return response
  }

  throw new Error("Max retries exceeded due to rate limiting")
}

export async function callOpenRouter(request: OpenRouterRequest): Promise<OpenRouterResponse> {
  try {
    const response = await fetchWithRetry(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://nova-devs-ai.vercel.app",
        "X-Title": "Nova Devs AI Service",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] OpenRouter API call failed:", error)
    throw error
  }
}

// Model categories for Nova Devs AI
export const MODELS = {
  chat: [
    { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B", context: "131K" },
    { id: "meta-llama/llama-3.2-3b-instruct:free", name: "Llama 3.2 3B", context: "131K" },
    { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B", context: "33K" },
    { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B", context: "131K" },
    { id: "google/gemini-flash-2.0-exp:free", name: "Gemini 2.0 Flash", context: "1.05M" },
  ],
  coding: [
    { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B", context: "131K" },
    { id: "mistralai/mistral-small-3.1-24b:free", name: "Mistral Small 3.1 24B", context: "128K" },
    { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B", context: "131K" },
  ],
  thinking: [
    { id: "nousresearch/hermes-3-llama-3.1-405b:free", name: "Hermes 3 405B", context: "131K" },
    { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B", context: "131K" },
    { id: "mistralai/mistral-small-3.1-24b:free", name: "Mistral Small 3.1 24B", context: "128K" },
  ],
  vision: [
    { id: "nvidia/nemotron-nano-12b-2-vl:free", name: "Nemotron Nano 12B 2 VL", context: "128K" },
    { id: "amazon/nova-2-lite:free", name: "Amazon Nova 2 Lite", context: "1M" },
    { id: "google/gemini-flash-2.0-exp:free", name: "Gemini 2.0 Flash", context: "1.05M" },
    { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B", context: "131K" },
    { id: "google/gemma-3-12b-it:free", name: "Gemma 3 12B", context: "33K" },
    { id: "google/gemma-3-4b-it:free", name: "Gemma 3 4B", context: "33K" },
    { id: "mistralai/mistral-small-3.1-24b:free", name: "Mistral Small 3.1 24B", context: "128K" },
  ],
  search: [
    { id: "google/gemini-flash-2.0-exp:free", name: "Gemini 2.0 Flash", context: "1.05M" },
    { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B", context: "131K" },
  ],
}
