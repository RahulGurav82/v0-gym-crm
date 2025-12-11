"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Search,
  Check,
  CheckCheck,
  Trash2,
  MoreHorizontal,
  UserPlus,
  DollarSign,
  Calendar,
  AlertTriangle,
  Clock,
  Filter,
  ClipboardCheck,
  Settings,
  Info,
  CheckCircle2,
} from "lucide-react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type NotificationType = "member" | "enquiry" | "payment" | "leave" | "task" | "system" | "alert"
type NotificationPriority = "low" | "medium" | "high" | "urgent"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  timestamp: Date
  read: boolean
  priority: NotificationPriority
  actionUrl?: string
  actionLabel?: string
  avatar?: string
  avatarFallback?: string
}

const notifications: Notification[] = [
  {
    id: "N001",
    type: "member",
    title: "New Member Registration",
    message: "John Smith has registered as a new member at Downtown Branch",
    time: "2 min ago",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    read: false,
    priority: "medium",
    actionUrl: "/admin/members/M001",
    actionLabel: "View Member",
    avatarFallback: "JS",
  },
  {
    id: "N002",
    type: "payment",
    title: "Payment Received",
    message: "Payment of $299 received from Sarah Johnson for Premium Membership",
    time: "15 min ago",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    priority: "low",
    actionUrl: "/admin/invoices",
    actionLabel: "View Invoice",
    avatarFallback: "SJ",
  },
  {
    id: "N003",
    type: "leave",
    title: "Leave Request Pending",
    message: "Mike Brown has requested leave from Dec 20 to Dec 25",
    time: "30 min ago",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    priority: "high",
    actionUrl: "/admin/staff",
    actionLabel: "Review Request",
    avatarFallback: "MB",
  },
  {
    id: "N004",
    type: "enquiry",
    title: "New Enquiry Received",
    message: "Emma Davis is interested in Personal Training package",
    time: "1 hour ago",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: false,
    priority: "medium",
    actionUrl: "/admin/enquiry/E001",
    actionLabel: "View Enquiry",
    avatarFallback: "ED",
  },
  {
    id: "N005",
    type: "alert",
    title: "Membership Expiring Soon",
    message: "15 members have memberships expiring in the next 7 days",
    time: "2 hours ago",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    priority: "urgent",
    actionUrl: "/admin/members",
    actionLabel: "View Members",
  },
  {
    id: "N006",
    type: "task",
    title: "Task Completed",
    message: "Equipment maintenance task has been completed by Alex Chen",
    time: "3 hours ago",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
    priority: "low",
    actionUrl: "/admin/tasks",
    actionLabel: "View Task",
    avatarFallback: "AC",
  },
  {
    id: "N007",
    type: "system",
    title: "System Update",
    message: "New features have been added to the billing module",
    time: "5 hours ago",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: true,
    priority: "low",
  },
  {
    id: "N008",
    type: "payment",
    title: "Payment Failed",
    message: "Auto-renewal payment failed for David Wilson - Premium Plan",
    time: "6 hours ago",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    read: true,
    priority: "high",
    actionUrl: "/admin/members/M005",
    actionLabel: "View Details",
    avatarFallback: "DW",
  },
  {
    id: "N009",
    type: "member",
    title: "Member Check-in",
    message: "VIP member Robert Taylor checked in at Westside Branch",
    time: "8 hours ago",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    read: true,
    priority: "low",
    avatarFallback: "RT",
  },
  {
    id: "N010",
    type: "enquiry",
    title: "Follow-up Required",
    message: "Follow-up due for enquiry from Lisa Anderson",
    time: "1 day ago",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    priority: "medium",
    actionUrl: "/admin/enquiry/E005",
    actionLabel: "View Enquiry",
    avatarFallback: "LA",
  },
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "member":
      return UserPlus
    case "enquiry":
      return ClipboardCheck
    case "payment":
      return DollarSign
    case "leave":
      return Calendar
    case "task":
      return CheckCircle2
    case "system":
      return Settings
    case "alert":
      return AlertTriangle
    default:
      return Bell
  }
}

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case "member":
      return "bg-blue-500/10 text-blue-500"
    case "enquiry":
      return "bg-purple-500/10 text-purple-500"
    case "payment":
      return "bg-emerald-500/10 text-emerald-500"
    case "leave":
      return "bg-amber-500/10 text-amber-500"
    case "task":
      return "bg-cyan-500/10 text-cyan-500"
    case "system":
      return "bg-gray-500/10 text-gray-500"
    case "alert":
      return "bg-red-500/10 text-red-500"
    default:
      return "bg-primary/10 text-primary"
  }
}

const getPriorityBadge = (priority: NotificationPriority) => {
  switch (priority) {
    case "urgent":
      return <Badge className="bg-red-500 text-white">Urgent</Badge>
    case "high":
      return <Badge className="bg-amber-500 text-white">High</Badge>
    case "medium":
      return <Badge variant="secondary">Medium</Badge>
    case "low":
      return <Badge variant="outline">Low</Badge>
  }
}

function NotificationsPageInner() {
  const { collapsed } = useSidebar()
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [filterType, setFilterType] = useState<NotificationType | "all">("all")

  const unreadCount = notificationsList.filter((n) => !n.read).length

  const filteredNotifications = notificationsList.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notification.read) ||
      (activeTab === "read" && notification.read)

    const matchesType = filterType === "all" || notification.type === filterType

    return matchesSearch && matchesTab && matchesType
  })

  const toggleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const markAsRead = (ids: string[]) => {
    setNotificationsList((prev) => prev.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n)))
    setSelectedNotifications([])
  }

  const markAsUnread = (ids: string[]) => {
    setNotificationsList((prev) => prev.map((n) => (ids.includes(n.id) ? { ...n, read: false } : n)))
    setSelectedNotifications([])
  }

  const deleteNotifications = (ids: string[]) => {
    setNotificationsList((prev) => prev.filter((n) => !ids.includes(n.id)))
    setSelectedNotifications([])
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />

      <div className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "All caught up!"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{notificationsList.length}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unreadCount}</p>
                    <p className="text-xs text-muted-foreground">Unread</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {notificationsList.filter((n) => n.priority === "urgent" || n.priority === "high").length}
                    </p>
                    <p className="text-xs text-muted-foreground">High Priority</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{notificationsList.filter((n) => n.read).length}</p>
                    <p className="text-xs text-muted-foreground">Read</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>All Notifications</CardTitle>
                  <CardDescription>Manage and view all your notifications</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Mark All Read
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      {filterType === "all" ? "All Types" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilterType("all")}>All Types</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterType("member")}>
                      <UserPlus className="h-4 w-4 mr-2" /> Members
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("enquiry")}>
                      <ClipboardCheck className="h-4 w-4 mr-2" /> Enquiries
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("payment")}>
                      <DollarSign className="h-4 w-4 mr-2" /> Payments
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("leave")}>
                      <Calendar className="h-4 w-4 mr-2" /> Leave Requests
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("task")}>
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Tasks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("alert")}>
                      <AlertTriangle className="h-4 w-4 mr-2" /> Alerts
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("system")}>
                      <Settings className="h-4 w-4 mr-2" /> System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                <TabsList>
                  <TabsTrigger value="all">
                    All
                    <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                      {notificationsList.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread
                    {unreadCount > 0 && <Badge className="ml-2 h-5 px-1.5 bg-primary">{unreadCount}</Badge>}
                  </TabsTrigger>
                  <TabsTrigger value="read">Read</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Bulk Actions */}
              {selectedNotifications.length > 0 && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">{selectedNotifications.length} selected</span>
                  <div className="flex-1" />
                  <Button variant="outline" size="sm" onClick={() => markAsRead(selectedNotifications)}>
                    <Check className="h-4 w-4 mr-1" /> Mark Read
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => markAsUnread(selectedNotifications)}>
                    <Info className="h-4 w-4 mr-1" /> Mark Unread
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                    onClick={() => deleteNotifications(selectedNotifications)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              )}

              {/* Select All */}
              <div className="flex items-center gap-2 mb-2 px-2">
                <Checkbox
                  checked={
                    filteredNotifications.length > 0 && selectedNotifications.length === filteredNotifications.length
                  }
                  onCheckedChange={toggleSelectAll}
                />
                <span className="text-sm text-muted-foreground">Select All</span>
              </div>

              {/* Notifications List */}
              <div className="space-y-2">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium">No notifications found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? "Try adjusting your search" : "You're all caught up!"}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type)
                    const colorClass = getNotificationColor(notification.type)

                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-3 p-4 rounded-lg border transition-colors hover:bg-muted/50",
                          !notification.read && "bg-primary/5 border-primary/20",
                        )}
                      >
                        <Checkbox
                          checked={selectedNotifications.includes(notification.id)}
                          onCheckedChange={() => toggleSelect(notification.id)}
                          className="mt-1"
                        />

                        {notification.avatarFallback ? (
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className={colorClass}>{notification.avatarFallback}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className={cn("p-2.5 rounded-lg", colorClass)}>
                            <Icon className="h-5 w-5" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className={cn("font-medium text-sm", !notification.read && "font-semibold")}>
                                  {notification.title}
                                </h4>
                                {!notification.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                              </div>
                              <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {notification.time}
                                </span>
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {notification.actionUrl && (
                                  <>
                                    <DropdownMenuItem asChild>
                                      <a href={notification.actionUrl}>{notification.actionLabel || "View Details"}</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                  </>
                                )}
                                {notification.read ? (
                                  <DropdownMenuItem onClick={() => markAsUnread([notification.id])}>
                                    <Info className="h-4 w-4 mr-2" /> Mark as Unread
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => markAsRead([notification.id])}>
                                    <Check className="h-4 w-4 mr-2" /> Mark as Read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => deleteNotifications([notification.id])}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {notification.actionUrl && (
                            <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-primary" asChild>
                              <a href={notification.actionUrl}>{notification.actionLabel || "View Details"} →</a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export function NotificationsPage() {
  return (
    <SidebarProvider>
      <NotificationsPageInner />
    </SidebarProvider>
  )
}
