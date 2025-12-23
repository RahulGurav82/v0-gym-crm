"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Target,
  Clock,
  CheckCircle,
  Calendar,
  AlertCircle,
  TrendingUp,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Sidebar, SidebarProvider, useSidebar } from "./sidebar"
import { ThemeToggle } from "./theme-toggle"
import { MobileMenuButton } from "./sidebar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data - filtered for current employee (E001 - Priya Sharma)
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
    id: "FU003",
    enquiryId: "ENQ003",
    enquiryName: "Vikram Mehta",
    enquiryPhone: "9876543212",
    enquiryEmail: "vikram@example.com",
    status: "completed",
    followupDate: new Date(2024, 11, 21, 16, 0),
    followupType: "visit",
    assignedTo: "E001",
    assignedToName: "Priya Sharma",
    assignedTrainer: "",
    assignedTrainerName: "",
    followupResponse: "Visited gym, interested in membership",
    remarks: "Budget constraints initially",
    completedAt: new Date(2024, 11, 21),
    createdBy: { userId: "manager", name: "Manager", role: "manager" },
    createdAt: new Date(2024, 11, 19),
    updatedAt: new Date(2024, 11, 21),
  },
  {
    id: "FU006",
    enquiryId: "ENQ006",
    enquiryName: "Neha Singh",
    enquiryPhone: "9876543215",
    enquiryEmail: "neha@example.com",
    status: "pending",
    followupDate: new Date(2024, 11, 24, 15, 0),
    followupType: "whatsapp",
    assignedTo: "E001",
    assignedToName: "Priya Sharma",
    assignedTrainer: "T002",
    assignedTrainerName: "Kavita Singh",
    followupResponse: "",
    remarks: "Looking for yoga classes",
    completedAt: null,
    createdBy: { userId: "admin", name: "Admin", role: "admin" },
    createdAt: new Date(2024, 11, 22),
    updatedAt: new Date(2024, 11, 22),
  },
  {
    id: "FU007",
    enquiryId: "ENQ007",
    enquiryName: "Arjun Reddy",
    enquiryPhone: "9876543216",
    enquiryEmail: "arjun@example.com",
    status: "rescheduled",
    followupDate: new Date(2024, 11, 29, 11, 0),
    followupType: "call",
    assignedTo: "E001",
    assignedToName: "Priya Sharma",
    assignedTrainer: "",
    assignedTrainerName: "",
    followupResponse: "Requested callback next week",
    remarks: "Interested in gym equipment training",
    completedAt: null,
    createdBy: { userId: "admin", name: "Admin", role: "admin" },
    createdAt: new Date(2024, 11, 21),
    updatedAt: new Date(2024, 11, 24),
  },
]

function getStatusBadge(status: string) {
  const statusConfig = {
    pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
    completed: {
      label: "Completed",
      className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    rescheduled: {
      label: "Rescheduled",
      className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  }
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

function getTypeIcon(type: string) {
  switch (type) {
    case "call":
      return Phone
    case "email":
      return Mail
    case "whatsapp":
      return MessageSquare
    case "visit":
      return MapPin
    default:
      return Phone
  }
}

function EmployeeFollowUpsPageInner() {
  const { collapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Dialog state for follow-up management
  const [selectedFollowUp, setSelectedFollowUp] = useState<(typeof mockFollowUps)[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [followUpStatus, setFollowUpStatus] = useState("completed")
  const [convertibility, setConvertibility] = useState("warm")
  const [followUpResponse, setFollowUpResponse] = useState("")
  const [remark, setRemark] = useState("")
  const [rescheduledDate, setRescheduledDate] = useState("")
  const [rescheduledTime, setRescheduledTime] = useState("")
  const [rescheduledType, setRescheduledType] = useState("call")
  const [rescheduledAssignedTo, setRescheduledAssignedTo] = useState("E001")
  const [rescheduledTrainer, setRescheduledTrainer] = useState("none")

  const handleFollowUpClick = (followUp: (typeof mockFollowUps)[0]) => {
    setSelectedFollowUp(followUp)
    setFollowUpStatus("completed")
    setConvertibility("warm")
    setFollowUpResponse(followUp.followupResponse)
    setRemark(followUp.remarks)
    setDialogOpen(true)
    setRescheduledTrainer(followUp.assignedTrainer || "none")
  }

  const handleSaveAndClose = () => {
    console.log("[v0] Saving follow-up:", {
      id: selectedFollowUp?.id,
      status: followUpStatus,
      convertibility,
      followUpResponse,
      remark,
      ...(followUpStatus === "rescheduled" && {
        rescheduledDate,
        rescheduledTime,
        rescheduledType,
        rescheduledAssignedTo,
        rescheduledTrainer,
      }),
    })
    setDialogOpen(false)
  }

  const handleMakeDead = () => {
    console.log("[v0] Making enquiry dead:", selectedFollowUp?.enquiryId)
    setDialogOpen(false)
  }

  const handleMakeMember = () => {
    console.log("[v0] Converting to member:", selectedFollowUp?.enquiryId)
    setDialogOpen(false)
  }

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
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !followUp.enquiryName.toLowerCase().includes(query) &&
          !followUp.enquiryPhone.includes(query) &&
          !followUp.id.toLowerCase().includes(query)
        ) {
          return false
        }
      }

      // Status filter
      if (statusFilter !== "all" && followUp.status !== statusFilter) {
        return false
      }

      // Type filter
      if (typeFilter !== "all" && followUp.followupType !== typeFilter) {
        return false
      }

      return true
    })
  }, [searchQuery, statusFilter, typeFilter])

  // Pagination
  const totalPages = Math.ceil(filteredFollowUps.length / itemsPerPage)
  const paginatedFollowUps = filteredFollowUps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="employee" />

      <main
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          "pt-16 lg:pt-0",
          collapsed ? "lg:pl-16" : "lg:pl-64",
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6">
          <MobileMenuButton />
          <div className="flex-1">
            <h1 className="text-xl font-semibold">My Follow-Ups</h1>
            <p className="text-sm text-muted-foreground">Track and manage your assigned enquiry follow-ups</p>
          </div>
          <ThemeToggle />
        </header>

        <div className="p-6 space-y-6">
          {/* Analytics Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  <CardTitle>My Follow-Ups</CardTitle>
                  <CardDescription>Track and complete your assigned follow-ups</CardDescription>
                </div>
                <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="rescheduled">Rescheduled</TabsTrigger>
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
                    const isOverdue = followUp.status === "pending" && new Date(followUp.followupDate) < new Date()
                    return (
                      <div
                        key={followUp.id}
                        onClick={() => handleFollowUpClick(followUp)}
                        className={cn(
                          "flex items-start justify-between p-4 rounded-xl border hover:bg-muted/50 transition-colors cursor-pointer",
                          isOverdue && "border-red-500/30 bg-red-500/5",
                        )}
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
                              {isOverdue && (
                                <Badge variant="destructive" className="text-xs">
                                  Overdue
                                </Badge>
                              )}
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
                            </div>
                            {followUp.assignedTrainerName && (
                              <p className="text-xs text-muted-foreground mb-1">
                                Trainer: {followUp.assignedTrainerName}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mb-1">Remarks: {followUp.remarks}</p>
                            {followUp.followupResponse && (
                              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                Response: {followUp.followupResponse}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">{getStatusBadge(followUp.status)}</div>
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
        </div>

        {/* Follow-up Management Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Update Follow-Up</DialogTitle>
              <DialogDescription>
                {selectedFollowUp?.enquiryName} • {selectedFollowUp?.enquiryPhone}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={followUpStatus} onValueChange={setFollowUpStatus}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Convertibility */}
              <div className="space-y-2">
                <Label htmlFor="convertibility">Convertibility *</Label>
                <Select value={convertibility} onValueChange={setConvertibility}>
                  <SelectTrigger id="convertibility">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="cold">Cold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Follow-up Response */}
              <div className="space-y-2">
                <Label htmlFor="response">Follow-up Response *</Label>
                <Textarea
                  id="response"
                  placeholder="Enter follow-up response..."
                  value={followUpResponse}
                  onChange={(e) => setFollowUpResponse(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Remark */}
              <div className="space-y-2">
                <Label htmlFor="remark">Remark</Label>
                <Textarea
                  id="remark"
                  placeholder="Add any additional remarks..."
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  rows={2}
                />
              </div>

              {/* Rescheduled Fields */}
              {followUpStatus === "rescheduled" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rescheduled-date">Follow-up Date *</Label>
                      <Input
                        id="rescheduled-date"
                        type="date"
                        value={rescheduledDate}
                        onChange={(e) => setRescheduledDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rescheduled-time">Follow-up Time *</Label>
                      <Input
                        id="rescheduled-time"
                        type="time"
                        value={rescheduledTime}
                        onChange={(e) => setRescheduledTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rescheduled-type">Follow-up Type *</Label>
                    <Select value={rescheduledType} onValueChange={setRescheduledType}>
                      <SelectTrigger id="rescheduled-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="visit">Visit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assigned-to">Assigned To *</Label>
                    <Select value={rescheduledAssignedTo} onValueChange={setRescheduledAssignedTo}>
                      <SelectTrigger id="assigned-to">
                        <SelectValue placeholder="Select staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="E001">Priya Sharma</SelectItem>
                        <SelectItem value="E002">Rahul Verma</SelectItem>
                        <SelectItem value="E003">Sneha Desai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assigned-trainer">Assigned Trainer</Label>
                    <Select value={rescheduledTrainer} onValueChange={setRescheduledTrainer}>
                      <SelectTrigger id="assigned-trainer">
                        <SelectValue placeholder="Select trainer (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="T001">Amit Patel</SelectItem>
                        <SelectItem value="T002">Kavita Singh</SelectItem>
                        <SelectItem value="T003">Ravi Kumar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <Button variant="destructive" onClick={handleMakeDead}>
                  Make Dead
                </Button>
                <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleMakeMember}>
                  Make Member
                </Button>
                <div className="flex-1" />
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveAndClose}>Save and Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

export function EmployeeFollowUpsPage() {
  return (
    <SidebarProvider>
      <EmployeeFollowUpsPageInner />
    </SidebarProvider>
  )
}
