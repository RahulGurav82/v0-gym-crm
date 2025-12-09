import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function BranchPerformance() {
  const branches = [
    { name: "Downtown", members: 847, revenue: "$18.4K", occupancy: 92 },
    { name: "Westside", members: 623, revenue: "$14.2K", occupancy: 78 },
    { name: "Eastside", members: 542, revenue: "$12.1K", occupancy: 71 },
    { name: "Northside", members: 489, revenue: "$10.8K", occupancy: 65 },
    { name: "Southside", members: 346, revenue: "$8.8K", occupancy: 58 },
  ]

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
          {branches.map((branch, i) => (
            <div key={i} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{branch.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {branch.members} members • {branch.revenue}
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
