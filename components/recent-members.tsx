import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

export function RecentMembers() {
  const members = [
    { name: "John Smith", email: "john@example.com", plan: "Premium", status: "active", joined: "2 days ago" },
    { name: "Sarah Johnson", email: "sarah@example.com", plan: "Basic", status: "active", joined: "3 days ago" },
    { name: "Mike Williams", email: "mike@example.com", plan: "Premium", status: "active", joined: "5 days ago" },
    { name: "Emily Brown", email: "emily@example.com", plan: "Standard", status: "pending", joined: "1 week ago" },
    { name: "David Lee", email: "david@example.com", plan: "Premium", status: "active", joined: "1 week ago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Recent Members
        </CardTitle>
        <CardDescription>Latest member registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member, i) => (
            <div key={i} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <Avatar>
                <AvatarImage src={`/.jpg?height=40&width=40&query=${member.name}`} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
              </div>
              <div className="text-right">
                <Badge variant={member.status === "active" ? "default" : "secondary"} className="text-xs">
                  {member.plan}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{member.joined}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
