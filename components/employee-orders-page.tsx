"use client"

import { useState } from "react"
import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Package, IndianRupee, ShoppingCart, User, Phone, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"
import { BRANCHES } from "@/lib/branches"

// Mock data - in real app, this would come from API
const mockOrders = [
  {
    id: "1",
    orderNo: "ORD-001",
    memberId: "0NNSUVZLPbSVUHch3lZS",
    memberName: "Rahul Gurav",
    memberPhone: "9137408709",
    packageName: "Gold Standard",
    isPackagePurchase: true,
    totalAmount: "1366.05",
    paidAmount: "1366.05",
    pendingAmount: "0.00",
    status: "paid",
    branchName: "Sanpada",
    createdAt: new Date("2025-12-21"),
    productsCount: 2,
  },
  {
    id: "2",
    orderNo: "ORD-002",
    memberId: "2",
    memberName: "Priya Sharma",
    memberPhone: "9876543210",
    packageName: "Silver Plan",
    isPackagePurchase: true,
    totalAmount: "899.00",
    paidAmount: "500.00",
    pendingAmount: "399.00",
    status: "partial",
    branchName: "Ghansoli",
    createdAt: new Date("2025-12-20"),
    productsCount: 1,
  },
  {
    id: "3",
    orderNo: "ORD-003",
    memberId: "3",
    memberName: "Amit Patel",
    memberPhone: "9123456789",
    packageName: null,
    isPackagePurchase: false,
    totalAmount: "2500.00",
    paidAmount: "2500.00",
    pendingAmount: "0.00",
    status: "paid",
    branchName: "Nerul",
    createdAt: new Date("2025-12-19"),
    productsCount: 3,
  },
]

function EmployeeOrdersPageInner() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter orders
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.memberPhone.includes(searchQuery) ||
      order.orderNo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesBranch = branchFilter === "all" || order.branchName === branchFilter
    return matchesSearch && matchesStatus && matchesBranch
  })

  // Calculate stats
  const totalOrders = filteredOrders.length
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + Number.parseFloat(order.totalAmount), 0).toFixed(2)
  const paidOrders = filteredOrders.filter((o) => o.status === "paid").length
  const pendingAmount = filteredOrders
    .reduce((sum, order) => sum + Number.parseFloat(order.pendingAmount), 0)
    .toFixed(2)

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "partial":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "pending":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  console.log("[v0] Employee Orders Page loaded")

  return (
    <div className="flex h-screen w-full">
      <Sidebar role="employee" />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Member Orders</h1>
            <p className="text-muted-foreground">View and manage all member orders and purchases</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paid Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{paidOrders}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{pendingAmount}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, phone, or order number..."
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
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
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
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {paginatedOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{order.orderNo}</h3>
                            <Badge className={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.createdAt.toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <Link href={`/employee/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{order.memberName}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {order.memberPhone}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{order.packageName || "Individual Products"}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.productsCount} product{order.productsCount > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">₹{order.totalAmount}</p>
                            <p className="text-xs text-muted-foreground">Paid: ₹{order.paidAmount}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{order.branchName}</p>
                            {Number.parseFloat(order.pendingAmount) > 0 && (
                              <p className="text-xs text-red-600">Due: ₹{order.pendingAmount}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
                {filteredOrders.length} orders
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
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
    </div>
  )
}

console.log("[v0] Employee Orders Page wrapper rendering")

export default function EmployeeOrdersPage() {
  return (
    <SidebarProvider>
      <EmployeeOrdersPageInner />
    </SidebarProvider>
  )
}
