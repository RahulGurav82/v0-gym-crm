"use client"

import { useState } from "react"
import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Search, RefreshCw, CheckCircle, AlertCircle, Dumbbell } from "lucide-react"
import { format, addDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { BRANCHES } from "@/lib/branches"
import { MobileMenuButton } from "@/components/sidebar"

// Amenity types
const AMENITY_TYPES = [
  "yoga",
  "steam",
  "icebath",
  "sauna",
  "zumba",
  "crossfit",
  "mma",
  "pilates",
  "spinning",
  "boxing",
] as const

// Mock data
const mockAmenities = [
  {
    id: "1",
    memberId: "Z9s4QjgDn4M81ZRrhWqI",
    memberName: "Kartik",
    phone: "9082838508",
    packageId: "H0P8jYDto3gmN1EgnHqJ",
    packageName: "Standard Package",
    productId: "2wh4OOoWpWU5N5bwGrqO",
    productName: "yoga",
    type: "yoga" as const,
    branchId: "YajpA3SoiaWY3xjx9CAX",
    branchName: "Ghansoli",
    startDate: new Date("2024-09-07"),
    endDate: new Date("2025-12-06"),
    remainingSlots: 28,
    totalSlots: 30,
    status: "active",
    isPackage: true,
    createdAt: new Date("2024-09-06"),
  },
  {
    id: "2",
    memberId: "ABC123",
    memberName: "Rahul Sharma",
    phone: "9876543210",
    packageId: "PKG002",
    packageName: "Premium Package",
    productId: "PRD002",
    productName: "steam",
    type: "steam" as const,
    branchId: "gvDFxqGIHoCBIiANZ0Lm",
    branchName: "Nerul",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2025-01-15"),
    remainingSlots: 5,
    totalSlots: 20,
    status: "expiring",
    isPackage: true,
    createdAt: new Date("2024-10-01"),
  },
  {
    id: "3",
    memberId: "DEF456",
    memberName: "Priya Patel",
    phone: "9123456789",
    packageId: "PKG003",
    packageName: "Elite Package",
    productId: "PRD003",
    productName: "crossfit",
    type: "crossfit" as const,
    branchId: "18gIrEyeVVFc7iQwC3EG",
    branchName: "Ulwe",
    startDate: new Date("2024-08-15"),
    endDate: new Date("2024-12-20"),
    remainingSlots: 0,
    totalSlots: 40,
    status: "expired",
    isPackage: true,
    createdAt: new Date("2024-08-15"),
  },
]

function ManagerAmenitiesPageInner() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [renewDialog, setRenewDialog] = useState<{ open: boolean; amenity: (typeof mockAmenities)[0] | null }>({
    open: false,
    amenity: null,
  })
  const [renewalDuration, setRenewalDuration] = useState("1")
  const [renewalSlots, setRenewalSlots] = useState("")

  const itemsPerPage = 10

  // Filter amenities
  const filteredAmenities = mockAmenities.filter((amenity) => {
    const matchesSearch =
      amenity.memberName.toLowerCase().includes(searchQuery.toLowerCase()) || amenity.phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || amenity.status === statusFilter
    const matchesBranch = branchFilter === "all" || amenity.branchName === branchFilter
    const matchesType = typeFilter === "all" || amenity.type === typeFilter
    const matchesDateRange =
      !dateRange.from || !dateRange.to || (amenity.startDate >= dateRange.from && amenity.startDate <= dateRange.to)

    return matchesSearch && matchesStatus && matchesBranch && matchesType && matchesDateRange
  })

  // Calculate stats
  const totalAmenities = filteredAmenities.length
  const activeAmenities = filteredAmenities.filter((a) => a.status === "active").length
  const expiringAmenities = filteredAmenities.filter((a) => a.status === "expiring").length
  const expiredAmenities = filteredAmenities.filter((a) => a.status === "expired").length

  // Pagination
  const totalPages = Math.ceil(filteredAmenities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAmenities = filteredAmenities.slice(startIndex, startIndex + itemsPerPage)

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

  const getTypeIcon = (type: string) => {
    return <Dumbbell className="h-4 w-4" />
  }

  const handleRenewClick = (amenity: (typeof mockAmenities)[0]) => {
    setRenewDialog({ open: true, amenity })
    setRenewalSlots(amenity.totalSlots.toString())
  }

  const handleRenewSubmit = () => {
    console.log("[v0] Renewing amenity:", renewDialog.amenity?.id, {
      duration: renewalDuration,
      slots: renewalSlots,
    })
    setRenewDialog({ open: false, amenity: null })
    setRenewalSlots("")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="manager" />
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <MobileMenuButton />
          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Amenities Management</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Amenities</CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAmenities}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{activeAmenities}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{expiringAmenities}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expired</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{expiredAmenities}</div>
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
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {AMENITY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
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
                            {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
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

          {/* Amenities Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Details</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Slots</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedAmenities.map((amenity) => {
                      return (
                        <TableRow key={amenity.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{amenity.memberName}</p>
                              <p className="text-xs text-muted-foreground">{amenity.phone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(amenity.type)}
                              <span className="text-sm font-medium capitalize">{amenity.type}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{amenity.packageName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{amenity.branchName}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{format(amenity.startDate, "dd MMM yyyy")}</TableCell>
                          <TableCell className="text-sm">{format(amenity.endDate, "dd MMM yyyy")}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span
                                className={cn(
                                  "font-medium text-sm",
                                  amenity.remainingSlots === 0
                                    ? "text-red-600"
                                    : amenity.remainingSlots <= 5
                                      ? "text-yellow-600"
                                      : "text-green-600",
                                )}
                              >
                                {amenity.remainingSlots} / {amenity.totalSlots}
                              </span>
                              <span className="text-xs text-muted-foreground">remaining</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(amenity.status)}>{amenity.status.toUpperCase()}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary"
                              onClick={() => handleRenewClick(amenity)}
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
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAmenities.length)} of{" "}
              {filteredAmenities.length} amenities
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className="w-8"
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Renewal Dialog */}
      <Dialog open={renewDialog.open} onOpenChange={(open) => setRenewDialog({ open, amenity: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renew Amenity</DialogTitle>
            <DialogDescription>
              Renew {renewDialog.amenity?.type} amenity for {renewDialog.amenity?.memberName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Amenity Type</Label>
              <Input value={renewDialog.amenity?.type.toUpperCase() || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Current Package</Label>
              <Input value={renewDialog.amenity?.packageName || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Current End Date</Label>
              <Input value={renewDialog.amenity ? format(renewDialog.amenity.endDate, "dd MMM yyyy") : ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Current Slots</Label>
              <Input
                value={
                  renewDialog.amenity ? `${renewDialog.amenity.remainingSlots} / ${renewDialog.amenity.totalSlots}` : ""
                }
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
              <Label htmlFor="slots">Additional Slots</Label>
              <Input
                id="slots"
                type="number"
                placeholder="Enter number of slots"
                value={renewalSlots}
                onChange={(e) => setRenewalSlots(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>New End Date</Label>
              <Input
                value={
                  renewDialog.amenity
                    ? format(addDays(renewDialog.amenity.endDate, Number.parseInt(renewalDuration) * 30), "dd MMM yyyy")
                    : ""
                }
                disabled
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenewDialog({ open: false, amenity: null })}>
              Cancel
            </Button>
            <Button onClick={handleRenewSubmit} disabled={!renewalSlots}>
              Confirm Renewal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function ManagerAmenitiesPage() {
  return (
    <SidebarProvider>
      <ManagerAmenitiesPageInner />
    </SidebarProvider>
  )
}
