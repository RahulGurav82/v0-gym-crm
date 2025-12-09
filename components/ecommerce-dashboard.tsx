"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { ShoppingCart, Package, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 12500, orders: 145 },
  { month: "Feb", sales: 15200, orders: 178 },
  { month: "Mar", sales: 18900, orders: 210 },
  { month: "Apr", sales: 16400, orders: 189 },
  { month: "May", sales: 21500, orders: 245 },
  { month: "Jun", sales: 24800, orders: 290 },
]

const categoryData = [
  { name: "Supplements", value: 35, color: "#ed9320" },
  { name: "Apparel", value: 25, color: "#f5b041" },
  { name: "Equipment", value: 20, color: "#fad7a0" },
  { name: "Accessories", value: 15, color: "#fef3c7" },
  { name: "Others", value: 5, color: "#d4d4d4" },
]

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", product: "Whey Protein 2kg", amount: 89.99, status: "Delivered" },
  { id: "ORD-002", customer: "Jane Smith", product: "Gym Gloves Pro", amount: 34.99, status: "Shipped" },
  { id: "ORD-003", customer: "Mike Johnson", product: "Resistance Bands Set", amount: 45.99, status: "Processing" },
  { id: "ORD-004", customer: "Sarah Wilson", product: "Pre-Workout Energy", amount: 54.99, status: "Pending" },
  { id: "ORD-005", customer: "Tom Brown", product: "Yoga Mat Premium", amount: 29.99, status: "Delivered" },
]

const topProducts = [
  { name: "Whey Protein Isolate", sold: 245, revenue: 22050, stock: 120 },
  { name: "BCAA Energy Drink", sold: 189, revenue: 5670, stock: 85 },
  { name: "Gym Tank Top", sold: 156, revenue: 4680, stock: 200 },
  { name: "Resistance Bands", sold: 134, revenue: 5360, stock: 150 },
  { name: "Shaker Bottle", sold: 98, revenue: 1470, stock: 300 },
]

function DashboardContent() {
  const { collapsed } = useSidebar()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Shipped":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "Processing":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Pending":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <div className={cn("min-h-screen bg-background transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
      <Sidebar role="admin" />

      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
        <div>
          <h1 className="text-xl font-semibold">Ecommerce Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your gym store and products</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Package className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$109,300</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">+18.2%</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">1,257</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">+12.5%</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <ShoppingCart className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">384</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">+8 new</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Package className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.24%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-500">-0.8%</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales and orders trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="sales" stroke="#ed9320" strokeWidth={2} dot={{ fill: "#ed9320" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Product category breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs text-muted-foreground">
                      {cat.name} ({cat.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{order.product}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.customer} • {order.id}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${order.amount}</p>
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(order.status))}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling products this month</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.sold} sold • {product.stock} in stock
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-primary">${product.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export function EcommerceDashboard() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  )
}
