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
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  User,
  Shield,
  Edit,
  Download,
  Clock,
  Building,
  Activity,
  CheckCircle2,
  XCircle,
  DollarSign,
  Star,
  Award,
  Briefcase,
  UserCog,
  Trash2,
  Ban,
  FileText,
  Target,
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock staff data
const getStaffById = (id: string) => ({
  id: id,
  name: "Aditya Sharma",
  email: "aditya.sharma@fithub.com",
  phone: "+91 98765 43210",
  alternatePhone: "+91 87654 32109",
  avatar: "",
  role: "Admin" as const,
  department: "Management",
  status: "Active" as const,
  branch: "Downtown",
  joinDate: "2022-01-15",
  dateOfBirth: "1990-05-15",
  gender: "Male",
  bloodGroup: "B+",
  address: "456, Green Avenue, Sector 22, Noida, UP - 201301",
  shift: "Flexible",
  salary: "₹75,000",
  bankDetails: {
    accountNumber: "XXXX XXXX 4521",
    bankName: "HDFC Bank",
    ifsc: "HDFC0001234",
  },
  emergencyContact: {
    name: "Meera Sharma",
    relation: "Spouse",
    phone: "+91 76543 21098",
  },
  documents: {
    aadhar: true,
    pan: true,
    resume: true,
    certificate: true,
  },
  performance: {
    rating: 4.5,
    totalReviews: 12,
    tasksCompleted: 156,
    targetAchieved: 92,
  },
  attendance: {
    present: 22,
    absent: 2,
    late: 1,
    leaves: 3,
    totalWorkingDays: 25,
    avgCheckIn: "9:15 AM",
    avgCheckOut: "6:30 PM",
  },
})

// Monthly performance data
const performanceData = [
  { month: "Jul", tasks: 45, target: 50 },
  { month: "Aug", tasks: 52, target: 50 },
  { month: "Sep", tasks: 48, target: 50 },
  { month: "Oct", tasks: 55, target: 50 },
  { month: "Nov", tasks: 60, target: 55 },
  { month: "Dec", tasks: 58, target: 55 },
]

// Attendance trend data
const attendanceData = [
  { month: "Jul", present: 20, absent: 2, late: 1 },
  { month: "Aug", present: 22, absent: 1, late: 0 },
  { month: "Sep", present: 21, absent: 1, late: 2 },
  { month: "Oct", present: 23, absent: 0, late: 1 },
  { month: "Nov", present: 20, absent: 2, late: 1 },
  { month: "Dec", present: 22, absent: 2, late: 1 },
]

// Task distribution data
const taskDistribution = [
  { name: "Completed", value: 156, color: "#22c55e" },
  { name: "In Progress", value: 24, color: "#ed9320" },
  { name: "Pending", value: 12, color: "#ef4444" },
]

// Recent attendance records
const recentAttendance = [
  { date: "2024-12-09", checkIn: "9:10 AM", checkOut: "6:45 PM", status: "Present", hours: "9h 35m" },
  { date: "2024-12-08", checkIn: "9:05 AM", checkOut: "6:30 PM", status: "Present", hours: "9h 25m" },
  { date: "2024-12-07", checkIn: "9:30 AM", checkOut: "6:15 PM", status: "Late", hours: "8h 45m" },
  { date: "2024-12-06", checkIn: "9:00 AM", checkOut: "6:20 PM", status: "Present", hours: "9h 20m" },
  { date: "2024-12-05", checkIn: "-", checkOut: "-", status: "Absent", hours: "-" },
  { date: "2024-12-04", checkIn: "9:08 AM", checkOut: "6:40 PM", status: "Present", hours: "9h 32m" },
  { date: "2024-12-03", checkIn: "9:02 AM", checkOut: "6:25 PM", status: "Present", hours: "9h 23m" },
]

export function StaffDetails({ staffId }: { staffId: string }) {
  return (
    <SidebarProvider>
      <StaffDetailsInner staffId={staffId} />
    </SidebarProvider>
  )
}

function StaffDetailsInner({ staffId }: { staffId: string }) {
  const router = useRouter()
  const { isCollapsed } = useSidebar()
  const staff = getStaffById(staffId)
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
      case "Inactive":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Inactive</Badge>
      case "On Leave":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">On Leave</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Admin</Badge>
      case "Head":
        return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Head</Badge>
      case "Manager":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Manager</Badge>
      case "Trainer":
        return <Badge className="bg-teal-500/10 text-teal-600 border-teal-500/20">Trainer</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <main className={`transition-all duration-300 ${isCollapsed ? "pl-16" : "pl-64"}`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push("/admin/staff")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Staff Details</h1>
              <p className="text-sm text-muted-foreground">View and manage staff information</p>
            </div>
          </div>

          {/* Staff Profile Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <Avatar className="h-28 w-28 border-4 border-primary/20">
                    <AvatarImage src={staff.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {staff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    {getStatusBadge(staff.status)}
                    {getRoleBadge(staff.role)}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{staff.name}</h2>
                    <p className="text-muted-foreground">Staff ID: {staff.id}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{staff.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{staff.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{staff.branch} Branch</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span>{staff.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Joined: {staff.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Shift: {staff.shift}</span>
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
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="text-2xl font-bold">{staff.performance.rating}</p>
                      <p className="text-xs text-muted-foreground">{staff.performance.totalReviews} reviews</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-500/10">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tasks Done</p>
                      <p className="text-2xl font-bold">{staff.performance.tasksCompleted}</p>
                      <p className="text-xs text-muted-foreground">This year</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Target</p>
                      <p className="text-2xl font-bold">{staff.performance.targetAchieved}%</p>
                      <p className="text-xs text-muted-foreground">Achieved</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Salary</p>
                      <p className="text-2xl font-bold">{staff.salary}</p>
                      <p className="text-xs text-muted-foreground">Per month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Attendance Summary
                    </CardTitle>
                    <CardDescription>Current month attendance breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Present</span>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(staff.attendance.present / staff.attendance.totalWorkingDays) * 100}
                          className="w-24 h-2"
                        />
                        <span className="font-medium text-green-600">{staff.attendance.present} days</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Absent</span>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(staff.attendance.absent / staff.attendance.totalWorkingDays) * 100}
                          className="w-24 h-2 [&>div]:bg-red-500"
                        />
                        <span className="font-medium text-red-600">{staff.attendance.absent} days</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Late</span>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(staff.attendance.late / staff.attendance.totalWorkingDays) * 100}
                          className="w-24 h-2 [&>div]:bg-yellow-500"
                        />
                        <span className="font-medium text-yellow-600">{staff.attendance.late} days</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Leaves Taken</span>
                      <span className="font-medium">{staff.attendance.leaves} days</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg Check-In</span>
                      <span className="font-medium">{staff.attendance.avgCheckIn}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg Check-Out</span>
                      <span className="font-medium">{staff.attendance.avgCheckOut}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Documents Status
                    </CardTitle>
                    <CardDescription>Uploaded documents verification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Aadhar Card</span>
                      {staff.documents.aadhar ? (
                        <Badge className="bg-green-500/10 text-green-600 gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <XCircle className="w-3 h-3" /> Pending
                        </Badge>
                      )}
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">PAN Card</span>
                      {staff.documents.pan ? (
                        <Badge className="bg-green-500/10 text-green-600 gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <XCircle className="w-3 h-3" /> Pending
                        </Badge>
                      )}
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Resume</span>
                      {staff.documents.resume ? (
                        <Badge className="bg-green-500/10 text-green-600 gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Uploaded
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <XCircle className="w-3 h-3" /> Pending
                        </Badge>
                      )}
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Certificates</span>
                      {staff.documents.certificate ? (
                        <Badge className="bg-green-500/10 text-green-600 gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Uploaded
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <XCircle className="w-3 h-3" /> Pending
                        </Badge>
                      )}
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
                        <p className="font-medium">{staff.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Staff ID</p>
                        <p className="font-medium">{staff.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{staff.dateOfBirth}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-medium">{staff.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Blood Group</p>
                        <p className="font-medium">{staff.bloodGroup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Branch</p>
                        <p className="font-medium">{staff.branch}</p>
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
                      <p className="font-medium">{staff.email}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Primary Phone</p>
                      <p className="font-medium">{staff.phone}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Alternate Phone</p>
                      <p className="font-medium">{staff.alternatePhone}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{staff.address}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Employment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="font-medium">{staff.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{staff.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Shift</p>
                        <p className="font-medium">{staff.shift}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Join Date</p>
                        <p className="font-medium">{staff.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Salary</p>
                        <p className="font-medium">{staff.salary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Name</p>
                      <p className="font-medium">{staff.emergencyContact.name}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Relationship</p>
                      <p className="font-medium">{staff.emergencyContact.relation}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{staff.emergencyContact.phone}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Bank Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Account Number</p>
                        <p className="font-medium">{staff.bankDetails.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bank Name</p>
                        <p className="font-medium">{staff.bankDetails.bankName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">IFSC Code</p>
                        <p className="font-medium">{staff.bankDetails.ifsc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-2">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">{staff.performance.rating}/5</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex p-3 rounded-full bg-green-500/10 mb-2">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold">{staff.performance.tasksCompleted}</p>
                    <p className="text-sm text-muted-foreground">Tasks Done</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex p-3 rounded-full bg-blue-500/10 mb-2">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold">{staff.performance.targetAchieved}%</p>
                    <p className="text-sm text-muted-foreground">Target Achieved</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex p-3 rounded-full bg-purple-500/10 mb-2">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold">{staff.performance.totalReviews}</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Task Completion</CardTitle>
                    <CardDescription>Tasks completed vs target over 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="tasks" fill="#ed9320" radius={[4, 4, 0, 0]} name="Completed" />
                        <Bar
                          dataKey="target"
                          fill="hsl(var(--muted-foreground))"
                          radius={[4, 4, 0, 0]}
                          name="Target"
                          opacity={0.5}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Task Distribution</CardTitle>
                    <CardDescription>Current task status breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={taskDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {taskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      {taskDistribution.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{staff.attendance.present}</p>
                    <p className="text-sm text-muted-foreground">Present</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{staff.attendance.absent}</p>
                    <p className="text-sm text-muted-foreground">Absent</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{staff.attendance.late}</p>
                    <p className="text-sm text-muted-foreground">Late</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{staff.attendance.leaves}</p>
                    <p className="text-sm text-muted-foreground">Leaves</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold">{staff.attendance.totalWorkingDays}</p>
                    <p className="text-sm text-muted-foreground">Working Days</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attendance Trend</CardTitle>
                  <CardDescription>6 month attendance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="present"
                        stroke="#22c55e"
                        strokeWidth={2}
                        name="Present"
                        dot={{ fill: "#22c55e" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="absent"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Absent"
                        dot={{ fill: "#ef4444" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="late"
                        stroke="#eab308"
                        strokeWidth={2}
                        name="Late"
                        dot={{ fill: "#eab308" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Attendance Records</CardTitle>
                  <CardDescription>Last 7 days attendance log</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Hours Worked</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAttendance.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{record.date}</TableCell>
                          <TableCell>{record.checkIn}</TableCell>
                          <TableCell>{record.checkOut}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                record.status === "Present"
                                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                                  : record.status === "Late"
                                    ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                    : "bg-red-500/10 text-red-600 border-red-500/20"
                              }
                            >
                              {record.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.hours}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Actions Tab */}
            <TabsContent value="actions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <UserCog className="w-5 h-5 text-primary" />
                      Staff Actions
                    </CardTitle>
                    <CardDescription>Manage staff account and permissions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <Edit className="w-4 h-4" />
                      Edit Staff Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <Shield className="w-4 h-4" />
                      Change Role/Permissions
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <Building className="w-4 h-4" />
                      Transfer Branch
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <Clock className="w-4 h-4" />
                      Change Shift
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <DollarSign className="w-4 h-4" />
                      Update Salary
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                      <Ban className="w-5 h-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>Irreversible and destructive actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 border-yellow-500/50 text-yellow-600 hover:bg-yellow-500/10 bg-transparent"
                        >
                          <Ban className="w-4 h-4" />
                          Deactivate Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Deactivate Staff Account?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will temporarily disable the staff member's access to all systems. They can be
                            reactivated later.
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
                          className="w-full justify-start gap-2 border-destructive/50 text-destructive hover:bg-destructive/10 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Staff Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Staff Account?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the staff member's account and
                            remove all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                            Delete
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
