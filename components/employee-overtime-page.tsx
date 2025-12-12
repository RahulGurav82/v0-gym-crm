"use client"

import { useState } from "react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Clock, Plus, CheckCircle2, XCircle, Calendar, ChevronLeft, ChevronRight, DollarSign } from "lucide-react"
import { format } from "date-fns"

// Mock data for OT requests
const mockOTRequests = [
  {
    id: "OT-001",
    date: new Date(2025, 0, 10),
    hours: 3,
    reason: "Complete pending member onboarding tasks",
    status: "approved",
    appliedOn: new Date(2025, 0, 9),
    approvedBy: "Manager - John Doe",
    amount: 450,
  },
  {
    id: "OT-002",
    date: new Date(2025, 0, 15),
    hours: 2,
    reason: "Handle urgent client enquiries",
    status: "pending",
    appliedOn: new Date(2025, 0, 14),
    amount: 300,
  },
  {
    id: "OT-003",
    date: new Date(2025, 0, 8),
    hours: 4,
    reason: "Complete quarterly report",
    status: "approved",
    appliedOn: new Date(2025, 0, 7),
    approvedBy: "Manager - John Doe",
    amount: 600,
  },
  {
    id: "OT-004",
    date: new Date(2025, 0, 5),
    hours: 2.5,
    reason: "Weekend shift coverage",
    status: "rejected",
    appliedOn: new Date(2025, 0, 4),
    rejectionReason: "Not approved for weekend OT",
    amount: 375,
  },
]

function EmployeeOvertimePageInner() {
  const { collapsed } = useSidebar()
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [otDate, setOtDate] = useState("")
  const [otHours, setOtHours] = useState("")
  const [reason, setReason] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [otRequests, setOtRequests] = useState(mockOTRequests)

  // Calculate stats
  const stats = {
    total: otRequests.length,
    pending: otRequests.filter((r) => r.status === "pending").length,
    approved: otRequests.filter((r) => r.status === "approved").length,
    rejected: otRequests.filter((r) => r.status === "rejected").length,
    totalHours: otRequests.filter((r) => r.status === "approved").reduce((acc, r) => acc + r.hours, 0),
    totalAmount: otRequests.filter((r) => r.status === "approved").reduce((acc, r) => acc + r.amount, 0),
  }

  // Handle Apply OT
  const handleApplyOT = () => {
    const newOT = {
      id: `OT-${String(otRequests.length + 1).padStart(3, "0")}`,
      date: new Date(otDate),
      hours: Number.parseFloat(otHours),
      reason,
      status: "pending" as const,
      appliedOn: new Date(),
      amount: Number.parseFloat(otHours) * 150, // 150 per hour
    }
    setOtRequests([newOT, ...otRequests])
    setIsApplyDialogOpen(false)
    setOtDate("")
    setOtHours("")
    setReason("")
  }

  // Filter requests
  const filteredRequests = otRequests.filter((request) => {
    if (activeTab === "all") return true
    return request.status === activeTab
  })

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>
      case "approved":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="employee" />

      <div className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex h-full items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold">Overtime Management</h1>
              <p className="text-sm text-muted-foreground">Apply and track your overtime requests</p>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4" />
                    Apply OT
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Apply for Overtime</DialogTitle>
                    <DialogDescription>Fill in the details to submit your OT request</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Date Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="otDate">OT Date</Label>
                      <Input
                        id="otDate"
                        type="date"
                        value={otDate}
                        onChange={(e) => setOtDate(e.target.value)}
                        max={format(new Date(), "yyyy-MM-dd")}
                      />
                    </div>

                    {/* Hours Input */}
                    <div className="space-y-2">
                      <Label htmlFor="otHours">OT Hours</Label>
                      <Input
                        id="otHours"
                        type="number"
                        step="0.5"
                        min="0.5"
                        max="12"
                        placeholder="Enter hours (e.g., 2.5)"
                        value={otHours}
                        onChange={(e) => setOtHours(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Enter hours between 0.5 to 12</p>
                    </div>

                    {/* Amount Calculation */}
                    {otHours && Number.parseFloat(otHours) > 0 && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Estimated Amount</p>
                          <p className="text-2xl font-bold text-primary">
                            ₹{(Number.parseFloat(otHours) * 150).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">@ ₹150 per hour</p>
                        </div>
                      </div>
                    )}

                    {/* Reason */}
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for OT</Label>
                      <Textarea
                        id="reason"
                        placeholder="Please provide the reason for overtime work..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleApplyOT}
                      disabled={!otDate || !otHours || !reason || Number.parseFloat(otHours) <= 0}
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
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
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
                    <Calendar className="w-5 h-5 text-white" />
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
                    <CheckCircle2 className="w-5 h-5 text-white" />
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>OT Requests</CardTitle>
                  <CardDescription>Your overtime request history</CardDescription>
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
                    <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No OT requests found</p>
                  </div>
                ) : (
                  paginatedRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{format(request.date, "dd MMM yyyy")}</p>
                            <Badge variant="outline" className="text-xs">
                              {request.id}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {request.hours} {request.hours === 1 ? "Hour" : "Hours"}
                            <span className="mx-2">•</span>₹{request.amount}
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
                        className="w-8"
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

export default function EmployeeOvertimePage() {
  return (
    <SidebarProvider>
      <EmployeeOvertimePageInner />
    </SidebarProvider>
  )
}
