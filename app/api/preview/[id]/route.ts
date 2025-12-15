import { type NextRequest, NextResponse } from "next/server"
import { getHTML } from "@/lib/storage"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const html = getHTML(id)

    if (!html) {
      return new NextResponse(
        `<!DOCTYPE html>
<html>
<head>
  <title>Not Found</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 { color: #333; }
    p { color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>404 - Preview Not Found</h1>
    <p>This HTML preview has expired or does not exist.</p>
    <p>Previews are stored for 24 hours.</p>
  </div>
</body>
</html>`,
        {
          status: 404,
          headers: {
            "Content-Type": "text/html",
          },
        },
      )
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("[v0] Preview error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
