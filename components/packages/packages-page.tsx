"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar, useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Box,
  Dumbbell,
  Users,
  Flame,
  Snowflake,
  Wind,
  Music,
  Heart,
  Swords,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  SlidersHorizontal,
} from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  icon: React.ComponentType<{ className?: string }>
}

interface Package {
  id: string
  name: string
  description: string
  products: string[]
  price: number
  duration: string
  status: "active" | "inactive" | "draft"
  branch: string
  totalSold: number
  createdAt: string
}

const allProducts: Product[] = [
  { id: "gym", name: "Gym Membership", category: "Membership", icon: Dumbbell },
  { id: "pt", name: "Personal Training", category: "Training", icon: Users },
  { id: "sauna", name: "Sauna", category: "Amenities", icon: Flame },
  { id: "ice-bath", name: "Ice Bath", category: "Amenities", icon: Snowflake },
  { id: "steam", name: "Steam", category: "Amenities", icon: Wind },
  { id: "zumba", name: "Zumba", category: "Classes", icon: Music },
  { id: "yoga", name: "Yoga", category: "Classes", icon: Heart },
  { id: "mma", name: "MMA", category: "Classes", icon: Swords },
  { id: "crossfit", name: "Crossfit", category: "Classes", icon: Flame },
]

const mockPackages: Package[] = [
  {
    id: "PKG001",
    name: "Basic Fitness",
    description: "Perfect for beginners starting their fitness journey",
    products: ["gym"],
    price: 999,
    duration: "1 Month",
    status: "active",
    branch: "All Branches",
    totalSold: 156,
    createdAt: "2024-01-15",
  },
  {
    id: "PKG002",
    name: "Premium Wellness",
    description: "Complete gym access with relaxation amenities",
    products: ["gym", "sauna", "steam"],
    price: 2499,
    duration: "1 Month",
    status: "active",
    branch: "Downtown",
    totalSold: 89,
    createdAt: "2024-01-20",
  },
  {
    id: "PKG003",
    name: "Group Classes Bundle",
    description: "Unlimited access to all group fitness classes",
    products: ["zumba", "yoga", "crossfit"],
    price: 1999,
    duration: "1 Month",
    status: "active",
    branch: "All Branches",
    totalSold: 234,
    createdAt: "2024-02-01",
  },
  {
    id: "PKG004",
    name: "Ultimate Fighter",
    description: "MMA training with recovery amenities",
    products: ["mma", "pt", "ice-bath", "sauna"],
    price: 4999,
    duration: "1 Month",
    status: "active",
    branch: "Westside",
    totalSold: 45,
    createdAt: "2024-02-10",
  },
  {
    id: "PKG005",
    name: "VIP All Access",
    description: "Everything included - the ultimate package",
    products: ["gym", "pt", "sauna", "ice-bath", "steam", "zumba", "yoga", "mma", "crossfit"],
    price: 7999,
    duration: "1 Month",
    status: "active",
    branch: "All Branches",
    totalSold: 67,
    createdAt: "2024-02-15",
  },
  {
    id: "PKG006",
    name: "Yoga & Meditation",
    description: "Mind and body wellness focused package",
    products: ["yoga", "steam"],
    price: 1499,
    duration: "1 Month",
    status: "inactive",
    branch: "Eastside",
    totalSold: 23,
    createdAt: "2024-02-20",
  },
  {
    id: "PKG007",
    name: "Recovery Plus",
    description: "Post-workout recovery amenities",
    products: ["sauna", "ice-bath", "steam"],
    price: 1299,
    duration: "1 Month",
    status: "draft",
    branch: "Downtown",
    totalSold: 0,
    createdAt: "2024-03-01",
  },
  {
    id: "PKG008",
    name: "Personal Training Pro",
    description: "Intensive personal training with gym access",
    products: ["gym", "pt"],
    price: 3499,
    duration: "1 Month",
    status: "active",
    branch: "All Branches",
    totalSold: 112,
    createdAt: "2024-03-05",
  },
]

function PackagesPageInner() {
  const { collapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredPackages = mockPackages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter
    const matchesBranch = branchFilter === "all" || pkg.branch === branchFilter

    let matchesCategory = categoryFilter === "all"
    if (!matchesCategory) {
      const categoryProducts = allProducts.filter((p) => p.category === categoryFilter).map((p) => p.id)
      matchesCategory = pkg.products.some((p) => categoryProducts.includes(p))
    }

    return matchesSearch && matchesStatus && matchesBranch && matchesCategory
  })

  const totalPages = Math.ceil(filteredPackages.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedPackages = filteredPackages.slice(startIndex, startIndex + rowsPerPage)

  const getProductIcon = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId)
    return product?.icon || Box
  }

  const getProductName = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId)
    return product?.name || productId
  }

  const stats = {
    total: mockPackages.length,
    active: mockPackages.filter((p) => p.status === "active").length,
    totalRevenue: mockPackages.reduce((acc, p) => acc + p.price * p.totalSold, 0),
    totalSold: mockPackages.reduce((acc, p) => acc + p.totalSold, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <main className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
          <div>
            <h1 className="text-xl font-semibold">Packages</h1>
            <p className="text-sm text-muted-foreground">Create and manage membership packages</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/admin/packages/add">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Package
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Packages</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Box className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Packages</p>
                    <p className="text-2xl font-bold">{stats.active}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Box className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sold</p>
                    <p className="text-2xl font-bold">{stats.totalSold}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search packages by name or ID..."
                    className="pl-9 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] h-10">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[150px] h-10">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Membership">Membership</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Amenities">Amenities</SelectItem>
                      <SelectItem value="Classes">Classes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={branchFilter} onValueChange={setBranchFilter}>
                    <SelectTrigger className="w-[150px] h-10">
                      <SelectValue placeholder="Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      <SelectItem value="All Branches">All Branches</SelectItem>
                      <SelectItem value="Downtown">Downtown</SelectItem>
                      <SelectItem value="Westside">Westside</SelectItem>
                      <SelectItem value="Eastside">Eastside</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Card Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{pkg.name}</h3>
                          <Badge
                            variant={
                              pkg.status === "active" ? "default" : pkg.status === "inactive" ? "secondary" : "outline"
                            }
                            className={cn(
                              pkg.status === "active" && "bg-green-500/10 text-green-600 border-green-500/20",
                              pkg.status === "inactive" && "bg-gray-500/10 text-gray-600 border-gray-500/20",
                              pkg.status === "draft" && "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
                            )}
                          >
                            {pkg.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{pkg.id}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Package
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{pkg.description}</p>
                  </div>

                  {/* Products */}
                  <div className="p-4 border-b border-border bg-muted/30">
                    <p className="text-xs font-medium text-muted-foreground mb-2">INCLUDED PRODUCTS</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.products.slice(0, 4).map((productId) => {
                        const Icon = getProductIcon(productId)
                        return (
                          <div
                            key={productId}
                            className="flex items-center gap-1.5 px-2 py-1 bg-background rounded-md text-xs border"
                          >
                            <Icon className="h-3 w-3 text-primary" />
                            {getProductName(productId)}
                          </div>
                        )
                      })}
                      {pkg.products.length > 4 && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                          +{pkg.products.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">₹{pkg.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">/{pkg.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{pkg.totalSold} sold</p>
                      <p className="text-xs text-muted-foreground">{pkg.branch}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page:</span>
              <Select value={rowsPerPage.toString()} onValueChange={(v) => setRowsPerPage(Number(v))}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectContent>
              </Select>
              <span>
                {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredPackages.length)} of{" "}
                {filteredPackages.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-3 text-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export function PackagesPage() {
  return <PackagesPageInner />
}
