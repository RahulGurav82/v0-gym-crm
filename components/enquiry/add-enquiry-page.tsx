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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  ClipboardPlus,
  MessageSquare,
  Target,
  Clock,
  Globe,
  Facebook,
  Instagram,
  Search,
  PhoneCall,
  Users,
  Dumbbell,
  GraduationCap,
  Briefcase,
  Plus,
  Trash2,
  Bell,
  CalendarClock,
} from "lucide-react"

export function AddEnquiryPage() {
  const { collapsed } = useSidebar()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    // Contact Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    gender: "",
    age: "",
    address: "",
    // Enquiry Details
    source: "",
    sourceReference: "",
    enquiryType: "",
    interestedPlan: "",
    budget: "",
    branch: "",
    preferredTime: "",
    notes: "",
    // Assignment & Priority
    assignedTo: "",
    priority: "medium",
    status: "new",
    tags: [] as string[],
    // Follow-up Details
    followUpDate: "",
    followUpTime: "",
    followUpType: "",
    followUpNotes: "",
    reminderEnabled: true,
    followUpHistory: [] as { date: string; time: string; type: string; notes: string; outcome: string }[],
  })

  const [newFollowUp, setNewFollowUp] = useState({
    date: "",
    time: "",
    type: "",
    notes: "",
    outcome: "pending",
  })

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addFollowUpToHistory = () => {
    if (newFollowUp.date && newFollowUp.type) {
      setFormData((prev) => ({
        ...prev,
        followUpHistory: [...prev.followUpHistory, { ...newFollowUp }],
      }))
      setNewFollowUp({ date: "", time: "", type: "", notes: "", outcome: "pending" })
    }
  }

  const removeFollowUp = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      followUpHistory: prev.followUpHistory.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSuccess(true)

    setTimeout(() => {
      router.push("/admin/enquiry")
    }, 2000)
  }

  const toggleTag = (tag: string) => {
    const currentTags = formData.tags
    if (currentTags.includes(tag)) {
      handleChange(
        "tags",
        currentTags.filter((t) => t !== tag),
      )
    } else {
      handleChange("tags", [...currentTags, tag])
    }
  }

  const isStep1Valid = formData.firstName && formData.phone
  const isStep2Valid = formData.source && formData.enquiryType && formData.branch
  const isStep3Valid = formData.assignedTo

  const steps = [
    { number: 1, title: "Contact Info", icon: User },
    { number: 2, title: "Enquiry Details", icon: ClipboardPlus },
    { number: 3, title: "Assignment", icon: Target },
    { number: 4, title: "Follow-up", icon: CalendarClock },
  ]

  const sourceOptions = [
    { value: "walk-in", label: "Walk-in", icon: Users },
    { value: "website", label: "Website", icon: Globe },
    { value: "facebook", label: "Facebook", icon: Facebook },
    { value: "instagram", label: "Instagram", icon: Instagram },
    { value: "google", label: "Google Ads", icon: Search },
    { value: "referral", label: "Referral", icon: Users },
    { value: "phone", label: "Phone Call", icon: PhoneCall },
  ]

  const enquiryTypes = [
    { value: "membership", label: "Membership", icon: Dumbbell },
    { value: "personal-training", label: "Personal Training", icon: User },
    { value: "group-class", label: "Group Class", icon: Users },
    { value: "corporate", label: "Corporate", icon: Briefcase },
    { value: "student", label: "Student Plan", icon: GraduationCap },
  ]

  const availableTags = ["Hot Lead", "Price Sensitive", "Needs Demo", "Competitor", "Returning", "VIP", "Urgent"]

  const staffOptions = [
    { value: "john", name: "John Smith", role: "Sales Manager" },
    { value: "sarah", name: "Sarah Wilson", role: "Sales Executive" },
    { value: "mike", name: "Mike Johnson", role: "Trainer" },
    { value: "emily", name: "Emily Brown", role: "Front Desk" },
  ]

  const followUpTypes = [
    { value: "call", label: "Phone Call" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "email", label: "Email" },
    { value: "visit", label: "Branch Visit" },
    { value: "demo", label: "Demo/Trial" },
  ]

  return (
    <main className={cn("min-h-screen bg-background transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/enquiry")} className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <ClipboardPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Add New Enquiry</h1>
            <p className="text-sm text-muted-foreground">Register a new lead</p>
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
              <h3 className="text-2xl font-semibold mb-2">Enquiry Added Successfully!</h3>
              <p className="text-muted-foreground mb-4">
                Lead for {formData.firstName} {formData.lastName} has been registered.
              </p>
              <p className="text-sm text-muted-foreground">Redirecting to enquiry list...</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
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
                          "w-16 lg:w-24 h-1 mx-2 lg:mx-4 rounded transition-colors duration-300",
                          step > s.number ? "bg-primary" : "bg-muted",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Contact Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>Enter the lead's contact details</CardDescription>
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
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className="h-11"
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
                      <Label htmlFor="alternatePhone">Alternate Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="alternatePhone"
                          className="pl-10 h-11"
                          placeholder="+91 98765 43210"
                          value={formData.alternatePhone}
                          onChange={(e) => handleChange("alternatePhone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 h-11"
                        placeholder="lead@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      className="min-h-[80px]"
                      placeholder="Enter address (optional)"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Enquiry Details */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardPlus className="w-5 h-5 text-primary" />
                    Enquiry Details
                  </CardTitle>
                  <CardDescription>Specify the source and type of enquiry</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Source Selection */}
                  <div className="space-y-3">
                    <Label>
                      Enquiry Source <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {sourceOptions.map((source) => {
                        const Icon = source.icon
                        return (
                          <div
                            key={source.value}
                            onClick={() => handleChange("source", source.value)}
                            className={cn(
                              "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                              formData.source === source.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50",
                            )}
                          >
                            <Icon
                              className={cn(
                                "w-6 h-6 mb-2",
                                formData.source === source.value ? "text-primary" : "text-muted-foreground",
                              )}
                            />
                            <span className="text-sm font-medium">{source.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Source Reference */}
                  {formData.source === "referral" && (
                    <div className="space-y-2">
                      <Label htmlFor="sourceReference">Referral Name/ID</Label>
                      <Input
                        id="sourceReference"
                        placeholder="Enter referral member name or ID"
                        value={formData.sourceReference}
                        onChange={(e) => handleChange("sourceReference", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  )}

                  {/* Enquiry Type */}
                  <div className="space-y-3">
                    <Label>
                      Enquiry Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {enquiryTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <div
                            key={type.value}
                            onClick={() => handleChange("enquiryType", type.value)}
                            className={cn(
                              "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                              formData.enquiryType === type.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50",
                            )}
                          >
                            <Icon
                              className={cn(
                                "w-6 h-6 mb-2",
                                formData.enquiryType === type.value ? "text-primary" : "text-muted-foreground",
                              )}
                            />
                            <span className="text-xs font-medium text-center">{type.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="interestedPlan">Interested Plan</Label>
                      <Select
                        value={formData.interestedPlan}
                        onValueChange={(value) => handleChange("interestedPlan", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic-monthly">Basic - Monthly</SelectItem>
                          <SelectItem value="basic-quarterly">Basic - Quarterly</SelectItem>
                          <SelectItem value="basic-yearly">Basic - Yearly</SelectItem>
                          <SelectItem value="premium-monthly">Premium - Monthly</SelectItem>
                          <SelectItem value="premium-quarterly">Premium - Quarterly</SelectItem>
                          <SelectItem value="premium-yearly">Premium - Yearly</SelectItem>
                          <SelectItem value="vip">VIP Membership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under ₹5,000</SelectItem>
                          <SelectItem value="5k-10k">₹5,000 - ₹10,000</SelectItem>
                          <SelectItem value="10k-20k">₹10,000 - ₹20,000</SelectItem>
                          <SelectItem value="20k-50k">₹20,000 - ₹50,000</SelectItem>
                          <SelectItem value="above-50k">Above ₹50,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="branch">
                        Preferred Branch <span className="text-red-500">*</span>
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
                            <SelectItem value="north">North Branch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Preferred Visit Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                        <Select
                          value={formData.preferredTime}
                          onValueChange={(value) => handleChange("preferredTime", value)}
                        >
                          <SelectTrigger className="pl-10 h-11">
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (6 AM - 10 AM)</SelectItem>
                            <SelectItem value="midday">Midday (10 AM - 2 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (2 PM - 6 PM)</SelectItem>
                            <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea
                        id="notes"
                        className="pl-10 min-h-[100px]"
                        placeholder="Any specific requirements or notes about this enquiry..."
                        value={formData.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Assignment & Priority */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Assignment & Priority
                  </CardTitle>
                  <CardDescription>Assign the lead and set priority</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Assign To */}
                  <div className="space-y-3">
                    <Label>
                      Assign To <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {staffOptions.map((staff) => (
                        <div
                          key={staff.value}
                          onClick={() => handleChange("assignedTo", staff.value)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                            formData.assignedTo === staff.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50",
                          )}
                        >
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-sm text-muted-foreground">{staff.role}</p>
                          </div>
                          {formData.assignedTo === staff.value && (
                            <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="space-y-3">
                    <Label>Priority Level</Label>
                    <div className="flex gap-3">
                      {[
                        { value: "low", label: "Low", color: "bg-gray-500" },
                        { value: "medium", label: "Medium", color: "bg-yellow-500" },
                        { value: "high", label: "High", color: "bg-orange-500" },
                        { value: "urgent", label: "Urgent", color: "bg-red-500" },
                      ].map((priority) => (
                        <div
                          key={priority.value}
                          onClick={() => handleChange("priority", priority.value)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all",
                            formData.priority === priority.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50",
                          )}
                        >
                          <div className={cn("w-3 h-3 rounded-full", priority.color)} />
                          <span className="text-sm font-medium">{priority.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-3">
                    <Label>Initial Status</Label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "new", label: "New", color: "bg-blue-500" },
                        { value: "follow-up", label: "Follow Up", color: "bg-yellow-500" },
                        { value: "won", label: "Won", color: "bg-green-500" },
                        { value: "lost", label: "Lost", color: "bg-red-500" },
                      ].map((status) => (
                        <div
                          key={status.value}
                          onClick={() => handleChange("status", status.value)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all",
                            formData.status === status.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50",
                          )}
                        >
                          <div className={cn("w-3 h-3 rounded-full", status.color)} />
                          <span className="text-sm font-medium">{status.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={formData.tags.includes(tag) ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer transition-all px-3 py-1",
                            formData.tags.includes(tag)
                              ? "bg-primary text-primary-foreground"
                              : "hover:border-primary hover:text-primary",
                          )}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Follow-up Details */}
            {step === 4 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarClock className="w-5 h-5 text-primary" />
                      Schedule Follow-up
                    </CardTitle>
                    <CardDescription>Set the next follow-up for this lead</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="followUpDate">Follow-up Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="followUpDate"
                            type="date"
                            className="pl-10 h-11"
                            value={formData.followUpDate}
                            onChange={(e) => handleChange("followUpDate", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="followUpTime">Follow-up Time</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="followUpTime"
                            type="time"
                            className="pl-10 h-11"
                            value={formData.followUpTime}
                            onChange={(e) => handleChange("followUpTime", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="followUpType">Follow-up Type</Label>
                        <Select
                          value={formData.followUpType}
                          onValueChange={(value) => handleChange("followUpType", value)}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {followUpTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="followUpNotes">Follow-up Notes</Label>
                      <Textarea
                        id="followUpNotes"
                        className="min-h-[80px]"
                        placeholder="What to discuss or action items for this follow-up..."
                        value={formData.followUpNotes}
                        onChange={(e) => handleChange("followUpNotes", e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="reminder"
                        checked={formData.reminderEnabled}
                        onCheckedChange={(checked) => handleChange("reminderEnabled", checked as boolean)}
                      />
                      <Label htmlFor="reminder" className="flex items-center gap-2 cursor-pointer">
                        <Bell className="w-4 h-4" />
                        Enable reminder notification
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Follow-up History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Add Follow-up History
                    </CardTitle>
                    <CardDescription>Record past interactions with this lead</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          className="h-11"
                          value={newFollowUp.date}
                          onChange={(e) => setNewFollowUp((prev) => ({ ...prev, date: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input
                          type="time"
                          className="h-11"
                          value={newFollowUp.time}
                          onChange={(e) => setNewFollowUp((prev) => ({ ...prev, time: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={newFollowUp.type}
                          onValueChange={(value) => setNewFollowUp((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {followUpTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Outcome</Label>
                        <Select
                          value={newFollowUp.outcome}
                          onValueChange={(value) => setNewFollowUp((prev) => ({ ...prev, outcome: value }))}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Outcome" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="connected">Connected</SelectItem>
                            <SelectItem value="no-response">No Response</SelectItem>
                            <SelectItem value="callback">Callback Requested</SelectItem>
                            <SelectItem value="interested">Interested</SelectItem>
                            <SelectItem value="not-interested">Not Interested</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea
                        className="min-h-[60px]"
                        placeholder="Summary of the interaction..."
                        value={newFollowUp.notes}
                        onChange={(e) => setNewFollowUp((prev) => ({ ...prev, notes: e.target.value }))}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addFollowUpToHistory}
                      disabled={!newFollowUp.date || !newFollowUp.type}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to History
                    </Button>

                    {/* History List */}
                    {formData.followUpHistory.length > 0 && (
                      <div className="space-y-3 pt-4 border-t">
                        <h4 className="font-medium">Recorded Follow-ups</h4>
                        {formData.followUpHistory.map((followUp, index) => (
                          <div key={index} className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <Badge variant="outline">{followUp.type}</Badge>
                                <span className="text-sm text-muted-foreground">
                                  {followUp.date} at {followUp.time}
                                </span>
                                <Badge
                                  variant={followUp.outcome === "connected" ? "default" : "secondary"}
                                  className={cn(
                                    followUp.outcome === "connected" && "bg-green-500",
                                    followUp.outcome === "no-response" && "bg-red-500",
                                    followUp.outcome === "interested" && "bg-primary",
                                  )}
                                >
                                  {followUp.outcome}
                                </Badge>
                              </div>
                              {followUp.notes && <p className="text-sm text-muted-foreground">{followUp.notes}</p>}
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeFollowUp(index)}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                Previous
              </Button>
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || (step === 3 && !isStep3Valid)
                  }
                  className="bg-primary hover:bg-primary/90"
                >
                  Next Step
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading} className="bg-primary hover:bg-primary/90">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Submit Enquiry
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
