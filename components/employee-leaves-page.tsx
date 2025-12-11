"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import {
  CalendarDays,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  FileText,
  Upload,
  Palmtree,
  Stethoscope,
  Baby,
  Heart,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { format, differenceInDays } from "date-fns"

interface LeaveRequest {
  id: string
  type: string
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

const leaveTypes = [
  { value: "casual", label: "Casual Leave", icon: Palmtree, balance: 8, color: "bg-blue-500" },
  { value: "sick", label: "Sick Leave", icon: Stethoscope, balance: 6, color: "bg-red-500" },
  { value: "earned", label: "Earned Leave", icon: Briefcase, balance: 12, color: "bg-emerald-500" },
  { value: "maternity", label: "Maternity Leave", icon: Baby, balance: 180, color: "bg-pink-500" },
  { value: "paternity", label: "Paternity Leave", icon: Heart, balance: 15, color: "bg-purple-500" },
  { value: "study", label: "Study Leave", icon: GraduationCap, balance: 5, color: "bg-amber-500" },
]

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "LV001",
    type: "casual",
    startDate: new Date(2025, 0, 15),
    endDate: new Date(2025, 0, 17),
    days: 3,
    reason: "Family function",
    status: "approved",
    appliedOn: new Date(2025, 0, 10),
    approvedBy: "John Manager",
    approvedOn: new Date(2025, 0, 11),
  },
  {
    id: "LV002",
    type: "sick",
    startDate: new Date(2025, 0, 20),
    endDate: new Date(2025, 0, 21),
    days: 2,
    reason: "Fever and cold",
    status: "approved",
    appliedOn: new Date(2025, 0, 19),
    approvedBy: "John Manager",
    approvedOn: new Date(2025, 0, 19),
  },
  {
    id: "LV003",
    type: "earned",
    startDate: new Date(2025, 1, 1),
    endDate: new Date(2025, 1, 5),
    days: 5,
    reason: "Annual vacation",
    status: "pending",
    appliedOn: new Date(2025, 0, 25),
  },
  {
    id: "LV004",
    type: "casual",
    startDate: new Date(2024, 11, 24),
    endDate: new Date(2024, 11, 25),
    days: 2,
    reason: "Personal work",
    status: "rejected",
    appliedOn: new Date(2024, 11, 20),
    rejectionReason: "High workload during that period",
  },
]

function EmployeeLeavesInner() {
  const { collapsed } = useSidebar()
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests)
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Apply Leave Form State
  const [leaveType, setLeaveType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      return differenceInDays(end, start) + 1
    }
    return 0
  }

  const handleApplyLeave = () => {
    const newLeave: LeaveRequest = {
      id: `LV${String(leaveRequests.length + 1).padStart(3, "0")}`,
      type: leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      days: calculateDays(),
      reason,
      status: "pending",
      appliedOn: new Date(),
    }
    setLeaveRequests([newLeave, ...leaveRequests])
    setIsApplyDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setLeaveType("")
    setStartDate("")
    setEndDate("")
    setReason("")
    setAttachment(null)
  }

  const filteredRequests = leaveRequests.filter((request) => {
    if (activeTab === "all") return true
    return request.status === activeTab
  })

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const getLeaveTypeInfo = (type: string) => {
    return leaveTypes.find((lt) => lt.value === type)
  }

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter((r) => r.status === "pending").length,
    approved: leaveRequests.filter((r) => r.status === "approved").length,
    rejected: leaveRequests.filter((r) => r.status === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="employee" />
      <div className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex h-full items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold">Leave Management</h1>
              <p className="text-sm text-muted-foreground">Apply and track your leave requests</p>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4" />
                    Apply Leave
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Apply for Leave</DialogTitle>
                    <DialogDescription>Fill in the details to submit your leave request</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* Leave Type Selection */}
                    <div className="space-y-3">
                      <Label>Leave Type</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {leaveTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setLeaveType(type.value)}
                              className={cn(
                                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                                leaveType === type.value
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50",
                              )}
                            >
                              <div
                                className={cn("w-10 h-10 rounded-full flex items-center justify-center", type.color)}
                              >
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-sm font-medium">{type.label}</span>
                              <span className="text-xs text-muted-foreground">Balance: {type.balance}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={format(new Date(), "yyyy-MM-dd")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate || format(new Date(), "yyyy-MM-dd")}
                        />
                      </div>
                    </div>

                    {/* Days Calculation */}
                    {startDate && endDate && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <CalendarDays className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Total Leave Days</p>
                          <p className="text-2xl font-bold text-primary">{calculateDays()} Days</p>
                        </div>
                      </div>
                    )}

                    {/* Reason */}
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Leave</Label>
                      <Textarea
                        id="reason"
                        placeholder="Please provide the reason for your leave request..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Attachment */}
                    <div className="space-y-2">
                      <Label>Supporting Document (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          id="attachment"
                          className="hidden"
                          onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label htmlFor="attachment" className="cursor-pointer">
                          {attachment ? (
                            <div className="flex items-center justify-center gap-2">
                              <FileText className="w-5 h-5 text-primary" />
                              <span className="text-sm font-medium">{attachment.name}</span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                              <p className="text-xs text-muted-foreground">PDF, JPG, PNG (max 5MB)</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleApplyLeave}
                      disabled={!leaveType || !startDate || !endDate || !reason}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Submit Request
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Leave Balance Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {leaveTypes.map((type) => {
              const Icon = type.icon
              const used = leaveRequests
                .filter((r) => r.type === type.value && r.status === "approved")
                .reduce((acc, r) => acc + r.days, 0)
              const remaining = type.balance - used

              return (
                <Card key={type.value} className="relative overflow-hidden">
                  <CardContent className="p-4">
                    <div
                      className={cn("absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full opacity-10", type.color)}
                    />
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", type.color)}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{type.label}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-bold">{remaining}</span>
                      <span className="text-xs text-muted-foreground">/ {type.balance}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                      <div
                        className={cn("h-1.5 rounded-full", type.color)}
                        style={{ width: `${(remaining / type.balance) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leave Requests Table */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>Your leave request history</CardDescription>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                </Tabs>
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
                  paginatedRequests.map((request) => {
                    const typeInfo = getLeaveTypeInfo(request.type)
                    const Icon = typeInfo?.icon || Calendar

                    return (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center",
                              typeInfo?.color || "bg-gray-500",
                            )}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{typeInfo?.label || request.type}</p>
                              <Badge variant="outline" className="text-xs">
                                {request.id}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {format(request.startDate, "dd MMM yyyy")} - {format(request.endDate, "dd MMM yyyy")}
                              <span className="mx-2">•</span>
                              {request.days} {request.days === 1 ? "Day" : "Days"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{request.reason}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          {getStatusBadge(request.status)}
                          <p className="text-xs text-muted-foreground">
                            Applied: {format(request.appliedOn, "dd MMM yyyy")}
                          </p>
                          {request.status === "approved" && request.approvedBy && (
                            <p className="text-xs text-emerald-500">Approved by {request.approvedBy}</p>
                          )}
                          {request.status === "rejected" && request.rejectionReason && (
                            <p className="text-xs text-red-500 max-w-[200px] truncate">{request.rejectionReason}</p>
                          )}
                        </div>
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
                        className={cn(currentPage === page && "bg-primary hover:bg-primary/90")}
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
        </main>
      </div>
    </div>
  )
}

export function EmployeeLeaves() {
  return (
    <SidebarProvider>
      <EmployeeLeavesInner />
    </SidebarProvider>
  )
}
