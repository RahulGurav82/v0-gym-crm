"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/sidebar"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  ArrowRight,
  User,
  Briefcase,
  FileText,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building2,
  Clock,
  CheckCircle2,
  Upload,
  X,
  Plus,
  Heart,
} from "lucide-react"

export function AddStaffPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false)
  const [nameMatchesAddressProof, setNameMatchesAddressProof] = useState(false)
  const [customDesignation, setCustomDesignation] = useState("")
  const [designations, setDesignations] = useState([
    "Gym Trainer",
    "Receptionist",
    "Manager",
    "Supervisor",
    "Accountant",
    "Maintenance Staff",
  ])

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    // Personal Details
    dateOfBirth: "",
    gender: "",
    // Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    // Current Address
    currentAddress: "",
    currentCountry: "India",
    currentPincode: "",
    currentCity: "",
    currentState: "",
    // Permanent Address
    permanentAddress: "",
    permanentCountry: "India",
    permanentPincode: "",
    permanentCity: "",
    permanentState: "",
    // Employment Details
    role: "employee",
    department: "",
    branch: "sanpada",
    designation: "",
    workingHours: "",
    monthlySalary: "",
    joiningDate: "",
    currentStatus: "active",
  })

  const [documents, setDocuments] = useState<Record<string, File | null>>({
    aadhaarCard: null,
    panCard: null,
    photo: null,
    addressProof: null,
    currentAddressProof: null,
    noc: null,
    resume: null,
    cancelledCheque: null,
    certificates: null,
    experienceLetters: null,
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field: string, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [field]: file }))
  }

  const handleAddDesignation = () => {
    if (customDesignation.trim() && !designations.includes(customDesignation.trim())) {
      setDesignations((prev) => [...prev, customDesignation.trim()])
      handleChange("designation", customDesignation.trim())
      setCustomDesignation("")
    }
  }

  const handleSameAddressChange = (checked: boolean) => {
    setSameAsCurrentAddress(checked)
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress: prev.currentAddress,
        permanentCountry: prev.currentCountry,
        permanentPincode: prev.currentPincode,
        permanentCity: prev.currentCity,
        permanentState: prev.currentState,
      }))
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSuccess(true)

    setTimeout(() => {
      router.push("/admin/staff")
    }, 2000)
  }

  const isStep1Valid =
    formData.firstName &&
    formData.lastName &&
    formData.phone &&
    formData.email &&
    formData.dateOfBirth &&
    formData.gender
  const isStep2Valid =
    formData.currentAddress && formData.currentPincode && formData.currentCity && formData.currentState
  const isStep3Valid =
    formData.role &&
    formData.department &&
    formData.branch &&
    formData.designation &&
    formData.workingHours &&
    formData.monthlySalary
  const isStep4Valid =
    documents.aadhaarCard && documents.panCard && documents.photo && documents.addressProof && documents.resume

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Address", icon: MapPin },
    { number: 3, title: "Employment", icon: Briefcase },
    { number: 4, title: "Documents", icon: FileText },
  ]

  const stateOptions = [
    "Maharashtra",
    "Gujarat",
    "Karnataka",
    "Tamil Nadu",
    "Delhi",
    "Uttar Pradesh",
    "Rajasthan",
    "West Bengal",
    "Madhya Pradesh",
    "Kerala",
    "Andhra Pradesh",
    "Telangana",
    "Punjab",
    "Haryana",
    "Bihar",
    "Odisha",
    "Assam",
    "Jharkhand",
    "Chhattisgarh",
    "Uttarakhand",
    "Himachal Pradesh",
    "Goa",
  ]

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "head", label: "Head" },
    { value: "manager", label: "Manager" },
    { value: "trainer", label: "Trainer" },
    { value: "employee", label: "Employee" },
  ]

  const departmentOptions = [
    { value: "management", label: "Management" },
    { value: "training", label: "Training" },
    { value: "sales", label: "Sales" },
    { value: "maintenance", label: "Maintenance" },
    { value: "reception", label: "Reception" },
    { value: "accounts", label: "Accounts" },
  ]

  const branchOptions = [
    { value: "sanpada", label: "Sanpada" },
    { value: "vashi", label: "Vashi" },
    { value: "nerul", label: "Nerul" },
    { value: "kharghar", label: "Kharghar" },
  ]

  const FileUploadField = ({
    id,
    label,
    required = false,
    file,
    onFileChange,
  }: {
    id: string
    label: string
    required?: boolean
    file: File | null
    onFileChange: (file: File | null) => void
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Input
            id={id}
            type="file"
            className="hidden"
            onChange={(e) => onFileChange(e.target.files?.[0] || null)}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 justify-start text-muted-foreground bg-transparent"
            onClick={() => document.getElementById(id)?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            {file ? file.name : "Choose file"}
          </Button>
        </div>
        {file && (
          <Button type="button" variant="ghost" size="icon" onClick={() => onFileChange(null)}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {file && <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>}
    </div>
  )

  if (success) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-background">
          <Sidebar role="admin" />
          <main className="flex-1 p-6 lg:p-8 transition-all duration-300">
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-in zoom-in-50 duration-300">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Staff Added Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                {formData.firstName} {formData.lastName} has been registered as {formData.role}.
              </p>
              <p className="text-sm text-muted-foreground">Redirecting to staff list...</p>
            </div>
          </main>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar role="admin" />
        <main className="flex-1 p-6 lg:p-8 transition-all duration-300">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Add New Staff</h1>
                <p className="text-muted-foreground">Fill in the details to register a new staff member</p>
              </div>
            </div>

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

            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Enter basic personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                          id="middleName"
                          placeholder="Enter middle name"
                          value={formData.middleName}
                          onChange={(e) => handleChange("middleName", e.target.value)}
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
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-10 h-11"
                            placeholder="staff@gym.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Personal Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">
                          Date of Birth <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            className="pl-10 h-11"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">
                          Gender <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
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
                      <Heart className="w-5 h-5 text-primary" />
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">
                          Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="emergencyName"
                          placeholder="Contact person name"
                          value={formData.emergencyName}
                          onChange={(e) => handleChange("emergencyName", e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelation">Relation</Label>
                        <Select
                          value={formData.emergencyRelation}
                          onValueChange={(value) => handleChange("emergencyRelation", value)}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select" />
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
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">
                          Phone <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="emergencyPhone"
                            className="pl-10 h-11"
                            placeholder="+91 98765 43210"
                            value={formData.emergencyPhone}
                            onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Address Information */}
            {step === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Current Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentAddress">
                        Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="currentAddress"
                        placeholder="Enter full address"
                        value={formData.currentAddress}
                        onChange={(e) => handleChange("currentAddress", e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentCountry">
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.currentCountry}
                          onValueChange={(value) => handleChange("currentCountry", value)}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentPincode">
                          Pincode <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="currentPincode"
                          placeholder="Enter pincode"
                          value={formData.currentPincode}
                          onChange={(e) => handleChange("currentPincode", e.target.value)}
                          className="h-11"
                          maxLength={6}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentCity">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="currentCity"
                          placeholder="Enter city"
                          value={formData.currentCity}
                          onChange={(e) => handleChange("currentCity", e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentState">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.currentState}
                          onValueChange={(value) => handleChange("currentState", value)}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {stateOptions.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sameAddress"
                    checked={sameAsCurrentAddress}
                    onCheckedChange={(checked) => handleSameAddressChange(checked as boolean)}
                  />
                  <Label htmlFor="sameAddress" className="text-sm font-medium cursor-pointer">
                    Permanent Address is same as Current Address
                  </Label>
                </div>

                <Card className={cn(sameAsCurrentAddress && "opacity-50 pointer-events-none")}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Permanent Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="permanentAddress">
                        Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="permanentAddress"
                        placeholder="Enter full address"
                        value={formData.permanentAddress}
                        onChange={(e) => handleChange("permanentAddress", e.target.value)}
                        className="min-h-[80px]"
                        disabled={sameAsCurrentAddress}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="permanentCountry">
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.permanentCountry}
                          onValueChange={(value) => handleChange("permanentCountry", value)}
                          disabled={sameAsCurrentAddress}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="permanentPincode">
                          Pincode <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="permanentPincode"
                          placeholder="Enter pincode"
                          value={formData.permanentPincode}
                          onChange={(e) => handleChange("permanentPincode", e.target.value)}
                          className="h-11"
                          maxLength={6}
                          disabled={sameAsCurrentAddress}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="permanentCity">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="permanentCity"
                          placeholder="Enter city"
                          value={formData.permanentCity}
                          onChange={(e) => handleChange("permanentCity", e.target.value)}
                          className="h-11"
                          disabled={sameAsCurrentAddress}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="permanentState">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.permanentState}
                          onValueChange={(value) => handleChange("permanentState", value)}
                          disabled={sameAsCurrentAddress}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {stateOptions.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Employment Details */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Employment Details
                  </CardTitle>
                  <CardDescription>Configure role, department and work schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="role">
                        Role <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">
                        Department <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departmentOptions.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            {branchOptions.map((branch) => (
                              <SelectItem key={branch.value} value={branch.value}>
                                {branch.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">
                        Designation <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.designation}
                        onValueChange={(value) => handleChange("designation", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select Designation" />
                        </SelectTrigger>
                        <SelectContent>
                          {designations.map((designation) => (
                            <SelectItem key={designation} value={designation}>
                              {designation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Custom Designation */}
                  <div className="space-y-2">
                    <Label>Add Custom Designation</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter custom designation"
                        value={customDesignation}
                        onChange={(e) => setCustomDesignation(e.target.value)}
                        className="h-11"
                      />
                      <Button type="button" onClick={handleAddDesignation} className="h-11">
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                    {designations.length > 6 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {designations.slice(6).map((d) => (
                          <Badge key={d} variant="secondary" className="text-xs">
                            {d}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="workingHours">
                        Working Hours <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="workingHours"
                          className="pl-10 h-11"
                          placeholder="e.g., 9:00 AM - 6:00 PM"
                          value={formData.workingHours}
                          onChange={(e) => handleChange("workingHours", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlySalary">
                        Monthly Salary <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                        <Input
                          id="monthlySalary"
                          type="number"
                          className="pl-8 h-11"
                          placeholder="Enter monthly salary"
                          value={formData.monthlySalary}
                          onChange={(e) => handleChange("monthlySalary", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="joiningDate">Joining Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="joiningDate"
                          type="date"
                          className="pl-10 h-11"
                          value={formData.joiningDate}
                          onChange={(e) => handleChange("joiningDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentStatus">Current Status</Label>
                      <Select
                        value={formData.currentStatus}
                        onValueChange={(value) => handleChange("currentStatus", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="on-leave">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Salary Preview */}
                  {formData.monthlySalary && (
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                      <h4 className="font-medium text-sm">Salary Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly:</span>
                          <span className="font-medium">
                            ₹{Number.parseInt(formData.monthlySalary).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual CTC:</span>
                          <span className="font-medium text-primary">
                            ₹{(Number.parseInt(formData.monthlySalary) * 12).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 4: Documents */}
            {step === 4 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Required Documents
                    </CardTitle>
                    <CardDescription>Upload mandatory documents for verification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileUploadField
                        id="aadhaarCard"
                        label="Aadhaar Card"
                        required
                        file={documents.aadhaarCard}
                        onFileChange={(file) => handleFileChange("aadhaarCard", file)}
                      />
                      <FileUploadField
                        id="panCard"
                        label="PAN Card"
                        required
                        file={documents.panCard}
                        onFileChange={(file) => handleFileChange("panCard", file)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileUploadField
                        id="photo"
                        label="Photo"
                        required
                        file={documents.photo}
                        onFileChange={(file) => handleFileChange("photo", file)}
                      />
                      <FileUploadField
                        id="addressProof"
                        label="Address Proof"
                        required
                        file={documents.addressProof}
                        onFileChange={(file) => handleFileChange("addressProof", file)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileUploadField
                        id="currentAddressProof"
                        label="Current Address Proof"
                        required
                        file={documents.currentAddressProof}
                        onFileChange={(file) => handleFileChange("currentAddressProof", file)}
                      />
                      <FileUploadField
                        id="resume"
                        label="Resume"
                        required
                        file={documents.resume}
                        onFileChange={(file) => handleFileChange("resume", file)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nameMatches"
                        checked={nameMatchesAddressProof}
                        onCheckedChange={(checked) => setNameMatchesAddressProof(checked as boolean)}
                      />
                      <Label htmlFor="nameMatches" className="text-sm cursor-pointer">
                        Name in address proof matches applicant name
                      </Label>
                    </div>

                    <FileUploadField
                      id="noc"
                      label="NOC (No Objection Certificate)"
                      file={documents.noc}
                      onFileChange={(file) => handleFileChange("noc", file)}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Additional Documents
                    </CardTitle>
                    <CardDescription>Upload any additional supporting documents</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileUploadField
                        id="cancelledCheque"
                        label="Cancelled Cheque"
                        file={documents.cancelledCheque}
                        onFileChange={(file) => handleFileChange("cancelledCheque", file)}
                      />
                      <FileUploadField
                        id="certificates"
                        label="Certificates"
                        file={documents.certificates}
                        onFileChange={(file) => handleFileChange("certificates", file)}
                      />
                    </div>

                    <FileUploadField
                      id="experienceLetters"
                      label="Experience Letters"
                      file={documents.experienceLetters}
                      onFileChange={(file) => handleFileChange("experienceLetters", file)}
                    />
                  </CardContent>
                </Card>

                {/* Summary Card */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Staff Registration Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <p className="font-medium">
                          {formData.firstName} {formData.middleName} {formData.lastName || "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Role:</span>
                        <p className="font-medium capitalize">{formData.role || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Department:</span>
                        <p className="font-medium capitalize">{formData.department || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Monthly Salary:</span>
                        <p className="font-medium">
                          {formData.monthlySalary
                            ? `₹${Number.parseInt(formData.monthlySalary).toLocaleString()}`
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Branch:</span>
                        <p className="font-medium capitalize">{formData.branch || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Designation:</span>
                        <p className="font-medium">{formData.designation || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Working Hours:</span>
                        <p className="font-medium">{formData.workingHours || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Documents:</span>
                        <p className="font-medium">{Object.values(documents).filter(Boolean).length} uploaded</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep((prev) => Math.max(1, prev - 1))} disabled={step === 1}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {step < 4 ? (
                <Button
                  onClick={() => setStep((prev) => Math.min(4, prev + 1))}
                  disabled={
                    (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || (step === 3 && !isStep3Valid)
                  }
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading || !isStep4Valid}>
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Submit
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
