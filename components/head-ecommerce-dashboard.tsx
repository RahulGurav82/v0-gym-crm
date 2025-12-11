"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, DollarSign, Users, TrendingUp, AlertCircle } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 45000, orders: 320 },
  { month: "Feb", sales: 52000, orders: 380 },
  { month: "Mar", sales: 48000, orders: 350 },
  { month: "Apr", sales: 61000, orders: 420 },
  { month: "May", sales: 55000, orders: 390 },
  { month: "Jun", sales: 67000, orders: 450 },
]

const categoryData = [
  { name: "Supplements", value: 35, color: "#ed9320" },
  { name: "Apparel", value: 28, color: "#3b82f6" },
  { name: "Equipment", value: 22, color: "#10b981" },
  { name: "Accessories", value: 15, color: "#f59e0b" },
]

function DashboardContent() {
  const { collapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="head" />

      <div className={`transition-all duration-300 ${collapsed ? "pl-16" : "pl-64"}`}>
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">Ecommerce Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your online store</p>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-xs">
                All Stores
              </Badge>
              <ThemeToggle />
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback>HD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard title="Total Sales" value="$328,450" change="+12.5%" trend="up" icon={DollarSign} />
              <StatsCard title="Orders" value="2,310" change="+8.2%" trend="up" icon={ShoppingCart} />
              <StatsCard title="Products" value="547" change="+5.1%" trend="up" icon={Package} />
              <StatsCard title="Customers" value="1,842" change="+23.1%" trend="up" icon={Users} />
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Sales & Orders Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales & Orders Trend</CardTitle>
                  <CardDescription>Monthly performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="#ed9320" name="Sales ($)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="orders" fill="#3b82f6" name="Orders" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Product category breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders & Top Products */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer purchases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { id: "#ORD-2451", customer: "John Doe", amount: "$245.00", status: "completed" },
                    { id: "#ORD-2452", customer: "Sarah Smith", amount: "$189.50", status: "processing" },
                    { id: "#ORD-2453", customer: "Mike Johnson", amount: "$567.00", status: "completed" },
                    { id: "#ORD-2454", customer: "Emma Davis", amount: "$123.00", status: "pending" },
                    { id: "#ORD-2455", customer: "Alex Brown", amount: "$445.00", status: "completed" },
                  ].map((order, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground mt-1">{order.customer}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-sm">{order.amount}</p>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "processing"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performers this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Whey Protein 2kg", sales: 234, revenue: "$11,700", trend: "+15%" },
                    { name: "Gym T-Shirt Premium", sales: 189, revenue: "$5,670", trend: "+8%" },
                    { name: "Resistance Bands Set", sales: 156, revenue: "$4,680", trend: "+22%" },
                    { name: "Yoga Mat Pro", sales: 143, revenue: "$2,860", trend: "+5%" },
                    { name: "Pre-Workout Energy", sales: 127, revenue: "$6,350", trend: "+18%" },
                  ].map((product, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-sm">{product.name}</p>
                          <Badge variant="secondary" className="text-xs bg-chart-3/10 text-chart-3 hover:bg-chart-3/20">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {product.trend}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {product.sales} sales • {product.revenue}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Store Alerts
                </CardTitle>
                <CardDescription>Important notifications and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { type: "warning", title: "Low Stock Alert", message: "5 products below minimum stock level" },
                    { type: "info", title: "New Reviews", message: "12 products have new customer reviews" },
                    { type: "success", title: "Sales Milestone", message: "Monthly sales target achieved" },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/50">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          alert.type === "warning"
                            ? "bg-destructive/10"
                            : alert.type === "success"
                              ? "bg-chart-3/10"
                              : "bg-primary/10"
                        }`}
                      >
                        <AlertCircle
                          className={`h-4 w-4 ${
                            alert.type === "warning"
                              ? "text-destructive"
                              : alert.type === "success"
                                ? "text-chart-3"
                                : "text-primary"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export function HeadEcommerceDashboard() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  )
}
