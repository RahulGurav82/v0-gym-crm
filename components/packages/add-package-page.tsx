"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar, useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowLeft,
  Box,
  Dumbbell,
  Users,
  Flame,
  Snowflake,
  Wind,
  Music,
  Heart,
  Swords,
  CheckCircle2,
  Loader2,
  IndianRupee,
  Tag,
  Building2,
  Clock,
  FileText,
  Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"

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

function AddPackagePageInner() {
  const { collapsed } = useSidebar()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

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

  const handleChange = (field: string, value: string) => {
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

  const calculateBasePrice = () => {
    return formData.selectedProducts.reduce((acc, productId) => {
      const product = allProducts.find((p) => p.id === productId)
      return acc + (product?.basePrice || 0)
    }, 0)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSuccess(true)

    setTimeout(() => {
      router.push("/admin/packages")
    }, 2000)
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
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/admin/packages")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Create Package</h1>
              <p className="text-sm text-muted-foreground">Add a new membership package</p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <div className="p-6 max-w-4xl mx-auto">
          {success ? (
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Package Created!</h2>
                <p className="text-muted-foreground mb-4">
                  The package "{formData.name}" has been created successfully.
                </p>
                <p className="text-sm text-muted-foreground">Redirecting to packages list...</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Step Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between max-w-xl mx-auto">
                  {steps.map((s, index) => (
                    <div key={s.number} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "flex items-center justify-center w-12 h-12 rounded-full text-sm font-medium transition-all duration-300 border-2",
                            step >= s.number
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted text-muted-foreground border-border",
                          )}
                        >
                          <s.icon className="w-5 h-5" />
                        </div>
                        <span
                          className={cn(
                            "mt-2 text-sm font-medium",
                            step >= s.number ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {s.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "w-20 h-1 mx-4 rounded transition-colors duration-300",
                            step > s.number ? "bg-primary" : "bg-muted",
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1: Basic Info */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Package Information
                    </CardTitle>
                    <CardDescription>Enter the basic details for this package</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Package Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g., Premium Fitness Bundle"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what this package offers..."
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="features">Key Features (Optional)</Label>
                      <Textarea
                        id="features"
                        placeholder="List key features, one per line..."
                        value={formData.features}
                        onChange={(e) => handleChange("features", e.target.value)}
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        These will be displayed as bullet points on the package
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Select Products */}
              {step === 2 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Box className="w-5 h-5 text-primary" />
                        Select Products
                      </CardTitle>
                      <CardDescription>Choose which products to include in this package</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {categories.map((category) => (
                        <div key={category} className="mb-6 last:mb-0">
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            {category}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {allProducts
                              .filter((p) => p.category === category)
                              .map((product) => {
                                const isSelected = formData.selectedProducts.includes(product.id)
                                const Icon = product.icon
                                return (
                                  <div
                                    key={product.id}
                                    className={cn(
                                      "relative flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                                      isSelected
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50",
                                    )}
                                    onClick={() => toggleProduct(product.id)}
                                  >
                                    <Checkbox
                                      checked={isSelected}
                                      onCheckedChange={() => toggleProduct(product.id)}
                                      className="mt-0.5"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <div
                                          className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center",
                                            isSelected ? "bg-primary/10" : "bg-muted",
                                          )}
                                        >
                                          <Icon
                                            className={cn(
                                              "w-4 h-4",
                                              isSelected ? "text-primary" : "text-muted-foreground",
                                            )}
                                          />
                                        </div>
                                        <div>
                                          <p className="font-medium text-sm">{product.name}</p>
                                          <p className="text-xs text-muted-foreground">Base: ₹{product.basePrice}/mo</p>
                                        </div>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-2">{product.description}</p>
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Selected Products Summary */}
                  {formData.selectedProducts.length > 0 && (
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Selected Products ({formData.selectedProducts.length})
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Suggested Price: <span className="font-semibold text-primary">₹{calculateBasePrice()}</span>
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.selectedProducts.map((productId) => {
                            const product = allProducts.find((p) => p.id === productId)
                            if (!product) return null
                            const Icon = product.icon
                            return (
                              <div
                                key={productId}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-background rounded-full text-sm border"
                              >
                                <Icon className="w-3.5 h-3.5 text-primary" />
                                {product.name}
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Step 3: Pricing & Settings */}
              {step === 3 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IndianRupee className="w-5 h-5 text-primary" />
                        Pricing Details
                      </CardTitle>
                      <CardDescription>Set the pricing and availability for this package</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="price">
                            Package Price (₹) <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="price"
                              type="number"
                              className="pl-9 h-11"
                              placeholder="e.g., 2999"
                              value={formData.price}
                              onChange={(e) => handleChange("price", e.target.value)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Suggested: ₹{calculateBasePrice()} (based on selected products)
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
                          <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="discountedPrice"
                              type="number"
                              className="pl-9 h-11"
                              placeholder="Optional"
                              value={formData.discountedPrice}
                              onChange={(e) => handleChange("discountedPrice", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="duration">
                            Duration <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                            <Select
                              value={formData.duration}
                              onValueChange={(value) => handleChange("duration", value)}
                            >
                              <SelectTrigger className="pl-9 h-11">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1 Month">1 Month</SelectItem>
                                <SelectItem value="3 Months">3 Months</SelectItem>
                                <SelectItem value="6 Months">6 Months</SelectItem>
                                <SelectItem value="1 Year">1 Year</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="branch">
                            Available At <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                            <Select value={formData.branch} onValueChange={(value) => handleChange("branch", value)}>
                              <SelectTrigger className="pl-9 h-11">
                                <SelectValue placeholder="Select branch" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="All Branches">All Branches</SelectItem>
                                <SelectItem value="Downtown">Downtown</SelectItem>
                                <SelectItem value="Westside">Westside</SelectItem>
                                <SelectItem value="Eastside">Eastside</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active - Available for purchase</SelectItem>
                            <SelectItem value="draft">Draft - Save for later</SelectItem>
                            <SelectItem value="inactive">Inactive - Hidden from customers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="terms">Terms & Conditions</Label>
                        <Textarea
                          id="terms"
                          placeholder="Any specific terms or conditions for this package..."
                          value={formData.terms}
                          onChange={(e) => handleChange("terms", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Package Preview */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Package Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/30 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{formData.name || "Package Name"}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {formData.description || "Package description..."}
                            </p>
                          </div>
                          <div className="text-right">
                            {formData.discountedPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                ₹{Number(formData.price).toLocaleString()}
                              </p>
                            )}
                            <p className="text-2xl font-bold text-primary">
                              ₹{Number(formData.discountedPrice || formData.price || 0).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">/{formData.duration || "month"}</p>
                          </div>
                        </div>

                        <div className="border-t border-border pt-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2">INCLUDED</p>
                          <div className="flex flex-wrap gap-2">
                            {formData.selectedProducts.map((productId) => {
                              const product = allProducts.find((p) => p.id === productId)
                              if (!product) return null
                              const Icon = product.icon
                              return (
                                <div
                                  key={productId}
                                  className="flex items-center gap-1.5 px-2 py-1 bg-background rounded-md text-xs border"
                                >
                                  <Icon className="h-3 w-3 text-primary" />
                                  {product.name}
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-sm">
                          <span className="text-muted-foreground">{formData.branch || "All Branches"}</span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              formData.status === "active" && "bg-green-500/10 text-green-600",
                              formData.status === "draft" && "bg-yellow-500/10 text-yellow-600",
                              formData.status === "inactive" && "bg-gray-500/10 text-gray-600",
                            )}
                          >
                            {formData.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    if (step === 1) {
                      router.push("/admin/packages")
                    } else {
                      setStep((prev) => prev - 1)
                    }
                  }}
                >
                  {step === 1 ? "Cancel" : "Back"}
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    if (step === 3) {
                      handleSubmit()
                    } else {
                      setStep((prev) => prev + 1)
                    }
                  }}
                  disabled={
                    (step === 1 && !isStep1Valid) ||
                    (step === 2 && !isStep2Valid) ||
                    (step === 3 && !isStep3Valid) ||
                    loading
                  }
                  className="min-w-[140px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : step === 3 ? (
                    "Create Package"
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export function AddPackagePage() {
  return <AddPackagePageInner />
}
