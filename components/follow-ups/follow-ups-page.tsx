"use client"

import { useState, useMemo } from "react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for follow-ups
const mockFollowUps = [
  {
    id: "FU001",
    enquiryId: "ENQ001",
    enquiryName: "Rajesh Kumar",
    enquiryPhone: "9876543210",
    enquiryEmail: "rajesh@example.com",
    status: "pending",
    followupDate: new Date(2024, 11, 25, 10, 0),
    followupType: "call",
    assignedTo: "E001",
    assignedToName: "Priya Sharma",
    assignedTrainer: "T001",
    assignedTrainerName: "Amit Patel",
    followupResponse: "",
    remarks: "Interested in 6-month package with PT",
    completedAt: null,
    createdBy: { userId: "admin", name: "Admin", role: "admin" },
    createdAt: new Date(2024, 11, 20),
    updatedAt: new Date(2024, 11, 20),
  },
  {
    id: "FU002",
    enquiryId: "ENQ002",
    enquiryName: "Sneha Desai",
    enquiryPhone: "9876543211",
    enquiryEmail: "sneha@example.com",
    status: "completed",
    followupDate: new Date(2024, 11, 22, 14, 30),
    followupType: "whatsapp",
    assignedTo: "E002",
    assignedToName: "Rahul Verma",
    assignedTrainer: "T002",
    assignedTrainerName: "Kavita Singh",
    followupResponse: "Very interested, will visit tomorrow",
    remarks: "Looking for yoga and zumba classes",
    completedAt: new Date(2024, 11, 22),
    createdBy: { userId: "admin", name: "Admin", role: "admin" },
    createdAt: new Date(2024, 11, 18),
    updatedAt: new Date(2024, 11, 22),
  },
  {
    id: "FU003",
    enquiryId: "ENQ003",
    enquiryName: "Vikram Mehta",
    enquiryPhone: "9876543212",
    enquiryEmail: "vikram@example.com",
    status: "cancelled",
    followupDate: new Date(2024, 11, 21, 16, 0),
    followupType: "visit",
    assignedTo: "E001",
    assignedToName: "Priya Sharma",
    assignedTrainer: "",
    assignedTrainerName: "",
    followupResponse: "Not interested anymore",
    remarks: "Budget constraints",
    completedAt: new Date(2024, 11, 21),
    createdBy: { userId: "manager", name: "Manager", role: "manager" },
    createdAt: new Date(2024, 11, 19),
    updatedAt: new Date(2024, 11, 21),
  },
  {
    id: "FU004",
    enquiryId: "ENQ004",
    enquiryName: "Anita Joshi",
    enquiryPhone: "9876543213",
    enquiryEmail: "anita@example.com",
    status: "rescheduled",
    followupDate: new Date(2024, 11, 28, 11, 30),
    followupType: "call",
    assignedTo: "E003",
    assignedToName: "Karan Malhotra",
    assignedTrainer: "T001",
    assignedTrainerName: "Amit Patel",
    followupResponse: "Requested to call later",
    remarks: "Interested in CrossFit",
    completedAt: null,
    createdBy: { userId: "admin", name: "Admin", role: "admin" },
    createdAt: new Date(2024, 11, 21),
    updatedAt: new Date(2024, 11, 24),
  },
  {
    id: "FU005",
    enquiryId: "ENQ005",
    enquiryName: "Rohit Kapoor",
    enquiryPhone: "9876543214",
    enquiryEmail: "rohit@example.com",
    status: "pending",
    followupDate: new Date(2024, 11, 26, 9, 0),
    followupType: "email",
    assignedTo: "E002",
    assignedToName: "Rahul Verma",
    assignedTrainer: "",
    assignedTrainerName: "",
    followupResponse: "",
    remarks: "Send package details and pricing",
    completedAt: null,
    createdBy: { userId: "admin", name: "Admin", role: "admin" },
    createdAt: new Date(2024, 11, 23),
    updatedAt: new Date(2024, 11, 23),
  },
]

function FollowUpsPageInner() {
  const { collapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [staffFilter, setStaffFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate stats
  const stats = useMemo(() => {
    const total = mockFollowUps.length
    const pending = mockFollowUps.filter((f) => f.status === "pending").length
    const completed = mockFollowUps.filter((f) => f.status === "completed").length
    const today = new Date().toISOString().split("T")[0]
    const todaysFollowUps = mockFollowUps.filter((f) => {
      const followupDate = new Date(f.followupDate).toISOString().split("T")[0]
      return followupDate === today && f.status === "pending"
    }).length

    const overdueFollowUps = mockFollowUps.filter((f) => {
      const followupDate = new Date(f.followupDate)
      return followupDate < new Date() && f.status === "pending"
    }).length

    const rescheduled = mockFollowUps.filter((f) => f.status === "rescheduled").length

    // Type distribution
    const callCount = mockFollowUps.filter((f) => f.followupType === "call").length
    const emailCount = mockFollowUps.filter((f) => f.followupType === "email").length
    const whatsappCount = mockFollowUps.filter((f) => f.followupType === "whatsapp").length
    const visitCount = mockFollowUps.filter((f) => f.followupType === "visit").length

    // Conversion rate
    const conversionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      total,
      pending,
      completed,
      todaysFollowUps,
      overdueFollowUps,
      rescheduled,
      callCount,
      emailCount,
      whatsappCount,
      visitCount,
      conversionRate,
    }
  }, [])

  // Filter follow-ups
  const filteredFollowUps = useMemo(() => {
    return mockFollowUps.filter((followUp) => {
      const matchesSearch =
        followUp.enquiryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        followUp.enquiryPhone.includes(searchQuery) ||
        followUp.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || followUp.status === statusFilter
      const matchesType = typeFilter === "all" || followUp.followupType === typeFilter
      const matchesStaff = staffFilter === "all" || followUp.assignedToName === staffFilter
      return matchesSearch && matchesStatus && matchesType && matchesStaff
    })
  }, [searchQuery, statusFilter, typeFilter, staffFilter])

  const totalPages = Math.ceil(filteredFollowUps.length / itemsPerPage)
  const paginatedFollowUps = filteredFollowUps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { icon: Clock, label: "Pending", className: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
      completed: {
        icon: CheckCircle,
        label: "Completed",
        className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
      },
      cancelled: { icon: XCircle, label: "Cancelled", className: "bg-red-500/10 text-red-700 dark:text-red-400" },
      rescheduled: {
        icon: RefreshCw,
        label: "Rescheduled",
        className: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      },
    }
    const variant = variants[status as keyof typeof variants]
    const Icon = variant.icon
    return (
      <Badge variant="outline" className={cn("gap-1", variant.className)}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    )
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      call: Phone,
      email: Mail,
      whatsapp: MessageSquare,
      visit: MapPin,
    }
    return icons[type as keyof typeof icons]
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      <main
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          "p-4 md:p-6 lg:p-8",
          collapsed ? "lg:ml-16" : "lg:ml-64",
        )}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Enquiry Follow-Ups</h1>
          <p className="text-muted-foreground">Track and manage all enquiry follow-ups</p>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Today's</p>
                  <p className="text-2xl font-bold">{stats.todaysFollowUps}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold">{stats.overdueFollowUps}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rescheduled</p>
                  <p className="text-2xl font-bold">{stats.rescheduled}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Follow-up Type Distribution */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Calls</span>
                </div>
                <span className="text-xl font-bold">{stats.callCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Emails</span>
                </div>
                <span className="text-xl font-bold">{stats.emailCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </div>
                <span className="text-xl font-bold">{stats.whatsappCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Visits</span>
                </div>
                <span className="text-xl font-bold">{stats.visitCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Follow-Ups Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle>All Follow-Ups</CardTitle>
                <CardDescription>Manage and track enquiry follow-ups</CardDescription>
              </div>
              <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="rescheduled">Rescheduled</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="visit">Visit</SelectItem>
                </SelectContent>
              </Select>
              <Select value={staffFilter} onValueChange={setStaffFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Assigned To" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Staff</SelectItem>
                  <SelectItem value="Priya Sharma">Priya Sharma</SelectItem>
                  <SelectItem value="Rahul Verma">Rahul Verma</SelectItem>
                  <SelectItem value="Karan Malhotra">Karan Malhotra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedFollowUps.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No follow-ups found</p>
                </div>
              ) : (
                paginatedFollowUps.map((followUp) => {
                  const TypeIcon = getTypeIcon(followUp.followupType)
                  return (
                    <div
                      key={followUp.id}
                      className="flex items-start justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{followUp.enquiryName}</p>
                            <Badge variant="outline" className="text-xs">
                              {followUp.id}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {followUp.enquiryPhone} • {followUp.enquiryEmail}
                          </p>
                          <div className="flex items-center gap-4 text-sm mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{format(followUp.followupDate, "dd MMM yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{format(followUp.followupDate, "hh:mm a")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>{followUp.assignedToName}</span>
                            </div>
                          </div>
                          {followUp.assignedTrainerName && (
                            <p className="text-xs text-muted-foreground mb-1">
                              Trainer: {followUp.assignedTrainerName}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mb-1">Remarks: {followUp.remarks}</p>
                          {followUp.followupResponse && (
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                              Response: {followUp.followupResponse}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Created: {format(followUp.createdAt, "dd MMM yyyy")} by {followUp.createdBy.name}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="ml-4">{getStatusBadge(followUp.status)}</div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredFollowUps.length)} of {filteredFollowUps.length}{" "}
                  follow-ups
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-9"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function FollowUpsPage() {
  return (
    <SidebarProvider>
      <FollowUpsPageInner />
    </SidebarProvider>
  )
}
