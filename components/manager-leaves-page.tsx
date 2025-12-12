"use client"
import { useState, useMemo } from "react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarDays,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Check,
  X,
  CalendarCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  employeeRole: string
  employeeAvatar?: string
  type: string
  typeLabel: string
  startDate: Date
  endDate: Date
  days: number
  reason: string
  status: "pending" | "approved" | "rejected"
  appliedOn: Date
  approvedBy?: string
  approvedOn?: Date
  rejectionReason?: string
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "LV001",
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    employeeRole: "Senior Trainer",
    type: "casual",
    typeLabel: "Casual Leave",
    startDate: new Date(2025, 0, 20),
    endDate: new Date(2025, 0, 22),
    days: 3,
    reason: "Family function to attend",
    status: "pending",
    appliedOn: new Date(2025, 0, 15),
  },
  {
    id: "LV002",
    employeeId: "EMP002",
    employeeName: "Priya Patel",
    employeeRole: "Receptionist",
    type: "sick",
    typeLabel: "Sick Leave",
    startDate: new Date(2025, 0, 18),
    endDate: new Date(2025, 0, 19),
    days: 2,
    reason: "Fever and cold, doctor advised rest",
    status: "pending",
    appliedOn: new Date(2025, 0, 17),
  },
  {
    id: "LV003",
    employeeId: "EMP003",
    employeeName: "Amit Kumar",
    employeeRole: "Sales Executive",
    type: "earned",
    typeLabel: "Earned Leave",
    startDate: new Date(2025, 1, 1),
    endDate: new Date(2025, 1, 5),
    days: 5,
    reason: "Planned vacation with family",
    status: "approved",
    appliedOn: new Date(2025, 0, 10),
    approvedBy: "Manager",
    approvedOn: new Date(2025, 0, 11),
  },
  {
    id: "LV004",
    employeeId: "EMP004",
    employeeName: "Sneha Desai",
    employeeRole: "Trainer",
    type: "casual",
    typeLabel: "Casual Leave",
    startDate: new Date(2025, 0, 25),
    endDate: new Date(2025, 0, 26),
    days: 2,
    reason: "Personal work",
    status: "approved",
    appliedOn: new Date(2025, 0, 20),
    approvedBy: "Manager",
    approvedOn: new Date(2025, 0, 21),
  },
  {
    id: "LV005",
    employeeId: "EMP005",
    employeeName: "Vikram Singh",
    employeeRole: "Maintenance Staff",
    type: "sick",
    typeLabel: "Sick Leave",
    startDate: new Date(2025, 0, 22),
    endDate: new Date(2025, 0, 23),
    days: 2,
    reason: "Back pain issue",
    status: "rejected",
    appliedOn: new Date(2025, 0, 21),
    rejectionReason: "Need more staff coverage during this period",
  },
  {
    id: "LV006",
    employeeId: "EMP006",
    employeeName: "Anjali Verma",
    employeeRole: "Nutritionist",
    type: "earned",
    typeLabel: "Earned Leave",
    startDate: new Date(2025, 0, 28),
    endDate: new Date(2025, 0, 30),
    days: 3,
    reason: "Attending wellness conference",
    status: "pending",
    appliedOn: new Date(2025, 0, 18),
  },
]

function ManagerLeavesInner() {
  const { collapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null)
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject">("approve")
  const [rejectionReason, setRejectionReason] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0))

  const stats = useMemo(() => {
    const total = mockLeaveRequests.length
    const pending = mockLeaveRequests.filter((r) => r.status === "pending").length
    const approved = mockLeaveRequests.filter((r) => r.status === "approved").length
    const rejected = mockLeaveRequests.filter((r) => r.status === "rejected").length

    return { total, pending, approved, rejected }
  }, [])

  const filteredRequests = useMemo(() => {
    return mockLeaveRequests.filter((request) => {
      const matchesSearch =
        request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || request.status === statusFilter
      const matchesType = typeFilter === "all" || request.type === typeFilter
      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchQuery, statusFilter, typeFilter])

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const approvedLeaves = mockLeaveRequests.filter((r) => r.status === "approved")

  const handleAction = (request: LeaveRequest, action: "approve" | "reject") => {
    setSelectedRequest(request)
    setActionType(action)
    setShowActionDialog(true)
    setRejectionReason("")
  }

  const confirmAction = () => {
    // Here you would make an API call to update the leave status
    console.log(`[v0] ${actionType} leave request:`, selectedRequest?.id)
    if (actionType === "reject" && rejectionReason) {
      console.log(`[v0] Rejection reason:`, rejectionReason)
    }
    setShowActionDialog(false)
    setSelectedRequest(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    return { daysInMonth, startingDayOfWeek }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)

  const getLeavesForDate = (day: number) => {
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    return approvedLeaves.filter((leave) => {
      const startDate = new Date(leave.startDate)
      const endDate = new Date(leave.endDate)
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(0, 0, 0, 0)
      dateToCheck.setHours(0, 0, 0, 0)

      return dateToCheck >= startDate && dateToCheck <= endDate
    })
  }

  const isWeekend = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar role="manager" />
      <div className={cn("flex-1 transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Leave Management</h1>
              <p className="text-muted-foreground">Manage employee leave requests</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <CalendarDays className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">All time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stats.pending}</p>
                    <p className="text-xs text-muted-foreground">Awaiting review</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stats.approved}</p>
                    <p className="text-xs text-muted-foreground">Confirmed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stats.rejected}</p>
                    <p className="text-xs text-muted-foreground">Declined</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList>
              <TabsTrigger value="requests">
                <Users className="w-4 h-4 mr-2" />
                Leave Requests
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="w-4 h-4 mr-2" />
                Leave Calendar
              </TabsTrigger>
            </TabsList>

            {/* Leave Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filter Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Leave Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="casual">Casual Leave</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="earned">Earned Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Leave Requests List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Leave Requests</CardTitle>
                      <CardDescription>Review and manage employee leave applications</CardDescription>
                    </div>
                    <Badge variant="outline">{filteredRequests.length} requests</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paginatedRequests.length === 0 ? (
                      <div className="text-center py-12">
                        <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No leave requests found</p>
                      </div>
                    ) : (
                      paginatedRequests.map((request) => (
                        <div
                          key={request.id}
                          className="flex items-start justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-4 flex-1">
                            {/* Employee Avatar */}
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Users className="w-6 h-6 text-primary" />
                            </div>

                            {/* Request Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">{request.employeeName}</p>
                                <Badge variant="outline" className="text-xs">
                                  {request.id}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{request.employeeRole}</p>

                              <div className="mt-3 space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge>{request.typeLabel}</Badge>
                                  {getStatusBadge(request.status)}
                                </div>
                                <p className="text-sm">
                                  <span className="font-medium">Duration:</span>{" "}
                                  {format(request.startDate, "dd MMM yyyy")} - {format(request.endDate, "dd MMM yyyy")}
                                  <span className="mx-2">•</span>
                                  {request.days} {request.days === 1 ? "Day" : "Days"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-medium">Reason:</span> {request.reason}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Applied on: {format(request.appliedOn, "dd MMM yyyy")}
                                </p>
                                {request.status === "rejected" && request.rejectionReason && (
                                  <p className="text-sm text-red-500">
                                    <span className="font-medium">Rejection reason:</span> {request.rejectionReason}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          {request.status === "pending" && (
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 bg-transparent"
                                onClick={() => handleAction(request, "approve")}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 bg-transparent"
                                onClick={() => handleAction(request, "reject")}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length}{" "}
                        requests
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
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-9"
                          >
                            {page}
                          </Button>
                        ))}
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
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CalendarCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Approved Leaves Calendar</CardTitle>
                        <CardDescription>View all approved leaves with employee details</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={prevMonth} className="h-9 w-9 bg-transparent">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="min-w-[140px] text-center px-3">
                        <span className="font-semibold">
                          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                      </div>
                      <Button variant="outline" size="icon" onClick={nextMonth} className="h-9 w-9 bg-transparent">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {/* Day headers */}
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                      <div
                        key={day}
                        className={cn(
                          "text-center text-xs font-semibold py-3 uppercase tracking-wider",
                          index === 0 || index === 6 ? "text-muted-foreground/50" : "text-muted-foreground",
                        )}
                      >
                        {day}
                      </div>
                    ))}

                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                      <div key={`empty-${index}`} className="aspect-square"></div>
                    ))}

                    {/* Calendar days */}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                      const day = index + 1
                      const leavesOnDay = getLeavesForDate(day)
                      const weekend = isWeekend(day)

                      return (
                        <div
                          key={day}
                          className={cn(
                            "min-h-[100px] p-2 rounded-xl border transition-all",
                            weekend && "bg-muted/30",
                            leavesOnDay.length > 0 && "border-primary bg-primary/5",
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={cn("text-sm font-semibold", weekend && "text-muted-foreground/50")}>
                              {day}
                            </span>
                            {leavesOnDay.length > 0 && (
                              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                                {leavesOnDay.length}
                              </Badge>
                            )}
                          </div>

                          {/* Employee leaves on this day */}
                          {leavesOnDay.length > 0 && (
                            <div className="space-y-1">
                              {leavesOnDay.slice(0, 2).map((leave) => (
                                <div
                                  key={leave.id}
                                  className="text-xs p-1.5 rounded bg-primary/10 text-primary truncate"
                                  title={`${leave.employeeName} - ${leave.typeLabel}`}
                                >
                                  <p className="font-medium truncate">{leave.employeeName}</p>
                                  <p className="text-[10px] opacity-75 truncate">{leave.typeLabel}</p>
                                </div>
                              ))}
                              {leavesOnDay.length > 2 && (
                                <div className="text-xs text-center text-muted-foreground">
                                  +{leavesOnDay.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-primary/10 border border-primary"></div>
                      <span className="text-sm text-muted-foreground">Employee on Leave</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-muted/30"></div>
                      <span className="text-sm text-muted-foreground">Weekend</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default function ManagerLeaves() {
  return (
    <SidebarProvider>
      <ManagerLeavesInner />
    </SidebarProvider>
  )
}
