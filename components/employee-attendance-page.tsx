"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  Coffee,
  TrendingUp,
  Timer,
  CalendarCheck,
  Fingerprint,
  ArrowRight,
  Wallet,
  IndianRupee,
  Receipt,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Progress } from "@/components/ui/progress"

// Mock attendance data
const attendanceData: Record<
  string,
  {
    status: "present" | "absent" | "leave" | "half-day"
    checkIn?: string
    checkOut?: string
    hours?: string
    lateBy?: string
    earlyBy?: string
  }
> = {
  "2025-01-02": { status: "present", checkIn: "09:05 AM", checkOut: "06:15 PM", hours: "9h 10m" },
  "2025-01-03": { status: "present", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 0m" },
  "2025-01-04": { status: "absent" },
  "2025-01-06": { status: "present", checkIn: "08:55 AM", checkOut: "06:10 PM", hours: "9h 15m", earlyBy: "5m" },
  "2025-01-07": { status: "present", checkIn: "09:10 AM", checkOut: "06:20 PM", hours: "9h 10m", lateBy: "10m" },
  "2025-01-08": { status: "present", checkIn: "09:02 AM", checkOut: "06:05 PM", hours: "9h 3m" },
  "2025-01-09": { status: "half-day", checkIn: "09:00 AM", checkOut: "01:00 PM", hours: "4h 0m" },
  "2025-01-10": { status: "present", checkIn: "08:58 AM", checkOut: "06:12 PM", hours: "9h 14m" },
  "2025-01-11": { status: "leave" },
  "2025-01-13": { status: "present", checkIn: "09:05 AM", checkOut: "06:08 PM", hours: "9h 3m" },
  "2025-01-14": { status: "present", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 0m" },
  "2025-01-15": { status: "leave" },
}

// Future shifts
const futureShifts: Record<string, { shift: string; type: string }> = {
  "2025-01-16": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-17": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-18": { shift: "02:00 PM - 10:00 PM", type: "Evening" },
  "2025-01-20": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-21": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-22": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-23": { shift: "02:00 PM - 10:00 PM", type: "Evening" },
  "2025-01-24": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-25": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-27": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-28": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-29": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-30": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
  "2025-01-31": { shift: "09:00 AM - 06:00 PM", type: "Morning" },
}

// Salary data
const salaryData = {
  basic: 25000,
  hra: 10000,
  da: 5000,
  conveyance: 3000,
  medical: 2000,
  special: 5000,
  grossSalary: 50000,
  pf: 3000,
  esi: 750,
  professionalTax: 200,
  tds: 2000,
  totalDeductions: 5950,
  netSalary: 44050,
  perDaySalary: 1923,
  workingDays: 26,
  lopDays: 1,
  lopDeduction: 1923,
}

export function EmployeeAttendance() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showDetailsSheet, setShowDetailsSheet] = useState(false)

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
  const monthlyStats = useMemo(() => {
    const present = Object.values(attendanceData).filter((d) => d.status === "present").length
    const absent = Object.values(attendanceData).filter((d) => d.status === "absent").length
    const leave = Object.values(attendanceData).filter((d) => d.status === "leave").length
    const halfDay = Object.values(attendanceData).filter((d) => d.status === "half-day").length
    const totalHours = Object.values(attendanceData)
      .filter((d) => d.hours)
      .reduce((acc, d) => {
        const hours = Number.parseFloat(d.hours?.split("h")[0] || "0")
        return acc + hours
      }, 0)
    const avgHours = present > 0 ? (totalHours / present).toFixed(1) : "0"
    const attendanceRate = ((present + halfDay * 0.5) / (present + absent + leave + halfDay)) * 100

    return { present, absent, leave, halfDay, totalHours, avgHours, attendanceRate }
  }, [])

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
    setShowDetailsSheet(true)
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

  const isWeekend = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  const renderDateDetails = () => {
    if (!selectedDate) return null

    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    const attendance = attendanceData[dateKey]
    const shift = futureShifts[dateKey]
    const dateIsPast = selectedDate < today
    const dateIsFuture = selectedDate > today

    return (
      <SheetContent className="w-full sm:max-w-md">
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

        <div className="py-6 space-y-6">
          {/* Past date - Show attendance */}
          {dateIsPast && attendance && (
            <>
              <div
                className={cn(
                  "p-4 rounded-xl border-2",
                  attendance.status === "present" && "bg-emerald-500/10 border-emerald-500/30",
                  attendance.status === "absent" && "bg-red-500/10 border-red-500/30",
                  attendance.status === "leave" && "bg-blue-500/10 border-blue-500/30",
                  attendance.status === "half-day" && "bg-amber-500/10 border-amber-500/30",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Status</span>
                  <Badge
                    className={cn(
                      "text-sm px-3 py-1",
                      attendance.status === "present" && "bg-emerald-500 text-white",
                      attendance.status === "absent" && "bg-red-500 text-white",
                      attendance.status === "leave" && "bg-blue-500 text-white",
                      attendance.status === "half-day" && "bg-amber-500 text-white",
                    )}
                  >
                    {attendance.status === "half-day"
                      ? "Half Day"
                      : attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {(attendance.status === "present" || attendance.status === "half-day") && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 text-emerald-500 mb-2">
                        <Fingerprint className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">Check In</span>
                      </div>
                      <p className="text-2xl font-bold">{attendance.checkIn}</p>
                      {attendance.lateBy && <p className="text-xs text-red-500 mt-1">Late by {attendance.lateBy}</p>}
                      {attendance.earlyBy && (
                        <p className="text-xs text-emerald-500 mt-1">Early by {attendance.earlyBy}</p>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 text-red-500 mb-2">
                        <Fingerprint className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">Check Out</span>
                      </div>
                      <p className="text-2xl font-bold">{attendance.checkOut}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border-2 border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Timer className="h-5 w-5 text-primary" />
                        <span className="font-medium">Total Working Hours</span>
                      </div>
                      <span className="text-2xl font-bold text-primary">{attendance.hours}</span>
                    </div>
                  </div>
                </>
              )}

              {attendance.status === "leave" && (
                <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 text-center">
                  <Coffee className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                  <p className="text-lg font-medium">On Leave</p>
                  <p className="text-sm text-muted-foreground mt-1">You were on approved leave this day</p>
                </div>
              )}

              {attendance.status === "absent" && (
                <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20 text-center">
                  <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                  <p className="text-lg font-medium">Absent</p>
                  <p className="text-sm text-muted-foreground mt-1">You were marked absent this day</p>
                </div>
              )}
            </>
          )}

          {/* Future date - Show scheduled shift */}
          {dateIsFuture && shift && (
            <>
              <div className="p-4 rounded-xl bg-primary/5 border-2 border-primary/20">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Scheduled Shift</span>
                </div>
                <p className="text-3xl font-bold">{shift.shift}</p>
                <Badge variant="outline" className="mt-3">
                  {shift.type} Shift
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Shift Details</h4>
                <div className="space-y-2">
                  {[
                    { label: "Duration", value: "9 hours" },
                    { label: "Break Time", value: "1 hour" },
                    { label: "Department", value: "Sales" },
                    { label: "Location", value: "Main Branch" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* No data */}
          {dateIsPast && !attendance && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-medium">No Data Available</p>
              <p className="text-sm text-muted-foreground mt-1">No attendance record for this date</p>
            </div>
          )}

          {dateIsFuture && !shift && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-medium">No Shift Scheduled</p>
              <p className="text-sm text-muted-foreground mt-1">You don't have a scheduled shift for this date</p>
            </div>
          )}
        </div>
      </SheetContent>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar role="employee" />

        <main className="flex-1 pl-16 lg:pl-64 transition-all duration-300">
          {/* Header */}
          <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div>
                <h1 className="text-2xl font-bold">My Attendance</h1>
                <p className="text-sm text-muted-foreground">Track your attendance and working hours</p>
              </div>
              <ThemeToggle />
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Present Days</p>
                      <p className="text-3xl font-bold mt-1">{monthlyStats.present}</p>
                      <p className="text-xs text-muted-foreground mt-1">This month</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Absent Days</p>
                      <p className="text-3xl font-bold mt-1">{monthlyStats.absent}</p>
                      <p className="text-xs text-muted-foreground mt-1">This month</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                      <XCircle className="h-7 w-7 text-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Leave Days</p>
                      <p className="text-3xl font-bold mt-1">{monthlyStats.leave}</p>
                      <p className="text-xs text-muted-foreground mt-1">This month</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                      <Coffee className="h-7 w-7 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                      <p className="text-3xl font-bold mt-1">{monthlyStats.totalHours}h</p>
                      <p className="text-xs text-muted-foreground mt-1">Avg: {monthlyStats.avgHours}h/day</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Timer className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Rate */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Attendance Rate</h3>
                      <p className="text-sm text-muted-foreground">Your monthly attendance performance</p>
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-primary">{monthlyStats.attendanceRate.toFixed(1)}%</span>
                </div>
                <Progress value={monthlyStats.attendanceRate} className="h-3" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>Target: 95%</span>
                  <span>100%</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Calendar */}
              <Card className="lg:col-span-2 border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CalendarCheck className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Attendance Calendar</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={prevMonth} className="h-9 w-9 bg-transparent">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="min-w-[140px] text-center px-3">
                        <span className="font-semibold">
                          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                      </div>
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

                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                      <div key={`empty-${index}`} className="aspect-square"></div>
                    ))}

                    {/* Calendar days */}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                      const day = index + 1
                      const attendance = getAttendanceStatus(day)
                      const shift = getFutureShift(day)
                      const future = isFutureDate(day)
                      const todayDate = isToday(day)
                      const weekend = isWeekend(day)

                      return (
                        <button
                          key={day}
                          onClick={() => handleDateClick(day)}
                          className={cn(
                            "aspect-square rounded-xl transition-all relative group",
                            "flex flex-col items-center justify-center",
                            "hover:scale-105 hover:shadow-lg hover:z-10",
                            todayDate && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                            weekend && !attendance && "bg-muted/30",
                            !attendance && !shift && !weekend && "hover:bg-muted/50",
                            attendance?.status === "present" && "bg-emerald-500/20 hover:bg-emerald-500/30",
                            attendance?.status === "absent" && "bg-red-500/20 hover:bg-red-500/30",
                            attendance?.status === "leave" && "bg-blue-500/20 hover:bg-blue-500/30",
                            attendance?.status === "half-day" && "bg-amber-500/20 hover:bg-amber-500/30",
                            future && shift && !attendance && "bg-primary/10 hover:bg-primary/20",
                          )}
                        >
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              todayDate && "text-primary",
                              weekend && !attendance && "text-muted-foreground/50",
                              attendance?.status === "present" && "text-emerald-700 dark:text-emerald-400",
                              attendance?.status === "absent" && "text-red-700 dark:text-red-400",
                              attendance?.status === "leave" && "text-blue-700 dark:text-blue-400",
                              attendance?.status === "half-day" && "text-amber-700 dark:text-amber-400",
                            )}
                          >
                            {day}
                          </span>

                          {/* Status indicator */}
                          {attendance && (
                            <div
                              className={cn(
                                "w-1.5 h-1.5 rounded-full mt-1",
                                attendance.status === "present" && "bg-emerald-500",
                                attendance.status === "absent" && "bg-red-500",
                                attendance.status === "leave" && "bg-blue-500",
                                attendance.status === "half-day" && "bg-amber-500",
                              )}
                            />
                          )}

                          {/* Future shift indicator */}
                          {future && shift && !attendance && <Clock className="h-3 w-3 text-primary mt-1" />}
                        </button>
                      )
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-border">
                    {[
                      { color: "bg-emerald-500", label: "Present" },
                      { color: "bg-red-500", label: "Absent" },
                      { color: "bg-blue-500", label: "Leave" },
                      { color: "bg-amber-500", label: "Half Day" },
                      { color: "bg-primary", label: "Scheduled" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", item.color)} />
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Right sidebar - Upcoming Shifts */}
              <div className="space-y-6">
                {/* Upcoming Shifts */}
                <Card className="border-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Upcoming Shifts</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(futureShifts)
                      .slice(0, 5)
                      .map(([dateKey, shift]) => {
                        const date = new Date(dateKey)
                        return (
                          <div
                            key={dateKey}
                            className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer group"
                            onClick={() => {
                              setSelectedDate(date)
                              setShowDetailsSheet(true)
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  {date.toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">{shift.shift}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {shift.type}
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </CardContent>
                </Card>

                {/* Monthly Salary Card */}
                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Monthly Salary</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Net Salary Highlight */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/20">
                      <p className="text-sm text-muted-foreground mb-1">Net Salary</p>
                      <div className="flex items-baseline gap-1">
                        <IndianRupee className="h-6 w-6 text-emerald-600" />
                        <span className="text-3xl font-bold text-emerald-600">
                          {salaryData.netSalary.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Earnings */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Earnings</p>
                      <div className="space-y-1.5">
                        {[
                          { label: "Basic Salary", value: salaryData.basic },
                          { label: "HRA", value: salaryData.hra },
                          { label: "DA", value: salaryData.da },
                          { label: "Conveyance", value: salaryData.conveyance },
                          { label: "Medical", value: salaryData.medical },
                          { label: "Special Allowance", value: salaryData.special },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium">₹{item.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="font-medium">Gross Salary</span>
                        <span className="font-bold text-emerald-600">₹{salaryData.grossSalary.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Deductions */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Deductions</p>
                      <div className="space-y-1.5">
                        {[
                          { label: "PF", value: salaryData.pf },
                          { label: "ESI", value: salaryData.esi },
                          { label: "Professional Tax", value: salaryData.professionalTax },
                          { label: "TDS", value: salaryData.tds },
                          { label: `LOP (${salaryData.lopDays} day)`, value: salaryData.lopDeduction },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium text-red-500">-₹{item.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="font-medium">Total Deductions</span>
                        <span className="font-bold text-red-500">
                          -₹{(salaryData.totalDeductions + salaryData.lopDeduction).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <FileText className="h-4 w-4 mr-2" />
                        Payslip
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Receipt className="h-4 w-4 mr-2" />
                        History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        {/* Date Details Sheet */}
        <Sheet open={showDetailsSheet} onOpenChange={setShowDetailsSheet}>
          {renderDateDetails()}
        </Sheet>
      </div>
    </SidebarProvider>
  )
}
