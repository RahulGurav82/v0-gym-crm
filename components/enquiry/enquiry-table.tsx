"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  UserPlus,
  Megaphone,
  CalendarPlus,
  History,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PhoneCall,
  MessageSquare,
  Video,
  MapPin,
  Bell,
  Plus,
  Trash,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  source: "walk-in" | "website" | "facebook" | "instagram" | "google" | "referral" | "phone"
  type: "membership" | "personal-training" | "group-class" | "corporate" | "student"
  status: "new" | "follow-up" | "won" | "lost"
  assignee: string
  assigneeId: string
  branch: string
  createdAt: string
  lastFollowUp: string
  notes: string
}

interface Activity {
  id: string
  type: "call" | "email" | "whatsapp" | "visit" | "demo" | "note" | "status_change"
  title: string
  description: string
  date: string
  time: string
  outcome?: "positive" | "negative" | "neutral" | "pending"
  user: string
}

const enquiries: Enquiry[] = [
  {
    id: "ENQ001",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    source: "walk-in",
    type: "membership",
    status: "new",
    assignee: "John Smith",
    assigneeId: "S001",
    branch: "Downtown",
    createdAt: "2024-01-15",
    lastFollowUp: "-",
    notes: "Interested in monthly membership",
  },
  {
    id: "ENQ002",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 87654 32109",
    source: "website",
    type: "personal-training",
    status: "follow-up",
    assignee: "Sarah Wilson",
    assigneeId: "S002",
    branch: "Westside",
    createdAt: "2024-01-14",
    lastFollowUp: "2024-01-16",
    notes: "Wants personal training for weight loss",
  },
  {
    id: "ENQ003",
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 76543 21098",
    source: "facebook",
    type: "group-class",
    status: "won",
    assignee: "Mike Johnson",
    assigneeId: "S003",
    branch: "Eastside",
    createdAt: "2024-01-12",
    lastFollowUp: "2024-01-15",
    notes: "Converted to premium membership",
  },
  {
    id: "ENQ004",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 65432 10987",
    source: "instagram",
    type: "membership",
    status: "lost",
    assignee: "Emily Brown",
    assigneeId: "S004",
    branch: "North Branch",
    createdAt: "2024-01-10",
    lastFollowUp: "2024-01-14",
    notes: "Found another gym closer to home",
  },
  {
    id: "ENQ005",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 54321 09876",
    source: "google",
    type: "corporate",
    status: "follow-up",
    assignee: "John Smith",
    assigneeId: "S001",
    branch: "Downtown",
    createdAt: "2024-01-13",
    lastFollowUp: "2024-01-16",
    notes: "Corporate inquiry for 50+ employees",
  },
  {
    id: "ENQ006",
    name: "Meera Nair",
    email: "meera.nair@email.com",
    phone: "+91 43210 98765",
    source: "referral",
    type: "student",
    status: "new",
    assignee: "Sarah Wilson",
    assigneeId: "S002",
    branch: "Westside",
    createdAt: "2024-01-16",
    lastFollowUp: "-",
    notes: "Referred by existing member",
  },
  {
    id: "ENQ007",
    name: "Arjun Menon",
    email: "arjun.menon@email.com",
    phone: "+91 32109 87654",
    source: "phone",
    type: "personal-training",
    status: "follow-up",
    assignee: "Mike Johnson",
    assigneeId: "S003",
    branch: "Eastside",
    createdAt: "2024-01-11",
    lastFollowUp: "2024-01-15",
    notes: "Wants to build muscle mass",
  },
  {
    id: "ENQ008",
    name: "Kavitha Iyer",
    email: "kavitha.iyer@email.com",
    phone: "+91 21098 76543",
    source: "walk-in",
    type: "group-class",
    status: "won",
    assignee: "Emily Brown",
    assigneeId: "S004",
    branch: "North Branch",
    createdAt: "2024-01-09",
    lastFollowUp: "2024-01-13",
    notes: "Joined Zumba classes",
  },
  {
    id: "ENQ009",
    name: "Rajesh Gupta",
    email: "rajesh.gupta@email.com",
    phone: "+91 10987 65432",
    source: "website",
    type: "membership",
    status: "new",
    assignee: "John Smith",
    assigneeId: "S001",
    branch: "Downtown",
    createdAt: "2024-01-16",
    lastFollowUp: "-",
    notes: "Looking for annual membership discounts",
  },
  {
    id: "ENQ010",
    name: "Ananya Das",
    email: "ananya.das@email.com",
    phone: "+91 09876 54321",
    source: "facebook",
    type: "personal-training",
    status: "lost",
    assignee: "Sarah Wilson",
    assigneeId: "S002",
    branch: "Westside",
    createdAt: "2024-01-08",
    lastFollowUp: "2024-01-12",
    notes: "Budget constraints",
  },
  {
    id: "ENQ011",
    name: "Suresh Babu",
    email: "suresh.babu@email.com",
    phone: "+91 98765 12345",
    source: "instagram",
    type: "corporate",
    status: "follow-up",
    assignee: "Mike Johnson",
    assigneeId: "S003",
    branch: "Eastside",
    createdAt: "2024-01-14",
    lastFollowUp: "2024-01-16",
    notes: "Corporate wellness program inquiry",
  },
  {
    id: "ENQ012",
    name: "Lakshmi Venkat",
    email: "lakshmi.v@email.com",
    phone: "+91 87654 23456",
    source: "referral",
    type: "student",
    status: "won",
    assignee: "Emily Brown",
    assigneeId: "S004",
    branch: "North Branch",
    createdAt: "2024-01-07",
    lastFollowUp: "2024-01-11",
    notes: "Student discount applied",
  },
]

// Mock activity data for enquiries
const getEnquiryActivities = (enquiryId: string): Activity[] => {
  const activities: Activity[] = [
    {
      id: "ACT001",
      type: "note",
      title: "Enquiry Created",
      description: "New enquiry registered in the system",
      date: "2024-01-15",
      time: "10:30 AM",
      outcome: "neutral",
      user: "System",
    },
    {
      id: "ACT002",
      type: "call",
      title: "Initial Call",
      description: "Called to discuss membership options and pricing",
      date: "2024-01-15",
      time: "02:15 PM",
      outcome: "positive",
      user: "John Smith",
    },
    {
      id: "ACT003",
      type: "whatsapp",
      title: "Sent Brochure",
      description: "Shared gym brochure and pricing details via WhatsApp",
      date: "2024-01-16",
      time: "11:00 AM",
      outcome: "neutral",
      user: "John Smith",
    },
    {
      id: "ACT004",
      type: "visit",
      title: "Gym Tour Scheduled",
      description: "Customer visited for facility tour, showed interest in premium membership",
      date: "2024-01-17",
      time: "04:00 PM",
      outcome: "positive",
      user: "Sarah Wilson",
    },
    {
      id: "ACT005",
      type: "email",
      title: "Follow-up Email",
      description: "Sent follow-up email with special offer details",
      date: "2024-01-18",
      time: "09:30 AM",
      outcome: "neutral",
      user: "John Smith",
    },
    {
      id: "ACT006",
      type: "status_change",
      title: "Status Updated",
      description: "Status changed from New to Follow-up",
      date: "2024-01-18",
      time: "10:00 AM",
      outcome: "neutral",
      user: "System",
    },
  ]
  return activities
}

const getStatusBadge = (status: Enquiry["status"]) => {
  const styles = {
    new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "follow-up": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    won: "bg-green-500/10 text-green-500 border-green-500/20",
    lost: "bg-red-500/10 text-red-500 border-red-500/20",
  }
  const labels = {
    new: "New",
    "follow-up": "Follow Up",
    won: "Won",
    lost: "Lost",
  }
  return <Badge className={`${styles[status]} border`}>{labels[status]}</Badge>
}

const getSourceIcon = (source: Enquiry["source"]) => {
  const icons = {
    "walk-in": UserPlus,
    website: Globe,
    facebook: Facebook,
    instagram: Instagram,
    google: Megaphone,
    referral: UserPlus,
    phone: Phone,
  }
  return icons[source]
}

const getSourceBadge = (source: Enquiry["source"]) => {
  const styles = {
    "walk-in": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    website: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    facebook: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    instagram: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    google: "bg-green-500/10 text-green-500 border-green-500/20",
    referral: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    phone: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  }
  const labels = {
    "walk-in": "Walk-in",
    website: "Website",
    facebook: "Facebook",
    instagram: "Instagram",
    google: "Google Ads",
    referral: "Referral",
    phone: "Phone",
  }
  const Icon = getSourceIcon(source)
  return (
    <Badge className={`${styles[source]} border gap-1`}>
      <Icon className="h-3 w-3" />
      {labels[source]}
    </Badge>
  )
}

const getTypeBadge = (type: Enquiry["type"]) => {
  const styles = {
    membership: "bg-primary/10 text-primary border-primary/20",
    "personal-training": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "group-class": "bg-violet-500/10 text-violet-500 border-violet-500/20",
    corporate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    student: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  }
  const labels = {
    membership: "Membership",
    "personal-training": "Personal Training",
    "group-class": "Group Class",
    corporate: "Corporate",
    student: "Student",
  }
  return <Badge className={`${styles[type]} border`}>{labels[type]}</Badge>
}

const getActivityIcon = (type: Activity["type"]) => {
  const icons = {
    call: PhoneCall,
    email: Mail,
    whatsapp: MessageSquare,
    visit: MapPin,
    demo: Video,
    note: AlertCircle,
    status_change: History,
  }
  return icons[type]
}

const getActivityIconColor = (type: Activity["type"]) => {
  const colors = {
    call: "text-blue-500 bg-blue-500/10",
    email: "text-purple-500 bg-purple-500/10",
    whatsapp: "text-green-500 bg-green-500/10",
    visit: "text-orange-500 bg-orange-500/10",
    demo: "text-pink-500 bg-pink-500/10",
    note: "text-gray-500 bg-gray-500/10",
    status_change: "text-cyan-500 bg-cyan-500/10",
  }
  return colors[type]
}

const getOutcomeIcon = (outcome?: Activity["outcome"]) => {
  switch (outcome) {
    case "positive":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "negative":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />
  }
}

interface EnquiryTableProps {
  searchQuery: string
  statusFilter: string
  sourceFilter: string
  typeFilter: string
  assigneeFilter: string
  branchFilter: string
}

export function EnquiryTable({
  searchQuery,
  statusFilter,
  sourceFilter,
  typeFilter,
  assigneeFilter,
  branchFilter,
}: EnquiryTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false)
  const [activityDrawerOpen, setActivityDrawerOpen] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)

  // Follow-up form state
  const [followUpData, setFollowUpData] = useState({
    date: "",
    time: "",
    type: "",
    notes: "",
    outcome: "pending",
    reminderEnabled: true,
  })

  const [followUpHistory, setFollowUpHistory] = useState<
    { date: string; time: string; type: string; notes: string; outcome: string }[]
  >([])

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      searchQuery === "" ||
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.phone.includes(searchQuery) ||
      enquiry.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter
    const matchesSource = sourceFilter === "all" || enquiry.source === sourceFilter
    const matchesType = typeFilter === "all" || enquiry.type === typeFilter
    const matchesAssignee =
      assigneeFilter === "all" || enquiry.assignee.toLowerCase().includes(assigneeFilter.toLowerCase())
    const matchesBranch = branchFilter === "all" || enquiry.branch.toLowerCase() === branchFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesSource && matchesType && matchesAssignee && matchesBranch
  })

  const totalPages = Math.ceil(filteredEnquiries.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedEnquiries = filteredEnquiries.slice(startIndex, startIndex + rowsPerPage)

  const handleAddFollowUp = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setFollowUpData({
      date: "",
      time: "",
      type: "",
      notes: "",
      outcome: "pending",
      reminderEnabled: true,
    })
    setFollowUpHistory([])
    setFollowUpDialogOpen(true)
  }

  const handleViewActivity = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setActivityDrawerOpen(true)
  }

  const addFollowUpToHistory = () => {
    if (followUpData.date && followUpData.type) {
      setFollowUpHistory((prev) => [...prev, { ...followUpData }])
      setFollowUpData({
        date: "",
        time: "",
        type: "",
        notes: "",
        outcome: "pending",
        reminderEnabled: true,
      })
    }
  }

  const removeFollowUp = (index: number) => {
    setFollowUpHistory((prev) => prev.filter((_, i) => i !== index))
  }

  const saveFollowUp = () => {
    // In real app, save to backend
    setFollowUpDialogOpen(false)
    setSelectedEnquiry(null)
  }

  const followUpTypes = [
    { value: "call", label: "Phone Call", icon: PhoneCall },
    { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { value: "email", label: "Email", icon: Mail },
    { value: "visit", label: "Branch Visit", icon: MapPin },
    { value: "demo", label: "Demo/Trial", icon: Video },
  ]

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">All Enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold">Enquiry</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Source</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Assignee</TableHead>
                  <TableHead className="font-semibold">Branch</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {enquiry.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{enquiry.name}</p>
                          <p className="text-xs text-muted-foreground">{enquiry.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          {enquiry.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          {enquiry.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getSourceBadge(enquiry.source)}</TableCell>
                    <TableCell>{getTypeBadge(enquiry.type)}</TableCell>
                    <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-muted text-xs">
                            {enquiry.assignee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{enquiry.assignee}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{enquiry.branch}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{enquiry.createdAt}</p>
                        {enquiry.lastFollowUp !== "-" && (
                          <p className="text-xs text-muted-foreground">Follow up: {enquiry.lastFollowUp}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/enquiry/${enquiry.id}`} className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Enquiry
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={() => handleAddFollowUp(enquiry)}
                          >
                            <CalendarPlus className="h-4 w-4" />
                            Add Follow Up
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={() => handleViewActivity(enquiry)}
                          >
                            <History className="h-4 w-4" />
                            View Activity
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Delete Enquiry
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page:</span>
              <Select value={rowsPerPage.toString()} onValueChange={(val) => setRowsPerPage(Number(val))}>
                <SelectTrigger className="w-16 h-8 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="ml-4">
                Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredEnquiries.length)} of{" "}
                {filteredEnquiries.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      className={`h-8 w-8 ${currentPage === pageNum ? "bg-primary hover:bg-primary/90" : ""}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={followUpDialogOpen} onOpenChange={setFollowUpDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5 text-primary" />
              Add Follow Up
            </DialogTitle>
            <DialogDescription>Schedule a follow-up for {selectedEnquiry?.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Schedule Next Follow-up */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Schedule Follow-up
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={followUpData.date}
                    onChange={(e) => setFollowUpData((prev) => ({ ...prev, date: e.target.value }))}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={followUpData.time}
                    onChange={(e) => setFollowUpData((prev) => ({ ...prev, time: e.target.value }))}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Follow-up Type</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {followUpTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <div
                        key={type.value}
                        onClick={() => setFollowUpData((prev) => ({ ...prev, type: type.value }))}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all",
                          followUpData.type === type.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50",
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5 mb-1",
                            followUpData.type === type.value ? "text-primary" : "text-muted-foreground",
                          )}
                        />
                        <span className="text-xs font-medium text-center">{type.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Expected Outcome</Label>
                <Select
                  value={followUpData.outcome}
                  onValueChange={(value) => setFollowUpData((prev) => ({ ...prev, outcome: value }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Add notes for this follow-up..."
                  value={followUpData.notes}
                  onChange={(e) => setFollowUpData((prev) => ({ ...prev, notes: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reminder"
                  checked={followUpData.reminderEnabled}
                  onCheckedChange={(checked) =>
                    setFollowUpData((prev) => ({ ...prev, reminderEnabled: checked === true }))
                  }
                />
                <Label htmlFor="reminder" className="flex items-center gap-2 cursor-pointer">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  Enable reminder notification
                </Label>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addFollowUpToHistory}
                disabled={!followUpData.date || !followUpData.type}
                className="w-full bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Follow-up List
              </Button>
            </div>

            {/* Follow-up History */}
            {followUpHistory.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Scheduled Follow-ups</h4>
                <div className="space-y-2">
                  {followUpHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {(() => {
                            const TypeIcon = followUpTypes.find((t) => t.value === item.type)?.icon || Clock
                            return <TypeIcon className="h-5 w-5 text-primary" />
                          })()}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {followUpTypes.find((t) => t.value === item.type)?.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.date} at {item.time}
                          </p>
                          {item.notes && <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFollowUp(index)}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setFollowUpDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={saveFollowUp} className="flex-1 bg-primary hover:bg-primary/90">
                Save Follow Up
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={activityDrawerOpen} onOpenChange={setActivityDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Activity Timeline
            </SheetTitle>
            <SheetDescription>All activities for {selectedEnquiry?.name}</SheetDescription>
          </SheetHeader>

          <div className="mt-6">
            {/* Enquiry Summary */}
            {selectedEnquiry && (
              <div className="p-4 rounded-lg border border-border bg-muted/30 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedEnquiry.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedEnquiry.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedEnquiry.id}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(selectedEnquiry.status)}
                  {getSourceBadge(selectedEnquiry.source)}
                  {getTypeBadge(selectedEnquiry.type)}
                </div>
              </div>
            )}

            {/* Activity Timeline */}
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-4">
                {selectedEnquiry &&
                  getEnquiryActivities(selectedEnquiry.id).map((activity, index) => {
                    const ActivityIcon = getActivityIcon(activity.type)
                    const iconColor = getActivityIconColor(activity.type)

                    return (
                      <div key={activity.id} className="relative flex gap-4">
                        <div
                          className={cn(
                            "relative z-10 flex items-center justify-center w-10 h-10 rounded-full",
                            iconColor,
                          )}
                        >
                          <ActivityIcon className="h-5 w-5" />
                        </div>

                        <div className="flex-1 pb-4">
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-medium text-sm">{activity.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {activity.date} at {activity.time}
                                </p>
                              </div>
                              {activity.outcome && getOutcomeIcon(activity.outcome)}
                            </div>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-[10px]">
                                  {activity.user
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>by {activity.user}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-auto py-3 bg-transparent"
                  onClick={() => {
                    setActivityDrawerOpen(false)
                    if (selectedEnquiry) handleAddFollowUp(selectedEnquiry)
                  }}
                >
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Add Follow Up
                </Button>
                <Button variant="outline" className="h-auto py-3 bg-transparent">
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Log Call
                </Button>
                <Button variant="outline" className="h-auto py-3 bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="h-auto py-3 bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
