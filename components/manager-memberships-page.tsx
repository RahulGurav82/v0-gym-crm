"use client"

import { useState } from "react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Users, IndianRupee, CheckCircle, AlertCircle, CalendarIcon, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, addDays, isWithinInterval } from "date-fns"
import { BRANCHES } from "@/lib/branches"

// Mock data - in real app, this would come from API
const mockMemberships = [
  {
    id: "1",
    memberId: "T27HjZX88NAoqKFrASyy",
    memberName: "AFSHAA lamre",
    phone: "9920955087",
    packageId: "H0P8jYDto3gmN1EgnHqJ",
    packageName: "Standard Package",
    productId: "D5pQmZu4W0rQ7Ap3HslT",
    productName: "Gym Membership",
    isPackage: true,
    amount: 10000,
    taxAmount: 0.09,
    totalAmount: 10000,
    startDate: new Date("2025-08-18"),
    endDate: new Date("2026-08-17"),
    status: "active",
    branchId: "YajpA3SoiaWY3xjx9CAX",
    branchName: "Ghansoli",
    createdAt: new Date("2025-07-31"),
  },
  {
    id: "2",
    memberId: "2",
    memberName: "Rahul Sharma",
    phone: "9876543210",
    packageId: "PKG-002",
    packageName: "Premium Package",
    productId: "PROD-002",
    productName: "Gym + PT",
    isPackage: true,
    amount: 15000,
    taxAmount: 0.09,
    totalAmount: 15000,
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-12-31"),
    status: "active",
    branchId: "gvDFxqGIHoCBIiANZ0Lm",
    branchName: "Nerul",
    createdAt: new Date("2025-05-25"),
  },
  {
    id: "3",
    memberId: "3",
    memberName: "Priya Patel",
    phone: "9123456789",
    packageId: "PKG-003",
    packageName: "Basic Package",
    productId: "PROD-003",
    productName: "Gym Only",
    isPackage: true,
    amount: 8000,
    taxAmount: 0.09,
    totalAmount: 8000,
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
    status: "expiring",
    branchId: "18gIrEyeVVFc7iQwC3EG",
    branchName: "Ulwe",
    createdAt: new Date("2024-12-20"),
  },
  {
    id: "4",
    memberId: "4",
    memberName: "Amit Kumar",
    phone: "9988776655",
    packageId: "PKG-001",
    packageName: "Standard Package",
    productId: "PROD-001",
    productName: "Gym Membership",
    isPackage: true,
    amount: 10000,
    taxAmount: 0.09,
    totalAmount: 10000,
    startDate: new Date("2024-08-01"),
    endDate: new Date("2025-01-15"),
    status: "expired",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    branchName: "Sanpada",
    createdAt: new Date("2024-07-25"),
  },
]

function ManagerMembershipsPageInner() {
  const { collapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [packageFilter, setPackageFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [renewDialog, setRenewDialog] = useState<{
    open: boolean
    membership: (typeof mockMemberships)[0] | null
  }>({
    open: false,
    membership: null,
  })
  const [renewalDuration, setRenewalDuration] = useState("3")
  const [renewalAmount, setRenewalAmount] = useState("")

  const itemsPerPage = 10

  // Filter memberships
  const filteredMemberships = mockMemberships.filter((membership) => {
    const matchesSearch =
      membership.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      membership.phone.includes(searchQuery) ||
      membership.packageName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || membership.status === statusFilter
    const matchesBranch = branchFilter === "all" || membership.branchName === branchFilter
    const matchesPackage = packageFilter === "all" || membership.packageName === packageFilter

    let matchesDateRange = true
    if (dateRange.from && dateRange.to) {
      matchesDateRange = isWithinInterval(membership.startDate, {
        start: dateRange.from,
        end: dateRange.to,
      })
    }

    return matchesSearch && matchesStatus && matchesBranch && matchesPackage && matchesDateRange
  })

  // Calculate stats
  const totalMemberships = filteredMemberships.length
  const activeMemberships = filteredMemberships.filter((m) => m.status === "active").length
  const expiringMemberships = filteredMemberships.filter((m) => m.status === "expiring").length
  const expiredMemberships = filteredMemberships.filter((m) => m.status === "expired").length
  const totalRevenue = filteredMemberships.reduce((sum, m) => sum + m.totalAmount, 0).toFixed(2)

  // Pagination
  const totalPages = Math.ceil(filteredMemberships.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMemberships = filteredMemberships.slice(startIndex, startIndex + itemsPerPage)

  // Get unique packages for filter
  const uniquePackages = Array.from(new Set(mockMemberships.map((m) => m.packageName)))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "expiring":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "expired":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleRenewClick = (membership: (typeof mockMemberships)[0]) => {
    setRenewDialog({ open: true, membership })
    setRenewalAmount(membership.amount.toString())
  }

  const handleRenewSubmit = () => {
    if (!renewDialog.membership) return

    const duration = Number.parseInt(renewalDuration)
    const newEndDate = addDays(renewDialog.membership.endDate, duration * 30)

    console.log("Renewing membership:", {
      membershipId: renewDialog.membership.id,
      duration,
      amount: renewalAmount,
      newEndDate,
    })

    alert(
      `Membership renewed for ${renewDialog.membership.memberName} for ${duration} months. New end date: ${format(newEndDate, "dd MMM yyyy")}`,
    )

    setRenewDialog({ open: false, membership: null })
    setRenewalDuration("3")
    setRenewalAmount("")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="manager" />

      <main className={cn("flex-1 transition-all duration-300 ease-in-out", collapsed ? "pl-16" : "pl-64")}>
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Membership Management</h1>
            <p className="text-muted-foreground">View and manage all member subscriptions and renewals</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Memberships</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMemberships}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{activeMemberships}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{expiringMemberships}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expired</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{expiredMemberships}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalRevenue}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, phone..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={branchFilter} onValueChange={setBranchFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {BRANCHES.map((branch) => (
                      <SelectItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={packageFilter} onValueChange={setPackageFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Packages</SelectItem>
                    {uniquePackages.map((pkg) => (
                      <SelectItem key={pkg} value={pkg}>
                        {pkg}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Memberships Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Details</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Days Remaining</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMemberships.map((membership) => {
                      const daysRemaining = getDaysRemaining(membership.endDate)
                      return (
                        <TableRow key={membership.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{membership.memberName}</p>
                              <p className="text-xs text-muted-foreground">{membership.phone}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{membership.packageName}</TableCell>
                          <TableCell className="text-sm">{membership.productName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{membership.branchName}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{format(membership.startDate, "dd MMM yyyy")}</TableCell>
                          <TableCell className="text-sm">{format(membership.endDate, "dd MMM yyyy")}</TableCell>
                          <TableCell>
                            {daysRemaining > 0 ? (
                              <span
                                className={cn(
                                  "font-medium",
                                  daysRemaining <= 30 ? "text-yellow-600" : "text-green-600",
                                )}
                              >
                                {daysRemaining} days
                              </span>
                            ) : (
                              <span className="text-red-600 font-medium">Expired</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">₹{membership.totalAmount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(membership.status)}>
                              {membership.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary"
                              onClick={() => handleRenewClick(membership)}
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Renew
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMemberships.length)} of{" "}
                {filteredMemberships.length} memberships
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum: number
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
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Renewal Dialog */}
      <Dialog open={renewDialog.open} onOpenChange={(open) => setRenewDialog({ open, membership: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renew Membership</DialogTitle>
            <DialogDescription>Renew membership for {renewDialog.membership?.memberName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Package</Label>
              <Input value={renewDialog.membership?.packageName || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Current End Date</Label>
              <Input
                value={renewDialog.membership ? format(renewDialog.membership.endDate, "dd MMM yyyy") : ""}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Renewal Duration</Label>
              <Select value={renewalDuration} onValueChange={setRenewalDuration}>
                <SelectTrigger id="duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Month</SelectItem>
                  <SelectItem value="3">3 Months</SelectItem>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Renewal Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={renewalAmount}
                onChange={(e) => setRenewalAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>New End Date</Label>
              <Input
                value={
                  renewDialog.membership
                    ? format(
                        addDays(renewDialog.membership.endDate, Number.parseInt(renewalDuration) * 30),
                        "dd MMM yyyy",
                      )
                    : ""
                }
                disabled
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenewDialog({ open: false, membership: null })}>
              Cancel
            </Button>
            <Button onClick={handleRenewSubmit} disabled={!renewalAmount}>
              Confirm Renewal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function ManagerMembershipsPage() {
  return (
    <SidebarProvider>
      <ManagerMembershipsPageInner />
    </SidebarProvider>
  )
}
