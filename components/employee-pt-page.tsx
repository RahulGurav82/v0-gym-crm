"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Dumbbell, CheckCircle2, Clock, Calendar, User } from "lucide-react"
import { Sidebar, SidebarProvider } from "./sidebar"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { format } from "date-fns"

// Mock PT assignments for the logged-in employee
const mockPTAssignments = [
  {
    id: "PT001",
    member: {
      id: "M001",
      name: "John Doe",
      phone: "9876543210",
      email: "john@example.com",
      avatar: "JD",
    },
    totalSessions: 24,
    completedSessions: 8,
    pendingSessions: 3,
    remainingSessions: 13,
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    status: "active",
    branch: "Ghansoli",
  },
  {
    id: "PT002",
    member: {
      id: "M002",
      name: "Jane Smith",
      phone: "9876543211",
      email: "jane@example.com",
      avatar: "JS",
    },
    totalSessions: 12,
    completedSessions: 12,
    pendingSessions: 0,
    remainingSessions: 0,
    startDate: "2023-12-01",
    endDate: "2024-03-01",
    status: "completed",
    branch: "Nerul",
  },
  {
    id: "PT003",
    member: {
      id: "M003",
      name: "Mike Johnson",
      phone: "9876543212",
      email: "mike@example.com",
      avatar: "MJ",
    },
    totalSessions: 16,
    completedSessions: 4,
    pendingSessions: 1,
    remainingSessions: 11,
    startDate: "2024-02-01",
    endDate: "2024-06-01",
    status: "active",
    branch: "Ghansoli",
  },
]

export default function EmployeePTPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAssignments = mockPTAssignments.filter(
    (pt) =>
      pt.member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.member.phone.includes(searchQuery) ||
      pt.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const stats = [
    {
      label: "Active PT Clients",
      value: mockPTAssignments.filter((pt) => pt.status === "active").length.toString(),
      icon: User,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total Sessions",
      value: mockPTAssignments.reduce((acc, pt) => acc + pt.totalSessions, 0).toString(),
      icon: Dumbbell,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Completed Sessions",
      value: mockPTAssignments.reduce((acc, pt) => acc + pt.completedSessions, 0).toString(),
      icon: CheckCircle2,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Pending Approval",
      value: mockPTAssignments.reduce((acc, pt) => acc + pt.pendingSessions, 0).toString(),
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar role="employee" />

        <div className="flex-1 pl-16 lg:pl-64 transition-all duration-300">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6">
            <div className="flex-1">
              <h1 className="text-xl font-semibold">My PT Clients</h1>
              <p className="text-sm text-muted-foreground">Manage your personal training sessions</p>
            </div>
            <ThemeToggle />
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor}`}>
                          <Icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>PT Assignments</CardTitle>
                <CardDescription>View and manage your personal training clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by member name, phone, or PT ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-background"
                  />
                </div>
              </CardContent>
            </Card>

            {/* PT Assignments Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAssignments.map((pt) => {
                const completionPercent = (pt.completedSessions / pt.totalSessions) * 100
                const isExpiringSoon =
                  new Date(pt.endDate).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000 &&
                  pt.status === "active"

                return (
                  <Card key={pt.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold text-lg">
                            {pt.member.avatar}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{pt.member.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{pt.id}</p>
                          </div>
                        </div>
                        <Badge variant={pt.status === "active" ? "default" : "secondary"}>
                          {pt.status === "active" ? "Active" : "Completed"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">
                            {pt.completedSessions}/{pt.totalSessions} sessions
                          </span>
                        </div>
                        <Progress value={completionPercent} className="h-2" />
                        <p className="text-xs text-muted-foreground">{completionPercent.toFixed(0)}% completed</p>
                      </div>

                      {/* Session Stats */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 rounded-lg bg-chart-3/10">
                          <p className="text-xs text-muted-foreground">Completed</p>
                          <p className="text-lg font-bold text-chart-3">{pt.completedSessions}</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-amber-500/10">
                          <p className="text-xs text-muted-foreground">Pending</p>
                          <p className="text-lg font-bold text-amber-500">{pt.pendingSessions}</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted">
                          <p className="text-xs text-muted-foreground">Remaining</p>
                          <p className="text-lg font-bold">{pt.remainingSessions}</p>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {format(new Date(pt.startDate), "dd MMM yyyy")} -{" "}
                          {format(new Date(pt.endDate), "dd MMM yyyy")}
                        </span>
                      </div>

                      {isExpiringSoon && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 text-amber-600 text-xs">
                          <Clock className="h-3 w-3" />
                          <span>Expiring soon</span>
                        </div>
                      )}

                      {/* Action */}
                      <Link href={`/employee/my-pt/${pt.id}`}>
                        <Button className="w-full" variant={pt.remainingSessions > 0 ? "default" : "secondary"}>
                          View Sessions
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredAssignments.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold mb-2">No PT clients found</p>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? "Try adjusting your search" : "You don't have any PT clients assigned yet"}
                  </p>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
