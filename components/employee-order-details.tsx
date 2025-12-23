"use client"

import { useParams, useRouter } from "next/navigation"
import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, User, Phone, MapPin, Calendar, Package, CreditCard } from "lucide-react"

// Mock data - matches the Firebase structure you provided
const mockOrderDetails = {
  id: "1",
  orderNo: "ORD-001",
  branchId: "jJOQdxbfc1IneoEt4A9F",
  branchName: "Sanpada",
  memberId: "0NNSUVZLPbSVUHch3lZS",
  memberName: "Rahul Gurav",
  memberPhone: "9137408709",
  packageId: "1fnmv9Kur6w374Quckfq",
  packageName: "Gold Standard",
  isPackagePurchase: true,
  status: "paid",
  subtotal: 1301,
  taxAmount: 65.05,
  totalAmount: 1366.05,
  discountAmount: "899.00",
  discountPercentage: "40.86",
  paidAmount: "1366.05",
  pendingAmount: "0.00",
  createdAt: new Date("2025-12-21T23:27:57"),
  createdBy: "DEkQEF3KVuJ8yO0XVmDq",
  createdByName: "asd asd",
  collectedBy: "DEkQEF3KVuJ8yO0XVmDq",
  collectedByName: "asd asd",
  products: [
    {
      productId: "D5pQmZu4W0rQ7Ap3HslT",
      name: "Gym Membership",
      productType: "membership",
      price: "106.05",
      priceExclTax: 101,
      taxAmount: 5.05,
      durationMonths: 3,
      startDate: new Date("2025-12-21"),
      endDate: new Date("2026-03-21"),
      status: "active",
      totalSlots: 0,
      isPackage: true,
      packageId: "1fnmv9Kur6w374Quckfq",
      packageName: "Gold Standard",
    },
    {
      productId: "mQAnvXGc4dcd87nJXhcT",
      name: "Personal Training",
      productType: "training",
      price: "1260.00",
      priceExclTax: 1200,
      taxAmount: 60,
      durationMonths: 3,
      startDate: new Date("2025-12-21"),
      endDate: new Date("2026-03-21"),
      status: "active",
      totalSlots: 12,
      isPackage: true,
      packageId: "1fnmv9Kur6w374Quckfq",
      packageName: "Gold Standard",
    },
  ],
  payment: {
    totalPaid: "1366.05",
    paymentDate: new Date("2025-12-21T23:28:00"),
    methods: [
      {
        mode: "cash",
        amount: "1000.00",
        transactionNumber: null,
        invoiceNo: "TFC-SA-01-2512-023-1",
      },
      {
        mode: "card",
        amount: "366.05",
        transactionNumber: "yh7784384939348948",
        invoiceNo: "TFC-SA-01-2512-023-2",
      },
    ],
  },
}

function OrderDetailsInner() {
  const router = useRouter()
  const params = useParams()
  const order = mockOrderDetails

  const handleDownloadBill = (invoiceNo: string) => {
    console.log("[v0] Downloading bill for invoice:", invoiceNo)
    // In real app, this would generate and download PDF
    alert(`Downloading invoice: ${invoiceNo}`)
  }

  const handleDownloadCompleteBill = () => {
    console.log("[v0] Downloading complete bill")
    alert("Downloading complete bill with all payments")
  }

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

  const getPaymentModeIcon = (mode: string) => {
    return <CreditCard className="h-4 w-4" />
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar role="employee" />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{order.orderNo}</h1>
                    <Badge className={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Order placed on{" "}
                    {order.createdAt.toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <Button onClick={handleDownloadCompleteBill}>
                <Download className="h-4 w-4 mr-2" />
                Download Complete Bill
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Member Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Member Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium">{order.memberName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{order.memberPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Branch</p>
                          <p className="font-medium">{order.branchName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Order Date</p>
                          <p className="font-medium">{order.createdAt.toLocaleDateString("en-IN")}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Products */}
                <Card>
                  <CardHeader>
                    <CardTitle>Products</CardTitle>
                    {order.packageName && <CardDescription>Package: {order.packageName}</CardDescription>}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.products.map((product, index) => (
                        <div key={index}>
                          {index > 0 && <Separator className="my-4" />}
                          <div className="flex justify-between items-start">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <h3 className="font-semibold">{product.name}</h3>
                                <Badge variant="outline">{product.productType}</Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Duration</p>
                                  <p className="font-medium">{product.durationMonths} months</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Status</p>
                                  <Badge className="bg-green-500/10 text-green-700">{product.status}</Badge>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Start Date</p>
                                  <p className="font-medium">{product.startDate.toLocaleDateString("en-IN")}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">End Date</p>
                                  <p className="font-medium">{product.endDate.toLocaleDateString("en-IN")}</p>
                                </div>
                                {product.totalSlots > 0 && (
                                  <div>
                                    <p className="text-muted-foreground">Total Slots</p>
                                    <p className="font-medium">{product.totalSlots}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">₹{product.price}</p>
                              <p className="text-xs text-muted-foreground">Tax: ₹{product.taxAmount}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>
                      Payment completed on{" "}
                      {order.payment.paymentDate.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.payment.methods.map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            {getPaymentModeIcon(payment.mode)}
                            <div>
                              <p className="font-semibold capitalize">{payment.mode}</p>
                              <p className="text-sm text-muted-foreground">Invoice: {payment.invoiceNo}</p>
                              {payment.transactionNumber && (
                                <p className="text-xs text-muted-foreground">Txn: {payment.transactionNumber}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-lg font-bold">₹{payment.amount}</p>
                            <Button size="sm" variant="outline" onClick={() => handleDownloadBill(payment.invoiceNo)}>
                              <Download className="h-3 w-3 mr-1" />
                              Bill
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Summary */}
              <div className="space-y-6">
                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{order.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">₹{order.taxAmount}</span>
                      </div>
                      {Number.parseFloat(order.discountAmount) > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount ({order.discountPercentage}%)</span>
                          <span className="font-medium">-₹{order.discountAmount}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between text-base font-bold">
                        <span>Total Amount</span>
                        <span>₹{order.totalAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Paid</span>
                        <span className="font-semibold">₹{order.paidAmount}</span>
                      </div>
                      {Number.parseFloat(order.pendingAmount) > 0 && (
                        <div className="flex justify-between text-sm text-red-600">
                          <span>Pending</span>
                          <span className="font-semibold">₹{order.pendingAmount}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Staff Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Created By</p>
                      <p className="font-medium">{order.createdByName}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Collected By</p>
                      <p className="font-medium">{order.collectedByName}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default function OrderDetails() {
  return <OrderDetailsInner />
}
