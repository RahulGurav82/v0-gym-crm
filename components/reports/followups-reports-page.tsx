"use client"

import { FollowupsReportsTable } from "./followups-reports-table"

export function FollowupsReportsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Followups Reports</h1>
        <p className="text-muted-foreground mt-2">
          Track employee followup performance across enquiries and members
        </p>
      </div>

      <FollowupsReportsTable />
    </div>
  )
}
