// In-memory storage for generated HTML (temporary)
// In production, consider using a database or cloud storage

interface StoredHTML {
  id: string
  html: string
  createdAt: Date
  expiresAt: Date
}

// Store HTML files in memory for 24 hours
const htmlStorage = new Map<string, StoredHTML>()

// Cleanup expired HTML every hour
if (typeof setInterval !== "undefined") {
  setInterval(
    () => {
      const now = new Date()
      for (const [id, stored] of htmlStorage.entries()) {
        if (stored.expiresAt < now) {
          htmlStorage.delete(id)
          console.log(`[v0] Cleaned up expired HTML: ${id}`)
        }
      }
    },
    60 * 60 * 1000,
  ) // Run every hour
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function storeHTML(html: string): string {
  const id = generateId()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours

  htmlStorage.set(id, {
    id,
    html,
    createdAt: now,
    expiresAt,
  })

  console.log(`[v0] Stored HTML with id: ${id}, expires: ${expiresAt.toISOString()}`)
  return id
}

export function getHTML(id: string): string | null {
  const stored = htmlStorage.get(id)

  if (!stored) {
    return null
  }

  // Check if expired
  if (stored.expiresAt < new Date()) {
    htmlStorage.delete(id)
    return null
  }

  return stored.html
}

export function deleteHTML(id: string): boolean {
  return htmlStorage.delete(id)
}

export function getStorageStats() {
  return {
    totalStored: htmlStorage.size,
    items: Array.from(htmlStorage.values()).map((item) => ({
      id: item.id,
      createdAt: item.createdAt,
      expiresAt: item.expiresAt,
      size: item.html.length,
    })),
  }
}
