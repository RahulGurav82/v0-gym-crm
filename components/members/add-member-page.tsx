"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Building2,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  UserPlus,
  AlertCircle,
  Heart,
} from "lucide-react"

export function AddMemberPage() {
  const { collapsed } = useSidebar()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    membership: "",
    branch: "",
    startDate: "",
    trainer: "",
    emergencyContact: "",
    emergencyPhone: "",
    emergencyRelation: "",
    medicalConditions: "",
    notes: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSuccess(true)

    setTimeout(() => {
      router.push("/admin/members")
    }, 2000)
  }

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.gender
  const isStep2Valid = formData.membership && formData.branch && formData.startDate

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Membership", icon: CreditCard },
    { number: 3, title: "Emergency Contact", icon: Heart },
  ]

  return (
    <main className={cn("min-h-screen bg-background transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/members")} className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <UserPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Add New Member</h1>
            <p className="text-sm text-muted-foreground">Register a new gym member</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto">
        {success ? (
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 animate-pulse">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Member Added Successfully!</h3>
              <p className="text-muted-foreground mb-4">
                {formData.firstName} {formData.lastName} has been registered in the system.
              </p>
              <p className="text-sm text-muted-foreground">Redirecting to members list...</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
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
                          "w-24 h-1 mx-4 rounded transition-colors duration-300",
                          step > s.number ? "bg-primary" : "bg-muted",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Personal Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Enter the member's basic personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 h-11"
                        placeholder="member@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          className="pl-10 h-11"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="dob"
                        type="date"
                        className="pl-10 h-11"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea
                        id="address"
                        className="pl-10 min-h-[80px]"
                        placeholder="Enter full address"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={(e) => handleChange("pincode", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Membership Details */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Membership Details
                  </CardTitle>
                  <CardDescription>Configure membership plan and branch assignment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="membership">
                      Membership Plan <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.membership} onValueChange={(value) => handleChange("membership", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select membership plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">
                          <div className="flex flex-col">
                            <span>Basic - ₹999/month</span>
                            <span className="text-xs text-muted-foreground">Gym access only</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="premium">
                          <div className="flex flex-col">
                            <span>Premium - ₹1,999/month</span>
                            <span className="text-xs text-muted-foreground">Gym + Group classes</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="vip">
                          <div className="flex flex-col">
                            <span>VIP - ₹3,499/month</span>
                            <span className="text-xs text-muted-foreground">All access + Personal trainer</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">
                      Branch <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <Select value={formData.branch} onValueChange={(value) => handleChange("branch", value)}>
                        <SelectTrigger className="pl-10 h-11">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="downtown">Downtown Fitness Center</SelectItem>
                          <SelectItem value="westside">Westside Gym</SelectItem>
                          <SelectItem value="eastside">Eastside Sports Club</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">
                        Membership Start Date <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="startDate"
                          type="date"
                          className="pl-10 h-11"
                          value={formData.startDate}
                          onChange={(e) => handleChange("startDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trainer">Assign Trainer (Optional)</Label>
                      <Select value={formData.trainer} onValueChange={(value) => handleChange("trainer", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select trainer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Smith</SelectItem>
                          <SelectItem value="sarah">Sarah Johnson</SelectItem>
                          <SelectItem value="mike">Mike Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Membership Preview Card */}
                  {formData.membership && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        Selected Plan Benefits
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {formData.membership === "basic" && (
                          <>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Gym Equipment Access
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Locker Room
                            </div>
                          </>
                        )}
                        {formData.membership === "premium" && (
                          <>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Gym Equipment Access
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Locker Room
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Group Classes
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Sauna Access
                            </div>
                          </>
                        )}
                        {formData.membership === "vip" && (
                          <>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> All Equipment Access
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Premium Locker
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Unlimited Classes
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Personal Trainer
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Spa & Sauna
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" /> Nutrition Consultation
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Emergency Contact & Notes */}
            {step === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      Emergency Contact
                    </CardTitle>
                    <CardDescription>Emergency contact details for safety purposes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Contact Name</Label>
                        <Input
                          id="emergencyContact"
                          placeholder="Full name"
                          value={formData.emergencyContact}
                          onChange={(e) => handleChange("emergencyContact", e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          placeholder="+91 98765 43210"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelation">Relationship</Label>
                        <Select
                          value={formData.emergencyRelation}
                          onValueChange={(value) => handleChange("emergencyRelation", value)}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select relation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="friend">Friend</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      Medical & Additional Notes
                    </CardTitle>
                    <CardDescription>Important health information and special requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions">Medical Conditions</Label>
                      <Textarea
                        id="medicalConditions"
                        placeholder="Any allergies, injuries, or health conditions we should know about..."
                        rows={3}
                        value={formData.medicalConditions}
                        onChange={(e) => handleChange("medicalConditions", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any preferences, goals, or special requirements..."
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Final Summary */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Registration Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Membership Plan</p>
                        <p className="font-medium capitalize">{formData.membership}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Branch</p>
                        <p className="font-medium capitalize">{formData.branch}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium">{formData.startDate}</p>
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
                    router.push("/admin/members")
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
                disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || loading}
                className="min-w-[140px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : step === 3 ? (
                  "Add Member"
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
