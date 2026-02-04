"use client"

import { useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Star, MessageCircle, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface ClientData {
  id: string
  name: string
  avatar: string
  averageRating: number
  totalRating: number
  totalReviews: number
  joinDate: string
  status: "Active" | "Inactive"
}

// Mock data for clients of a specific trainer
const mockClientsByTrainer: { [key: string]: ClientData[] } = {
  T001: [
    {
      id: "C001",
      name: "Rajesh Kumar",
      avatar: "",
      averageRating: 4.8,
      totalRating: 24.0,
      totalReviews: 5,
      joinDate: "2024-01-10",
      status: "Active",
    },
    {
      id: "C002",
      name: "Priya Sharma",
      avatar: "",
      averageRating: 4.9,
      totalRating: 29.4,
      totalReviews: 6,
      joinDate: "2024-01-15",
      status: "Active",
    },
    {
      id: "C003",
      name: "Amit Singh",
      avatar: "",
      averageRating: 4.7,
      totalRating: 23.5,
      totalReviews: 5,
      joinDate: "2024-02-01",
      status: "Active",
    },
    {
      id: "C004",
      name: "Neha Gupta",
      avatar: "",
      averageRating: 5.0,
      totalRating: 20.0,
      totalReviews: 4,
      joinDate: "2024-02-10",
      status: "Active",
    },
    {
      id: "C005",
      name: "Vikram Patel",
      avatar: "",
      averageRating: 4.6,
      totalRating: 18.4,
      totalReviews: 4,
      joinDate: "2024-02-15",
      status: "Active",
    },
    {
      id: "C006",
      name: "Anjali Roy",
      avatar: "",
      averageRating: 4.85,
      totalRating: 19.4,
      totalReviews: 4,
      joinDate: "2024-03-01",
      status: "Active",
    },
  ],
  T002: [
    {
      id: "C007",
      name: "Harsh Malhotra",
      avatar: "",
      averageRating: 4.9,
      totalRating: 24.5,
      totalReviews: 5,
      joinDate: "2024-01-20",
      status: "Active",
    },
    {
      id: "C008",
      name: "Deepika Singh",
      avatar: "",
      averageRating: 4.7,
      totalRating: 18.8,
      totalReviews: 4,
      joinDate: "2024-02-05",
      status: "Active",
    },
    {
      id: "C009",
      name: "Rohan Verma",
      avatar: "",
      averageRating: 4.8,
      totalRating: 19.2,
      totalReviews: 4,
      joinDate: "2024-02-20",
      status: "Active",
    },
  ],
}

interface TrainerClientsPageProps {
  trainerId: string
  trainerName: string
}

export function TrainerClientsPage({ trainerId, trainerName }: TrainerClientsPageProps) {
  const router = useRouter()
  const { collapsed } = useSidebar()

  const clients = mockClientsByTrainer[trainerId] || []

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return "bg-green-500/10 text-green-600"
    if (rating >= 4.5) return "bg-blue-500/10 text-blue-600"
    if (rating >= 4.0) return "bg-yellow-500/10 text-yellow-600"
    return "bg-orange-500/10 text-orange-600"
  }

  return (
    <main className={cn("min-h-screen bg-background transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{trainerName} - Clients</h1>
            <p className="text-sm text-muted-foreground">View all clients and their ratings</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        {clients.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No clients found for this trainer</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {clients.map((client) => (
              <Card key={client.id} className="hover:shadow-md transition-shadow hover:scale-105 duration-200">
                <CardContent className="p-3">
                  {/* Client Info */}
                  <div className="flex flex-col items-center text-center mb-3">
                    <Avatar className="w-10 h-10 mb-2">
                      <AvatarImage src={client.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-xs line-clamp-2">{client.name}</p>
                    <Badge
                      className={cn(
                        "text-xs mt-1",
                        client.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600",
                      )}
                    >
                      {client.status}
                    </Badge>
                  </div>

                  {/* Rating Stats - Compact */}
                  <div className="space-y-2 mb-3">
                    {/* Average Rating */}
                    <div className="bg-muted rounded p-2">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">Rating</span>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs font-semibold">{client.averageRating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-yellow-500 h-full rounded-full"
                          style={{ width: `${(client.averageRating / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Total Rating */}
                    <div className="flex items-center justify-between text-xs bg-muted rounded p-2">
                      <span className="font-medium text-muted-foreground">Total</span>
                      <Badge variant="outline" className={cn("text-xs", getRatingColor(client.averageRating))}>
                        {client.totalRating.toFixed(1)}
                      </Badge>
                    </div>

                    {/* Reviews Count */}
                    <div className="flex items-center justify-between text-xs bg-muted rounded p-2">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Reviews</span>
                      </div>
                      <span className="font-semibold">{client.totalReviews}</span>
                    </div>
                  </div>

                  {/* View Session Button */}
                  <Button className="w-full text-xs h-7" size="sm">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
