"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  CheckCheck,
} from "lucide-react"
import { Sidebar, SidebarProvider } from "./sidebar"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { useParams } from "next/navigation"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock PT sessions data
const mockSessions = [
  {
    sessionNumber: 1,
    date: "2024-01-20",
    status: "completed",
    markedBy: "trainer",
    approvedBy: "member",
    approvedAt: "2024-01-20 18:30",
    notes: "Great workout! Focused on chest and triceps.",
  },
  {
    sessionNumber: 2,
    date: "2024-01-23",
    status: "completed",
    markedBy: "trainer",
    approvedBy: "member",
    approvedAt: "2024-01-23 19:00",
    notes: "Leg day. Good progress on squats.",
  },
  {
    sessionNumber: 3,
    date: "2024-01-25",
    status: "completed",
    markedBy: "trainer",
    approvedBy: "member",
    approvedAt: "2024-01-25 18:45",
    notes: "Back and biceps. Excellent form.",
  },
  {
    sessionNumber: 4,
    date: "2024-01-27",
    status: "completed",
    markedBy: "trainer",
    approvedBy: "member",
    approvedAt: "2024-01-27 19:15",
    notes: "Shoulders and abs workout.",
  },
  {
    sessionNumber: 5,
    date: "2024-01-30",
    status: "completed",
    markedBy: "trainer",
    approvedBy: "member",
    approvedAt: "2024-01-30 18:50",
    notes: "Full body workout session.",
  },
  {
    sessionNumber: 6,
    date: "2024-02-01",
    status: "completed",
    markedBy: "trainer",
    approvedBy: "member",
    approvedAt: "2024-02-01 19:20",
    notes: "Cardio and HIIT training.",
  },
  {
    sessionNumber: 7,
    date: "2024-02-03",
    status: "completed",
    markedBy: "trainer",
    approvedBy: "member",
    approvedAt: "2024-02-03 18:40",
    notes: "Strength training - deadlifts focus.",
  },
  {
    sessionNumber: 8,
    date: "2024-02-05",
    status: "completed",
    markedBy: "trainer",
    approvedBy: "member",
    approvedAt: "2024-02-05 19:10",
    notes: "Upper body and core workout.",
  },
  {
    sessionNumber: 9,
    date: "2024-02-07",
    status: "pending-approval",
    markedBy: "trainer",
    markedAt: "2024-02-07 18:55",
    notes: "Lower body workout - awaiting member approval.",
  },
  {
    sessionNumber: 10,
    date: "2024-02-09",
    status: "pending-approval",
    markedBy: "trainer",
    markedAt: "2024-02-09 19:05",
    notes: "Push day - bench press and overhead press.",
  },
  {
    sessionNumber: 11,
    date: "2024-02-11",
    status: "pending-approval",
    markedBy: "trainer",
    markedAt: "2024-02-11 18:30",
    notes: "Pull day - rows and pullups.",
  },
  { sessionNumber: 12, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 13, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 14, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 15, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 16, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 17, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 18, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 19, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 20, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 21, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 22, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 23, date: null, status: "upcoming", notes: "" },
  { sessionNumber: 24, date: null, status: "upcoming", notes: "" },
]

const mockMember = {
  id: "M001",
  name: "John Doe",
  phone: "9876543210",
  email: "john@example.com",
  avatar: "JD",
}

export default function EmployeePTDetails() {
  const params = useParams()
  const ptId = params.id as string
  const [sessions, setSessions] = useState(mockSessions)
  const [showMarkDialog, setShowMarkDialog] = useState(false)
  const [selectedSession, setSelectedSession] = useState<number | null>(null)
  const [sessionNotes, setSessionNotes] = useState("")

  const completedSessions = sessions.filter((s) => s.status === "completed").length
  const pendingSessions = sessions.filter((s) => s.status === "pending-approval").length
  const remainingSessions = sessions.filter((s) => s.status === "upcoming").length
  const totalSessions = sessions.length
  const completionPercent = (completedSessions / totalSessions) * 100

  const handleMarkSession = (sessionNumber: number) => {
    setSelectedSession(sessionNumber)
    setSessionNotes("")
    setShowMarkDialog(true)
  }

  const confirmMarkSession = () => {
    if (selectedSession === null) return

    setSessions((prev) =>
      prev.map((session) =>
        session.sessionNumber === selectedSession
          ? {
              ...session,
              status: "pending-approval" as const,
              markedBy: "trainer",
              markedAt: new Date().toISOString(),
              date: new Date().toISOString().split("T")[0],
              notes: sessionNotes,
            }
          : session,
      ),
    )

    setShowMarkDialog(false)
    setSelectedSession(null)
    setSessionNotes("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-chart-3 text-chart-3-foreground">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "pending-approval":
        return (
          <Badge className="bg-amber-500 text-white">
            <Clock className="h-3 w-3 mr-1" />
            Pending Approval
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar role="employee" />

        <div className="flex-1 pl-16 lg:pl-64 transition-all duration-300">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6">
            <Link href="/employee/my-pt">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">PT Sessions - {ptId}</h1>
              <p className="text-sm text-muted-foreground">Manage sessions for {mockMember.name}</p>
            </div>
            <ThemeToggle />
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Member Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-semibold text-2xl">
                      {mockMember.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{mockMember.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {mockMember.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {mockMember.email}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-semibold">
                      {completedSessions}/{totalSessions} sessions
                    </span>
                  </div>
                  <Progress value={completionPercent} className="h-3" />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 rounded-lg bg-chart-3/10">
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-chart-3">{completedSessions}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-amber-500/10">
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-amber-500">{pendingSessions}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="text-2xl font-bold">{remainingSessions}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sessions List */}
            <Card>
              <CardHeader>
                <CardTitle>Training Sessions</CardTitle>
                <CardDescription>Track and manage all PT sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.sessionNumber}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
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
                            <span>{format(new Date(session.date), "dd MMM yyyy, hh:mm a")}</span>
                          </div>
                        )}

                        {session.notes && (
                          <div className="flex items-start gap-2 text-sm">
                            <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-muted-foreground">{session.notes}</p>
                          </div>
                        )}

                        {session.status === "completed" && session.approvedAt && (
                          <div className="flex items-center gap-2 text-xs text-chart-3">
                            <CheckCheck className="h-3 w-3" />
                            <span>Approved on {format(new Date(session.approvedAt), "dd MMM yyyy, hh:mm a")}</span>
                          </div>
                        )}

                        {session.status === "pending-approval" && (
                          <div className="flex items-center gap-2 text-xs text-amber-600">
                            <Clock className="h-3 w-3" />
                            <span>Waiting for member approval</span>
                          </div>
                        )}
                      </div>

                      <div>
                        {session.status === "upcoming" && (
                          <Button onClick={() => handleMarkSession(session.sessionNumber)} size="sm">
                            Mark as Taken
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Mark Session Dialog */}
      <Dialog open={showMarkDialog} onOpenChange={setShowMarkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Session as Taken</DialogTitle>
            <DialogDescription>
              Add notes about this session. The member will need to approve it before it's marked as completed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Session Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about the workout, exercises performed, progress, etc..."
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                rows={5}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMarkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmMarkSession}>Mark Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
