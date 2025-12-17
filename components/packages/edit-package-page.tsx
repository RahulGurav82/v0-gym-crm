"use client"

import { SidebarProvider } from "@/components/ui/sidebar"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar, useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ThemeToggle } from "@/components/theme-toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Box,
  IndianRupee,
  Dumbbell,
  Users,
  Flame,
  Snowflake,
  Wind,
  Music,
  Heart,
  Swords,
  ArrowLeft,
  Save,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { BRANCHES } from "@/lib/branches"

interface Product {
  id: string
  name: string
  description: string
  category: string
  basePrice: number
  icon: React.ComponentType<{ className?: string }>
}

const allProducts: Product[] = [
  {
    id: "gym",
    name: "Gym Membership",
    description: "Full access to gym equipment and facilities",
    category: "Membership",
    basePrice: 999,
    icon: Dumbbell,
  },
  {
    id: "pt",
    name: "Personal Training",
    description: "One-on-one training sessions with certified trainers",
    category: "Training",
    basePrice: 2000,
    icon: Users,
  },
  {
    id: "sauna",
    name: "Sauna",
    description: "Relaxing sauna sessions for recovery",
    category: "Amenities",
    basePrice: 500,
    icon: Flame,
  },
  {
    id: "ice-bath",
    name: "Ice Bath",
    description: "Cold therapy for muscle recovery",
    category: "Amenities",
    basePrice: 400,
    icon: Snowflake,
  },
  {
    id: "steam",
    name: "Steam Room",
    description: "Steam therapy for relaxation and detox",
    category: "Amenities",
    basePrice: 400,
    icon: Wind,
  },
  {
    id: "zumba",
    name: "Zumba Classes",
    description: "High-energy dance fitness classes",
    category: "Classes",
    basePrice: 800,
    icon: Music,
  },
  {
    id: "yoga",
    name: "Yoga Classes",
    description: "Mindfulness and flexibility training",
    category: "Classes",
    basePrice: 700,
    icon: Heart,
  },
  {
    id: "mma",
    name: "MMA Training",
    description: "Mixed martial arts and combat training",
    category: "Classes",
    basePrice: 1200,
    icon: Swords,
  },
  {
    id: "crossfit",
    name: "CrossFit Classes",
    description: "High-intensity functional fitness",
    category: "Classes",
    basePrice: 1000,
    icon: Flame,
  },
]

const categories = ["Membership", "Training", "Amenities", "Classes"]

// Mock function to get package by ID
const getPackageById = (id: string) => {
  const mockPackages: any = {
    PKG001: {
      id: "PKG001",
      name: "Basic Fitness",
      description: "Perfect for beginners starting their fitness journey",
      selectedProducts: ["gym"],
      price: "999",
      discountedPrice: "",
      duration: "1",
      branch: BRANCHES[0].id,
      status: "active",
      features: "24/7 Access\nPersonal Locker\nFree WiFi",
      terms: "Non-refundable\nTransferable with ₹500 fee",
    },
    PKG002: {
      id: "PKG002",
      name: "Premium Wellness",
      description: "Complete gym access with relaxation amenities",
      selectedProducts: ["gym", "sauna", "steam"],
      price: "2499",
      discountedPrice: "1999",
      duration: "1",
      branch: BRANCHES[0].id,
      status: "active",
      features: "24/7 Access\nPersonal Locker\nPremium Towel Service\nFree Drinks",
      terms: "Minimum 3 months commitment\nPause facility available",
    },
  }
  return mockPackages[id] || null
}

function EditPackagePageInner({ packageId }: { packageId: string }) {
  const router = useRouter()
  const { collapsed } = useSidebar()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedProducts: [] as string[],
    price: "",
    discountedPrice: "",
    duration: "",
    branch: "",
    status: "active",
    features: "",
    terms: "",
  })

  useEffect(() => {
    const packageData = getPackageById(packageId)
    if (packageData) {
      setFormData(packageData)
    } else {
      // Package not found, redirect back
      router.push("/admin/packages")
    }
  }, [packageId, router])

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleProduct = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(productId)
        ? prev.selectedProducts.filter((id) => id !== productId)
        : [...prev.selectedProducts, productId],
    }))
  }

  const filteredProducts =
    selectedCategory === "all" ? allProducts : allProducts.filter((p) => p.category === selectedCategory)

  const handleSave = () => {
    console.log("[v0] Saving package:", formData)
    // Here you would save the updated package
    router.push("/admin/packages")
  }

  const isStep1Valid = formData.name && formData.description
  const isStep2Valid = formData.selectedProducts.length > 0
  const isStep3Valid = formData.price && formData.duration && formData.branch

  const steps = [
    { number: 1, title: "Basic Info", icon: FileText },
    { number: 2, title: "Products", icon: Box },
    { number: 3, title: "Pricing", icon: IndianRupee },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <main className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/admin/packages")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Edit Package</h1>
              <p className="text-sm text-muted-foreground">Update package details - {packageId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" onClick={() => router.push("/admin/packages")}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!isStep1Valid || !isStep2Valid || !isStep3Valid}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Progress Steps */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                      <button
                        onClick={() => setCurrentStep(step.number)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full",
                          currentStep === step.number
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-muted/50 hover:bg-muted",
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full font-semibold",
                            currentStep === step.number ? "bg-primary-foreground text-primary" : "bg-background",
                          )}
                        >
                          {step.number}
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{step.title}</p>
                          <p
                            className={cn(
                              "text-xs",
                              currentStep === step.number ? "opacity-90" : "text-muted-foreground",
                            )}
                          >
                            {step.number === 1 && "Name & description"}
                            {step.number === 2 && "Select products"}
                            {step.number === 3 && "Price & settings"}
                          </p>
                        </div>
                      </button>
                      {index < steps.length - 1 && <div className="w-12 h-0.5 bg-border mx-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Package Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Premium Membership"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this package includes..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Key Features (one per line)</Label>
                    <Textarea
                      id="features"
                      placeholder="e.g.,&#10;24/7 Gym Access&#10;Personal Locker&#10;Free WiFi"
                      rows={6}
                      value={formData.features}
                      onChange={(e) => updateFormData("features", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="terms">Terms & Conditions (one per line)</Label>
                    <Textarea
                      id="terms"
                      placeholder="e.g.,&#10;Non-refundable&#10;Transferable with fee&#10;Valid for 30 days"
                      rows={6}
                      value={formData.terms}
                      onChange={(e) => updateFormData("terms", e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setCurrentStep(2)} disabled={!isStep1Valid}>
                      Next: Select Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Products */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Box className="h-5 w-5 text-primary" />
                      Select Products & Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-6">
                      <Button
                        variant={selectedCategory === "all" ? "default" : "outline"}
                        onClick={() => setSelectedCategory("all")}
                      >
                        All Products
                      </Button>
                      {categories.map((cat) => (
                        <Button
                          key={cat}
                          variant={selectedCategory === cat ? "default" : "outline"}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredProducts.map((product) => {
                        const isSelected = formData.selectedProducts.includes(product.id)
                        const Icon = product.icon
                        return (
                          <button
                            key={product.id}
                            onClick={() => toggleProduct(product.id)}
                            className={cn(
                              "relative p-4 rounded-lg border-2 text-left transition-all hover:shadow-md",
                              isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                            )}
                          >
                            {isSelected && <Badge className="absolute top-2 right-2 bg-primary">Selected</Badge>}
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold mb-1">{product.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                                <p className="text-sm font-medium text-primary mt-2">Base: ₹{product.basePrice}</p>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        Back
                      </Button>
                      <Button onClick={() => setCurrentStep(3)} disabled={!isStep2Valid}>
                        Next: Set Pricing
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {formData.selectedProducts.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Selected Products ({formData.selectedProducts.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedProducts.map((productId) => {
                          const product = allProducts.find((p) => p.id === productId)
                          if (!product) return null
                          const Icon = product.icon
                          return (
                            <div
                              key={productId}
                              className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/20"
                            >
                              <Icon className="h-4 w-4 text-primary" />
                              <span className="font-medium">{product.name}</span>
                              <button
                                onClick={() => toggleProduct(productId)}
                                className="ml-2 text-muted-foreground hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 3: Pricing */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-primary" />
                    Pricing & Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Package Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="e.g., 2999"
                        value={formData.price}
                        onChange={(e) => updateFormData("price", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
                      <Input
                        id="discountedPrice"
                        type="number"
                        placeholder="Optional discount price"
                        value={formData.discountedPrice}
                        onChange={(e) => updateFormData("discountedPrice", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (Months) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="e.g., 1, 3, 6, 12"
                        value={formData.duration}
                        onChange={(e) => updateFormData("duration", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch *</Label>
                      <Select value={formData.branch} onValueChange={(value) => updateFormData("branch", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {BRANCHES.map((branch) => (
                            <SelectItem key={branch.id} value={branch.id}>
                              {branch.name} ({branch.branchCode})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Package Status *</Label>
                    <RadioGroup value={formData.status} onValueChange={(value) => updateFormData("status", value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="active" />
                        <Label htmlFor="active" className="font-normal cursor-pointer">
                          Active - Available for purchase
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inactive" id="inactive" />
                        <Label htmlFor="inactive" className="font-normal cursor-pointer">
                          Inactive - Hidden from customers
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="draft" id="draft" />
                        <Label htmlFor="draft" className="font-normal cursor-pointer">
                          Draft - Work in progress
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back
                    </Button>
                    <Button onClick={handleSave} disabled={!isStep3Valid}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export function EditPackagePage({ packageId }: { packageId: string }) {
  return (
    <SidebarProvider>
      <EditPackagePageInner packageId={packageId} />
    </SidebarProvider>
  )
}
