"use client"

import { useParams, useRouter } from "next/navigation"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowLeft, User, Star, MessageSquare, DollarSign, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"

const mockSessionData = {
  sessionNumber: 1,
  date: "2025-12-23T12:34:42.000Z",
  status: "completed",
  memberStatus: "completed",
  trainerStatus: "completed",
  commission: "83.33",
  isCommissionSent: false,
  notes: "Great workout! Focused on chest and triceps. Member showed excellent form and dedication.",
  memberReview: {
    stars: 4,
    text: "Very good session. Trainer was professional and guided me well throughout the exercises.",
  },
  markedBy: {
    userId: "HQVJ3ZWsN9kB8n2gQBTU",
    phone: "9000000003",
    role: "employee",
  },
  memberName: "test iuiihihj",
  trainerName: "Alex Johnson",
}

function ManagerSessionDetailsInner() {
  const params = useParams()
  const router = useRouter()
  const { collapsed } = useSidebar()
  const ptId = params.id as string
  const sessionId = params.sessionId as string

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
              <h1 className="text-3xl font-bold">Session #{sessionId} Details</h1>
              <p className="text-muted-foreground mt-1">View complete session information and member feedback</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Session Information */}
            <Card>
              <CardHeader>
                <CardTitle>Session Information</CardTitle>
                <CardDescription>Basic details about this training session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-muted-foreground">Session Number</span>
                  <span className="font-semibold">#{mockSessionData.sessionNumber}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-muted-foreground">Date & Time</span>
                  <span className="font-semibold">
                    {format(new Date(mockSessionData.date), "dd MMM yyyy, hh:mm a")}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-chart-3 text-chart-3-foreground">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {mockSessionData.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-muted-foreground">Member</span>
                  <span className="font-semibold">{mockSessionData.memberName}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-muted-foreground">Trainer</span>
                  <span className="font-semibold">{mockSessionData.trainerName}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-muted-foreground">Member Status</span>
                  <Badge variant="outline">{mockSessionData.memberStatus}</Badge>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">Trainer Status</span>
                  <Badge variant="outline">{mockSessionData.trainerStatus}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Commission & Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Commission Details</CardTitle>
                <CardDescription>Payment information for this session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 rounded-lg bg-primary/10 text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Session Commission</p>
                  <p className="text-4xl font-bold text-primary mt-2">₹{mockSessionData.commission}</p>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-muted-foreground">Commission Sent</span>
                  <Badge variant={mockSessionData.isCommissionSent ? "default" : "secondary"}>
                    {mockSessionData.isCommissionSent ? "Sent" : "Pending"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Marked By</p>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {mockSessionData.markedBy.role} - {mockSessionData.markedBy.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trainer Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Trainer Notes</CardTitle>
                <CardDescription>Session notes from the trainer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm">{mockSessionData.notes || "No notes available for this session."}</p>
                </div>
              </CardContent>
            </Card>

            {/* Member Review */}
            <Card>
              <CardHeader>
                <CardTitle>Member Review</CardTitle>
                <CardDescription>Feedback from the member</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSessionData.memberReview ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < mockSessionData.memberReview!.stars
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground",
                            )}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{mockSessionData.memberReview.stars} / 5</span>
                    </div>

                    {mockSessionData.memberReview.text && (
                      <div className="p-4 rounded-lg bg-muted">
                        <p className="text-sm">{mockSessionData.memberReview.text}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">No review submitted yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ManagerSessionDetails() {
  return (
    <SidebarProvider>
      <ManagerSessionDetailsInner />
    </SidebarProvider>
  )
}
