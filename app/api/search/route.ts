import { type NextRequest, NextResponse } from "next/server"
import { callOpenRouter, MODELS } from "@/lib/openrouter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, model, temperature = 0.5, max_tokens = 3000 } = body

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const systemMessage = `You are a web search assistant. Provide comprehensive, accurate, and up-to-date information based on the user's search query. Structure your response clearly with relevant facts and sources when possible.`

    const validModel = model || MODELS.search[0].id

    const response = await callOpenRouter({
      model: validModel,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: `Search query: ${query}` },
      ],
      temperature,
      max_tokens,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] Search API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
