"use client"

import { useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { RefreshCw, Download } from "lucide-react"
import { RenewalsTable } from "./renewals-table"

export function RenewalsPage() {
  const { collapsed } = useSidebar()

  return (
    <main className={cn("min-h-screen bg-background transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <RefreshCw className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Renewals</h1>
            <p className="text-sm text-muted-foreground">Manage membership and service renewals</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        <RenewalsTable />
      </div>
    </main>
  )
}
