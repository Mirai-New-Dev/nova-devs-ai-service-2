import { type NextRequest, NextResponse } from "next/server"
import { callOpenRouter, MODELS } from "@/lib/openrouter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, model, language = "html", temperature = 0.3, max_tokens = 4000 } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const systemMessage = `You are an expert programmer. Generate clean, well-structured ${language.toUpperCase()} code based on the user's request. Only output the code without explanations unless asked.`

    const validModel = model || MODELS.coding[0].id

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
    console.error("[v0] Coding API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
