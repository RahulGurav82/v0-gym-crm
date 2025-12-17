"use client"

import { useState } from "react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, Search, CheckCircle, XCircle, AlertCircle, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OTRequest {
  id: string
  employeeId: string
  employeeName: string
  employeeRole: string
  employeeDepartment: string
  date: Date
  hours: number
  reason: string
  status: "sent_to_head" | "approved_by_head" | "rejected_by_head"
  appliedOn: Date
  managerName: string
  managerApprovedOn: Date
  managerNotes?: string
  headNotes?: string
  rejectionReason?: string
  amount: number
  branch: string
}

// Mock data - OT requests sent to head by managers
const mockOTRequests: OTRequest[] = [
  {
    id: "OT-001",
    employeeId: "EMP-001",
    employeeName: "Rahul Sharma",
    employeeRole: "Trainer",
    employeeDepartment: "Fitness",
    date: new Date(2024, 11, 20),
    hours: 3,
    reason: "Special training session for new members",
    status: "sent_to_head",
    appliedOn: new Date(2024, 11, 21),
    managerName: "Priya Patel",
    managerApprovedOn: new Date(2024, 11, 22),
    managerNotes: "Valid request for extra training hours",
    amount: 450,
    branch: "Ghansoli",
  },
  {
    id: "OT-002",
    employeeId: "EMP-002",
    employeeName: "Amit Kumar",
    employeeRole: "Receptionist",
    employeeDepartment: "Front Desk",
    date: new Date(2024, 11, 19),
    hours: 2,
    reason: "Covered evening shift due to staff shortage",
    status: "sent_to_head",
    appliedOn: new Date(2024, 11, 20),
    managerName: "Priya Patel",
    managerApprovedOn: new Date(2024, 11, 21),
    managerNotes: "Emergency coverage needed",
    amount: 300,
    branch: "Nerul",
  },
  {
    id: "OT-003",
    employeeId: "EMP-003",
    employeeName: "Sneha Desai",
    employeeRole: "Trainer",
    employeeDepartment: "Yoga",
    date: new Date(2024, 11, 18),
    hours: 4,
    reason: "Additional yoga classes for corporate clients",
    status: "approved_by_head",
    appliedOn: new Date(2024, 11, 19),
    managerName: "Priya Patel",
    managerApprovedOn: new Date(2024, 11, 20),
    managerNotes: "Corporate contract requirement",
    headNotes: "Approved for corporate commitment",
    amount: 600,
    branch: "Ulwe",
  },
  {
    id: "OT-004",
    employeeId: "EMP-004",
    employeeName: "Vikram Singh",
    employeeRole: "Maintenance",
    employeeDepartment: "Operations",
    date: new Date(2024, 11, 17),
    hours: 2.5,
    reason: "Emergency equipment repair",
    status: "rejected_by_head",
    appliedOn: new Date(2024, 11, 18),
    managerName: "Priya Patel",
    managerApprovedOn: new Date(2024, 11, 19),
    managerNotes: "Equipment breakdown needed immediate attention",
    rejectionReason: "Should be covered under maintenance contract",
    amount: 375,
    branch: "Sanpada",
  },
]

function HeadOTApprovalsInner() {
  const { collapsed } = useSidebar()
  const [requests, setRequests] = useState<OTRequest[]>(mockOTRequests)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [activeTab, setActiveTab] = useState("pending")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [showActionDialog, setShowActionDialog] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<OTRequest | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject">("approve")
  const [headNotes, setHeadNotes] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  // Filter requests
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || request.employeeDepartment === selectedDepartment
    const matchesBranch = selectedBranch === "all" || request.branch === selectedBranch
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && request.status === "sent_to_head") ||
      (activeTab === "approved" && request.status === "approved_by_head") ||
      (activeTab === "rejected" && request.status === "rejected_by_head")

    return matchesSearch && matchesDepartment && matchesBranch && matchesTab
  })

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Stats
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "sent_to_head").length,
    approved: requests.filter((r) => r.status === "approved_by_head").length,
    rejected: requests.filter((r) => r.status === "rejected_by_head").length,
    totalHours: requests.filter((r) => r.status === "approved_by_head").reduce((sum, r) => sum + r.hours, 0),
    totalAmount: requests.filter((r) => r.status === "approved_by_head").reduce((sum, r) => sum + r.amount, 0),
  }

  const handleAction = (request: OTRequest, action: "approve" | "reject") => {
    setSelectedRequest(request)
    setActionType(action)
    setShowActionDialog(true)
    setHeadNotes("")
    setRejectionReason("")
  }

  const confirmAction = () => {
    if (!selectedRequest) return

    if (actionType === "reject" && !rejectionReason.trim()) {
      alert("Please provide a reason for rejection")
      return
    }

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? {
              ...r,
              status: actionType === "approve" ? "approved_by_head" : "rejected_by_head",
              headNotes: actionType === "approve" ? headNotes : undefined,
              rejectionReason: actionType === "reject" ? rejectionReason : undefined,
            }
          : r,
      ),
    )

    setShowActionDialog(false)
    setSelectedRequest(null)
  }

  const getStatusBadge = (status: OTRequest["status"]) => {
    switch (status) {
      case "sent_to_head":
        return <Badge variant="secondary">Pending Review</Badge>
      case "approved_by_head":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected_by_head":
        return <Badge variant="destructive">Rejected</Badge>
    }
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar role="head" collapsed={collapsed} />
      <main className={`flex-1 overflow-y-auto bg-background ${collapsed ? "ml-0" : "ml-64"}`}>
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">OT Approvals</h1>
            <p className="text-muted-foreground">Review and approve overtime requests sent by managers</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.approved}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.rejected}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalHours.toFixed(1)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.totalAmount}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by employee name or OT ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Yoga">Yoga</SelectItem>
                    <SelectItem value="Front Desk">Front Desk</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="Ghansoli">Ghansoli</SelectItem>
                    <SelectItem value="Nerul">Nerul</SelectItem>
                    <SelectItem value="Ulwe">Ulwe</SelectItem>
                    <SelectItem value="Sanpada">Sanpada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>OT Requests</CardTitle>
              <CardDescription>
                Showing {paginatedRequests.length} of {filteredRequests.length} requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                  <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                  <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>OT ID</TableHead>
                          <TableHead>Employee</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Hours</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Manager</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedRequests.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8">
                              No OT requests found
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell className="font-medium">{request.id}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{request.employeeName}</div>
                                  <div className="text-sm text-muted-foreground">{request.employeeRole}</div>
                                </div>
                              </TableCell>
                              <TableCell>{request.employeeDepartment}</TableCell>
                              <TableCell>{request.branch}</TableCell>
                              <TableCell>{request.date.toLocaleDateString("en-IN")}</TableCell>
                              <TableCell>{request.hours} hrs</TableCell>
                              <TableCell>₹{request.amount}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{request.managerName}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {request.managerApprovedOn.toLocaleDateString("en-IN")}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(request.status)}</TableCell>
                              <TableCell>
                                {request.status === "sent_to_head" ? (
                                  <div className="flex gap-2">
                                    <Button size="sm" onClick={() => handleAction(request, "approve")}>
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleAction(request, "reject")}
                                    >
                                      Reject
                                    </Button>
                                  </div>
                                ) : (
                                  <span className="text-sm text-muted-foreground">Processed</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function HeadOTApprovals() {
  return (
    <SidebarProvider>
      <HeadOTApprovalsInner />
    </SidebarProvider>
  )
}
