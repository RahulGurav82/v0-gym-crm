"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  User,
  Mail,
  Phone,
  Building,
  Edit,
  Camera,
  Shield,
  Key,
  Bell,
  Smartphone,
  Globe,
  Eye,
  EyeOff,
  Save,
  X,
  LogOut,
  Trash2,
  Download,
  AlertTriangle,
  Fingerprint,
  History,
  Monitor,
} from "lucide-react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

// Mock admin data
const adminData = {
  id: "ADM001",
  name: "Rahul Gurav",
  email: "rahul.gurav@fithub.com",
  phone: "+91 98765 43210",
  alternatePhone: "+91 87654 32109",
  avatar: "",
  role: "Admin",
  department: "Management",
  status: "Active",
  branch: "All Branches",
  joinDate: "2021-06-15",
  dateOfBirth: "1988-03-22",
  gender: "Male",
  bloodGroup: "O+",
  address: "123, Business Park, Sector 15, Pune, Maharashtra - 411001",
  bio: "Experienced gym management professional with 10+ years in the fitness industry. Passionate about helping people achieve their health goals.",
  emergencyContact: {
    name: "Priya Gurav",
    relation: "Spouse",
    phone: "+91 76543 21098",
  },
  preferences: {
    language: "English",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    currency: "INR",
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    newEnquiry: true,
    newMember: true,
    paymentReceived: true,
    staffLeave: true,
    systemAlerts: true,
  },
  security: {
    twoFactor: true,
    lastPasswordChange: "2024-01-15",
    activeSessions: 3,
  },
  loginHistory: [
    { device: "Chrome on Windows", location: "Pune, India", time: "Today, 9:30 AM", current: true },
    { device: "Safari on iPhone", location: "Pune, India", time: "Yesterday, 6:45 PM", current: false },
    { device: "Chrome on MacOS", location: "Mumbai, India", time: "Dec 10, 2024", current: false },
  ],
}

function AdminProfilePageInner() {
  const { collapsed } = useSidebar()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [profile, setProfile] = useState(adminData)
  const [notifications, setNotifications] = useState(adminData.notifications)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showLogoutAllDialog, setShowLogoutAllDialog] = useState(false)

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save logic here
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <main className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold">My Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your account settings and preferences</p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Profile Header Card */}
          <Card className="mb-6 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
            <CardContent className="relative pt-0">
              <div className="flex flex-col md:flex-row gap-6 -mt-16">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="flex-1 pt-4 md:pt-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <Badge className="bg-primary/10 text-primary border-0">{profile.role}</Badge>
                        <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                          {profile.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">ID: {profile.id}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-4 w-4" />
                          {profile.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-4 w-4" />
                          {profile.phone}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Building className="h-4 w-4" />
                          {profile.branch}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsEditing(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex mb-6">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label>Full Name</Label>
                          <Input
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Date of Birth</Label>
                          <Input
                            type="date"
                            value={profile.dateOfBirth}
                            onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Gender</Label>
                          <Select
                            value={profile.gender}
                            onValueChange={(value) => setProfile({ ...profile, gender: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Blood Group</Label>
                          <Select
                            value={profile.bloodGroup}
                            onValueChange={(value) => setProfile({ ...profile, bloodGroup: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label>Bio</Label>
                          <Textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            rows={3}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-medium">{profile.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Employee ID</p>
                            <p className="font-medium">{profile.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date of Birth</p>
                            <p className="font-medium">{profile.dateOfBirth}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Gender</p>
                            <p className="font-medium">{profile.gender}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Blood Group</p>
                            <p className="font-medium">{profile.bloodGroup}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Join Date</p>
                            <p className="font-medium">{profile.joinDate}</p>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-sm text-muted-foreground">Bio</p>
                          <p className="font-medium text-sm mt-1">{profile.bio}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label>Email Address</Label>
                          <Input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Primary Phone</Label>
                          <Input
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Alternate Phone</Label>
                          <Input
                            value={profile.alternatePhone}
                            onChange={(e) => setProfile({ ...profile, alternatePhone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Address</Label>
                          <Textarea
                            value={profile.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            rows={2}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Email Address</p>
                          <p className="font-medium">{profile.email}</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-sm text-muted-foreground">Primary Phone</p>
                          <p className="font-medium">{profile.phone}</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-sm text-muted-foreground">Alternate Phone</p>
                          <p className="font-medium">{profile.alternatePhone}</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="font-medium">{profile.address}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label>Contact Name</Label>
                          <Input
                            value={profile.emergencyContact.name}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                emergencyContact: { ...profile.emergencyContact, name: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Relation</Label>
                          <Input
                            value={profile.emergencyContact.relation}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                emergencyContact: { ...profile.emergencyContact, relation: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Phone Number</Label>
                          <Input
                            value={profile.emergencyContact.phone}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                emergencyContact: { ...profile.emergencyContact, phone: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium">{profile.emergencyContact.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Relation</p>
                          <p className="font-medium">{profile.emergencyContact.relation}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{profile.emergencyContact.phone}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Work Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Work Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="font-medium">{profile.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{profile.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Branch Access</p>
                        <p className="font-medium">{profile.branch}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Join Date</p>
                        <p className="font-medium">{profile.joinDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Change Password */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Key className="h-5 w-5 text-primary" />
                      Change Password
                    </CardTitle>
                    <CardDescription>Last changed on {profile.security.lastPasswordChange}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Current Password</Label>
                      <div className="relative">
                        <Input type={showCurrentPassword ? "text" : "password"} placeholder="Enter current password" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>New Password</Label>
                      <div className="relative">
                        <Input type={showNewPassword ? "text" : "password"} placeholder="Enter new password" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Confirm New Password</Label>
                      <div className="relative">
                        <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm new password" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Key className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                {/* Two-Factor Authentication */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Fingerprint className="h-5 w-5 text-primary" />
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-emerald-500/10">
                          <Shield className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-medium">2FA is Enabled</p>
                          <p className="text-sm text-muted-foreground">Using authenticator app</p>
                        </div>
                      </div>
                      <Switch checked={profile.security.twoFactor} />
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                        <Smartphone className="h-4 w-4" />
                        Change Authenticator App
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Download Backup Codes
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Sessions */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Monitor className="h-5 w-5 text-primary" />
                          Active Sessions
                        </CardTitle>
                        <CardDescription>{profile.security.activeSessions} devices currently logged in</CardDescription>
                      </div>
                      <Dialog open={showLogoutAllDialog} onOpenChange={setShowLogoutAllDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="text-destructive hover:text-destructive bg-transparent">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout All Devices
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Logout from all devices?</DialogTitle>
                            <DialogDescription>
                              This will log you out from all devices except the current one. You'll need to log in again
                              on those devices.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowLogoutAllDialog(false)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={() => setShowLogoutAllDialog(false)}>
                              Logout All
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {profile.loginHistory.map((session, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-lg border",
                            session.current && "border-primary bg-primary/5",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-muted">
                              <Monitor className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{session.device}</p>
                                {session.current && (
                                  <Badge className="bg-primary/10 text-primary border-0 text-xs">Current</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {session.location} • {session.time}
                              </p>
                            </div>
                          </div>
                          {!session.current && (
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <LogOut className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Login History */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />
                      Recent Login Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        {
                          action: "Login successful",
                          device: "Chrome on Windows",
                          time: "Today, 9:30 AM",
                          status: "success",
                        },
                        {
                          action: "Password changed",
                          device: "Chrome on Windows",
                          time: "Jan 15, 2024",
                          status: "warning",
                        },
                        {
                          action: "Login successful",
                          device: "Safari on iPhone",
                          time: "Yesterday, 6:45 PM",
                          status: "success",
                        },
                        {
                          action: "Failed login attempt",
                          device: "Unknown device",
                          time: "Dec 12, 2024",
                          status: "error",
                        },
                        { action: "2FA enabled", device: "Chrome on Windows", time: "Dec 10, 2024", status: "info" },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full",
                                activity.status === "success" && "bg-emerald-500",
                                activity.status === "warning" && "bg-amber-500",
                                activity.status === "error" && "bg-red-500",
                                activity.status === "info" && "bg-blue-500",
                              )}
                            />
                            <div>
                              <p className="font-medium text-sm">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">{activity.device}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notification Channels */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Notification Channels
                    </CardTitle>
                    <CardDescription>Choose how you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive push notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive SMS alerts</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notification Preferences</CardTitle>
                    <CardDescription>Select which notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { key: "newEnquiry", label: "New Enquiry", desc: "When a new enquiry is received" },
                      { key: "newMember", label: "New Member", desc: "When a new member joins" },
                      { key: "paymentReceived", label: "Payment Received", desc: "When a payment is received" },
                      { key: "staffLeave", label: "Staff Leave Request", desc: "When staff requests leave" },
                      { key: "systemAlerts", label: "System Alerts", desc: "Important system notifications" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof typeof notifications] as boolean}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Regional Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Regional Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Language</Label>
                      <Select defaultValue={profile.preferences.language}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Marathi">Marathi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Timezone</Label>
                      <Select defaultValue={profile.preferences.timezone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Date Format</Label>
                      <Select defaultValue={profile.preferences.dateFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Currency</Label>
                      <Select defaultValue={profile.preferences.currency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>Irreversible and destructive actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                      <h4 className="font-medium text-destructive">Delete Account</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <DialogTrigger asChild>
                          <Button variant="destructive" className="mt-4">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove all
                              your data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <Label>Type "DELETE" to confirm</Label>
                            <Input placeholder="DELETE" className="mt-2" />
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                              Cancel
                            </Button>
                            <Button variant="destructive">Delete Account</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Export Data</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Download a copy of all your data including profile information, activity logs, and settings.
                      </p>
                      <Button variant="outline" className="mt-4 bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Export My Data
                      </Button>
                    </div>
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

export function AdminProfilePage() {
  return (
    <SidebarProvider>
      <AdminProfilePageInner />
    </SidebarProvider>
  )
}
