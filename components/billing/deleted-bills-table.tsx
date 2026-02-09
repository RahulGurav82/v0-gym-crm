"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  RotateCcw,
  Trash2,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

interface DeletedBill {
  id: string
  invoiceNo: string
  createdAt: string
  deletedAt: string
  autoDeleteAt: string
  memberName: string
  memberPhone: string
  memberId: string
  branch: string
  branchId: string
  productName: string
  totalAmount: number
  deletedBy: {
    userId: string
    name: string
    role: string
  }
  reason: string
  status: "paid" | "partial" | "unpaid"
}

// Mock deleted bills data
const deletedBills: DeletedBill[] = [
  {
    id: "34Ssq620jcwz8Yu3JXx0",
    invoiceNo: "TFC-SA-01-2602-090",
    createdAt: "2026-02-07T22:59:30Z",
    deletedAt: "2026-02-07T23:04:24Z",
    autoDeleteAt: "2026-03-24T23:04:24Z",
    memberName: "Rahul Gurav",
    memberPhone: "9137408709",
    memberId: "Sc8w5jjCEg65CJYBEs9O",
    branch: "sanpada",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    productName: "Gym Membership",
    totalAmount: 5000,
    deletedBy: {
      userId: "EK3n0bi4pAJaEq2nXFFX",
      name: "rahul gurav",
      role: "admin",
    },
    reason: "test3",
    status: "paid",
  },
  {
    id: "2dhsjkdh3847",
    invoiceNo: "TFC-SA-01-2602-091",
    createdAt: "2026-02-06T18:30:00Z",
    deletedAt: "2026-02-07T10:00:00Z",
    autoDeleteAt: "2026-03-23T10:00:00Z",
    memberName: "John Doe",
    memberPhone: "9876543210",
    memberId: "M001",
    branch: "sanpada",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    productName: "Personal Training - 12 Sessions",
    totalAmount: 12000,
    deletedBy: {
      userId: "mgr123",
      name: "Sarah Manager",
      role: "manager",
    },
    reason: "Duplicate entry",
    status: "partial",
  },
]

export function DeletedBillsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBranch, setFilterBranch] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showRestoreDialog, setShowRestoreDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedBill, setSelectedBill] = useState<DeletedBill | null>(null)

  // Get unique branches
  const branches = Array.from(new Set(deletedBills.map((bill) => bill.branch)))

  // Filter bills
  const filteredBills = useMemo(() => {
    return deletedBills.filter((bill) => {
      const matchesSearch =
        bill.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.memberPhone.includes(searchTerm)

      const matchesBranch = filterBranch === "all" || bill.branch === filterBranch
      const matchesStatus = filterStatus === "all" || bill.status === filterStatus

      return matchesSearch && matchesBranch && matchesStatus
    })
  }, [searchTerm, filterBranch, filterStatus])

  const handleRestore = (bill: DeletedBill) => {
    setSelectedBill(bill)
    setShowRestoreDialog(true)
  }

  const handleViewDetails = (bill: DeletedBill) => {
    setSelectedBill(bill)
    setShowViewDialog(true)
  }

  const confirmRestore = () => {
    console.log("[v0] Restoring bill:", selectedBill?.invoiceNo)
    // TODO: Implement restore logic
    setShowRestoreDialog(false)
    setSelectedBill(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400">Paid</Badge>
      case "partial":
        return <Badge className="bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">Partial</Badge>
      case "unpaid":
        return <Badge className="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400">Unpaid</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDaysUntilPermanentDelete = (autoDeleteAt: string) => {
    const days = Math.ceil((new Date(autoDeleteAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Deleted Bills</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => { /* refresh logic */ }}>
              <Search className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice no, member name, or phone..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={filterBranch} onValueChange={setFilterBranch}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>

            {(searchTerm || filterBranch !== "all" || filterStatus !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setFilterBranch("all")
                  setFilterStatus("all")
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results info */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredBills.length} of {deletedBills.length} deleted bills
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Deleted At</TableHead>
                <TableHead>Member Detail</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Deleted By</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Permanently Delete</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8">
                    <div className="text-muted-foreground">No deleted bills found</div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium text-sm">{bill.invoiceNo}</TableCell>
                    <TableCell className="text-sm">{formatDate(bill.createdAt)}</TableCell>
                    <TableCell className="text-sm">{formatDate(bill.deletedAt)}</TableCell>
                    <TableCell className="text-sm">
                      <div className="space-y-1">
                        <div className="font-medium">{bill.memberName}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {bill.memberPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{bill.branch}</TableCell>
                    <TableCell className="text-sm">{bill.productName}</TableCell>
                    <TableCell className="text-right font-semibold">₹{bill.totalAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-sm">
                      <div className="space-y-1">
                        <div className="font-medium">{bill.deletedBy.name}</div>
                        <div className="text-xs text-muted-foreground">{bill.deletedBy.role}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm max-w-xs truncate" title={bill.reason}>
                      {bill.reason}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span>{getDaysUntilPermanentDelete(bill.autoDeleteAt)} days</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(bill)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRestore(bill)} className="text-blue-600">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restore
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Permanently Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Restore Dialog */}
      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              Restore Bill
            </DialogTitle>
            <DialogDescription asChild>
              <div className="mt-2 space-y-2 text-sm">
                <div>
                  Are you sure you want to restore invoice <span className="font-semibold">{selectedBill?.invoiceNo}</span>?
                </div>
                <div className="bg-blue-50 dark:bg-blue-500/10 p-3 rounded border border-blue-200 dark:border-blue-500/20">
                  <div className="text-blue-800 dark:text-blue-400 text-sm">
                    <div className="font-medium mb-1">Bill Details:</div>
                    <div>Member: {selectedBill?.memberName}</div>
                    <div>Amount: ₹{selectedBill?.totalAmount.toFixed(2)}</div>
                    <div>Deleted by: {selectedBill?.deletedBy.name}</div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowRestoreDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRestore} className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Restore Bill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Deleted Bill Details</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-4 space-y-4 text-sm">
                {selectedBill && (
                  <div className="space-y-4">
                    {/* Invoice Header */}
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <div>
                        <div className="text-muted-foreground text-xs">Invoice Number</div>
                        <div className="font-semibold text-foreground">{selectedBill.invoiceNo}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Status</div>
                        <div>{getStatusBadge(selectedBill.status)}</div>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="space-y-2">
                      <div className="font-medium">Member Information</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-muted-foreground text-xs">Name</div>
                          <div className="text-foreground">{selectedBill.memberName}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Phone</div>
                          <div className="text-foreground">{selectedBill.memberPhone}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Branch</div>
                          <div className="text-foreground">{selectedBill.branch}</div>
                        </div>
                      </div>
                    </div>

                    {/* Deletion Details */}
                    <div className="space-y-2">
                      <div className="font-medium">Deletion Information</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-muted-foreground text-xs">Created At</div>
                          <div className="text-foreground">{formatDate(selectedBill.createdAt)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Deleted At</div>
                          <div className="text-foreground">{formatDate(selectedBill.deletedAt)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Deleted By</div>
                          <div className="text-foreground">{selectedBill.deletedBy.name}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Reason</div>
                          <div className="text-foreground">{selectedBill.reason}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Permanent Delete In</div>
                          <div className="text-foreground">{getDaysUntilPermanentDelete(selectedBill.autoDeleteAt)} days</div>
                        </div>
                      </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="space-y-2">
                      <div className="font-medium">Invoice Details</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Product:</span>
                          <span className="text-foreground">{selectedBill.productName}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Total Amount:</span>
                          <span>₹{selectedBill.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowViewDialog(false)
              handleRestore(selectedBill!)
            }} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Restore This Bill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
