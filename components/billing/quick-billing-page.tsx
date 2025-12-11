"use client"
import { useState, useMemo, useEffect, useRef, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSearchParams } from "next/navigation"
import {
  Search,
  User,
  UserPlus,
  Dumbbell,
  Users,
  Flame,
  Snowflake,
  Wind,
  Music,
  Heart,
  Swords,
  Zap,
  Package,
  X,
  Receipt,
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  Check,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Products list
const allProducts = [
  { id: "gym", name: "Gym Membership", category: "Membership", basePrice: 999, icon: Dumbbell, type: "membership" },
  { id: "pt", name: "Personal Training", category: "Training", basePrice: 2000, icon: Users, type: "training" },
  { id: "sauna", name: "Sauna", category: "Amenities", basePrice: 500, icon: Flame, type: "amenity" },
  { id: "ice-bath", name: "Ice Bath", category: "Amenities", basePrice: 400, icon: Snowflake, type: "amenity" },
  { id: "steam", name: "Steam Room", category: "Amenities", basePrice: 400, icon: Wind, type: "amenity" },
  { id: "zumba", name: "Zumba Classes", category: "Classes", basePrice: 800, icon: Music, type: "class" },
  { id: "yoga", name: "Yoga Classes", category: "Classes", basePrice: 700, icon: Heart, type: "class" },
  { id: "mma", name: "MMA Classes", category: "Classes", basePrice: 1200, icon: Swords, type: "class" },
  { id: "crossfit", name: "CrossFit Classes", category: "Classes", basePrice: 1000, icon: Zap, type: "class" },
]

// Packages list
const packages = [
  { id: "basic", name: "Basic Package", products: ["gym"], price: 999, discount: 0 },
  { id: "premium", name: "Premium Package", products: ["gym", "sauna", "steam"], price: 1599, discount: 300 },
  {
    id: "elite",
    name: "Elite Package",
    products: ["gym", "pt", "sauna", "ice-bath", "steam"],
    price: 3500,
    discount: 800,
  },
  { id: "fitness", name: "Fitness Classes", products: ["zumba", "yoga", "crossfit"], price: 2000, discount: 500 },
]

// Mock members
const members = [
  { id: "M001", name: "John Doe", phone: "9876543210", email: "john@example.com", type: "member" },
  { id: "M002", name: "Jane Smith", phone: "9876543211", email: "jane@example.com", type: "member" },
  { id: "M003", name: "Mike Johnson", phone: "9876543212", email: "mike@example.com", type: "member" },
]

// Mock enquiries
const enquiries = [
  { id: "E001", name: "Sarah Williams", phone: "9876543220", email: "sarah@example.com", type: "enquiry" },
  { id: "E002", name: "David Brown", phone: "9876543221", email: "david@example.com", type: "enquiry" },
]

// Trainers
const trainers = [
  { id: "T001", name: "Raj Kumar", specialization: "Strength Training" },
  { id: "T002", name: "Priya Singh", specialization: "Yoga & Flexibility" },
  { id: "T003", name: "Amit Shah", specialization: "CrossFit" },
]

interface SelectedProduct {
  productId: string
  durationType: "months" | "days"
  duration: number
  startDate: string
  endDate: string
  totalSlots?: number
  slotsPerMonth?: number
  commission?: number
  trainerId?: string
  amountIncTax: number
  amountExcTax: number
  tax: number
}

function QuickBillingContent() {
  const { collapsed } = useSidebar()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [customerType, setCustomerType] = useState<"member" | "enquiry">("member")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof members)[0] | (typeof enquiries)[0] | null>(null)
  const [selectionMode, setSelectionMode] = useState<"products" | "packages">("products")
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
  const [paymentMode, setPaymentMode] = useState("cash")
  const [transactionNumber, setTransactionNumber] = useState("")
  const [paymentPercentage, setPaymentPercentage] = useState(100)

  const hasProcessedParams = useRef(false)

  const TAX_RATE = 0.05

  useEffect(() => {
    if (hasProcessedParams.current) return

    const type = searchParams.get("type")
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const phone = searchParams.get("phone")
    const email = searchParams.get("email")

    if (type && id && name && phone) {
      hasProcessedParams.current = true

      if (type === "enquiry") {
        const existingEnquiry = enquiries.find((e) => e.id === id)
        if (existingEnquiry) {
          setSelectedCustomer(existingEnquiry)
        } else {
          setSelectedCustomer({
            id,
            name,
            phone,
            email: email || "",
            type: "enquiry",
          })
        }
        setCustomerType("enquiry")
        setStep(2)
      } else if (type === "member") {
        const existingMember = members.find((m) => m.id === id)
        if (existingMember) {
          setSelectedCustomer(existingMember)
          setStep(2)
        }
      }
    }
  }, [searchParams])

  // Filter customers based on search
  const filteredCustomers = useMemo(() => {
    const list = customerType === "member" ? members : enquiries
    if (!searchQuery) return list
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [customerType, searchQuery])

  // Calculate end date based on start date and duration
  const calculateEndDate = (startDate: string, duration: number, durationType: "months" | "days") => {
    const date = new Date(startDate)
    if (durationType === "months") {
      date.setMonth(date.getMonth() + duration)
    } else {
      date.setDate(date.getDate() + duration)
    }
    return date.toISOString().split("T")[0]
  }

  // Add product to selection
  const addProduct = (productId: string, fromPackage = false) => {
    const product = allProducts.find((p) => p.id === productId)
    if (!product) return

    const today = new Date().toISOString().split("T")[0]
    const baseAmount = product.basePrice
    const taxAmount = baseAmount * TAX_RATE
    const totalAmount = baseAmount + taxAmount

    const newProduct: SelectedProduct = {
      productId,
      durationType: "months",
      duration: 1,
      startDate: today,
      endDate: calculateEndDate(today, 1, "months"),
      amountIncTax: totalAmount,
      amountExcTax: baseAmount,
      tax: taxAmount,
    }

    // Add specific fields based on product type
    if (product.type === "amenity" || product.type === "class") {
      newProduct.totalSlots = 10
    }
    if (product.type === "training") {
      newProduct.slotsPerMonth = 12
      newProduct.totalSlots = 12
      newProduct.commission = 0
      newProduct.trainerId = ""
    }

    setSelectedProducts((prev) => [...prev, newProduct])
  }

  // Add package
  const addPackage = (packageId: string) => {
    const pkg = packages.find((p) => p.id === packageId)
    if (!pkg) return

    pkg.products.forEach((productId) => {
      if (!selectedProducts.find((p) => p.productId === productId)) {
        addProduct(productId, true)
      }
    })
  }

  // Remove product
  const removeProduct = (index: number) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index))
  }

  // Update product configuration
  const updateProduct = (index: number, updates: Partial<SelectedProduct>) => {
    setSelectedProducts((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p
        const updated = { ...p, ...updates }

        // Recalculate end date if duration or start date changes
        if (updates.duration !== undefined || updates.durationType !== undefined || updates.startDate !== undefined) {
          updated.endDate = calculateEndDate(
            updates.startDate || p.startDate,
            updates.duration ?? p.duration,
            updates.durationType || p.durationType,
          )
        }

        // Recalculate tax if amount changes
        if (updates.amountIncTax !== undefined) {
          updated.amountExcTax = Number((updates.amountIncTax / (1 + TAX_RATE)).toFixed(2))
          updated.tax = Number((updates.amountIncTax - updated.amountExcTax).toFixed(2))
        }

        // Recalculate slots for PT
        if (updates.slotsPerMonth !== undefined && updates.duration !== undefined) {
          updated.totalSlots = updates.slotsPerMonth * (updates.duration ?? p.duration)
        } else if (updates.slotsPerMonth !== undefined) {
          updated.totalSlots = updates.slotsPerMonth * p.duration
        }

        return updated
      }),
    )
  }

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = selectedProducts.reduce((sum, p) => sum + p.amountExcTax, 0)
    const totalTax = selectedProducts.reduce((sum, p) => sum + p.tax, 0)
    const total = subtotal + totalTax
    const paidSubtotal = (subtotal * paymentPercentage) / 100
    const paidTax = (totalTax * paymentPercentage) / 100
    const paidAmount = (total * paymentPercentage) / 100

    return { subtotal, totalTax, total, paidSubtotal, paidTax, paidAmount }
  }, [selectedProducts, paymentPercentage])

  const paymentModes = [
    { id: "cash", name: "Cash", icon: Wallet },
    { id: "card", name: "Card", icon: CreditCard },
    { id: "upi", name: "UPI", icon: Smartphone },
    { id: "bank", name: "Bank Transfer", icon: Building2 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <div className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur px-6">
          <div>
            <h1 className="text-xl font-semibold">Quick Billing</h1>
            <p className="text-sm text-muted-foreground">Create bills for members and enquiries</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <main className="p-6">
          {/* Steps indicator */}
          <div className="flex items-center gap-4 mb-6">
            {[
              { num: 1, title: "Select Customer" },
              { num: 2, title: "Add Products" },
              { num: 3, title: "Payment" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    step >= s.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={cn("text-sm font-medium", step >= s.num ? "text-foreground" : "text-muted-foreground")}
                >
                  {s.title}
                </span>
                {i < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Select Customer */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Select Customer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Customer Type Tabs */}
                    <Tabs value={customerType} onValueChange={(v) => setCustomerType(v as "member" | "enquiry")}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="member" className="gap-2">
                          <User className="w-4 h-4" />
                          Member
                        </TabsTrigger>
                        <TabsTrigger value="enquiry" className="gap-2">
                          <UserPlus className="w-4 h-4" />
                          Enquiry
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, phone, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Customer List */}
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {filteredCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          onClick={() => setSelectedCustomer(customer)}
                          className={cn(
                            "p-4 rounded-lg border cursor-pointer transition-all hover:border-primary",
                            selectedCustomer?.id === customer.id && "border-primary bg-primary/5",
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">{customer.phone}</p>
                              </div>
                            </div>
                            <Badge variant="outline">{customer.id}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full" disabled={!selectedCustomer} onClick={() => setStep(2)}>
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Add Products */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Selection Mode */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Products or Packages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={selectionMode} onValueChange={(v) => setSelectionMode(v as "products" | "packages")}>
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                          <TabsTrigger value="products" className="gap-2">
                            <Dumbbell className="w-4 h-4" />
                            Individual Products
                          </TabsTrigger>
                          <TabsTrigger value="packages" className="gap-2">
                            <Package className="w-4 h-4" />
                            Packages
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="products" className="mt-0">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {allProducts.map((product) => {
                              const Icon = product.icon
                              const isAdded = selectedProducts.some((p) => p.productId === product.id)
                              return (
                                <div
                                  key={product.id}
                                  onClick={() => !isAdded && addProduct(product.id)}
                                  className={cn(
                                    "p-3 rounded-lg border cursor-pointer transition-all hover:border-primary",
                                    isAdded && "opacity-50 cursor-not-allowed bg-muted",
                                  )}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                      <Icon className="w-4 h-4 text-primary" />
                                    </div>
                                    {isAdded && <Check className="w-4 h-4 text-green-500 ml-auto" />}
                                  </div>
                                  <p className="text-sm font-medium">{product.name}</p>
                                  <p className="text-xs text-muted-foreground">₹{product.basePrice}</p>
                                </div>
                              )
                            })}
                          </div>
                        </TabsContent>

                        <TabsContent value="packages" className="mt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {packages.map((pkg) => (
                              <div
                                key={pkg.id}
                                onClick={() => addPackage(pkg.id)}
                                className="p-4 rounded-lg border cursor-pointer transition-all hover:border-primary"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <p className="font-medium">{pkg.name}</p>
                                  <Badge variant="secondary">Save ₹{pkg.discount}</Badge>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {pkg.products.map((productId) => {
                                    const product = allProducts.find((p) => p.id === productId)
                                    return (
                                      <Badge key={productId} variant="outline" className="text-xs">
                                        {product?.name}
                                      </Badge>
                                    )
                                  })}
                                </div>
                                <p className="text-lg font-bold text-primary">₹{pkg.price}</p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  {/* Selected Products Configuration */}
                  {selectedProducts.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Configure Products</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {selectedProducts.map((selected, index) => {
                          const product = allProducts.find((p) => p.id === selected.productId)
                          if (!product) return null
                          const Icon = product.icon

                          return (
                            <div key={index} className="p-4 rounded-lg border space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {selected.duration} {selected.durationType}
                                    </p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeProduct(index)}>
                                  <X className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Duration Type */}
                                <div className="space-y-2">
                                  <Label className="text-xs">Duration Type</Label>
                                  <Select
                                    value={selected.durationType}
                                    onValueChange={(v) =>
                                      updateProduct(index, { durationType: v as "months" | "days" })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="months">Months</SelectItem>
                                      <SelectItem value="days">Days</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                {/* Duration */}
                                <div className="space-y-2">
                                  <Label className="text-xs">
                                    {selected.durationType === "months" ? "Months" : "Days"}
                                  </Label>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={selected.duration}
                                    onChange={(e) =>
                                      updateProduct(index, { duration: Number.parseInt(e.target.value) || 1 })
                                    }
                                  />
                                </div>

                                {/* Start Date */}
                                <div className="space-y-2">
                                  <Label className="text-xs">Start Date</Label>
                                  <Input
                                    type="date"
                                    value={selected.startDate}
                                    onChange={(e) => updateProduct(index, { startDate: e.target.value })}
                                  />
                                </div>

                                {/* End Date */}
                                <div className="space-y-2">
                                  <Label className="text-xs">End Date</Label>
                                  <Input type="date" value={selected.endDate} readOnly className="bg-muted" />
                                </div>
                              </div>

                              {/* Additional fields based on product type */}
                              {(product.type === "amenity" || product.type === "class") && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-xs">Total Slots</Label>
                                    <Input
                                      type="number"
                                      min="1"
                                      value={selected.totalSlots}
                                      onChange={(e) =>
                                        updateProduct(index, { totalSlots: Number.parseInt(e.target.value) || 1 })
                                      }
                                    />
                                  </div>
                                </div>
                              )}

                              {product.type === "training" && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-xs">Slots Per Month</Label>
                                    <Input
                                      type="number"
                                      min="1"
                                      value={selected.slotsPerMonth}
                                      onChange={(e) =>
                                        updateProduct(index, { slotsPerMonth: Number.parseInt(e.target.value) || 1 })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-xs">Total Slots</Label>
                                    <Input type="number" value={selected.totalSlots} readOnly className="bg-muted" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-xs">Commission (₹)</Label>
                                    <Input
                                      type="number"
                                      min="0"
                                      value={selected.commission}
                                      onChange={(e) =>
                                        updateProduct(index, { commission: Number.parseInt(e.target.value) || 0 })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-xs">Trainer</Label>
                                    <Select
                                      value={selected.trainerId}
                                      onValueChange={(v) => updateProduct(index, { trainerId: v })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Trainer" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {trainers.map((trainer) => (
                                          <SelectItem key={trainer.id} value={trainer.id}>
                                            {trainer.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}

                              {/* Amount fields */}
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
                                <div className="space-y-2">
                                  <Label className="text-xs">Amount (Incl. Tax ₹)</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={selected.amountIncTax}
                                    onChange={(e) =>
                                      updateProduct(index, { amountIncTax: Number.parseFloat(e.target.value) || 0 })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Amount (Excl. Tax ₹)</Label>
                                  <Input
                                    type="number"
                                    value={selected.amountExcTax.toFixed(2)}
                                    readOnly
                                    className="bg-muted"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Tax (5%)</Label>
                                  <div className="h-9 px-3 flex items-center rounded-md border bg-muted text-sm">
                                    ₹{selected.tax.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button className="flex-1" disabled={selectedProducts.length === 0} onClick={() => setStep(3)}>
                      Continue to Payment
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Payment Mode */}
                    <div className="space-y-3">
                      <Label>Mode of Payment</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {paymentModes.map((mode) => {
                          const Icon = mode.icon
                          return (
                            <div
                              key={mode.id}
                              onClick={() => setPaymentMode(mode.id)}
                              className={cn(
                                "p-4 rounded-lg border cursor-pointer transition-all hover:border-primary flex flex-col items-center gap-2",
                                paymentMode === mode.id && "border-primary bg-primary/5",
                              )}
                            >
                              <Icon
                                className={cn(
                                  "w-6 h-6",
                                  paymentMode === mode.id ? "text-primary" : "text-muted-foreground",
                                )}
                              />
                              <span className="text-sm font-medium">{mode.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Transaction Number */}
                    {paymentMode !== "cash" && (
                      <div className="space-y-2">
                        <Label>Transaction Number</Label>
                        <Input
                          placeholder="Enter transaction number (optional)"
                          value={transactionNumber}
                          onChange={(e) => setTransactionNumber(e.target.value)}
                        />
                      </div>
                    )}

                    {/* Payment Percentage */}
                    <div className="space-y-2">
                      <Label>Payment Percentage (%)</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={paymentPercentage}
                          onChange={(e) =>
                            setPaymentPercentage(Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0)))
                          }
                          className="w-32"
                        />
                        <div className="flex gap-2">
                          {[25, 50, 75, 100].map((p) => (
                            <Button
                              key={p}
                              variant={paymentPercentage === p ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPaymentPercentage(p)}
                            >
                              {p}%
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Paid Amount Display */}
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">Paid Amount</span>
                        <span className="text-2xl font-bold text-primary">₹{totals.paidAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button className="flex-1 gap-2">
                        <Receipt className="w-4 h-4" />
                        Generate Bill
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Receipt className="w-5 h-5 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Customer Info */}
                  {selectedCustomer && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{selectedCustomer.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                    </div>
                  )}

                  {/* Products List */}
                  {selectedProducts.length > 0 ? (
                    <div className="space-y-3">
                      {selectedProducts.map((selected, index) => {
                        const product = allProducts.find((p) => p.id === selected.productId)
                        return (
                          <div key={index} className="pb-3 border-b last:border-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-sm">{product?.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {selected.productId} • {selected.duration} {selected.durationType}
                                </p>
                              </div>
                              <p className="font-medium">₹{selected.amountIncTax.toFixed(0)}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              (₹{selected.amountExcTax.toFixed(2)} + ₹{selected.tax.toFixed(2)})
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No products added yet</p>
                    </div>
                  )}

                  {/* Totals */}
                  {selectedProducts.length > 0 && (
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Original Subtotal:</span>
                        <span>₹{totals.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Original Tax (5%):</span>
                        <span>₹{totals.totalTax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Original Total:</span>
                        <span>₹{totals.total.toFixed(2)}</span>
                      </div>

                      <div className="pt-3 mt-3 border-t space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Payment Percentage:</span>
                          <span>{paymentPercentage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Paid Subtotal:</span>
                          <span>₹{totals.paidSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Paid Tax:</span>
                          <span>₹{totals.paidTax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t">
                          <span>Paid Amount:</span>
                          <span>₹{totals.paidAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function QuickBillingPageInner() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <QuickBillingContent />
    </Suspense>
  )
}

export function QuickBillingPage() {
  return (
    <SidebarProvider>
      <QuickBillingPageInner />
    </SidebarProvider>
  )
}
