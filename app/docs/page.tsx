import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { API_CONFIG, MODELS_CONFIG } from "@/config/api-config"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">API Documentation</h1>
          <p className="mt-2 text-lg text-muted-foreground">Complete reference for Nova Devs AI Service endpoints</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          <nav className="lg:col-span-1">
            <div className="sticky top-8 space-y-2">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Navigation</h3>
              <a href="#overview" className="block text-sm text-muted-foreground hover:text-foreground">
                Overview
              </a>
              <a href="#authentication" className="block text-sm text-muted-foreground hover:text-foreground">
                Authentication
              </a>
              <a href="#endpoints" className="block text-sm text-muted-foreground hover:text-foreground">
                Endpoints
              </a>
              <a href="#chat" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Chat API
              </a>
              <a href="#coding" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Coding API
              </a>
              <a href="#thinking" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Thinking API
              </a>
              <a href="#vision" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Vision API
              </a>
              <a href="#search" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Search API
              </a>
              <a href="#models" className="block text-sm text-muted-foreground hover:text-foreground">
                Available Models
              </a>
              <a href="#errors" className="block text-sm text-muted-foreground hover:text-foreground">
                Error Handling
              </a>
            </div>
          </nav>

          <div className="lg:col-span-3 space-y-8">
            <section id="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>
                    Nova Devs AI Service provides access to {Object.values(MODELS_CONFIG).flat().length}+ free AI models
                    through a unified API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Base URL</h4>
                    <code className="block bg-muted p-3 rounded-md text-sm">{API_CONFIG.BASE_URL}/api</code>
                    <p className="text-xs text-muted-foreground mt-2">
                      Update the base URL in <code className="text-xs">config/api-config.ts</code>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>{Object.values(MODELS_CONFIG).flat().length}+ free AI models across 6 categories</li>
                      
                      <li>Support for text, code, vision, reasoning, and uncensored tasks</li>
                      <li>HTML code generation with temporary preview hosting</li>
                      <li>Easy model configuration management</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="authentication">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>Currently, all endpoints are publicly accessible</CardDescription>
                </CardHeader>
                <CardContent>
                  
                </CardContent>
              </Card>
            </section>

            <section id="endpoints">
              <h2 className="text-3xl font-bold text-foreground mb-6">API Endpoints</h2>

              <div id="chat" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Chat API</CardTitle>
                      <Badge>POST /api/chat</Badge>
                    </div>
                    <CardDescription>General conversational AI for chat applications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Request Body</h4>
                      <Tabs defaultValue="json">
                        <TabsList>
                          <TabsTrigger value="json">JSON</TabsTrigger>
                          <TabsTrigger value="curl">cURL</TabsTrigger>
                        </TabsList>
                        <TabsContent value="json">
                          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                            {`{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "model": "meta-llama/llama-3.3-70b-instruct:free",
  "temperature": 0.7,
  "max_tokens": 2000
}`}
                          </pre>
                        </TabsContent>
                        <TabsContent value="curl">
                          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                            {`curl -X POST https://your-domain.vercel.app/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [{"role": "user", "content": "Hello!"}],
    "model": "meta-llama/llama-3.3-70b-instruct:free"
  }'`}
                          </pre>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Parameters</h4>
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <span className="font-medium text-foreground">Parameter</span>
                          <span className="font-medium text-foreground">Type</span>
                          <span className="font-medium text-foreground">Required</span>
                          <span className="font-medium text-foreground">Description</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground">
                          <code>messages</code>
                          <span>array</span>
                          <Badge variant="destructive" className="w-fit">
                            Yes
                          </Badge>
                          <span>Array of message objects</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground">
                          <code>model</code>
                          <span>string</span>
                          <Badge variant="secondary" className="w-fit">
                            No
                          </Badge>
                          <span>Model ID (defaults to Llama 3.3 70B)</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground">
                          <code>temperature</code>
                          <span>number</span>
                          <Badge variant="secondary" className="w-fit">
                            No
                          </Badge>
                          <span>0-1, controls randomness</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground">
                          <code>max_tokens</code>
                          <span>number</span>
                          <Badge variant="secondary" className="w-fit">
                            No
                          </Badge>
                          <span>Maximum response length</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="coding">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Coding API</CardTitle>
                      <Badge>POST /api/coding</Badge>
                    </div>
                    <CardDescription>Generate code for websites and applications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Request Body</h4>
                      <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                        {`{
  "prompt": "Create a responsive landing page",
  "language": "html",
  "model": "meta-llama/llama-3.3-70b-instruct:free",
  "temperature": 0.3,
  "max_tokens": 4000
}`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Parameters</h4>
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <span className="font-medium text-foreground">Parameter</span>
                          <span className="font-medium text-foreground">Type</span>
                          <span className="font-medium text-foreground">Required</span>
                          <span className="font-medium text-foreground">Description</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground">
                          <code>prompt</code>
                          <span>string</span>
                          <Badge variant="destructive" className="w-fit">
                            Yes
                          </Badge>
                          <span>Code generation prompt</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground">
                          <code>language</code>
                          <span>string</span>
                          <Badge variant="secondary" className="w-fit">
                            No
                          </Badge>
                          <span>Target language (html, css, js, etc.)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="thinking">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Thinking API</CardTitle>
                      <Badge>POST /api/thinking</Badge>
                    </div>
                    <CardDescription>Advanced reasoning and problem-solving</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Request Body</h4>
                      <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                        {`{
  "prompt": "Explain quantum computing step by step",
  "model": "nousresearch/hermes-3-llama-3.1-405b:free",
  "temperature": 0.8,
  "max_tokens": 3000
}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card id="vision">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Vision API</CardTitle>
                      <Badge>POST /api/vision</Badge>
                    </div>
                    <CardDescription>Analyze images, documents, and videos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Request Body</h4>
                      <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                        {`{
  "prompt": "Describe this image in detail",
  "image_url": "https://example.com/image.jpg",
  "model": "nvidia/nemotron-nano-12b-2-vl:free",
  "temperature": 0.7,
  "max_tokens": 2000
}`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Parameters</h4>
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <span className="font-medium text-foreground">Parameter</span>
                          <span className="font-medium text-foreground">Type</span>
                          <span className="font-medium text-foreground">Required</span>
                          <span className="font-medium text-foreground">Description</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground">
                          <code>image_url</code>
                          <span>string</span>
                          <Badge variant="destructive" className="w-fit">
                            Yes
                          </Badge>
                          <span>URL of the image to analyze</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card id="search">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Search API</CardTitle>
                      <Badge>POST /api/search</Badge>
                    </div>
                    <CardDescription>Web search and information retrieval</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Request Body</h4>
                      <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                        {`{
  "query": "Latest AI developments in 2025",
  "model": "google/gemini-flash-2.0-exp:free",
  "temperature": 0.5,
  "max_tokens": 3000
}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="models">
              <Card>
                <CardHeader>
                  <CardTitle>Available Models</CardTitle>
                  <CardDescription>
                    All {Object.values(MODELS_CONFIG).flat().length} models are free with automatic rate limiting.
                    Configure models in config/api-config.ts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="chat">
                    <TabsList className="grid w-full grid-cols-6">
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                      <TabsTrigger value="coding">Coding</TabsTrigger>
                      <TabsTrigger value="thinking">Thinking</TabsTrigger>
                      <TabsTrigger value="vision">Vision</TabsTrigger>
                      <TabsTrigger value="search">Search</TabsTrigger>
                      <TabsTrigger value="uncensored">Uncensored</TabsTrigger>
                    </TabsList>

                    {Object.entries(MODELS_CONFIG).map(([category, models]) => (
                      <TabsContent key={category} value={category} className="space-y-2 mt-4">
                        <div className="space-y-2">
                          {models.map((model) => (
                            <div key={model.id} className="flex justify-between items-center p-3 bg-muted rounded">
                              <div>
                                <span className="font-medium text-foreground block">{model.name}</span>
                                <span className="text-xs text-muted-foreground">{model.provider}</span>
                              </div>
                              <Badge variant="secondary">{model.context}</Badge>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            <section id="errors">
              <Card>
                <CardHeader>
                  <CardTitle>Error Handling</CardTitle>
                  <CardDescription>Understanding API error responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Error Response Format</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm">
                      {`{
  "error": "Error message description"
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Common Error Codes</h4>
                    <div className="space-y-2">
                      <div className="flex gap-4 p-2 bg-muted rounded">
                        <Badge variant="destructive">400</Badge>
                        <span className="text-muted-foreground">Bad Request - Missing or invalid parameters</span>
                      </div>
                      <div className="flex gap-4 p-2 bg-muted rounded">
                        <Badge variant="destructive">429</Badge>
                        <span className="text-muted-foreground">
                          Rate Limited - Automatic retry with exponential backoff
                        </span>
                      </div>
                      <div className="flex gap-4 p-2 bg-muted rounded">
                        <Badge variant="destructive">500</Badge>
                        <span className="text-muted-foreground">Internal Server Error - Service unavailable</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-md">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>Note:</strong> Rate limiting is handled automatically with exponential backoff. The API
                      will retry failed requests up to 3 times with increasing delays (1s, 2s, 4s).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
