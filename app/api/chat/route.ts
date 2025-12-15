import { type NextRequest, NextResponse } from "next/server"
import { callOpenRouter, MODELS } from "@/lib/openrouter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, model, temperature = 0.7, max_tokens = 2000 } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    // Validate model exists in our chat models
    const validModel = model || MODELS.chat[0].id

    const response = await callOpenRouter({
      model: validModel,
      messages,
      temperature,
      max_tokens,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
