"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  User,
  Shield,
  Fingerprint,
  RefreshCw,
  Pause,
  Play,
  Ban,
  Trash2,
  Edit,
  Download,
  Clock,
  Building,
  Users,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scan,
  UserPlus,
  UserMinus,
  History,
} from "lucide-react"

// Mock member data
const getMemberById = (id: string) => ({
  id: id,
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  alternatePhone: "+91 87654 32109",
  avatar: "",
  membership: "Premium" as const,
  status: "Active" as const,
  branch: "Downtown",
  joinDate: "2024-01-15",
  expiryDate: "2025-01-15",
  dateOfBirth: "1995-06-20",
  gender: "Male",
  bloodGroup: "O+",
  address: "123, Park Street, Sector 15, Gurugram, Haryana - 122001",
  emergencyContact: {
    name: "Priya Sharma",
    relation: "Spouse",
    phone: "+91 76543 21098",
  },
  membershipDetails: {
    plan: "Premium Annual",
    amount: "₹24,999",
    paymentMethod: "Credit Card",
    lastPayment: "2024-01-15",
    nextPayment: "2025-01-15",
    autoRenew: true,
  },
  biometric: {
    fingerprint: true,
    faceId: false,
    lastSync: "2024-12-01",
    deviceId: "BIO-DT-001",
  },
  attendance: {
    totalVisits: 156,
    thisMonth: 18,
    avgDuration: "1.5 hrs",
    lastVisit: "2024-12-08",
  },
  trainer: {
    assigned: true,
    name: "Vikram Singh",
    specialization: "Strength Training",
  },
})

export function MemberDetails({ memberId }: { memberId: string }) {
  return (
    <SidebarProvider>
      <MemberDetailsInner memberId={memberId} />
    </SidebarProvider>
  )
}

function MemberDetailsInner({ memberId }: { memberId: string }) {
  const router = useRouter()
  const { isCollapsed } = useSidebar()
  const member = getMemberById(memberId)
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
      case "Inactive":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Inactive</Badge>
      case "Expired":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMembershipBadge = (membership: string) => {
    switch (membership) {
      case "VIP":
        return <Badge className="bg-primary/10 text-primary border-primary/20">VIP</Badge>
      case "Premium":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Premium</Badge>
      default:
        return <Badge variant="outline">{membership}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <main className={`transition-all duration-300 ${isCollapsed ? "pl-16" : "pl-64"}`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push("/admin/members")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Member Details</h1>
              <p className="text-sm text-muted-foreground">View and manage member information</p>
            </div>
          </div>

          {/* Member Profile Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <Avatar className="h-28 w-28 border-4 border-primary/20">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    {getStatusBadge(member.status)}
                    {getMembershipBadge(member.membership)}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{member.name}</h2>
                    <p className="text-muted-foreground">Member ID: {member.id}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{member.branch} Branch</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Joined: {member.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Expires: {member.expiryDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <span>{member.attendance.totalVisits} Total Visits</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="biometric">Biometric</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold">{member.attendance.thisMonth}</p>
                      <p className="text-xs text-muted-foreground">Visits</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Duration</p>
                      <p className="text-2xl font-bold">{member.attendance.avgDuration}</p>
                      <p className="text-xs text-muted-foreground">Per Session</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-500/10">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Visit</p>
                      <p className="text-2xl font-bold">{member.attendance.lastVisit.split("-")[2]}</p>
                      <p className="text-xs text-muted-foreground">Dec 2024</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Trainer</p>
                      <p className="text-lg font-bold truncate">{member.trainer.name}</p>
                      <p className="text-xs text-muted-foreground">{member.trainer.specialization}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Plan</span>
                      <span className="font-medium">{member.membershipDetails.plan}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-medium">{member.membershipDetails.amount}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Next Payment</span>
                      <span className="font-medium">{member.membershipDetails.nextPayment}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Auto Renew</span>
                      <Badge variant={member.membershipDetails.autoRenew ? "default" : "outline"}>
                        {member.membershipDetails.autoRenew ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Fingerprint className="w-5 h-5 text-primary" />
                      Biometric Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Fingerprint</span>
                      {member.biometric.fingerprint ? (
                        <Badge className="bg-green-500/10 text-green-600 gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Registered
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <XCircle className="w-3 h-3" /> Not Set
                        </Badge>
                      )}
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Face ID</span>
                      {member.biometric.faceId ? (
                        <Badge className="bg-green-500/10 text-green-600 gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Registered
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <XCircle className="w-3 h-3" /> Not Set
                        </Badge>
                      )}
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Device ID</span>
                      <span className="font-medium">{member.biometric.deviceId}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Last Sync</span>
                      <span className="font-medium">{member.biometric.lastSync}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{member.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member ID</p>
                        <p className="font-medium">{member.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{member.dateOfBirth}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-medium">{member.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Blood Group</p>
                        <p className="font-medium">{member.bloodGroup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Branch</p>
                        <p className="font-medium">{member.branch}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      Contact Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium">{member.email}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Primary Phone</p>
                      <p className="font-medium">{member.phone}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Alternate Phone</p>
                      <p className="font-medium">{member.alternatePhone}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{member.address}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Contact Name</p>
                        <p className="font-medium">{member.emergencyContact.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Relationship</p>
                        <p className="font-medium">{member.emergencyContact.relation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-medium">{member.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Membership Tab */}
            <TabsContent value="membership" className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Active</p>
                        <p className="text-xl font-bold">2</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Upcoming</p>
                        <p className="text-xl font-bold">1</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <History className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Past</p>
                        <p className="text-xl font-bold">3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
                        <p className="text-xl font-bold">₹85,500</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <RefreshCw className="w-4 h-4" />
                  Renew Membership
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Play className="w-4 h-4" />
                  Add Product
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Pause className="w-4 h-4" />
                  Freeze Membership
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Download All Invoices
                </Button>
              </div>

              {/* Membership Filter Tabs */}
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="bg-muted/50 mb-4">
                  <TabsTrigger value="all">All Orders</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {/* Membership Order Card Component */}
                  <div className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <CreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm text-muted-foreground">ORD-2025-001</span>
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
                          </div>
                          <h4 className="font-semibold mt-1">Standard Package Yearly (Ulwe)</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              Ulwe (TFC-UL-01)
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Oct 13, 2025 - Oct 12, 2026
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold">₹10,500</p>
                          <p className="text-xs text-muted-foreground">Fully Paid</p>
                        </div>
                        <div className="transform transition-transform rotate-180">
                          <Activity className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Expanded Content */}
                  <div className="border-t">
                    {/* Products Section */}
                    <div className="p-4 bg-muted/20">
                      <h5 className="font-semibold mb-3 text-sm">Products (2)</h5>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-background border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded bg-muted">
                                <Activity className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">Gym Membership</span>
                                  <Badge className="bg-green-500/10 text-green-600 text-xs py-0">Active</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">12 Months</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }} />
                              </div>
                              <span className="text-xs text-green-600 font-medium">287d</span>
                              <span className="font-medium text-sm">₹10,000</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-background border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded bg-muted">
                                <Play className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">Steam Room</span>
                                  <Badge className="bg-green-500/10 text-green-600 text-xs py-0">Active</Badge>
                                  <Badge variant="outline" className="text-xs py-0">Included</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">12 Months</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }} />
                              </div>
                              <span className="text-xs text-green-600 font-medium">287d</span>
                              <span className="font-medium text-sm">Incl.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payments Section */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-sm">Payments (1)</h5>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded bg-green-500/10">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">₹10,500</span>
                                <Badge className="bg-green-500/10 text-green-600 text-xs py-0">Paid</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">UPI • Sep 30, 2025 at 5:30 AM</p>
                              <p className="text-xs text-muted-foreground">By: vishal mangal</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-1.5 h-8 bg-transparent">
                            <Download className="w-3.5 h-3.5" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t bg-muted/10 flex flex-wrap gap-2">
                      <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90">
                        <RefreshCw className="w-3.5 h-3.5" />
                        Renew
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                        <Pause className="w-3.5 h-3.5" />
                        Freeze
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                        <Download className="w-3.5 h-3.5" />
                        Download All
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="active" className="space-y-4">
                  {/* Membership Order Card Component */}
                  <div className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <CreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm text-muted-foreground">ORD-2025-001</span>
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
                          </div>
                          <h4 className="font-semibold mt-1">Standard Package Yearly (Ulwe)</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              Ulwe (TFC-UL-01)
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Oct 13, 2025 - Oct 12, 2026
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold">₹10,500</p>
                          <p className="text-xs text-muted-foreground">Fully Paid</p>
                        </div>
                        <div className="transform transition-transform rotate-180">
                          <Activity className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Expanded Content */}
                  <div className="border-t">
                    {/* Products Section */}
                    <div className="p-4 bg-muted/20">
                      <h5 className="font-semibold mb-3 text-sm">Products (2)</h5>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-background border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded bg-muted">
                                <Activity className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">Gym Membership</span>
                                  <Badge className="bg-green-500/10 text-green-600 text-xs py-0">Active</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">12 Months</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }} />
                              </div>
                              <span className="text-xs text-green-600 font-medium">287d</span>
                              <span className="font-medium text-sm">₹10,000</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-background border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded bg-muted">
                                <Play className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">Steam Room</span>
                                  <Badge className="bg-green-500/10 text-green-600 text-xs py-0">Active</Badge>
                                  <Badge variant="outline" className="text-xs py-0">Included</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">12 Months</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }} />
                              </div>
                              <span className="text-xs text-green-600 font-medium">287d</span>
                              <span className="font-medium text-sm">Incl.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payments Section */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-sm">Payments (1)</h5>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded bg-green-500/10">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">₹10,500</span>
                                <Badge className="bg-green-500/10 text-green-600 text-xs py-0">Paid</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">UPI • Sep 30, 2025 at 5:30 AM</p>
                              <p className="text-xs text-muted-foreground">By: vishal mangal</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-1.5 h-8 bg-transparent">
                            <Download className="w-3.5 h-3.5" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t bg-muted/10 flex flex-wrap gap-2">
                      <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90">
                        <RefreshCw className="w-3.5 h-3.5" />
                        Renew
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                        <Pause className="w-3.5 h-3.5" />
                        Freeze
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                        <Download className="w-3.5 h-3.5" />
                        Download All
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                  {/* Membership Order Card Component */}
                  <div className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm text-muted-foreground">ORD-2025-003</span>
                            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Upcoming</Badge>
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">₹12,500 Due</Badge>
                          </div>
                          <h4 className="font-semibold mt-1">Premium Package Yearly</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              Ulwe (TFC-UL-01)
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Oct 13, 2026 - Oct 12, 2027
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold">₹25,000</p>
                          <p className="text-xs text-muted-foreground">₹12,500 Paid</p>
                        </div>
                        <div className="transform transition-transform">
                          <Activity className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Expanded Content */}
                  <div className="border-t">
                    {/* Products Section */}
                    <div className="p-4 bg-muted/20">
                      <h5 className="font-semibold mb-3 text-sm">Products (3)</h5>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-background border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded bg-muted">
                                <Activity className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">Gym Membership</span>
                                  <Badge className="bg-blue-500/10 text-blue-600 text-xs py-0">Upcoming</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">12 Months</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }} />
                              </div>
                              <span className="text-xs text-blue-600 font-medium">null</span>
                              <span className="font-medium text-sm">₹20,000</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-background border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded bg-muted">
                                <Play className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">Steam Room</span>
                                  <Badge className="bg-blue-500/10 text-blue-600 text-xs py-0">Upcoming</Badge>
                                  <Badge variant="outline" className="text-xs py-0">Included</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">12 Months</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }} />
                              </div>
                              <span className="text-xs text-blue-600 font-medium">null</span>
                              <span className="font-medium text-sm">Incl.</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-background border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded bg-muted">
                                <Users className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">Personal Training</span>
                                  <Badge className="bg-blue-500/10 text-blue-600 text-xs py-0">Upcoming</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">12 Sessions</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }} />
                              </div>
                              <span className="text-xs text-blue-600 font-medium">null</span>
                              <span className="font-medium text-sm">₹4,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payments Section */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-sm">Payments (2)</h5>
                        <span className="text-xs text-yellow-600">Due: Oct 1, 2026</span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded bg-green-500/10">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">₹12,500</span>
                                <Badge className="bg-green-500/10 text-green-600 text-xs py-0">Paid</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">Credit Card • Sep 15, 2025 at 2:30 PM</p>
                              <p className="text-xs text-muted-foreground">By: vishal mangal</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-1.5 h-8 bg-transparent">
                            <Download className="w-3.5 h-3.5" />
                            Invoice
                          </Button>
                        </div>
                        <div className="p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded bg-yellow-500/10">
                              <Clock className="w-4 h-4 text-yellow-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">₹12,500</span>
                                <Badge className="bg-yellow-500/10 text-yellow-600 text-xs py-0">Pending</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">Pending</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t bg-muted/10 flex flex-wrap gap-2">
                      <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90">
                        <CreditCard className="w-3.5 h-3.5" />
                        Pay Balance
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                        <Download className="w-3.5 h-3.5" />
                        Download All
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                  {/* Membership Order Card Component */}
                  <div className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm text-muted-foreground">ORD-2024-045</span>
                            <Badge className="bg-muted text-muted-foreground">Expired</Badge>
                          </div>
                          <h4 className="font-semibold mt-1">Basic Package Yearly</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              Ghansoli (TFC-GH-01)
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Oct 13, 2024 - Oct 12, 2025
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold">₹8,000</p>
                          <p className="text-xs text-muted-foreground">Fully Paid</p>
                        </div>
                        <div className="transform transition-transform">
                          <Activity className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Expanded Content */}
                  <div className="border-t">
                    {/* Products Section */}
                    <div className="p-4 bg-muted/20">
                      <h5 className="font-semibold mb-3 text-sm">Products (1)</h5>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-background border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded bg-muted">
                                <Activity className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">Gym Membership</span>
                                  <Badge variant="outline" className="text-xs py-0">Expired</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">12 Months</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-muted rounded-full" style={{ width: "0%" }} />
                              </div>
                              <span className="text-xs text-muted-foreground">0d</span>
                              <span className="font-medium text-sm">₹8,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payments Section */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-sm">Payments (1)</h5>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded bg-green-500/10">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">₹8,000</span>
                                <Badge className="bg-green-500/10 text-green-600 text-xs py-0">Paid</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">UPI • Oct 10, 2024 at 11:00 AM</p>
                              <p className="text-xs text-muted-foreground">By: amit shah</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-1.5 h-8 bg-transparent">
                            <Download className="w-3.5 h-3.5" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t bg-muted/10 flex flex-wrap gap-2">
                      <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90">
                        <RefreshCw className="w-3.5 h-3.5" />
                        Renew
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                        <Download className="w-3.5 h-3.5" />
                        Download All
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Biometric Tab */}
            <TabsContent value="biometric" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-primary" />
                    Biometric Device Operations
                  </CardTitle>
                  <CardDescription>Manage biometric registration and device operations for this member</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-3 mb-2">
                        <Fingerprint className="w-5 h-5 text-primary" />
                        <span className="font-medium">Fingerprint</span>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600">Registered</Badge>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-3 mb-2">
                        <Scan className="w-5 h-5 text-primary" />
                        <span className="font-medium">Face ID</span>
                      </div>
                      <Badge variant="outline">Not Registered</Badge>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-3 mb-2">
                        <Building className="w-5 h-5 text-primary" />
                        <span className="font-medium">Device ID</span>
                      </div>
                      <span className="text-sm font-mono">BIO-DT-001</span>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-3 mb-2">
                        <RefreshCw className="w-5 h-5 text-primary" />
                        <span className="font-medium">Last Sync</span>
                      </div>
                      <span className="text-sm">2024-12-01</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Device Operations */}
                  <div>
                    <h4 className="font-semibold mb-4">Device Operations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                        <UserPlus className="w-6 h-6 text-primary" />
                        <span>Register Fingerprint</span>
                        <span className="text-xs text-muted-foreground">Add new fingerprint to device</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                        <Scan className="w-6 h-6 text-primary" />
                        <span>Register Face ID</span>
                        <span className="text-xs text-muted-foreground">Add face recognition</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                        <RefreshCw className="w-6 h-6 text-blue-600" />
                        <span>Sync to Device</span>
                        <span className="text-xs text-muted-foreground">Push data to biometric device</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                        <Download className="w-6 h-6 text-green-600" />
                        <span>Fetch Attendance Logs</span>
                        <span className="text-xs text-muted-foreground">Get logs from device</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                        <History className="w-6 h-6 text-purple-600" />
                        <span>View Access History</span>
                        <span className="text-xs text-muted-foreground">Check entry/exit logs</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center gap-2 text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <UserMinus className="w-6 h-6" />
                        <span>Remove Biometrics</span>
                        <span className="text-xs text-muted-foreground">Delete all biometric data</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Actions Tab */}
            <TabsContent value="actions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Membership Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Membership Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start gap-3 bg-primary hover:bg-primary/90">
                      <RefreshCw className="w-4 h-4" />
                      Renew Membership
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <Play className="w-4 h-4" />
                      Upgrade Plan
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <Pause className="w-4 h-4" />
                      Freeze Membership
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <Building className="w-4 h-4" />
                      Transfer Branch
                    </Button>
                  </CardContent>
                </Card>

                {/* Account Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Account Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <Edit className="w-4 h-4" />
                      Edit Member Details
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <Download className="w-4 h-4" />
                      Export Member Data
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-3 text-yellow-600 hover:text-yellow-700 bg-transparent"
                        >
                          <Ban className="w-4 h-4" />
                          Deactivate Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            Deactivate Member Account?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will temporarily disable the member's access to the gym. The account can be reactivated
                            later.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-yellow-600 hover:bg-yellow-700">
                            Deactivate
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Member
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            Delete Member Permanently?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. All member data including payment history, attendance records,
                            and biometric data will be permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                            Delete Permanently
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
