"use client"
import { useParams, useRouter } from "next/navigation"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowLeft, Calendar, Phone, CheckCircle2, Clock, AlertCircle, ChevronRight } from "lucide-react"
import { format } from "date-fns"

const mockSessions = [
  {
    sessionNumber: 1,
    date: "2025-12-23",
    status: "completed",
    memberStatus: "completed",
    trainerStatus: "completed",
    commission: "83.33",
    isCommissionSent: false,
    notes: "Great workout! Focused on chest and triceps.",
    memberReview: { stars: 4, text: "" },
  },
  {
    sessionNumber: 2,
    date: "2025-12-24",
    status: "completed",
    memberStatus: "completed",
    trainerStatus: "completed",
    commission: "83.33",
    isCommissionSent: false,
    notes: "Leg day. Good progress on squats.",
    memberReview: { stars: 5, text: "Excellent session!" },
  },
  {
    sessionNumber: 3,
    date: null,
    status: "upcoming",
    memberStatus: null,
    trainerStatus: null,
    commission: "83.33",
    isCommissionSent: false,
    notes: "",
    memberReview: null,
  },
]

const mockPTData = {
  id: "mQAnvXGc4dcd87nJXhcT",
  memberName: "test iuiihihj",
  phone: "9137035763",
  trainerId: "HQVJ3ZWsN9kB8n2gQBTU",
  trainerName: "Alex Johnson",
  packageName: "Premium Fitness Bundle",
  totalSlots: 12,
  usedSlots: 2,
  remainingSlots: 10,
  status: "active",
  amount: "2100.00",
  commission: 1000,
  perSessionCommission: 83.33,
}

function ManagerPTDetailsInner() {
  const params = useParams()
  const router = useRouter()
  const { collapsed } = useSidebar()
  const ptId = params.id as string

  const completedSessions = mockSessions.filter((s) => s.status === "completed").length
  const totalSessions = mockSessions.length
  const completionPercent = (completedSessions / totalSessions) * 100

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-chart-3 text-chart-3-foreground">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-500 text-white">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="outline">
            <AlertCircle className="h-3 w-3 mr-1" />
            Upcoming
          </Badge>
        )
      default:
        return null
    }
  }

  const handleViewSession = (sessionNumber: number) => {
    router.push(`/manager/training/${ptId}/session/${sessionNumber}`)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="manager" />

      <main className={cn("flex-1 transition-all duration-300 ease-in-out", collapsed ? "pl-16" : "pl-64")}>
        <div className="container py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">PT Sessions - {mockPTData.memberName}</h1>
              <p className="text-muted-foreground mt-1">View and manage training sessions</p>
            </div>
          </div>

          {/* Member & PT Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-semibold text-2xl">
                    {mockPTData.memberName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{mockPTData.memberName}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {mockPTData.phone}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="default">{mockPTData.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Package</p>
                  <p className="font-semibold">{mockPTData.packageName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trainer</p>
                  <p className="font-semibold">{mockPTData.trainerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-semibold">₹{Number.parseFloat(mockPTData.amount).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Commission</p>
                  <p className="font-semibold text-primary">₹{mockPTData.commission}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">
                    {completedSessions}/{totalSessions} sessions
                  </span>
                </div>
                <Progress value={completionPercent} className="h-3" />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 rounded-lg bg-chart-3/10">
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-chart-3">{mockPTData.usedSlots}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-primary">{mockPTData.totalSlots}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-emerald-500/10">
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-2xl font-bold text-emerald-600">{mockPTData.remainingSlots}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sessions List */}
          <Card>
            <CardHeader>
              <CardTitle>Training Sessions</CardTitle>
              <CardDescription>View all session details and member reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSessions.map((session) => (
                  <div
                    key={session.sessionNumber}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => session.status === "completed" && handleViewSession(session.sessionNumber)}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                      {session.sessionNumber}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Session {session.sessionNumber}</h4>
                        {getStatusBadge(session.status)}
                      </div>

                      {session.date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(session.date), "dd MMM yyyy")}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Commission: <span className="font-semibold text-foreground">₹{session.commission}</span>
                        </span>
                        {session.memberReview?.stars && (
                          <span className="text-muted-foreground">
                            Rating: <span className="font-semibold text-foreground">{session.memberReview.stars}★</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      {session.status === "completed" && (
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function ManagerPTDetails() {
  return (
    <SidebarProvider>
      <ManagerPTDetailsInner />
    </SidebarProvider>
  )
}
