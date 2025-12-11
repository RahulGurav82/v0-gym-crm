"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { SidebarProvider, useSidebar, Sidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  PartyPopper,
  Users,
  Dumbbell,
  Clock,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  Repeat,
  Star,
  Filter,
  Search,
  X,
  CalendarCheck,
  CalendarX,
} from "lucide-react"

// Event types
type EventType = "holiday" | "event" | "class" | "meeting" | "maintenance" | "training"

interface CalendarEvent {
  id: string
  title: string
  date: string
  endDate?: string
  type: EventType
  description?: string
  time?: string
  endTime?: string
  location?: string
  branches: string[]
  recurring?: "none" | "daily" | "weekly" | "monthly" | "yearly"
  reminder?: boolean
  color?: string
  createdBy?: string
}

// Sample events data
const initialEvents: CalendarEvent[] = [
  {
    id: "E001",
    title: "Republic Day",
    date: "2025-01-26",
    type: "holiday",
    description: "National Holiday - Gym Closed",
    branches: ["all"],
    color: "red",
  },
  {
    id: "E002",
    title: "New Year Party",
    date: "2025-01-01",
    type: "event",
    description: "New Year celebration with members",
    time: "19:00",
    endTime: "23:00",
    location: "Main Hall",
    branches: ["Downtown", "Westside"],
    color: "purple",
  },
  {
    id: "E003",
    title: "Yoga Workshop",
    date: "2025-01-15",
    type: "class",
    description: "Special yoga workshop by expert trainer",
    time: "06:00",
    endTime: "08:00",
    location: "Studio A",
    branches: ["Downtown"],
    recurring: "weekly",
    color: "green",
  },
  {
    id: "E004",
    title: "Staff Meeting",
    date: "2025-01-20",
    type: "meeting",
    description: "Monthly staff review meeting",
    time: "10:00",
    endTime: "12:00",
    location: "Conference Room",
    branches: ["all"],
    recurring: "monthly",
    color: "blue",
  },
  {
    id: "E005",
    title: "Equipment Maintenance",
    date: "2025-01-18",
    type: "maintenance",
    description: "Scheduled maintenance for cardio equipment",
    time: "14:00",
    endTime: "18:00",
    branches: ["Eastside"],
    color: "orange",
  },
  {
    id: "E006",
    title: "CrossFit Competition",
    date: "2025-01-28",
    endDate: "2025-01-29",
    type: "event",
    description: "Inter-branch CrossFit competition",
    time: "09:00",
    endTime: "17:00",
    location: "Main Gym Floor",
    branches: ["all"],
    color: "primary",
  },
  {
    id: "E007",
    title: "Trainer Certification",
    date: "2025-01-22",
    endDate: "2025-01-24",
    type: "training",
    description: "Staff certification program",
    time: "09:00",
    endTime: "17:00",
    location: "Training Center",
    branches: ["Downtown"],
    color: "cyan",
  },
]

const eventTypes: { type: EventType; label: string; icon: React.ElementType; color: string }[] = [
  { type: "holiday", label: "Holiday", icon: PartyPopper, color: "bg-red-500" },
  { type: "event", label: "Event", icon: Star, color: "bg-purple-500" },
  { type: "class", label: "Class", icon: Dumbbell, color: "bg-green-500" },
  { type: "meeting", label: "Meeting", icon: Users, color: "bg-blue-500" },
  { type: "maintenance", label: "Maintenance", icon: CalendarX, color: "bg-orange-500" },
  { type: "training", label: "Training", icon: CalendarCheck, color: "bg-cyan-500" },
]

const branches = ["Downtown", "Westside", "Eastside", "Northside"]

function CompanyCalendarInner() {
  const { collapsed } = useSidebar()
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0))
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showEventSheet, setShowEventSheet] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [filterType, setFilterType] = useState<string>("all")
  const [filterBranch, setFilterBranch] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"month" | "week" | "list">("month")

  // New event form state
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    type: "event",
    date: "",
    time: "",
    endTime: "",
    location: "",
    description: "",
    branches: [],
    recurring: "none",
    reminder: false,
  })

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const today = new Date()

  // Stats
  const stats = useMemo(() => {
    const monthEvents = events.filter((e) => {
      const eventDate = new Date(e.date)
      return eventDate.getMonth() === currentMonth.getMonth() && eventDate.getFullYear() === currentMonth.getFullYear()
    })
    const holidays = monthEvents.filter((e) => e.type === "holiday").length
    const eventCount = monthEvents.filter((e) => e.type === "event").length
    const classes = monthEvents.filter((e) => e.type === "class").length
    const meetings = monthEvents.filter((e) => e.type === "meeting").length

    return { total: monthEvents.length, holidays, events: eventCount, classes, meetings }
  }, [events, currentMonth])

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchType = filterType === "all" || e.type === filterType
      const matchBranch = filterBranch === "all" || e.branches.includes("all") || e.branches.includes(filterBranch)
      const matchSearch =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchType && matchBranch && matchSearch
    })
  }, [events, filterType, filterBranch, searchQuery])

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth()))
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    return { daysInMonth, startingDayOfWeek }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)

  const getEventsForDate = (day: number) => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return filteredEvents.filter((e) => {
      if (e.date === dateKey) return true
      if (e.endDate) {
        const start = new Date(e.date)
        const end = new Date(e.endDate)
        const current = new Date(dateKey)
        return current >= start && current <= end
      }
      return false
    })
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(clickedDate)
    setShowEventSheet(true)
  }

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const isWeekend = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return

    const event: CalendarEvent = {
      id: `E${String(events.length + 1).padStart(3, "0")}`,
      title: newEvent.title!,
      date: newEvent.date!,
      endDate: newEvent.endDate,
      type: newEvent.type as EventType,
      description: newEvent.description,
      time: newEvent.time,
      endTime: newEvent.endTime,
      location: newEvent.location,
      branches: newEvent.branches?.length ? newEvent.branches : ["all"],
      recurring: newEvent.recurring as any,
      reminder: newEvent.reminder,
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      type: "event",
      date: "",
      time: "",
      endTime: "",
      location: "",
      description: "",
      branches: [],
      recurring: "none",
      reminder: false,
    })
    setShowAddDialog(false)
  }

  const handleEditEvent = () => {
    if (!editingEvent) return
    setEvents(events.map((e) => (e.id === editingEvent.id ? editingEvent : e)))
    setShowEditDialog(false)
    setEditingEvent(null)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId))
  }

  const getEventTypeConfig = (type: EventType) => {
    return eventTypes.find((t) => t.type === type)
  }

  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null

    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    const dayEvents = filteredEvents.filter((e) => {
      if (e.date === dateKey) return true
      if (e.endDate) {
        const start = new Date(e.date)
        const end = new Date(e.endDate)
        const current = new Date(dateKey)
        return current >= start && current <= end
      }
      return false
    })

    return (
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-xl">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
              </SheetTitle>
              <SheetDescription className="text-base">
                {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Events ({dayEvents.length})</h3>
            <Button
              size="sm"
              onClick={() => {
                setNewEvent({ ...newEvent, date: dateKey })
                setShowAddDialog(true)
                setShowEventSheet(false)
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Event
            </Button>
          </div>

          {dayEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No events scheduled</p>
              <p className="text-sm text-muted-foreground mt-1">Click "Add Event" to create one</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayEvents.map((event) => {
                const config = getEventTypeConfig(event.type)
                const Icon = config?.icon || Calendar
                return (
                  <Card
                    key={event.id}
                    className="border-l-4"
                    style={{ borderLeftColor: `var(--${event.type === "holiday" ? "destructive" : "primary"})` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={cn("p-2 rounded-lg", config?.color, "bg-opacity-20")}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{event.title}</h4>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {config?.label}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingEvent(event)
                                setShowEditDialog(true)
                                setShowEventSheet(false)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteEvent(event.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {event.description && <p className="text-sm text-muted-foreground mt-2">{event.description}</p>}

                      <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                        {event.time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {event.time} {event.endTime && `- ${event.endTime}`}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {event.location}
                          </div>
                        )}
                        {event.recurring && event.recurring !== "none" && (
                          <div className="flex items-center gap-1">
                            <Repeat className="h-3.5 w-3.5" />
                            {event.recurring}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {event.branches.map((branch) => (
                          <Badge key={branch} variant="secondary" className="text-xs">
                            {branch === "all" ? "All Branches" : branch}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </SheetContent>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />

      <div className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
          <div>
            <h1 className="text-xl font-semibold">Company Calendar</h1>
            <p className="text-sm text-muted-foreground">Manage holidays, events, and schedules</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Create a new calendar event, holiday, or schedule</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Event Type</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {eventTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <button
                            key={type.type}
                            type="button"
                            onClick={() => setNewEvent({ ...newEvent, type: type.type })}
                            className={cn(
                              "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                              newEvent.type === type.type
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50",
                            )}
                          >
                            <div className={cn("p-2 rounded-lg", type.color)}>
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-xs font-medium">{type.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Event title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Start Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newEvent.endDate || ""}
                        onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Start Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Event location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Event description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Branches</Label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setNewEvent({ ...newEvent, branches: ["all"] })}
                        className={cn(
                          "px-3 py-1.5 rounded-lg border text-sm transition-all",
                          newEvent.branches?.includes("all")
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50",
                        )}
                      >
                        All Branches
                      </button>
                      {branches.map((branch) => (
                        <button
                          key={branch}
                          type="button"
                          onClick={() => {
                            const current = newEvent.branches?.filter((b) => b !== "all") || []
                            if (current.includes(branch)) {
                              setNewEvent({ ...newEvent, branches: current.filter((b) => b !== branch) })
                            } else {
                              setNewEvent({ ...newEvent, branches: [...current, branch] })
                            }
                          }}
                          className={cn(
                            "px-3 py-1.5 rounded-lg border text-sm transition-all",
                            newEvent.branches?.includes(branch)
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50",
                          )}
                        >
                          {branch}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Recurring</Label>
                      <Select
                        value={newEvent.recurring}
                        onValueChange={(value) => setNewEvent({ ...newEvent, recurring: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>&nbsp;</Label>
                      <div className="flex items-center gap-2 h-10">
                        <Checkbox
                          id="reminder"
                          checked={newEvent.reminder}
                          onCheckedChange={(checked) => setNewEvent({ ...newEvent, reminder: !!checked })}
                        />
                        <label htmlFor="reminder" className="text-sm">
                          Send reminder
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEvent} disabled={!newEvent.title || !newEvent.date}>
                    Add Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/20">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-500/20">
                    <PartyPopper className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.holidays}</p>
                    <p className="text-xs text-muted-foreground">Holidays</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20">
                    <Star className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.events}</p>
                    <p className="text-xs text-muted-foreground">Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-green-500/20">
                    <Dumbbell className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.classes}</p>
                    <p className="text-xs text-muted-foreground">Classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/20">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.meetings}</p>
                    <p className="text-xs text-muted-foreground">Meetings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.type} value={type.type}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterBranch} onValueChange={setFilterBranch}>
                  <SelectTrigger className="w-[150px]">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {(filterType !== "all" || filterBranch !== "all" || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFilterType("all")
                      setFilterBranch("all")
                      setSearchQuery("")
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={goToToday}>
                    Today
                  </Button>
                  <Button variant="outline" size="icon" onClick={prevMonth} className="h-9 w-9 bg-transparent">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth} className="h-9 w-9 bg-transparent">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div
                    key={day}
                    className={cn(
                      "text-center text-xs font-semibold py-3 uppercase tracking-wider",
                      index === 0 || index === 6 ? "text-muted-foreground/50" : "text-muted-foreground",
                    )}
                  >
                    {day}
                  </div>
                ))}

                {/* Empty cells */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square min-h-[100px]"></div>
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1
                  const dayEvents = getEventsForDate(day)
                  const todayDate = isToday(day)
                  const weekend = isWeekend(day)
                  const hasHoliday = dayEvents.some((e) => e.type === "holiday")

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={cn(
                        "min-h-[100px] p-2 rounded-xl border transition-all text-left",
                        "hover:border-primary/50 hover:bg-muted/30",
                        todayDate && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                        weekend && "bg-muted/20",
                        hasHoliday && "bg-red-500/10 border-red-500/30",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold",
                          todayDate && "bg-primary text-primary-foreground",
                          weekend && !todayDate && "text-muted-foreground/50",
                        )}
                      >
                        {day}
                      </span>

                      <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, 3).map((event) => {
                          const config = getEventTypeConfig(event.type)
                          return (
                            <div
                              key={event.id}
                              className={cn(
                                "text-xs px-1.5 py-0.5 rounded truncate",
                                event.type === "holiday" && "bg-red-500/20 text-red-700 dark:text-red-400",
                                event.type === "event" && "bg-purple-500/20 text-purple-700 dark:text-purple-400",
                                event.type === "class" && "bg-green-500/20 text-green-700 dark:text-green-400",
                                event.type === "meeting" && "bg-blue-500/20 text-blue-700 dark:text-blue-400",
                                event.type === "maintenance" && "bg-orange-500/20 text-orange-700 dark:text-orange-400",
                                event.type === "training" && "bg-cyan-500/20 text-cyan-700 dark:text-cyan-400",
                              )}
                            >
                              {event.title}
                            </div>
                          )
                        })}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-muted-foreground px-1.5">+{dayEvents.length - 3} more</div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-border">
                {eventTypes.map((type) => (
                  <div key={type.type} className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded", type.color)} />
                    <span className="text-xs text-muted-foreground">{type.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredEvents
                  .filter((e) => new Date(e.date) >= today)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map((event) => {
                    const config = getEventTypeConfig(event.type)
                    const Icon = config?.icon || Calendar
                    return (
                      <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                        <div className={cn("p-2.5 rounded-xl", config?.color)}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{event.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>
                              {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                            {event.time && <span>{event.time}</span>}
                            {event.location && <span>{event.location}</span>}
                          </div>
                        </div>
                        <Badge variant="outline">{config?.label}</Badge>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Date Details Sheet */}
      <Sheet open={showEventSheet} onOpenChange={setShowEventSheet}>
        {renderSelectedDateEvents()}
      </Sheet>

      {/* Edit Event Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Update event details</DialogDescription>
          </DialogHeader>

          {editingEvent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Event Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {eventTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.type}
                        type="button"
                        onClick={() => setEditingEvent({ ...editingEvent, type: type.type })}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                          editingEvent.type === type.type
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50",
                        )}
                      >
                        <div className={cn("p-2 rounded-lg", type.color)}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs font-medium">{type.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editTitle">Title *</Label>
                <Input
                  id="editTitle"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={editingEvent.endDate || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={editingEvent.time || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={editingEvent.endTime || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={editingEvent.location || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingEvent.description || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEvent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function CompanyCalendarPage() {
  return (
    <SidebarProvider>
      <CompanyCalendarInner />
    </SidebarProvider>
  )
}
