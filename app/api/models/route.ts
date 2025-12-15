import { NextResponse } from "next/server"
import { MODELS_CONFIG } from "@/config/api-config"

export async function GET() {
  return NextResponse.json({
    categories: MODELS_CONFIG,
  })
}
