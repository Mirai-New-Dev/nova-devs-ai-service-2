import { type NextRequest, NextResponse } from "next/server"
import { callOpenRouter, MODELS } from "@/lib/openrouter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, model, temperature = 0.8, max_tokens = 3000 } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const systemMessage = `You are a reasoning AI model. Break down complex problems step by step, showing your thought process clearly. Analyze deeply and provide well-reasoned conclusions.`

    const validModel = model || MODELS.thinking[0].id

    const response = await callOpenRouter({
      model: validModel,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature,
      max_tokens,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] Thinking API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
