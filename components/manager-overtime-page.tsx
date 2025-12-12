"use client"

import { useState, useMemo } from "react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { cn } from "@/lib/utils"
import {
  Clock,
  Users,
  CheckCircle,
  XCircle,
  DollarSign,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Edit2,
  Send,
} from "lucide-react"
import { format } from "date-fns"

interface OTRequest {
  id: string
  employeeId: string
  employeeName: string
  employeeRole: string
  employeeDepartment: string
  date: Date
  hours: number
  reason: string
  status: "pending" | "approved" | "rejected" | "sent_to_head"
  appliedOn: Date
  approvedBy?: string
  approvedOn?: Date
  rejectionReason?: string
  amount: number
  branch: string
}

// Mock data
const mockOTRequests: OTRequest[] = [
  {
    id: "OT-001",
    employeeId: "EMP-001",
    employeeName: "Rahul Sharma",
    employeeRole: "Trainer",
    employeeDepartment: "Training",
    date: new Date(2025, 0, 10),
    hours: 3,
    reason: "Complete pending member onboarding tasks",
    status: "pending",
    appliedOn: new Date(2025, 0, 9),
    amount: 450,
    branch: "Central Branch",
  },
  {
    id: "OT-002",
    employeeId: "EMP-002",
    employeeName: "Priya Patel",
    employeeRole: "Sales Executive",
    employeeDepartment: "Sales",
    date: new Date(2025, 0, 15),
    hours: 2,
    reason: "Handle urgent client enquiries",
    status: "pending",
    appliedOn: new Date(2025, 0, 14),
    amount: 300,
    branch: "East Branch",
  },
  {
    id: "OT-003",
    employeeId: "EMP-003",
    employeeName: "Amit Kumar",
    employeeRole: "Receptionist",
    employeeDepartment: "Reception",
    date: new Date(2025, 0, 8),
    hours: 4,
    reason: "Weekend shift coverage",
    status: "approved",
    appliedOn: new Date(2025, 0, 7),
    approvedBy: "Manager - John Doe",
    approvedOn: new Date(2025, 0, 8),
    amount: 600,
    branch: "Central Branch",
  },
  {
    id: "OT-004",
    employeeId: "EMP-004",
    employeeName: "Sneha Singh",
    employeeRole: "Trainer",
    employeeDepartment: "Training",
    date: new Date(2025, 0, 12),
    hours: 2.5,
    reason: "Special class session",
    status: "sent_to_head",
    appliedOn: new Date(2025, 0, 11),
    approvedBy: "Manager - John Doe",
    amount: 375,
    branch: "West Branch",
  },
  {
    id: "OT-005",
    employeeId: "EMP-005",
    employeeName: "Vikash Yadav",
    employeeRole: "Maintenance",
    employeeDepartment: "Maintenance",
    date: new Date(2025, 0, 5),
    hours: 5,
    reason: "Emergency equipment repair",
    status: "rejected",
    appliedOn: new Date(2025, 0, 4),
    rejectionReason: "Not pre-approved for emergency work",
    amount: 750,
    branch: "North Branch",
  },
]

function ManagerOvertimeInner() {
  const { collapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<OTRequest | null>(null)
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | "send_to_head">("approve")
  const [rejectionReason, setRejectionReason] = useState("")
  const [editedHours, setEditedHours] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 5

  const stats = useMemo(() => {
    const total = mockOTRequests.length
    const pending = mockOTRequests.filter((r) => r.status === "pending").length
    const approved = mockOTRequests.filter((r) => r.status === "approved").length
    const rejected = mockOTRequests.filter((r) => r.status === "rejected").length
    const sentToHead = mockOTRequests.filter((r) => r.status === "sent_to_head").length
    const totalHours = mockOTRequests
      .filter((r) => r.status === "approved" || r.status === "sent_to_head")
      .reduce((acc, r) => acc + r.hours, 0)
    const totalAmount = mockOTRequests
      .filter((r) => r.status === "approved" || r.status === "sent_to_head")
      .reduce((acc, r) => acc + r.amount, 0)

    return { total, pending, approved, rejected, sentToHead, totalHours, totalAmount }
  }, [])

  const filteredRequests = useMemo(() => {
    return mockOTRequests.filter((request) => {
      const matchesSearch =
        request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = activeTab === "all" || request.status === activeTab
      const matchesDepartment = departmentFilter === "all" || request.employeeDepartment === departmentFilter
      return matchesSearch && matchesStatus && matchesDepartment
    })
  }, [searchQuery, activeTab, departmentFilter])

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAction = (request: OTRequest, action: "approve" | "reject" | "send_to_head") => {
    setSelectedRequest(request)
    setActionType(action)
    setShowActionDialog(true)
    setRejectionReason("")
  }

  const handleEdit = (request: OTRequest) => {
    setSelectedRequest(request)
    setEditedHours(request.hours.toString())
    setShowEditDialog(true)
  }

  const confirmEdit = () => {
    console.log(`[v0] Edited OT hours for ${selectedRequest?.id} to ${editedHours}`)
    setShowEditDialog(false)
    setSelectedRequest(null)
  }

  const confirmAction = () => {
    console.log(`[v0] ${actionType} OT request:`, selectedRequest?.id)
    if (actionType === "reject" && rejectionReason) {
      console.log(`[v0] Rejection reason:`, rejectionReason)
    }
    setShowActionDialog(false)
    setSelectedRequest(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>
      case "approved":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
      case "sent_to_head":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Sent to Head</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="manager" />

      <div className={cn("flex-1 transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex h-full items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold">OT Management</h1>
              <p className="text-sm text-muted-foreground">Review and approve employee overtime requests</p>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Requests</p>
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
                    <p className="text-xs text-muted-foreground">Approved</p>
                    <p className="text-2xl font-bold">{stats.approved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold">{stats.rejected}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Sent to Head</p>
                    <p className="text-2xl font-bold">{stats.sentToHead}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Hours</p>
                    <p className="text-2xl font-bold">{stats.totalHours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                    <p className="text-xl font-bold">₹{stats.totalAmount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* OT Requests Table */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <CardTitle>OT Requests</CardTitle>
                  <CardDescription>Manage employee overtime requests</CardDescription>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="sent_to_head">Sent to Head</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by employee name, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Reception">Reception</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No OT requests found</p>
                  </div>
                ) : (
                  paginatedRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-start justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{request.employeeName}</p>
                            <Badge variant="outline" className="text-xs">
                              {request.employeeId}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {request.employeeRole}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {request.employeeDepartment} • {request.branch}
                          </p>
                          <div className="flex items-center gap-2 text-sm mb-2">
                            <span className="font-medium">{format(request.date, "dd MMM yyyy")}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-primary font-semibold">
                              {request.hours} {request.hours === 1 ? "Hour" : "Hours"}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="font-medium">₹{request.amount}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{request.reason}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Applied: {format(request.appliedOn, "dd MMM yyyy")}
                          </p>
                          {request.status === "approved" && request.approvedBy && (
                            <p className="text-xs text-emerald-600 mt-1">
                              Approved by {request.approvedBy} on {format(request.approvedOn!, "dd MMM yyyy")}
                            </p>
                          )}
                          {request.status === "rejected" && request.rejectionReason && (
                            <p className="text-xs text-red-600 mt-1">Reason: {request.rejectionReason}</p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end gap-2 ml-4">
                        {getStatusBadge(request.status)}
                        {request.status === "pending" && (
                          <div className="flex flex-wrap gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 bg-transparent"
                              onClick={() => handleEdit(request)}
                            >
                              <Edit2 className="w-3 h-3" />
                              Edit Hours
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
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950 bg-transparent"
                              onClick={() => handleAction(request, "send_to_head")}
                            >
                              <Send className="w-4 h-4 mr-1" />
                              Send to Head
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

      {/* Edit Hours Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit OT Hours</DialogTitle>
            <DialogDescription>Adjust the overtime hours for this request</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Employee</Label>
              <p className="text-sm font-medium">{selectedRequest?.employeeName}</p>
            </div>
            <div className="space-y-2">
              <Label>Original Hours</Label>
              <p className="text-sm text-muted-foreground">{selectedRequest?.hours} hours</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editedHours">New Hours</Label>
              <Input
                id="editedHours"
                type="number"
                step="0.5"
                min="0.5"
                max="12"
                value={editedHours}
                onChange={(e) => setEditedHours(e.target.value)}
              />
            </div>
            {editedHours && Number.parseFloat(editedHours) > 0 && (
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">New Amount</p>
                <p className="text-2xl font-bold text-primary">₹{(Number.parseFloat(editedHours) * 150).toFixed(2)}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEdit} disabled={!editedHours || Number.parseFloat(editedHours) <= 0}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve"
                ? "Approve OT Request"
                : actionType === "send_to_head"
                  ? "Send to Head for Approval"
                  : "Reject OT Request"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? "Confirm approval of this overtime request"
                : actionType === "send_to_head"
                  ? "This request will be forwarded to Head for final approval"
                  : "Please provide a reason for rejection"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Employee</Label>
              <p className="text-sm font-medium">{selectedRequest?.employeeName}</p>
            </div>
            <div className="space-y-2">
              <Label>OT Details</Label>
              <p className="text-sm text-muted-foreground">
                {selectedRequest?.hours} hours on {selectedRequest && format(selectedRequest.date, "dd MMM yyyy")} - ₹
                {selectedRequest?.amount}
              </p>
            </div>
            {actionType === "reject" && (
              <div className="space-y-2">
                <Label htmlFor="rejectionReason">Rejection Reason *</Label>
                <Textarea
                  id="rejectionReason"
                  placeholder="Provide a clear reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActionDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              disabled={actionType === "reject" && !rejectionReason}
              className={cn(
                actionType === "approve" && "bg-emerald-600 hover:bg-emerald-700",
                actionType === "send_to_head" && "bg-blue-600 hover:bg-blue-700",
                actionType === "reject" && "bg-red-600 hover:bg-red-700",
              )}
            >
              {actionType === "approve" ? "Approve" : actionType === "send_to_head" ? "Send to Head" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function ManagerOvertimePage() {
  return (
    <SidebarProvider>
      <ManagerOvertimeInner />
    </SidebarProvider>
  )
}
