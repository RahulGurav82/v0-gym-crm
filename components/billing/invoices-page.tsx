"use client"

import { useState, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Receipt,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  IndianRupee,
  Printer,
  Mail,
  RefreshCw,
  CheckCircle2,
  Clock,
  XCircle,
  Dumbbell,
  Package,
} from "lucide-react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

// Mock invoices data
const invoices = [
  {
    id: "INV-2024-001",
    date: "2024-01-15",
    customerName: "John Doe",
    customerId: "M001",
    customerType: "member",
    phone: "+91 98765 43210",
    email: "john@example.com",
    items: [
      { name: "Gym Membership", duration: "3 Months", amount: 5000, tax: 250 },
      { name: "Personal Training", duration: "3 Months", slots: 36, trainer: "Mike Ross", amount: 9000, tax: 450 },
    ],
    subtotal: 14000,
    tax: 700,
    total: 14700,
    paidAmount: 14700,
    dueAmount: 0,
    paymentMode: "UPI",
    transactionId: "UPI123456789",
    status: "paid",
    branch: "Downtown",
    createdBy: "Admin",
  },
  {
    id: "INV-2024-002",
    date: "2024-01-14",
    customerName: "Sarah Smith",
    customerId: "M002",
    customerType: "member",
    phone: "+91 98765 43211",
    email: "sarah@example.com",
    items: [
      { name: "Gym Membership", duration: "1 Month", amount: 2000, tax: 100 },
      { name: "Yoga Classes", duration: "1 Month", slots: 12, amount: 1500, tax: 75 },
    ],
    subtotal: 3500,
    tax: 175,
    total: 3675,
    paidAmount: 2000,
    dueAmount: 1675,
    paymentMode: "Cash",
    transactionId: "-",
    status: "partial",
    branch: "Westside",
    createdBy: "Manager",
  },
  {
    id: "INV-2024-003",
    date: "2024-01-13",
    customerName: "Mike Johnson",
    customerId: "E001",
    customerType: "enquiry",
    phone: "+91 98765 43212",
    email: "mike@example.com",
    items: [
      { name: "Gym Membership", duration: "6 Months", amount: 9000, tax: 450 },
      { name: "Sauna Access", duration: "6 Months", slots: 24, amount: 3000, tax: 150 },
      { name: "Steam Access", duration: "6 Months", slots: 24, amount: 2400, tax: 120 },
    ],
    subtotal: 14400,
    tax: 720,
    total: 15120,
    paidAmount: 15120,
    dueAmount: 0,
    paymentMode: "Card",
    transactionId: "CARD987654321",
    status: "paid",
    branch: "Downtown",
    createdBy: "Admin",
  },
  {
    id: "INV-2024-004",
    date: "2024-01-12",
    customerName: "Emily Brown",
    customerId: "M003",
    customerType: "member",
    phone: "+91 98765 43213",
    email: "emily@example.com",
    items: [{ name: "Premium Package", duration: "12 Months", amount: 25000, tax: 1250 }],
    subtotal: 25000,
    tax: 1250,
    total: 26250,
    paidAmount: 0,
    dueAmount: 26250,
    paymentMode: "-",
    transactionId: "-",
    status: "unpaid",
    branch: "Eastside",
    createdBy: "Manager",
  },
  {
    id: "INV-2024-005",
    date: "2024-01-11",
    customerName: "David Wilson",
    customerId: "M004",
    customerType: "member",
    phone: "+91 98765 43214",
    email: "david@example.com",
    items: [
      { name: "MMA Training", duration: "3 Months", slots: 36, amount: 12000, tax: 600 },
      { name: "CrossFit Classes", duration: "3 Months", slots: 36, amount: 6000, tax: 300 },
    ],
    subtotal: 18000,
    tax: 900,
    total: 18900,
    paidAmount: 18900,
    dueAmount: 0,
    paymentMode: "Bank Transfer",
    transactionId: "NEFT123456",
    status: "paid",
    branch: "Downtown",
    createdBy: "Admin",
  },
  {
    id: "INV-2024-006",
    date: "2024-01-10",
    customerName: "Lisa Anderson",
    customerId: "E002",
    customerType: "enquiry",
    phone: "+91 98765 43215",
    email: "lisa@example.com",
    items: [{ name: "Zumba Classes", duration: "1 Month", slots: 12, amount: 2000, tax: 100 }],
    subtotal: 2000,
    tax: 100,
    total: 2100,
    paidAmount: 2100,
    dueAmount: 0,
    paymentMode: "UPI",
    transactionId: "UPI987654",
    status: "paid",
    branch: "Westside",
    createdBy: "Employee",
  },
]

// Stats
const stats = {
  totalInvoices: invoices.length,
  totalRevenue: invoices.reduce((sum, inv) => sum + inv.paidAmount, 0),
  pendingAmount: invoices.reduce((sum, inv) => sum + inv.dueAmount, 0),
  paidInvoices: invoices.filter((inv) => inv.status === "paid").length,
}

function InvoicesPageInner() {
  const { collapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoices)[0] | null>(null)
  const [showInvoiceSheet, setShowInvoiceSheet] = useState(false)
  const invoiceRef = useRef<HTMLDivElement>(null)

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.phone.includes(searchQuery)

      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
      const matchesBranch = branchFilter === "all" || invoice.branch === branchFilter

      return matchesSearch && matchesStatus && matchesBranch
    })
  }, [searchQuery, statusFilter, branchFilter])

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / rowsPerPage)
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        )
      case "partial":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Partial
          </Badge>
        )
      case "unpaid":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Unpaid
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleViewInvoice = (invoice: (typeof invoices)[0]) => {
    setSelectedInvoice(invoice)
    setShowInvoiceSheet(true)
  }

  const handlePrintInvoice = () => {
    window.print()
  }

  const handleDownloadInvoice = () => {
    // In a real app, this would generate a PDF
    alert("Invoice PDF download started!")
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />

      <div className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur px-6">
          <div>
            <h1 className="text-xl font-semibold">Invoices</h1>
            <p className="text-sm text-muted-foreground">View and manage all billing invoices</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync
            </Button>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Invoices</p>
                    <p className="text-2xl font-bold">{stats.totalInvoices}</p>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-emerald-500">₹{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-full bg-emerald-500/10">
                    <IndianRupee className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Amount</p>
                    <p className="text-2xl font-bold text-amber-500">₹{stats.pendingAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-full bg-amber-500/10">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Paid Invoices</p>
                    <p className="text-2xl font-bold">{stats.paidInvoices}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-500/10">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by invoice ID, customer name, ID, or phone..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={branchFilter} onValueChange={setBranchFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      <SelectItem value="Downtown">Downtown</SelectItem>
                      <SelectItem value="Westside">Westside</SelectItem>
                      <SelectItem value="Eastside">Eastside</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoices Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead className="text-right">Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Receipt className="w-4 h-4 text-primary" />
                          <span className="font-medium">{invoice.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{invoice.customerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {invoice.customerId} • {invoice.customerType}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Package className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{invoice.items.length} items</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">₹{invoice.total.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-emerald-500">
                        ₹{invoice.paidAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-amber-500">
                        {invoice.dueAmount > 0 ? `₹${invoice.dueAmount.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{invoice.branch}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDownloadInvoice}>
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="w-4 h-4 mr-2" />
                              Print
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send to Email
                            </DropdownMenuItem>
                            {invoice.status !== "paid" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-primary">
                                  <IndianRupee className="w-4 h-4 mr-2" />
                                  Record Payment
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rows per page:</span>
                  <Select
                    value={rowsPerPage.toString()}
                    onValueChange={(value) => {
                      setRowsPerPage(Number(value))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className="w-[70px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Invoice Detail Sheet */}
      <Sheet open={showInvoiceSheet} onOpenChange={setShowInvoiceSheet}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Invoice Details
            </SheetTitle>
          </SheetHeader>

          {selectedInvoice && (
            <div ref={invoiceRef} className="mt-6 space-y-6">
              {/* Invoice Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Dumbbell className="w-6 h-6 text-primary" />
                    <span className="text-xl font-bold">FitHub Gym</span>
                  </div>
                  <p className="text-sm text-muted-foreground">123 Fitness Street, Downtown</p>
                  <p className="text-sm text-muted-foreground">Phone: +91 98765 43210</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{selectedInvoice.id}</p>
                  <p className="text-sm text-muted-foreground">Date: {selectedInvoice.date}</p>
                  {getStatusBadge(selectedInvoice.status)}
                </div>
              </div>

              <Separator />

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bill To:</p>
                  <p className="font-medium">{selectedInvoice.customerName}</p>
                  <p className="text-sm text-muted-foreground">ID: {selectedInvoice.customerId}</p>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.phone}</p>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Branch:</p>
                  <p className="font-medium">{selectedInvoice.branch}</p>
                  <p className="text-sm text-muted-foreground mt-2">Created By:</p>
                  <p className="font-medium">{selectedInvoice.createdBy}</p>
                </div>
              </div>

              <Separator />

              {/* Items */}
              <div>
                <p className="font-medium mb-3">Items</p>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Tax</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <p className="font-medium">{item.name}</p>
                            {item.slots && (
                              <p className="text-xs text-muted-foreground">
                                {item.slots} slots
                                {item.trainer && ` • Trainer: ${item.trainer}`}
                              </p>
                            )}
                          </TableCell>
                          <TableCell>{item.duration}</TableCell>
                          <TableCell className="text-right">₹{item.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-right">₹{item.tax.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Totals */}
              <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>₹{selectedInvoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (5%):</span>
                  <span>₹{selectedInvoice.tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>₹{selectedInvoice.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-500">
                  <span>Paid Amount:</span>
                  <span>₹{selectedInvoice.paidAmount.toLocaleString()}</span>
                </div>
                {selectedInvoice.dueAmount > 0 && (
                  <div className="flex justify-between text-sm text-amber-500">
                    <span>Due Amount:</span>
                    <span>₹{selectedInvoice.dueAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Payment Info */}
              <div className="rounded-lg border p-4">
                <p className="font-medium mb-2">Payment Information</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">Payment Mode:</p>
                  <p>{selectedInvoice.paymentMode}</p>
                  <p className="text-muted-foreground">Transaction ID:</p>
                  <p className="font-mono">{selectedInvoice.transactionId}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1" onClick={handleDownloadInvoice}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handlePrintInvoice}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Send to Customer Email
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export function InvoicesPage() {
  return (
    <SidebarProvider>
      <InvoicesPageInner />
    </SidebarProvider>
  )
}
