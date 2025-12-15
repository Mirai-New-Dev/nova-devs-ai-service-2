"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Copy, Check, ExternalLink } from "lucide-react"
import { MODELS_CONFIG } from "@/config/api-config"

const MODELS = {
  chat: MODELS_CONFIG.chat,
  coding: MODELS_CONFIG.coding,
  thinking: MODELS_CONFIG.thinking,
  vision: MODELS_CONFIG.vision,
  search: MODELS_CONFIG.search,
  uncensored: MODELS_CONFIG.uncensored,
}

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [copied, setCopied] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")

  const [chatMessages, setChatMessages] = useState("")
  const [chatModel, setChatModel] = useState(MODELS.chat[0].id)
  const [codingPrompt, setCodingPrompt] = useState("")
  const [codingLanguage, setCodingLanguage] = useState("html")
  const [codingModel, setCodingModel] = useState(MODELS.coding[0].id)
  const [thinkingPrompt, setThinkingPrompt] = useState("")
  const [thinkingModel, setThinkingModel] = useState(MODELS.thinking[0].id)
  const [visionPrompt, setVisionPrompt] = useState("")
  const [visionImageUrl, setVisionImageUrl] = useState("")
  const [visionModel, setVisionModel] = useState(MODELS.vision[0].id)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchModel, setSearchModel] = useState(MODELS.search[0].id)
  const [uncensoredPrompt, setUncensoredPrompt] = useState("")
  const [uncensoredModel, setUncensoredModel] = useState(MODELS.uncensored[0].id)

  const handleCopyResponse = async () => {
    await navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleChat = async () => {
    setLoading(true)
    setResponse("")
    setPreviewUrl("")
    try {
      const messages = chatMessages
        .split("\n\n")
        .filter((m) => m.trim())
        .map((msg) => {
          const [role, ...contentParts] = msg.split(": ")
          return {
            role: role.toLowerCase() as "user" | "assistant" | "system",
            content: contentParts.join(": "),
          }
        })

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, model: chatModel }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCoding = async () => {
    setLoading(true)
    setResponse("")
    setPreviewUrl("")
    try {
      if (codingLanguage === "html") {
        const res = await fetch("/api/generate-html", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: codingPrompt,
            model: codingModel,
          }),
        })

        const data = await res.json()
        if (data.html) {
          setResponse(data.html)
          setPreviewUrl(data.previewUrl)
        } else if (data.error) {
          setResponse(`Error: ${data.error}`)
        }
      } else {
        const res = await fetch("/api/coding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: codingPrompt,
            language: codingLanguage,
            model: codingModel,
          }),
        })

        const data = await res.json()
        if (data.choices && data.choices[0]) {
          setResponse(data.choices[0].message.content)
        } else if (data.error) {
          setResponse(`Error: ${data.error}`)
        }
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleThinking = async () => {
    setLoading(true)
    setResponse("")
    setPreviewUrl("")
    try {
      const res = await fetch("/api/thinking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: thinkingPrompt,
          model: thinkingModel,
        }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleVision = async () => {
    setLoading(true)
    setResponse("")
    setPreviewUrl("")
    try {
      const res = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: visionPrompt,
          image_url: visionImageUrl,
          model: visionModel,
        }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    setResponse("")
    setPreviewUrl("")
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          model: searchModel,
        }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleUncensored = async () => {
    setLoading(true)
    setResponse("")
    setPreviewUrl("")
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: uncensoredPrompt }],
          model: uncensoredModel,
        }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">AI Playground</h1>
          <p className="mt-2 text-lg text-muted-foreground">Test all Nova Devs AI models interactively</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Configure Request</CardTitle>
              <CardDescription>Select model and enter your prompt</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="coding">Coding</TabsTrigger>
                  <TabsTrigger value="thinking">Thinking</TabsTrigger>
                  <TabsTrigger value="vision">Vision</TabsTrigger>
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="uncensored">Uncensored</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chat-model">Model</Label>
                    <Select value={chatModel} onValueChange={setChatModel}>
                      <SelectTrigger id="chat-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.chat.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.context})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chat-messages">Messages</Label>
                    <Textarea
                      id="chat-messages"
                      placeholder="user: Hello! How are you?&#10;&#10;assistant: I'm doing well, thank you!&#10;&#10;user: Can you help me with a question?"
                      value={chatMessages}
                      onChange={(e) => setChatMessages(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">Format: role: message (separated by double newline)</p>
                  </div>

                  <Button onClick={handleChat} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Send Chat"
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="coding" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coding-model">Model</Label>
                    <Select value={codingModel} onValueChange={setCodingModel}>
                      <SelectTrigger id="coding-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.coding.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.context})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coding-language">Language</Label>
                    <Select value={codingLanguage} onValueChange={setCodingLanguage}>
                      <SelectTrigger id="coding-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coding-prompt">Prompt</Label>
                    <Textarea
                      id="coding-prompt"
                      placeholder="Create a responsive landing page with a hero section and contact form"
                      value={codingPrompt}
                      onChange={(e) => setCodingPrompt(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <Button onClick={handleCoding} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Code...
                      </>
                    ) : (
                      "Generate Code"
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="thinking" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="thinking-model">Model</Label>
                    <Select value={thinkingModel} onValueChange={setThinkingModel}>
                      <SelectTrigger id="thinking-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.thinking.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.context})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thinking-prompt">Problem</Label>
                    <Textarea
                      id="thinking-prompt"
                      placeholder="Explain the concept of quantum entanglement and its implications for computing"
                      value={thinkingPrompt}
                      onChange={(e) => setThinkingPrompt(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <Button onClick={handleThinking} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Thinking...
                      </>
                    ) : (
                      "Start Reasoning"
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="vision" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vision-model">Model</Label>
                    <Select value={visionModel} onValueChange={setVisionModel}>
                      <SelectTrigger id="vision-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.vision.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.context})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vision-image">Image URL</Label>
                    <Input
                      id="vision-image"
                      placeholder="https://example.com/image.jpg"
                      value={visionImageUrl}
                      onChange={(e) => setVisionImageUrl(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vision-prompt">Prompt</Label>
                    <Textarea
                      id="vision-prompt"
                      placeholder="Describe this image in detail"
                      value={visionPrompt}
                      onChange={(e) => setVisionPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleVision} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="search" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search-model">Model</Label>
                    <Select value={searchModel} onValueChange={setSearchModel}>
                      <SelectTrigger id="search-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.search.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.context})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="search-query">Search Query</Label>
                    <Textarea
                      id="search-query"
                      placeholder="What are the latest developments in artificial intelligence?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleSearch} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      "Search"
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="uncensored" className="space-y-4">
                  <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      Warning: Uncensored models have no content filtering. Use responsibly.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="uncensored-model">Model</Label>
                    <Select value={uncensoredModel} onValueChange={setUncensoredModel}>
                      <SelectTrigger id="uncensored-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.uncensored.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.context})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="uncensored-prompt">Prompt</Label>
                    <Textarea
                      id="uncensored-prompt"
                      placeholder="Enter your prompt without content restrictions..."
                      value={uncensoredPrompt}
                      onChange={(e) => setUncensoredPrompt(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <Button onClick={handleUncensored} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Generate Response"
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Response</CardTitle>
                  <CardDescription>Model output will appear here</CardDescription>
                </div>
                {response && (
                  <Button variant="outline" size="sm" onClick={handleCopyResponse}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : response ? (
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">{response}</pre>
                  </div>
                  {previewUrl && (
                    <div className="flex gap-2">
                      <Button variant="default" asChild className="w-full">
                        <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Preview
                        </a>
                      </Button>
                      <Badge variant="outline" className="flex items-center">
                        Expires in 24h
                      </Badge>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  <p>Enter a prompt and click the button to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
