"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  Edit,
  Download,
  User,
  Globe,
  Facebook,
  Instagram,
  PhoneCall,
  Users,
  MessageSquare,
  Target,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  CreditCard,
  History,
  FileText,
  UserPlus,
  Trash2,
  RefreshCw,
  BadgeCheck,
  IndianRupee,
  CalendarClock,
  Briefcase,
  GraduationCap,
  Dumbbell,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock enquiry data
const getEnquiryById = (id: string) => ({
  id,
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  gender: "Male",
  age: 28,
  address: "123 MG Road, Andheri West, Mumbai 400053",
  source: "instagram" as const,
  type: "membership" as const,
  status: "follow-up" as const,
  priority: "high" as const,
  assignee: "Priya Patel",
  assigneeId: "S002",
  branch: "Andheri",
  createdAt: "2024-12-01",
  lastFollowUp: "2024-12-08",
  budget: "5000-10000",
  interestedPlan: "Premium",
  preferredTime: "Morning (6AM - 10AM)",
  notes: "Interested in weight training and cardio. Looking for personal training sessions.",
  tags: ["Fitness Enthusiast", "Weight Loss", "Personal Training"],
  nextFollowUp: {
    date: "2024-12-12",
    time: "10:00 AM",
    type: "call",
  },
  followUps: [
    {
      id: "F001",
      date: "2024-12-08",
      time: "11:30 AM",
      type: "call",
      outcome: "positive",
      notes: "Very interested, asked about personal training packages. Will visit gym tomorrow.",
      user: "Priya Patel",
    },
    {
      id: "F002",
      date: "2024-12-05",
      time: "3:00 PM",
      type: "whatsapp",
      outcome: "neutral",
      notes: "Sent pricing details and gym photos. Awaiting response.",
      user: "Priya Patel",
    },
    {
      id: "F003",
      date: "2024-12-01",
      time: "10:00 AM",
      type: "call",
      outcome: "positive",
      notes: "Initial inquiry. Looking for gym near workplace. Budget conscious.",
      user: "Amit Kumar",
    },
  ],
  activities: [
    {
      id: "A001",
      type: "call",
      title: "Follow-up Call",
      description: "Discussed personal training packages and pricing",
      date: "2024-12-08",
      time: "11:30 AM",
      outcome: "positive",
      user: "Priya Patel",
    },
    {
      id: "A002",
      type: "status_change",
      title: "Status Updated",
      description: "Changed from New to Follow Up",
      date: "2024-12-05",
      time: "3:15 PM",
      outcome: "neutral",
      user: "Priya Patel",
    },
    {
      id: "A003",
      type: "whatsapp",
      title: "WhatsApp Message",
      description: "Sent pricing brochure and gym facility photos",
      date: "2024-12-05",
      time: "3:00 PM",
      outcome: "neutral",
      user: "Priya Patel",
    },
    {
      id: "A004",
      type: "note",
      title: "Note Added",
      description: "Customer prefers morning slots, interested in weight training",
      date: "2024-12-03",
      time: "2:00 PM",
      outcome: "neutral",
      user: "Amit Kumar",
    },
    {
      id: "A005",
      type: "visit",
      title: "Walk-in Visit",
      description: "Customer visited for gym tour",
      date: "2024-12-02",
      time: "5:30 PM",
      outcome: "positive",
      user: "Amit Kumar",
    },
    {
      id: "A006",
      type: "call",
      title: "Initial Call",
      description: "First inquiry call - interested in gym membership",
      date: "2024-12-01",
      time: "10:00 AM",
      outcome: "positive",
      user: "Amit Kumar",
    },
  ],
})

export function EnquiryDetails({ enquiryId }: { enquiryId: string }) {
  return (
    <SidebarProvider>
      <EnquiryDetailsInner enquiryId={enquiryId} />
    </SidebarProvider>
  )
}

function EnquiryDetailsInner({ enquiryId }: { enquiryId: string }) {
  const router = useRouter()
  const { isCollapsed } = useSidebar()
  const enquiry = getEnquiryById(enquiryId)
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddFollowUp, setShowAddFollowUp] = useState(false)
  const [showAddSubscription, setShowAddSubscription] = useState(false)
  const [showMarkWon, setShowMarkWon] = useState(false)
  const [showMarkLost, setShowMarkLost] = useState(false)
  const [followUpData, setFollowUpData] = useState({
    date: "",
    time: "",
    type: "call",
    notes: "",
    reminder: true,
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">New</Badge>
      case "follow-up":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Follow Up</Badge>
      case "won":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Won</Badge>
      case "lost":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Lost</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">High Priority</Badge>
      case "medium":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Medium Priority</Badge>
      case "low":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Low Priority</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "walk-in":
        return <User className="w-4 h-4" />
      case "website":
        return <Globe className="w-4 h-4" />
      case "facebook":
        return <Facebook className="w-4 h-4" />
      case "instagram":
        return <Instagram className="w-4 h-4" />
      case "google":
        return <Globe className="w-4 h-4" />
      case "referral":
        return <Users className="w-4 h-4" />
      case "phone":
        return <PhoneCall className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "membership":
        return <CreditCard className="w-4 h-4" />
      case "personal-training":
        return <Dumbbell className="w-4 h-4" />
      case "group-class":
        return <Users className="w-4 h-4" />
      case "corporate":
        return <Briefcase className="w-4 h-4" />
      case "student":
        return <GraduationCap className="w-4 h-4" />
      default:
        return <CreditCard className="w-4 h-4" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call":
        return <PhoneCall className="w-4 h-4" />
      case "email":
        return <Mail className="w-4 h-4" />
      case "whatsapp":
        return <MessageSquare className="w-4 h-4" />
      case "visit":
        return <User className="w-4 h-4" />
      case "demo":
        return <Dumbbell className="w-4 h-4" />
      case "note":
        return <FileText className="w-4 h-4" />
      case "status_change":
        return <RefreshCw className="w-4 h-4" />
      default:
        return <History className="w-4 h-4" />
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "positive":
        return "text-green-600 bg-green-500/10"
      case "negative":
        return "text-red-600 bg-red-500/10"
      case "neutral":
        return "text-gray-600 bg-gray-500/10"
      default:
        return "text-yellow-600 bg-yellow-500/10"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <main className={`transition-all duration-300 ${isCollapsed ? "pl-16" : "pl-64"}`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push("/admin/enquiry")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Enquiry Details</h1>
              <p className="text-sm text-muted-foreground">View and manage enquiry information</p>
            </div>
          </div>

          {/* Enquiry Profile Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <Avatar className="h-28 w-28 border-4 border-primary/20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {enquiry.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-wrap gap-2">
                    {getStatusBadge(enquiry.status)}
                    {getPriorityBadge(enquiry.priority)}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{enquiry.name}</h2>
                    <p className="text-muted-foreground">Enquiry ID: {enquiry.id}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{enquiry.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{enquiry.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{enquiry.branch} Branch</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {getSourceIcon(enquiry.source)}
                      <span className="capitalize">{enquiry.source}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {getTypeIcon(enquiry.type)}
                      <span className="capitalize">{enquiry.type.replace("-", " ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Created: {enquiry.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {enquiry.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setShowAddSubscription(true)}>
                    <CreditCard className="w-4 h-4" />
                    Add Subscription
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowAddFollowUp(true)}>
                    <Plus className="w-4 h-4" />
                    Add Follow Up
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Edit className="w-4 h-4" />
                    Edit Enquiry
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
              <TabsTrigger value="followups">Follow Ups</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interested Plan</p>
                      <p className="text-xl font-bold">{enquiry.interestedPlan}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-500/10">
                      <IndianRupee className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Budget Range</p>
                      <p className="text-xl font-bold">{enquiry.budget}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <History className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Follow Ups</p>
                      <p className="text-xl font-bold">{enquiry.followUps.length}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <CalendarClock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Days Since Created</p>
                      <p className="text-xl font-bold">8</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Next Follow Up */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CalendarClock className="w-5 h-5 text-primary" />
                      Next Follow Up Scheduled
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <PhoneCall className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium capitalize">{enquiry.nextFollowUp.type} Scheduled</p>
                          <p className="text-sm text-muted-foreground">
                            {enquiry.nextFollowUp.date} at {enquiry.nextFollowUp.time}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Start Call
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Assigned To</span>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">PP</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{enquiry.assignee}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Last Follow Up</span>
                      <span className="font-medium">{enquiry.lastFollowUp}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Enquiry Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Enquiry Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Source</span>
                      <div className="flex items-center gap-2">
                        {getSourceIcon(enquiry.source)}
                        <span className="font-medium capitalize">{enquiry.source}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Enquiry Type</span>
                      <span className="font-medium capitalize">{enquiry.type.replace("-", " ")}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Preferred Time</span>
                      <span className="font-medium">{enquiry.preferredTime}</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      <span className="text-muted-foreground">Notes</span>
                      <p className="text-sm bg-muted/50 p-3 rounded-lg">{enquiry.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enquiry.activities.slice(0, 3).map((activity, index) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${getOutcomeColor(activity.outcome || "neutral")}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{activity.title}</p>
                            <span className="text-xs text-muted-foreground">
                              {activity.date} at {activity.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">By {activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                        <p className="font-medium">{enquiry.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-medium">{enquiry.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Age</p>
                        <p className="font-medium">{enquiry.age} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Enquiry ID</p>
                        <p className="font-medium">{enquiry.id}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-medium">{enquiry.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                          <PhoneCall className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Email Address</p>
                        <p className="font-medium">{enquiry.email}</p>
                      </div>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{enquiry.address}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Interest Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Interested Plan</span>
                      <Badge className="bg-primary/10 text-primary">{enquiry.interestedPlan}</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Enquiry Type</span>
                      <span className="font-medium capitalize">{enquiry.type.replace("-", " ")}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Budget Range</span>
                      <span className="font-medium">Rs. {enquiry.budget}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Preferred Time</span>
                      <span className="font-medium">{enquiry.preferredTime}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Assignment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Assigned To</span>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">PP</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{enquiry.assignee}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Branch</span>
                      <span className="font-medium">{enquiry.branch}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Source</span>
                      <div className="flex items-center gap-2">
                        {getSourceIcon(enquiry.source)}
                        <span className="font-medium capitalize">{enquiry.source}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Created Date</span>
                      <span className="font-medium">{enquiry.createdAt}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Follow Ups Tab */}
            <TabsContent value="followups" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Follow Up History</h3>
                  <p className="text-sm text-muted-foreground">Track all follow-up interactions</p>
                </div>
                <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setShowAddFollowUp(true)}>
                  <Plus className="w-4 h-4" />
                  Add Follow Up
                </Button>
              </div>

              {/* Next Scheduled */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <CalendarClock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Next Follow Up Scheduled</p>
                        <p className="text-sm text-muted-foreground">
                          {enquiry.nextFollowUp.date} at {enquiry.nextFollowUp.time} - {enquiry.nextFollowUp.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Complete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Follow Up List */}
              <div className="space-y-4">
                {enquiry.followUps.map((followUp, index) => (
                  <Card key={followUp.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-full ${
                            followUp.outcome === "positive"
                              ? "bg-green-500/10 text-green-600"
                              : followUp.outcome === "negative"
                                ? "bg-red-500/10 text-red-600"
                                : "bg-gray-500/10 text-gray-600"
                          }`}
                        >
                          {followUp.type === "call" ? (
                            <PhoneCall className="w-5 h-5" />
                          ) : followUp.type === "email" ? (
                            <Mail className="w-5 h-5" />
                          ) : followUp.type === "whatsapp" ? (
                            <MessageSquare className="w-5 h-5" />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold capitalize">{followUp.type} Follow Up</span>
                              <Badge
                                variant="outline"
                                className={
                                  followUp.outcome === "positive"
                                    ? "text-green-600 border-green-500/20"
                                    : followUp.outcome === "negative"
                                      ? "text-red-600 border-red-500/20"
                                      : "text-gray-600 border-gray-500/20"
                                }
                              >
                                {followUp.outcome}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {followUp.date} at {followUp.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{followUp.notes}</p>
                          <p className="text-xs text-muted-foreground">By {followUp.user}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Activity Timeline</h3>
                <p className="text-sm text-muted-foreground">Complete history of all interactions and changes</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="relative">
                    {enquiry.activities.map((activity, index) => (
                      <div key={activity.id} className="flex gap-4 pb-8 last:pb-0">
                        {/* Timeline line */}
                        {index < enquiry.activities.length - 1 && (
                          <div className="absolute left-5 top-10 w-0.5 h-[calc(100%-2.5rem)] bg-border" />
                        )}
                        <div
                          className={`relative p-2.5 rounded-full ${getOutcomeColor(activity.outcome || "neutral")}`}
                        >
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{activity.title}</p>
                            <span className="text-xs text-muted-foreground">
                              {activity.date} at {activity.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">By {activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Actions Tab */}
            <TabsContent value="actions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Conversion Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BadgeCheck className="w-5 h-5 text-primary" />
                      Conversion Actions
                    </CardTitle>
                    <CardDescription>Convert this enquiry to a member</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start gap-3 bg-primary hover:bg-primary/90"
                      onClick={() => setShowAddSubscription(true)}
                    >
                      <CreditCard className="w-4 h-4" />
                      Add Subscription
                      <span className="ml-auto text-xs opacity-80">Convert to Member</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 text-green-600 border-green-500/20 hover:bg-green-500/10 bg-transparent"
                      onClick={() => setShowMarkWon(true)}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark as Won
                      <span className="ml-auto text-xs opacity-80">Close Successfully</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 text-red-600 border-red-500/20 hover:bg-red-500/10 bg-transparent"
                      onClick={() => setShowMarkLost(true)}
                    >
                      <XCircle className="w-4 h-4" />
                      Mark as Lost
                      <span className="ml-auto text-xs opacity-80">Close Unsuccessfully</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Follow Up Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CalendarClock className="w-5 h-5 text-primary" />
                      Follow Up Actions
                    </CardTitle>
                    <CardDescription>Schedule and manage follow-ups</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 bg-transparent"
                      onClick={() => setShowAddFollowUp(true)}
                    >
                      <Plus className="w-4 h-4" />
                      Add Follow Up
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <PhoneCall className="w-4 h-4" />
                      Log Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <Mail className="w-4 h-4" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <MessageSquare className="w-4 h-4" />
                      Send WhatsApp
                    </Button>
                  </CardContent>
                </Card>

                {/* Management Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Edit className="w-5 h-5 text-primary" />
                      Management
                    </CardTitle>
                    <CardDescription>Edit and manage enquiry details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <Edit className="w-4 h-4" />
                      Edit Enquiry
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <UserPlus className="w-4 h-4" />
                      Reassign
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                      <Download className="w-4 h-4" />
                      Export Data
                    </Button>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 text-red-600 hover:bg-red-500/10 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Enquiry
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Add Follow Up Dialog */}
      <Dialog open={showAddFollowUp} onOpenChange={setShowAddFollowUp}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Follow Up</DialogTitle>
            <DialogDescription>Schedule a new follow-up for this enquiry</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={followUpData.date}
                  onChange={(e) => setFollowUpData({ ...followUpData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={followUpData.time}
                  onChange={(e) => setFollowUpData({ ...followUpData, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Follow Up Type</Label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: "call", icon: PhoneCall, label: "Call" },
                  { value: "email", icon: Mail, label: "Email" },
                  { value: "whatsapp", icon: MessageSquare, label: "WhatsApp" },
                  { value: "visit", icon: User, label: "Visit" },
                ].map((type) => (
                  <Button
                    key={type.value}
                    type="button"
                    variant={followUpData.type === type.value ? "default" : "outline"}
                    className={`flex flex-col items-center gap-1 h-auto py-3 ${followUpData.type === type.value ? "bg-primary" : ""}`}
                    onClick={() => setFollowUpData({ ...followUpData, type: type.value })}
                  >
                    <type.icon className="w-4 h-4" />
                    <span className="text-xs">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Add notes about this follow-up..."
                value={followUpData.notes}
                onChange={(e) => setFollowUpData({ ...followUpData, notes: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Enable Reminder</p>
                <p className="text-xs text-muted-foreground">Get notified before follow-up</p>
              </div>
              <Switch
                checked={followUpData.reminder}
                onCheckedChange={(checked) => setFollowUpData({ ...followUpData, reminder: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFollowUp(false)}>
              Cancel
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowAddFollowUp(false)}>
              Add Follow Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Subscription Dialog */}
      <Dialog open={showAddSubscription} onOpenChange={setShowAddSubscription}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Subscription</DialogTitle>
            <DialogDescription>Convert this enquiry to a member by adding a subscription</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {enquiry.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{enquiry.name}</p>
                <p className="text-sm text-muted-foreground">
                  {enquiry.phone} | {enquiry.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Membership Plan</Label>
                <Select defaultValue={enquiry.interestedPlan.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic - Rs. 1,500/month</SelectItem>
                    <SelectItem value="premium">Premium - Rs. 2,500/month</SelectItem>
                    <SelectItem value="vip">VIP - Rs. 5,000/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Month</SelectItem>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select defaultValue="cash">
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Assign Trainer (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select trainer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t1">Amit Singh - Strength Training</SelectItem>
                  <SelectItem value="t2">Priya Sharma - Yoga & Flexibility</SelectItem>
                  <SelectItem value="t3">Rahul Kumar - Cardio & HIIT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Plan Amount</span>
                <span className="font-medium">Rs. 7,500</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium text-green-600">- Rs. 500</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-lg text-primary">Rs. 7,000</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSubscription(false)}>
              Cancel
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowAddSubscription(false)}>
              Create Membership
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mark as Won Dialog */}
      <AlertDialog open={showMarkWon} onOpenChange={setShowMarkWon}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Enquiry as Won?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the enquiry as successfully converted. Make sure to add a subscription before marking as
              won.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-green-600 hover:bg-green-700">Mark as Won</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Mark as Lost Dialog */}
      <AlertDialog open={showMarkLost} onOpenChange={setShowMarkLost}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Enquiry as Lost?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the enquiry as lost. You can add a reason for losing this enquiry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label>Reason for Loss</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price too high</SelectItem>
                <SelectItem value="competition">Joined competitor</SelectItem>
                <SelectItem value="location">Location not convenient</SelectItem>
                <SelectItem value="timing">Timing issues</SelectItem>
                <SelectItem value="not-interested">No longer interested</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700">Mark as Lost</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
