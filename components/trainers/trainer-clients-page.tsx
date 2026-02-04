"use client"

import { useState } from "react"
import { useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Star, MessageCircle, Eye, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface SessionReview {
  id: string
  date: string
  rating: number
  review: string
  trainerNotes: string
}

interface ClientData {
  id: string
  name: string
  avatar: string
  averageRating: number
  totalRating: number
  totalReviews: number
  joinDate: string
  status: "Active" | "Inactive"
  sessions: SessionReview[]
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
      sessions: [
        {
          id: "S001",
          date: "2024-03-15",
          rating: 5,
          review: "Excellent session, very productive workout",
          trainerNotes: "Good form, maintained consistency throughout",
        },
        {
          id: "S002",
          date: "2024-03-10",
          rating: 4.8,
          review: "Great motivation and guidance",
          trainerNotes: "Client showed improvement in strength",
        },
        {
          id: "S003",
          date: "2024-03-05",
          rating: 4.7,
          review: "Well-structured session",
          trainerNotes: "Need to work on flexibility",
        },
        {
          id: "S004",
          date: "2024-02-28",
          rating: 4.9,
          review: "Best trainer ever!",
          trainerNotes: "Client is very dedicated",
        },
        {
          id: "S005",
          date: "2024-02-20",
          rating: 4.6,
          review: "Good but challenging",
          trainerNotes: "Consider adjusting intensity level",
        },
      ],
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
      sessions: [
        {
          id: "S006",
          date: "2024-03-16",
          rating: 5,
          review: "Perfect session, felt amazing",
          trainerNotes: "Excellent progress on cardio",
        },
        {
          id: "S007",
          date: "2024-03-12",
          rating: 4.9,
          review: "Loved the workout plan",
          trainerNotes: "Client is very committed",
        },
        {
          id: "S008",
          date: "2024-03-08",
          rating: 4.8,
          review: "Great energy and support",
          trainerNotes: "Body composition improving well",
        },
        {
          id: "S009",
          date: "2024-03-01",
          rating: 5,
          review: "Outstanding training",
          trainerNotes: "Breaking personal records",
        },
        {
          id: "S010",
          date: "2024-02-25",
          rating: 4.9,
          review: "Very professional",
          trainerNotes: "Core strength developing nicely",
        },
        {
          id: "S011",
          date: "2024-02-18",
          rating: 4.9,
          review: "Best experience",
          trainerNotes: "Client motivation is excellent",
        },
      ],
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
      sessions: [
        {
          id: "S012",
          date: "2024-03-14",
          rating: 4.8,
          review: "Great session overall",
          trainerNotes: "Improving balance and stability",
        },
        {
          id: "S013",
          date: "2024-03-09",
          rating: 4.6,
          review: "Good workout",
          trainerNotes: "Focus on breathing techniques",
        },
        {
          id: "S014",
          date: "2024-03-04",
          rating: 4.7,
          review: "Solid training",
          trainerNotes: "Flexibility work needed",
        },
        {
          id: "S015",
          date: "2024-02-27",
          rating: 4.8,
          review: "Really enjoyed it",
          trainerNotes: "Quick learner",
        },
        {
          id: "S016",
          date: "2024-02-21",
          rating: 4.6,
          review: "Good but tired",
          trainerNotes: "Adjust recovery time",
        },
      ],
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
      sessions: [
        {
          id: "S017",
          date: "2024-03-13",
          rating: 5,
          review: "Perfect training",
          trainerNotes: "Excellent consistency",
        },
        {
          id: "S018",
          date: "2024-03-07",
          rating: 5,
          review: "Amazing experience",
          trainerNotes: "Very motivated client",
        },
        {
          id: "S019",
          date: "2024-03-02",
          rating: 5,
          review: "Outstanding",
          trainerNotes: "Rapid progress",
        },
        {
          id: "S020",
          date: "2024-02-24",
          rating: 5,
          review: "Perfect trainer",
          trainerNotes: "Role model client",
        },
      ],
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
      sessions: [
        {
          id: "S021",
          date: "2024-03-11",
          rating: 4.7,
          review: "Good session",
          trainerNotes: "Improving consistency",
        },
        {
          id: "S022",
          date: "2024-03-06",
          rating: 4.6,
          review: "Decent workout",
          trainerNotes: "Work on form",
        },
        {
          id: "S023",
          date: "2024-02-29",
          rating: 4.5,
          review: "Good effort",
          trainerNotes: "Stamina building",
        },
        {
          id: "S024",
          date: "2024-02-22",
          rating: 4.6,
          review: "Solid training",
          trainerNotes: "Regular progress",
        },
      ],
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
      sessions: [
        {
          id: "S025",
          date: "2024-03-17",
          rating: 4.9,
          review: "Excellent coaching",
          trainerNotes: "Great attitude",
        },
        {
          id: "S026",
          date: "2024-03-11",
          rating: 4.8,
          review: "Very good",
          trainerNotes: "Strong improvement",
        },
        {
          id: "S027",
          date: "2024-03-06",
          rating: 4.8,
          review: "Great session",
          trainerNotes: "Good focus",
        },
        {
          id: "S028",
          date: "2024-02-28",
          rating: 4.85,
          review: "Amazing trainer",
          trainerNotes: "Dedicated student",
        },
      ],
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
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null)
  const [showSessionsDialog, setShowSessionsDialog] = useState(false)

  const clients = mockClientsByTrainer[trainerId] || []

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return "bg-green-500/10 text-green-600"
    if (rating >= 4.5) return "bg-blue-500/10 text-blue-600"
    if (rating >= 4.0) return "bg-yellow-500/10 text-yellow-600"
    return "bg-orange-500/10 text-orange-600"
  }

  const handleViewSessions = (client: ClientData) => {
    setSelectedClient(client)
    setShowSessionsDialog(true)
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
                  <Button
                    className="w-full text-xs h-7"
                    size="sm"
                    onClick={() => handleViewSessions(client)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Sessions Details Dialog */}
      <Dialog open={showSessionsDialog} onOpenChange={setShowSessionsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Session Reviews & Ratings</DialogTitle>
            <DialogDescription>{selectedClient?.name} - Total Reviews: {selectedClient?.totalReviews}</DialogDescription>
          </DialogHeader>

          {selectedClient && selectedClient.sessions.length > 0 ? (
            <div className="space-y-3">
              {selectedClient.sessions.map((session) => (
                <Card key={session.id} className="border">
                  <CardContent className="p-4">
                    {/* Date & Rating */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{format(new Date(session.date), "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold text-sm">{session.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Review */}
                    <div className="mb-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Client Review</p>
                      <p className="text-sm bg-muted rounded p-2">{session.review}</p>
                    </div>

                    {/* Trainer Notes */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Trainer Notes</p>
                      <p className="text-sm bg-blue-50 dark:bg-blue-500/10 rounded p-2 text-blue-900 dark:text-blue-200">
                        {session.trainerNotes}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No sessions found</p>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
