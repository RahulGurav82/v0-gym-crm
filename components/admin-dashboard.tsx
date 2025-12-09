"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, Activity, UserCheck, Calendar, AlertCircle, Clock } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { RecentMembers } from "@/components/recent-members"
import { BranchPerformance } from "@/components/branch-performance"
import { StaffOverview } from "@/components/staff-overview"
import { MemberGrowthChart } from "@/components/member-growth-chart"
import { RevenueChart } from "@/components/revenue-chart"
import { AttendanceChart } from "@/components/attendance-chart"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"

function DashboardContent() {
  const { collapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />

      <div className={`transition-all duration-300 ${collapsed ? "pl-16" : "pl-64"}`}>
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-xs">
                Downtown Branch
              </Badge>
              <ThemeToggle />
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard title="Total Members" value="2,847" change="+12.5%" trend="up" icon={Users} />
              <StatsCard title="Revenue" value="$54,320" change="+8.2%" trend="up" icon={DollarSign} />
              <StatsCard title="Active Today" value="342" change="+23.1%" trend="up" icon={Activity} />
              <StatsCard title="Check-ins" value="1,249" change="+5.4%" trend="up" icon={UserCheck} />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <MemberGrowthChart />
              <RevenueChart />
              <AttendanceChart />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Recent Members */}
              <RecentMembers />

              {/* Branch Performance */}
              <BranchPerformance />
            </div>

            {/* Secondary Grid */}
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Staff Overview */}
              <StaffOverview />

              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {"Today's Schedule"}
                  </CardTitle>
                  <CardDescription>Upcoming classes and sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { time: "09:00 AM", class: "Yoga Flow", trainer: "Sarah Chen", spots: 12 },
                    { time: "11:30 AM", class: "HIIT Training", trainer: "Mike Johnson", spots: 8 },
                    { time: "02:00 PM", class: "Spin Class", trainer: "Emma Davis", spots: 15 },
                    { time: "05:30 PM", class: "CrossFit", trainer: "Alex Brown", spots: 5 },
                  ].map((session, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-sm">{session.class}</p>
                          <Badge variant="outline" className="text-xs">
                            {session.spots} spots
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {session.time} • {session.trainer}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Alerts & Notifications
                  </CardTitle>
                  <CardDescription>Important updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "warning", message: "Equipment maintenance due for Treadmill #5", time: "2h ago" },
                    { type: "info", message: "New membership inquiries: 8", time: "3h ago" },
                    { type: "success", message: "Monthly revenue goal achieved", time: "5h ago" },
                    { type: "warning", message: "Staff schedule needs approval", time: "1d ago" },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          alert.type === "warning"
                            ? "bg-destructive/10"
                            : alert.type === "success"
                              ? "bg-chart-3/10"
                              : "bg-primary/10"
                        }`}
                      >
                        <AlertCircle
                          className={`h-4 w-4 ${
                            alert.type === "warning"
                              ? "text-destructive"
                              : alert.type === "success"
                                ? "text-chart-3"
                                : "text-primary"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export function AdminDashboard() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  )
}
