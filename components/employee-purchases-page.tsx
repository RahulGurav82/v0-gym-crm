"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  ShoppingBag,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Eye,
  Calendar,
  CreditCard,
  Receipt,
  Package,
} from "lucide-react"
import { Sidebar, SidebarProvider } from "./sidebar"
import { ThemeToggle } from "./theme-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

// Mock purchases data based on the structure provided
const purchases = [
  {
    id: "TFC-SA-01-2512-023",
    date: "2025-12-21",
    packageName: "Gold Standard",
    isPackage: true,
    memberName: "Rahul Gurav",
    memberPhone: "9137408709",
    branchName: "Sanpada",
    products: [
      {
        name: "Gym Membership",
        productType: "membership",
        durationMonths: 3,
        startDate: "2025-12-21",
        endDate: "2026-03-21",
        price: "106.05",
        priceExclTax: 101,
        taxAmount: 5.05,
        status: "active",
        isPackage: true,
        packageName: "Gold Standard",
      },
      {
        name: "Personal Training",
        productType: "training",
        durationMonths: 3,
        startDate: "2025-12-21",
        endDate: "2026-03-21",
        price: "1260.00",
        priceExclTax: 1200,
        taxAmount: 60,
        totalSlots: 12,
        status: "active",
        isPackage: true,
        packageName: "Gold Standard",
      },
    ],
    subtotal: 1301,
    taxAmount: 65.05,
    totalAmount: 1366.05,
    discountAmount: "899.00",
    discountPercentage: "40.86",
    paidAmount: "1366.05",
    pendingAmount: "0.00",
    status: "paid",
    payment: {
      methods: [
        {
          amount: "1000.00",
          mode: "cash",
          transactionNumber: null,
          paymentDate: "2025-12-21T18:58:00+05:30",
        },
        {
          amount: "366.05",
          mode: "card",
          transactionNumber: "yh7784384939348948",
          paymentDate: "2025-12-21T18:58:00+05:30",
        },
      ],
      totalPaid: "1366.05",
    },
    collectedBy: "asd asd",
    createdAt: "2025-12-21T18:57:57+05:30",
  },
]

export default function EmployeePurchasesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPurchase, setSelectedPurchase] = useState<(typeof purchases)[0] | null>(null)
  const [showDetailsSheet, setShowDetailsSheet] = useState(false)

  // Filter purchases
  const filteredPurchases = purchases.filter((purchase) => {
    return (
      purchase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.packageName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.branchName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

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

  const handleViewDetails = (purchase: (typeof purchases)[0]) => {
    setSelectedPurchase(purchase)
    setShowDetailsSheet(true)
  }

  const handleDownloadBill = (paymentIndex?: number) => {
    if (paymentIndex !== undefined && selectedPurchase) {
      const payment = selectedPurchase.payment.methods[paymentIndex]
      alert(`Downloading bill for payment ${paymentIndex + 1}: ${payment.mode} - ₹${payment.amount}`)
    } else {
      alert("Downloading complete bill")
    }
  }

  const stats = [
    {
      label: "Total Orders",
      value: purchases.length.toString(),
      icon: ShoppingBag,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Total Spent",
      value: `₹${purchases.reduce((sum, p) => sum + Number.parseFloat(p.paidAmount), 0).toLocaleString()}`,
      icon: CreditCard,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Active Products",
      value: purchases
        .reduce((sum, p) => sum + p.products.filter((prod) => prod.status === "active").length, 0)
        .toString(),
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Pending Amount",
      value: `₹${purchases.reduce((sum, p) => sum + Number.parseFloat(p.pendingAmount), 0).toLocaleString()}`,
      icon: Receipt,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar role="employee" />

        <div className="flex-1 pl-16 lg:pl-64 transition-all duration-300">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6">
            <div className="flex-1">
              <h1 className="text-xl font-semibold">My Purchases</h1>
              <p className="text-sm text-muted-foreground">View your orders and download bills</p>
            </div>
            <ThemeToggle />
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor}`}>
                          <Icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by invoice number, package name, or branch..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-background"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Purchases List */}
            <div className="grid gap-4">
              {filteredPurchases.map((purchase) => (
                <Card key={purchase.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        {/* Header Row */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Receipt className="w-4 h-4 text-primary" />
                              <span className="font-mono font-semibold">{purchase.id}</span>
                              {getStatusBadge(purchase.status)}
                            </div>
                            {purchase.isPackage && (
                              <div className="flex items-center gap-2 text-sm">
                                <Package className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="font-medium text-primary">{purchase.packageName}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              ₹{Number.parseFloat(purchase.paidAmount).toLocaleString()}
                            </p>
                            {Number.parseFloat(purchase.pendingAmount) > 0 && (
                              <p className="text-sm text-amber-500">
                                Pending: ₹{Number.parseFloat(purchase.pendingAmount).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="font-medium">{new Date(purchase.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-3.5 h-3.5 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Products</p>
                              <p className="font-medium">{purchase.products.length} items</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Payments</p>
                              <p className="font-medium">{purchase.payment.methods.length} method(s)</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Receipt className="w-3.5 h-3.5 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Branch</p>
                              <p className="font-medium">{purchase.branchName}</p>
                            </div>
                          </div>
                        </div>

                        {/* Discount Info */}
                        {Number.parseFloat(purchase.discountAmount) > 0 && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm">
                            <Badge variant="outline" className="border-emerald-500/20 bg-transparent">
                              {purchase.discountPercentage}% OFF
                            </Badge>
                            <span>Saved ₹{Number.parseFloat(purchase.discountAmount).toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none bg-transparent"
                          onClick={() => handleViewDetails(purchase)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredPurchases.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">No purchases found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Details Sheet */}
      <Sheet open={showDetailsSheet} onOpenChange={setShowDetailsSheet}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Purchase Details
            </SheetTitle>
          </SheetHeader>

          {selectedPurchase && (
            <div className="mt-6 space-y-6">
              {/* Invoice Header */}
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-lg font-bold font-mono">{selectedPurchase.id}</p>
                    <p className="text-sm text-muted-foreground">{selectedPurchase.branchName} Branch</p>
                  </div>
                  {getStatusBadge(selectedPurchase.status)}
                </div>
                <Separator className="my-3" />
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Date</p>
                    <p className="font-medium">{new Date(selectedPurchase.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Collected By</p>
                    <p className="font-medium">{selectedPurchase.collectedBy}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Products ({selectedPurchase.products.length})
                </h3>
                <div className="space-y-3">
                  {selectedPurchase.products.map((product, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{product.productType}</p>
                          {product.isPackage && (
                            <Badge variant="outline" className="mt-1">
                              {product.packageName}
                            </Badge>
                          )}
                        </div>
                        <Badge className={product.status === "active" ? "bg-emerald-500/10 text-emerald-500" : ""}>
                          {product.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{product.durationMonths} months</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-medium">₹{Number.parseFloat(product.price).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Start Date</p>
                          <p className="font-medium">{new Date(product.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">End Date</p>
                          <p className="font-medium">{new Date(product.endDate).toLocaleDateString()}</p>
                        </div>
                        {product.totalSlots !== undefined && (
                          <div>
                            <p className="text-muted-foreground">Total Slots</p>
                            <p className="font-medium">{product.totalSlots} sessions</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h3 className="font-semibold mb-3">Payment Summary</h3>
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{selectedPurchase.subtotal.toLocaleString()}</span>
                  </div>
                  {Number.parseFloat(selectedPurchase.discountAmount) > 0 && (
                    <div className="flex justify-between text-sm text-emerald-500">
                      <span>Discount ({selectedPurchase.discountPercentage}%)</span>
                      <span>- ₹{Number.parseFloat(selectedPurchase.discountAmount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (GST)</span>
                    <span>₹{selectedPurchase.taxAmount.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span className="text-lg">₹{selectedPurchase.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-emerald-500">
                    <span>Paid Amount</span>
                    <span>₹{Number.parseFloat(selectedPurchase.paidAmount).toLocaleString()}</span>
                  </div>
                  {Number.parseFloat(selectedPurchase.pendingAmount) > 0 && (
                    <div className="flex justify-between text-sm text-amber-500">
                      <span>Pending Amount</span>
                      <span>₹{Number.parseFloat(selectedPurchase.pendingAmount).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payment Methods ({selectedPurchase.payment.methods.length})
                </h3>
                <div className="space-y-3">
                  {selectedPurchase.payment.methods.map((payment, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium capitalize">{payment.mode}</span>
                            <Badge variant="outline">Payment {index + 1}</Badge>
                          </div>
                          <p className="text-2xl font-bold text-primary">
                            ₹{Number.parseFloat(payment.amount).toLocaleString()}
                          </p>
                          {payment.transactionNumber && (
                            <p className="text-sm text-muted-foreground font-mono mt-1">
                              TXN: {payment.transactionNumber}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(payment.paymentDate).toLocaleString()}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleDownloadBill(index)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download Bill
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Complete Bill */}
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1" onClick={() => handleDownloadBill()}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Complete Bill
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </SidebarProvider>
  )
}
