"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  ListTodo,
  Users,
  ClipboardCheck,
  Award,
  BarChart3,
  AlertCircle,
  DollarSign,
  UserCheck,
} from "lucide-react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const teamPerformanceData = [
  { day: "Mon", completed: 45, target: 50 },
  { day: "Tue", completed: 52, target: 50 },
  { day: "Wed", completed: 48, target: 50 },
  { day: "Thu", completed: 55, target: 50 },
  { day: "Fri", completed: 49, target: 50 },
  { day: "Sat", completed: 38, target: 40 },
  { day: "Sun", completed: 32, target: 35 },
]

const revenueData = [
  { month: "Jan", revenue: 85000, target: 80000 },
  { month: "Feb", revenue: 92000, target: 85000 },
  { month: "Mar", revenue: 88000, target: 90000 },
  { month: "Apr", revenue: 105000, target: 95000 },
  { month: "May", revenue: 98000, target: 100000 },
  { month: "Jun", revenue: 112000, target: 105000 },
]

function DashboardContent() {
  const { collapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="manager" />

      <div className={`transition-all duration-300 ${collapsed ? "pl-16" : "pl-64"}`}>
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">Manager Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Sarah Johnson</p>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-xs">
                Downtown Branch
              </Badge>
              <Badge variant="outline" className="text-xs">
                Manager
              </Badge>
              <ThemeToggle />
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-chart-3">10 active</span> • 2 on leave
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Branch Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹1.12L</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-chart-3">+6.7%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">248</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-chart-3">+18</span> this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">Target achievement rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Team Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Team Performance
                  </CardTitle>
                  <CardDescription>Weekly task completion vs target</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={teamPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="completed" fill="#ed9320" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Monthly revenue vs target</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#ed9320" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Main Grid */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Priority Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListTodo className="h-5 w-5" />
                    Priority Tasks
                  </CardTitle>
                  <CardDescription>Important tasks requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      task: "Review monthly performance reports",
                      priority: "high",
                      assignee: "Self",
                      time: "Due today",
                    },
                    {
                      task: "Approve 3 pending member enquiries",
                      priority: "high",
                      assignee: "Team",
                      time: "Due in 2 hours",
                    },
                    {
                      task: "Schedule team meeting for Q2 planning",
                      priority: "medium",
                      assignee: "Self",
                      time: "Due tomorrow",
                    },
                    {
                      task: "Verify equipment maintenance logs",
                      priority: "medium",
                      assignee: "Maintenance Team",
                      time: "Due in 2 days",
                    },
                    {
                      task: "Review staff attendance records",
                      priority: "low",
                      assignee: "HR",
                      time: "Due in 3 days",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          item.priority === "high"
                            ? "bg-destructive/10"
                            : item.priority === "medium"
                              ? "bg-primary/10"
                              : "bg-muted"
                        }`}
                      >
                        <Clock
                          className={`h-4 w-4 ${
                            item.priority === "high"
                              ? "text-destructive"
                              : item.priority === "medium"
                                ? "text-primary"
                                : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium">{item.task}</p>
                          <Badge
                            variant={
                              item.priority === "high"
                                ? "destructive"
                                : item.priority === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs shrink-0"
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.assignee} • {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Tasks
                  </Button>
                </CardContent>
              </Card>

              {/* Team Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Overview
                  </CardTitle>
                  <CardDescription>Current team status and performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "John Doe",
                      role: "Sales Executive",
                      status: "active",
                      performance: 95,
                      tasks: "8/10",
                    },
                    {
                      name: "Emily Smith",
                      role: "Trainer",
                      status: "active",
                      performance: 88,
                      tasks: "12/15",
                    },
                    {
                      name: "Mike Johnson",
                      role: "Sales Executive",
                      status: "active",
                      performance: 92,
                      tasks: "9/10",
                    },
                    {
                      name: "Lisa Brown",
                      role: "Receptionist",
                      status: "on-leave",
                      performance: 85,
                      tasks: "0/8",
                    },
                  ].map((member, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">{member.name}</p>
                          <Badge variant={member.status === "active" ? "secondary" : "outline"} className="text-xs">
                            {member.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex-1">
                            <Progress value={member.performance} className="h-1.5" />
                          </div>
                          <span className="text-xs font-medium">{member.tasks}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View Team Details
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Branch Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Branch Targets
                  </CardTitle>
                  <CardDescription>Monthly performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Revenue Target</span>
                      <span className="text-sm font-semibold">₹1.12L / ₹1.05L</span>
                    </div>
                    <Progress value={106.67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">New Members</span>
                      <span className="text-sm font-semibold">18 / 20</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Renewals</span>
                      <span className="text-sm font-semibold">45 / 40</span>
                    </div>
                    <Progress value={112.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Team Attendance</span>
                      <span className="text-sm font-semibold">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5" />
                    Pending Approvals
                  </CardTitle>
                  <CardDescription>Items requiring your approval</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "Leave Request", count: 2, from: "John & Emily" },
                    { type: "Expense Claims", count: 5, from: "Multiple staff" },
                    { type: "Member Refunds", count: 1, from: "Sarah Williams" },
                    { type: "Equipment Purchase", count: 1, from: "Maintenance" },
                    { type: "Schedule Changes", count: 3, from: "Training team" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">{item.type}</p>
                          <Badge variant="secondary" className="text-xs">
                            {item.count}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.from}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    Review Approvals
                  </Button>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Alerts & Issues
                  </CardTitle>
                  <CardDescription>Important notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "warning", message: "Equipment maintenance due in 2 days", time: "Now" },
                    { type: "info", message: "New member feedback received", time: "1h ago" },
                    { type: "warning", message: "Low inventory: Protein supplements", time: "3h ago" },
                    { type: "success", message: "Monthly revenue target exceeded", time: "Today" },
                    { type: "info", message: "Team performance review scheduled", time: "Tomorrow" },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          alert.type === "warning"
                            ? "bg-destructive/10"
                            : alert.type === "success"
                              ? "bg-chart-3/10"
                              : "bg-chart-1/10"
                        }`}
                      >
                        <AlertCircle
                          className={`h-4 w-4 ${
                            alert.type === "warning"
                              ? "text-destructive"
                              : alert.type === "success"
                                ? "text-chart-3"
                                : "text-chart-1"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export function ManagerDashboard() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  )
}
