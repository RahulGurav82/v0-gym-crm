"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Calendar, Clock, MapPin, Users, User, CheckCircle2, Edit, Trash2, Mail, Phone } from "lucide-react"

// Mock data
const getClassById = (id: string) => ({
  id,
  className: "Yoga Morning Session",
  classType: "Yoga",
  instructor: {
    id: "T001",
    name: "Sarah Johnson",
    email: "sarah.j@gym.com",
    phone: "+1 234-567-8900",
    specialization: "Yoga & Meditation",
  },
  date: "2024-01-15",
  startTime: "09:00 AM",
  endTime: "10:00 AM",
  duration: "60 mins",
  maxParticipants: 20,
  currentParticipants: 12,
  branch: "Downtown",
  location: "Studio A",
  status: "upcoming",
  description: "Start your day with energizing yoga poses and breathing exercises.",
  participants: [
    {
      id: "M001",
      name: "John Doe",
      email: "john@email.com",
      phone: "+1 234-567-8901",
      membershipType: "Premium",
      status: "confirmed",
    },
    {
      id: "M002",
      name: "Jane Smith",
      email: "jane@email.com",
      phone: "+1 234-567-8902",
      membershipType: "VIP",
      status: "confirmed",
    },
    {
      id: "M003",
      name: "Mike Wilson",
      email: "mike@email.com",
      phone: "+1 234-567-8903",
      membershipType: "Basic",
      status: "confirmed",
    },
    {
      id: "M004",
      name: "Emily Brown",
      email: "emily@email.com",
      phone: "+1 234-567-8904",
      membershipType: "Premium",
      status: "waitlist",
    },
  ],
})

export function ClassDetails({ classId }: { classId: string }) {
  return (
    <SidebarProvider>
      <ClassDetailsInner classId={classId} />
    </SidebarProvider>
  )
}

function ClassDetailsInner({ classId }: { classId: string }) {
  const router = useRouter()
  const { isCollapsed } = useSidebar()
  const classData = getClassById(classId)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditMode, setIsEditMode] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Edit form state
  const [editForm, setEditForm] = useState({
    className: classData.className,
    classType: classData.classType,
    instructor: classData.instructor.name,
    date: classData.date,
    startTime: classData.startTime,
    endTime: classData.endTime,
    maxParticipants: classData.maxParticipants.toString(),
    branch: classData.branch,
    location: classData.location,
    description: classData.description,
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Upcoming</Badge>
      case "ongoing":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Ongoing</Badge>
      case "past":
        return <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSaveEdit = () => {
    // Save logic here
    setIsEditMode(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar role="admin" currentPath="/admin/classes" />
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isCollapsed ? "pl-16" : "pl-64"}`}>
        <div className="container mx-auto p-6 max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/admin/classes")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{classData.className}</h1>
                <p className="text-muted-foreground">Class ID: {classData.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(classData.status)}
              <Button onClick={() => setIsEditMode(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Class
              </Button>
              <Button variant="destructive" onClick={() => setShowCancelDialog(true)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Cancel Class
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="text-xl font-bold">
                    {classData.currentParticipants}/{classData.maxParticipants}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-xl font-bold">{classData.date}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-xl font-bold">{classData.duration}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-xl font-bold">{classData.location}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <User className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="text-lg font-bold truncate">{classData.instructor.name}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="participants">Participants ({classData.currentParticipants})</TabsTrigger>
              <TabsTrigger value="edit">Edit Details</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Class Type</span>
                      <span className="font-medium">{classData.classType}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{classData.date}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">
                        {classData.startTime} - {classData.endTime}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{classData.duration}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Branch</span>
                      <span className="font-medium">{classData.branch}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{classData.location}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Instructor Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {classData.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{classData.instructor.name}</p>
                        <p className="text-sm text-muted-foreground">{classData.instructor.specialization}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{classData.instructor.email}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{classData.instructor.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Class Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{classData.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Capacity Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Maximum Capacity</span>
                    <span className="font-medium">{classData.maxParticipants} participants</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Current Enrolled</span>
                    <span className="font-medium">{classData.currentParticipants} participants</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Available Slots</span>
                    <span className="font-medium text-green-600">
                      {classData.maxParticipants - classData.currentParticipants} slots
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Capacity</span>
                      <span>{Math.round((classData.currentParticipants / classData.maxParticipants) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${(classData.currentParticipants / classData.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Participants</CardTitle>
                  <CardDescription>
                    {classData.currentParticipants} out of {classData.maxParticipants} slots filled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classData.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {participant.email}
                              </span>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {participant.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{participant.membershipType}</Badge>
                          {participant.status === "confirmed" ? (
                            <Badge className="bg-green-500/10 text-green-600 gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Confirmed
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/10 text-yellow-600 gap-1">
                              <Clock className="w-3 h-3" /> Waitlist
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Edit Tab */}
            <TabsContent value="edit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Class Details</CardTitle>
                  <CardDescription>Update class information and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Class Name</Label>
                      <Input
                        value={editForm.className}
                        onChange={(e) => setEditForm({ ...editForm, className: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Class Type</Label>
                      <Select
                        value={editForm.classType}
                        onValueChange={(value) => setEditForm({ ...editForm, classType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yoga">Yoga</SelectItem>
                          <SelectItem value="Zumba">Zumba</SelectItem>
                          <SelectItem value="CrossFit">CrossFit</SelectItem>
                          <SelectItem value="MMA Training">MMA Training</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Participants</Label>
                      <Input
                        type="number"
                        value={editForm.maxParticipants}
                        onChange={(e) => setEditForm({ ...editForm, maxParticipants: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={editForm.startTime}
                        onChange={(e) => setEditForm({ ...editForm, startTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={editForm.endTime}
                        onChange={(e) => setEditForm({ ...editForm, endTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Branch</Label>
                      <Select
                        value={editForm.branch}
                        onValueChange={(value) => setEditForm({ ...editForm, branch: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Downtown">Downtown</SelectItem>
                          <SelectItem value="Westside">Westside</SelectItem>
                          <SelectItem value="Eastside">Eastside</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setActiveTab("overview")}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Cancel Class Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Class</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this class? All participants will be notified.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              No, Keep Class
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Cancel logic
                setShowCancelDialog(false)
                router.push("/admin/classes")
              }}
            >
              Yes, Cancel Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
