import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { MODELS_CONFIG } from "@/config/api-config"

const modelCategories = Object.entries(MODELS_CONFIG).map(([key, models]) => ({
  category: key.charAt(0).toUpperCase() + key.slice(1) + " Models",
  description: getCategoryDescription(key),
  models: models.map((model) => ({
    name: model.name,
    provider: model.provider,
    context: model.context + " tokens",
    description: getModelDescription(model.id, key),
    id: model.id,
  })),
}))

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    chat: "General conversational AI models for dialogue and assistance",
    coding: "Specialized models optimized for code generation and programming",
    thinking: "Advanced reasoning models for complex problem-solving",
    vision: "Multimodal models for image, document, and video understanding",
    search: "Models optimized for information retrieval and web search",
    uncensored: "Models without content filtering for unrestricted outputs",
  }
  return descriptions[category] || "AI models for various tasks"
}

function getModelDescription(id: string, category: string): string {
  if (id.includes("nemotron")) {
    return "Hybrid architecture for video understanding, OCR, and document intelligence"
  }
  if (id.includes("nova")) {
    return "Fast multimodal model for text, images, and video reasoning"
  }
  if (id.includes("gemini")) {
    return "Advanced Google model with multimodal capabilities and large context"
  }
  if (id.includes("hermes")) {
    return "Frontier-level model with powerful reasoning and agentic capabilities"
  }
  if (id.includes("llama-3.3") || id.includes("llama-3.1-405b")) {
    return "High-performance Meta model with excellent reasoning and instruction following"
  }
  if (id.includes("llama")) {
    return "Efficient Meta model optimized for various NLP tasks"
  }
  if (id.includes("qwen-2.5-coder")) {
    return "Specialized coding model with strong programming capabilities"
  }
  if (id.includes("qwq")) {
    return "Thinking model with advanced reasoning for complex problems"
  }
  if (id.includes("qwen")) {
    return "Powerful Qwen model with multilingual and reasoning capabilities"
  }
  if (id.includes("mistral-small")) {
    return "Advanced Mistral model with function calling and structured outputs"
  }
  if (id.includes("codestral")) {
    return "Specialized code generation model with long context window"
  }
  if (id.includes("mistral")) {
    return "Efficient Mistral model optimized for speed and performance"
  }
  if (id.includes("gemma")) {
    return "Lightweight Google model with strong capabilities for its size"
  }
  if (id.includes("phi")) {
    return "Compact Microsoft model with impressive performance"
  }
  if (id.includes("pixtral")) {
    return "Multimodal vision model with advanced image understanding"
  }
  if (id.includes("euryale")) {
    return "Uncensored model with no content restrictions for creative freedom"
  }
  if (id.includes("midnight-rose")) {
    return "Unrestricted model designed for creative and open-ended tasks"
  }
  if (id.includes("toppy")) {
    return "Compact uncensored model for flexible applications"
  }
  return "Advanced AI model for " + category + " tasks"
}

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">Available Models</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            All {Object.values(MODELS_CONFIG).flat().length} models are free to use with automatic rate limiting
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {modelCategories.map((category) => (
          <section key={category.category}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
              <p className="text-muted-foreground">{category.description}</p>
              <Badge variant="secondary" className="mt-2">
                {category.models.length} models
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.models.map((model) => (
                <Card key={model.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <Badge variant="secondary">Free</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{model.provider}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{model.context}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{model.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
