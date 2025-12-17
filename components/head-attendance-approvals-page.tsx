"use client"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import {
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Users,
  Check,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TimeSlot {
  checkIn: string
  checkOut: string
}

interface AttendanceDate {
  date: string
  slots: TimeSlot[]
  totalHours: string
  status: string
}

interface AttendanceRequest {
  id: string
  requestId: string
  managerName: string
  managerId: string
  department: string
  submittedDate: string
  dateRange: {
    start: string
    end: string
  }
  employeesCount: number
  employees: {
    employeeId: string
    employeeName: string
    dates: AttendanceDate[]
  }[]
  status: "pending" | "approved" | "rejected"
  rejectionReason?: string
}

// Mock data
const mockRequests: AttendanceRequest[] = [
  {
    id: "1",
    requestId: "ATT-REQ-001",
    managerName: "John Manager",
    managerId: "M001",
    department: "Sales",
    submittedDate: "2025-01-10",
    dateRange: {
      start: "2025-01-05",
      end: "2025-01-07",
    },
    employeesCount: 3,
    employees: [
      {
        employeeId: "E001",
        employeeName: "Sarah Johnson",
        dates: [
          {
            date: "2025-01-05",
            slots: [
              { checkIn: "09:00", checkOut: "13:00" },
              { checkIn: "14:00", checkOut: "18:00" },
            ],
            totalHours: "8.0",
            status: "present",
          },
          {
            date: "2025-01-06",
            slots: [{ checkIn: "09:15", checkOut: "17:30" }],
            totalHours: "8.25",
            status: "present",
          },
        ],
      },
      {
        employeeId: "E002",
        employeeName: "Mike Davis",
        dates: [
          {
            date: "2025-01-05",
            slots: [{ checkIn: "08:30", checkOut: "17:00" }],
            totalHours: "8.5",
            status: "present",
          },
        ],
      },
    ],
    status: "pending",
  },
  {
    id: "2",
    requestId: "ATT-REQ-002",
    managerName: "Emily Rodriguez",
    managerId: "M002",
    department: "Operations",
    submittedDate: "2025-01-08",
    dateRange: {
      start: "2025-01-03",
      end: "2025-01-04",
    },
    employeesCount: 2,
    employees: [
      {
        employeeId: "E003",
        employeeName: "David Lee",
        dates: [
          {
            date: "2025-01-03",
            slots: [
              { checkIn: "09:00", checkOut: "12:00" },
              { checkIn: "13:00", checkOut: "17:00" },
            ],
            totalHours: "7.0",
            status: "present",
          },
        ],
      },
    ],
    status: "approved",
  },
]

function HeadAttendanceApprovalsInner() {
  const { collapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<AttendanceRequest | null>(null)
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject">("approve")
  const [rejectionReason, setRejectionReason] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const stats = useMemo(() => {
    const total = mockRequests.length
    const pending = mockRequests.filter((r) => r.status === "pending").length
    const approved = mockRequests.filter((r) => r.status === "approved").length
    const rejected = mockRequests.filter((r) => r.status === "rejected").length

    return { total, pending, approved, rejected }
  }, [])

  const filteredRequests = useMemo(() => {
    return mockRequests.filter((request) => {
      const matchesSearch =
        request.managerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.requestId.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || request.status === statusFilter
      const matchesDepartment = departmentFilter === "all" || request.department === departmentFilter
      return matchesSearch && matchesStatus && matchesDepartment
    })
  }, [searchQuery, statusFilter, departmentFilter])

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAction = (request: AttendanceRequest, action: "approve" | "reject") => {
    setSelectedRequest(request)
    setActionType(action)
    setShowActionDialog(true)
    setRejectionReason("")
  }

  const handleViewDetails = (request: AttendanceRequest) => {
    setSelectedRequest(request)
    setShowDetailsDialog(true)
  }

  const confirmAction = () => {
    console.log(`[v0] ${actionType} attendance request:`, selectedRequest?.id)
    if (actionType === "reject" && rejectionReason) {
      console.log(`[v0] Rejection reason:`, rejectionReason)
    }
    alert(`Attendance request ${actionType === "approve" ? "approved" : "rejected"} successfully!`)
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
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar role="head" />
      <main className={cn("flex-1 transition-all duration-300", collapsed ? "ml-16" : "ml-64")}>
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Attendance Approvals</h1>
            <p className="text-muted-foreground mt-1">Review and approve attendance marking requests from managers</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 dark:border-amber-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400">Pending</CardTitle>
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{stats.pending}</div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 dark:border-emerald-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Approved</CardTitle>
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{stats.approved}</div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-red-700 dark:text-red-400">Rejected</CardTitle>
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-700 dark:text-red-400">{stats.rejected}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by manager name or request ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Requests Table */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="all" className="w-full">
                <div className="border-b px-6 pt-6">
                  <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="processed">Processed</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="p-6 space-y-4">
                  {paginatedRequests.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No attendance requests found</h3>
                      <p className="text-muted-foreground">Try adjusting your filters</p>
                    </div>
                  ) : (
                    paginatedRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        {/* Request Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono">
                              {request.requestId}
                            </Badge>
                            {getStatusBadge(request.status)}
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{request.managerName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{request.department}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {request.dateRange.start} to {request.dateRange.end}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{request.employeesCount} employees</span>
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground">
                            Submitted on {new Date(request.submittedDate).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-auto">
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(request)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>

                          {request.status === "pending" && (
                            <>
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
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="pending" className="p-6 space-y-4">
                  {paginatedRequests.filter((r) => r.status === "pending").length === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
                      <p className="text-muted-foreground">All attendance requests have been processed</p>
                    </div>
                  ) : (
                    paginatedRequests
                      .filter((r) => r.status === "pending")
                      .map((request) => (
                        <div
                          key={request.id}
                          className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          {/* Same content as above */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="font-mono">
                                {request.requestId}
                              </Badge>
                              {getStatusBadge(request.status)}
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{request.managerName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{request.department}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {request.dateRange.start} to {request.dateRange.end}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>{request.employeesCount} employees</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-auto">
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(request)}>
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
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
                        </div>
                      ))
                  )}
                </TabsContent>

                <TabsContent value="processed" className="p-6 space-y-4">
                  {paginatedRequests.filter((r) => r.status !== "pending").length === 0 ? (
                    <div className="text-center py-12">
                      <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No processed requests</h3>
                      <p className="text-muted-foreground">Approved and rejected requests will appear here</p>
                    </div>
                  ) : (
                    paginatedRequests
                      .filter((r) => r.status !== "pending")
                      .map((request) => (
                        <div
                          key={request.id}
                          className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="font-mono">
                                {request.requestId}
                              </Badge>
                              {getStatusBadge(request.status)}
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{request.managerName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{request.department}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {request.dateRange.start} to {request.dateRange.end}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>{request.employeesCount} employees</span>
                              </div>
                            </div>
                          </div>

                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(request)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      ))
                  )}
                </TabsContent>
              </Tabs>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t px-6 py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length}{" "}
                    requests
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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
      </main>

      {/* Action Confirmation Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve Attendance Request" : "Reject Attendance Request"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? `Are you sure you want to approve the attendance request ${selectedRequest?.requestId}?`
                : `Please provide a reason for rejecting the attendance request ${selectedRequest?.requestId}.`}
            </DialogDescription>
          </DialogHeader>

          {actionType === "reject" && (
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason *</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActionDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              disabled={actionType === "reject" && !rejectionReason.trim()}
              className={
                actionType === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
              }
            >
              {actionType === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Attendance Request Details</DialogTitle>
            <DialogDescription>Request ID: {selectedRequest?.requestId}</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              {/* Request Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <Label className="text-xs text-muted-foreground">Manager</Label>
                  <p className="font-medium">{selectedRequest.managerName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Department</Label>
                  <p className="font-medium">{selectedRequest.department}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Date Range</Label>
                  <p className="font-medium">
                    {selectedRequest.dateRange.start} to {selectedRequest.dateRange.end}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>

              {/* Employees Attendance */}
              <div className="space-y-4">
                <h3 className="font-semibold">Employee Attendance Details</h3>
                {selectedRequest.employees.map((employee) => (
                  <Card key={employee.employeeId}>
                    <CardHeader>
                      <CardTitle className="text-base">{employee.employeeName}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {employee.dates.map((dateInfo, idx) => (
                        <div key={idx} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{dateInfo.date}</span>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                            >
                              {dateInfo.totalHours} hours
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            {dateInfo.slots.map((slot, slotIdx) => (
                              <div key={slotIdx} className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span>Slot {slotIdx + 1}:</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{slot.checkIn}</span>
                                  <span className="text-muted-foreground">→</span>
                                  <span className="font-mono">{slot.checkOut}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function HeadAttendanceApprovals() {
  return (
    <SidebarProvider>
      <HeadAttendanceApprovalsInner />
    </SidebarProvider>
  )
}
