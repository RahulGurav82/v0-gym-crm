"use client"

import { useSidebar } from "@/components/sidebar"
import { DeletedBillsTable } from "./deleted-bills-table"
import { cn } from "@/lib/utils"

export function DeletedBillsPage() {
  const { state } = useSidebar()

  return (
    <div
      className={cn(
        "flex-1 transition-all duration-300",
        state === "collapsed" ? "lg:ml-16" : "lg:ml-56"
      )}
    >
      <div className="h-full p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Deleted Bills</h1>
            <p className="text-muted-foreground mt-2">
              View and manage deleted invoices. Bills are permanently deleted after 30 days.
            </p>
          </div>

          <DeletedBillsTable />
        </div>
      </div>
    </div>
  )
}
