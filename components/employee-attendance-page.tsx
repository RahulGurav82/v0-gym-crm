"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, CheckCircle2, XCircle, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock attendance data
const attendanceData: Record<
  string,
  { status: "present" | "absent" | "leave"; checkIn?: string; checkOut?: string; hours?: string; shift?: string }
> = {
  "2025-01-01": { status: "leave" },
  "2025-01-02": { status: "present", checkIn: "09:05 AM", checkOut: "06:15 PM", hours: "9h 10m" },
  "2025-01-03": { status: "present", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 0m" },
  "2025-01-04": { status: "absent" },
  "2025-01-06": { status: "present", checkIn: "08:55 AM", checkOut: "06:10 PM", hours: "9h 15m" },
  "2025-01-07": { status: "present", checkIn: "09:10 AM", checkOut: "06:20 PM", hours: "9h 10m" },
  "2025-01-08": { status: "present", checkIn: "09:02 AM", checkOut: "06:05 PM", hours: "9h 3m" },
  "2025-01-09": { status: "present", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 0m" },
  "2025-01-10": { status: "present", checkIn: "08:58 AM", checkOut: "06:12 PM", hours: "9h 14m" },
  "2025-01-13": { status: "present", checkIn: "09:05 AM", checkOut: "06:08 PM", hours: "9h 3m" },
  "2025-01-14": { status: "present", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 0m" },
  "2025-01-15": { status: "leave" },
}

// Future shifts
const futureShifts: Record<string, string> = {
  "2025-01-16": "09:00 AM - 06:00 PM",
  "2025-01-17": "09:00 AM - 06:00 PM",
  "2025-01-20": "09:00 AM - 06:00 PM",
  "2025-01-21": "09:00 AM - 06:00 PM",
  "2025-01-22": "09:00 AM - 06:00 PM",
  "2025-01-23": "09:00 AM - 06:00 PM",
  "2025-01-24": "09:00 AM - 06:00 PM",
}

export default function EmployeeAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)) // January 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

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

  // Calculate monthly stats
  const monthlyStats = {
    present: Object.values(attendanceData).filter((d) => d.status === "present").length,
    absent: Object.values(attendanceData).filter((d) => d.status === "absent").length,
    leave: Object.values(attendanceData).filter((d) => d.status === "leave").length,
    totalHours: Object.values(attendanceData)
      .filter((d) => d.hours)
      .reduce((acc, d) => {
        const hours = Number.parseFloat(d.hours?.split("h")[0] || "0")
        return acc + hours
      }, 0),
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
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

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(clickedDate)
    setShowDetailsDialog(true)
  }

  const getAttendanceStatus = (day: number) => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return attendanceData[dateKey]
  }

  const getFutureShift = (day: number) => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return futureShifts[dateKey]
  }

  const isPastDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date < today
  }

  const isFutureDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date > today
  }

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const getStatusColor = (status: "present" | "absent" | "leave") => {
    switch (status) {
      case "present":
        return "bg-chart-3/20 text-chart-3 border-chart-3"
      case "absent":
        return "bg-destructive/20 text-destructive border-destructive"
      case "leave":
        return "bg-chart-1/20 text-chart-1 border-chart-1"
      default:
        return ""
    }
  }

  const getStatusIcon = (status: "present" | "absent" | "leave") => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="h-3 w-3" />
      case "absent":
        return <XCircle className="h-3 w-3" />
      case "leave":
        return <Minus className="h-3 w-3" />
    }
  }

  const renderDateDetails = () => {
    if (!selectedDate) return null

    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    const attendance = attendanceData[dateKey]
    const shift = futureShifts[dateKey]
    const dateIsPast = selectedDate < today
    const dateIsFuture = selectedDate > today

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </DialogTitle>
          <DialogDescription>
            {dateIsPast && "Past attendance details"}
            {dateIsFuture && "Scheduled shift details"}
            {!dateIsPast && !dateIsFuture && "Today's details"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Past date - Show attendance */}
          {dateIsPast && attendance && (
            <>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="outline" className={cn("gap-1", getStatusColor(attendance.status))}>
                  {getStatusIcon(attendance.status)}
                  <span className="capitalize">{attendance.status}</span>
                </Badge>
              </div>

              {attendance.status === "present" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs font-medium">Check In</span>
                      </div>
                      <p className="text-lg font-semibold">{attendance.checkIn}</p>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs font-medium">Check Out</span>
                      </div>
                      <p className="text-lg font-semibold">{attendance.checkOut}</p>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg bg-primary/5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Working Hours</span>
                      <span className="text-lg font-semibold text-primary">{attendance.hours}</span>
                    </div>
                  </div>
                </>
              )}

              {attendance.status === "leave" && (
                <div className="p-4 border border-chart-1/50 rounded-lg bg-chart-1/5">
                  <p className="text-sm text-muted-foreground">You were on leave on this day.</p>
                </div>
              )}

              {attendance.status === "absent" && (
                <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                  <p className="text-sm text-muted-foreground">You were marked absent on this day.</p>
                </div>
              )}
            </>
          )}

          {/* Future date - Show scheduled shift */}
          {dateIsFuture && shift && (
            <>
              <div className="p-4 border border-border rounded-lg bg-primary/5">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium">Scheduled Shift</span>
                </div>
                <p className="text-xl font-semibold text-primary">{shift}</p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h4 className="text-sm font-medium mb-2">Shift Details</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium text-foreground">9 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Break Time:</span>
                    <span className="font-medium text-foreground">1 hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Department:</span>
                    <span className="font-medium text-foreground">Sales</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* No data */}
          {dateIsPast && !attendance && (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">No attendance data available for this date.</p>
            </div>
          )}

          {dateIsFuture && !shift && (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">No shift scheduled for this date.</p>
            </div>
          )}
        </div>
      </DialogContent>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar role="employee" />

        <main className="flex-1 pl-16 lg:pl-64 transition-all duration-300">
          {/* Header */}
          <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div>
                <h1 className="text-2xl font-semibold">My Attendance</h1>
                <p className="text-sm text-muted-foreground">Track your attendance and working hours</p>
              </div>
              <ThemeToggle />
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Monthly Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Present Days</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-chart-3" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.present}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
                  <XCircle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.absent}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leave Days</CardTitle>
                  <Minus className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.leave}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.totalHours}h</div>
                  <p className="text-xs text-muted-foreground">Working hours</p>
                </CardContent>
              </Card>
            </div>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Attendance Calendar</CardTitle>
                    <CardDescription>Click on any date to view details</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="min-w-[160px] text-center">
                      <span className="text-sm font-semibold">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </span>
                    </div>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-chart-3/20 border border-chart-3"></div>
                    <span className="text-xs">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-destructive/20 border border-destructive"></div>
                    <span className="text-xs">Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-chart-1/20 border border-chart-1"></div>
                    <span className="text-xs">Leave</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary/20 border border-primary"></div>
                    <span className="text-xs">Scheduled</span>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Day headers */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}

                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                  ))}

                  {/* Calendar days */}
                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1
                    const attendance = getAttendanceStatus(day)
                    const shift = getFutureShift(day)
                    const past = isPastDate(day)
                    const future = isFutureDate(day)
                    const today = isToday(day)

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        className={cn(
                          "aspect-square p-2 rounded-lg border-2 transition-all hover:shadow-md",
                          "flex flex-col items-center justify-center gap-1",
                          today && "border-primary ring-2 ring-primary/20",
                          !today && "border-border hover:border-primary/50",
                          attendance && getStatusColor(attendance.status),
                          !attendance && future && shift && "bg-primary/10 border-primary/30",
                          !attendance && !shift && "hover:bg-muted",
                        )}
                      >
                        <span className={cn("text-sm font-medium", today && "text-primary")}>{day}</span>
                        {attendance && <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                        {future && shift && !attendance && <Clock className="h-3 w-3 text-primary" />}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Date Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        {renderDateDetails()}
      </Dialog>
    </SidebarProvider>
  )
}
