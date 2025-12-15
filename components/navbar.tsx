import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
              N
            </div>
            <span className="text-xl font-bold text-foreground">Nova Devs AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link href="/playground" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Playground
            </Link>
            <Link href="/models" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Models
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button asChild>
              <Link href="/playground">Try Playground</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
