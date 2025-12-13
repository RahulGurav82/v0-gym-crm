"use client"

import { BRANCHES } from "@/lib/branches"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function BranchPerformance() {
  const branchesWithMetrics = BRANCHES.map((branch, index) => ({
    ...branch,
    members: [847, 623, 542, 489][index] || 400,
    revenue: ["$18.4K", "$14.2K", "$12.1K", "$10.8K"][index] || "$9K",
    occupancy: [92, 78, 71, 65][index] || 60,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Branch Performance
        </CardTitle>
        <CardDescription>Monthly metrics by location</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {branchesWithMetrics.map((branch) => (
            <div key={branch.id} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{branch.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {branch.members} members • {branch.revenue} • {branch.branchCode}
                  </p>
                </div>
                <span className="text-sm font-medium">{branch.occupancy}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${branch.occupancy}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
