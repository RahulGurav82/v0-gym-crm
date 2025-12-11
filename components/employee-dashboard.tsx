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
  Calendar,
  ListTodo,
  Phone,
  ClipboardCheck,
  Award,
  BarChart3,
  AlertCircle,
} from "lucide-react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const taskData = [
  { day: "Mon", completed: 8, assigned: 10 },
  { day: "Tue", completed: 12, assigned: 12 },
  { day: "Wed", completed: 9, assigned: 11 },
  { day: "Thu", completed: 10, assigned: 10 },
  { day: "Fri", completed: 7, assigned: 9 },
  { day: "Sat", completed: 5, assigned: 6 },
  { day: "Sun", completed: 3, assigned: 4 },
]

const enquiryData = [
  { name: "New", value: 15, color: "#3b82f6" },
  { name: "Follow Up", value: 8, color: "#f59e0b" },
  { name: "Won", value: 12, color: "#10b981" },
  { name: "Lost", value: 5, color: "#ef4444" },
]

function DashboardContent() {
  const { collapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="employee" />

      <div className={`transition-all duration-300 ${collapsed ? "pl-16" : "pl-64"}`}>
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">Employee Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, John Doe</p>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-xs">
                Downtown Branch
              </Badge>
              <Badge variant="outline" className="text-xs">
                Morning Shift
              </Badge>
              <ThemeToggle />
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback>JD</AvatarFallback>
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
                  <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
                  <ListTodo className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8/12</div>
                  <p className="text-xs text-muted-foreground">4 tasks remaining</p>
                  <Progress value={66.67} className="mt-3 h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Enquiries</CardTitle>
                  <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-chart-3">+12</span> this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-chart-3">38%</span> conversion rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5</div>
                  <p className="text-xs text-muted-foreground">Excellent rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Weekly Task Completion */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Weekly Task Completion
                  </CardTitle>
                  <CardDescription>Your task completion rate this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={taskData}>
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
                      <Bar dataKey="assigned" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Enquiry Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Enquiry Status Distribution
                  </CardTitle>
                  <CardDescription>Your enquiries by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <ResponsiveContainer width="50%" height={200}>
                      <PieChart>
                        <Pie data={enquiryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                          {enquiryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                      {enquiryData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm">{item.name}</span>
                          <span className="text-sm font-semibold ml-auto">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Grid */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Today's Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListTodo className="h-5 w-5" />
                    {"Today's Tasks"}
                  </CardTitle>
                  <CardDescription>Your assigned tasks for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      task: "Follow up with 5 pending enquiries",
                      priority: "high",
                      status: "in-progress",
                      time: "Due in 2 hours",
                    },
                    {
                      task: "Complete member onboarding (John Smith)",
                      priority: "high",
                      status: "pending",
                      time: "Due today",
                    },
                    {
                      task: "Update member attendance records",
                      priority: "medium",
                      status: "completed",
                      time: "Completed",
                    },
                    {
                      task: "Prepare monthly sales report",
                      priority: "medium",
                      status: "pending",
                      time: "Due tomorrow",
                    },
                    {
                      task: "Schedule equipment maintenance",
                      priority: "low",
                      status: "pending",
                      time: "Due in 3 days",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          item.status === "completed"
                            ? "bg-chart-3/10"
                            : item.priority === "high"
                              ? "bg-destructive/10"
                              : "bg-primary/10"
                        }`}
                      >
                        {item.status === "completed" ? (
                          <CheckCircle2 className="h-4 w-4 text-chart-3" />
                        ) : (
                          <Clock
                            className={`h-4 w-4 ${item.priority === "high" ? "text-destructive" : "text-primary"}`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-medium ${item.status === "completed" ? "line-through" : ""}`}>
                            {item.task}
                          </p>
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
                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Tasks
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Enquiries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5" />
                    Recent Enquiries
                  </CardTitle>
                  <CardDescription>Latest enquiries assigned to you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Sarah Williams",
                      type: "Membership",
                      status: "new",
                      time: "5 mins ago",
                      phone: "+1 555-0123",
                    },
                    {
                      name: "Michael Chen",
                      type: "Personal Training",
                      status: "follow-up",
                      time: "1 hour ago",
                      phone: "+1 555-0124",
                    },
                    {
                      name: "Emma Davis",
                      type: "Group Class",
                      status: "follow-up",
                      time: "3 hours ago",
                      phone: "+1 555-0125",
                    },
                    {
                      name: "James Wilson",
                      type: "Membership",
                      status: "won",
                      time: "Yesterday",
                      phone: "+1 555-0126",
                    },
                  ].map((enquiry, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{enquiry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">{enquiry.name}</p>
                          <Badge
                            variant={
                              enquiry.status === "new" ? "default" : enquiry.status === "won" ? "secondary" : "outline"
                            }
                            className="text-xs"
                          >
                            {enquiry.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {enquiry.type} • {enquiry.time}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost" className="shrink-0">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Enquiries
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Upcoming Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Your Schedule
                  </CardTitle>
                  <CardDescription>Upcoming meetings and sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { time: "10:00 AM", title: "Team Meeting", type: "Meeting" },
                    { time: "02:00 PM", title: "Client Follow-up (5 Enquiries)", type: "Follow-up" },
                    { time: "04:30 PM", title: "Member Orientation", type: "Onboarding" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.time} • {item.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    This Month
                  </CardTitle>
                  <CardDescription>Your performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Sales Target</span>
                      <span className="text-sm font-semibold">₹85k / ₹100k</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Follow-ups</span>
                      <span className="text-sm font-semibold">92 / 100</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Conversions</span>
                      <span className="text-sm font-semibold">18 / 25</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Attendance</span>
                      <span className="text-sm font-semibold">22 / 24 days</span>
                    </div>
                    <Progress value={91.67} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Alerts & Reminders
                  </CardTitle>
                  <CardDescription>Important updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "warning", message: "5 enquiries need follow-up today", time: "Now" },
                    { type: "info", message: "New training session scheduled", time: "1h ago" },
                    { type: "success", message: "Monthly target 85% achieved", time: "2h ago" },
                    { type: "warning", message: "Update pending member records", time: "Today" },
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

export function EmployeeDashboard() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  )
}
