import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserCheck } from "lucide-react"

export function StaffOverview() {
  const staff = [
    { name: "Sarah Chen", role: "Head Trainer", status: "on-duty", shift: "9am - 5pm" },
    { name: "Mike Johnson", role: "Manager", status: "on-duty", shift: "8am - 4pm" },
    { name: "Emma Davis", role: "Trainer", status: "off-duty", shift: "2pm - 10pm" },
    { name: "Alex Brown", role: "Trainer", status: "on-duty", shift: "6am - 2pm" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Staff Overview
        </CardTitle>
        <CardDescription>Current staff status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {staff.map((person, i) => (
            <div key={i} className="flex items-center gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
              <Avatar>
                <AvatarImage src={`/.jpg?height=40&width=40&query=${person.name}`} />
                <AvatarFallback>
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{person.name}</p>
                <p className="text-xs text-muted-foreground">
                  {person.role} • {person.shift}
                </p>
              </div>
              <Badge variant={person.status === "on-duty" ? "default" : "secondary"} className="text-xs">
                {person.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
