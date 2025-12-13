"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Clock, Plus, Users, CalendarIcon, CheckCircle, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const employees = [
  { id: "EMP001", name: "John Smith", role: "Trainer", department: "Training", workingHours: 8, branch: "Downtown" },
  {
    id: "EMP002",
    name: "Sarah Wilson",
    role: "Receptionist",
    department: "Reception",
    workingHours: 9,
    branch: "Downtown",
  },
  { id: "EMP003", name: "Mike Johnson", role: "Sales", department: "Sales", workingHours: 8, branch: "Westside" },
  { id: "EMP004", name: "Emily Brown", role: "Trainer", department: "Training", workingHours: 7, branch: "Downtown" },
  {
    id: "EMP005",
    name: "David Lee",
    role: "Maintenance",
    department: "Maintenance",
    workingHours: 8,
    branch: "Eastside",
  },
]

function ManagerShiftsPageInner() {
  const router = useRouter()
  const { collapsed } = useSidebar()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [currentPage, setCurrentPage] = useState(0)
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  })

  const [specialShiftDialog, setSpecialShiftDialog] = useState<{
    open: boolean
    employee: (typeof employees)[0] | null
    date: Date | null
  }>({
    open: false,
    employee: null,
    date: null,
  })

  const [slot1Start, setSlot1Start] = useState("")
  const [slot1End, setSlot1End] = useState("")
  const [slot2Start, setSlot2Start] = useState("")
  const [slot2End, setSlot2End] = useState("")
  const [useSlot2, setUseSlot2] = useState(false)

  const employeesPerPage = 10

  const stats = {
    totalShifts: 45,
    activeToday: 12,
    scheduledUpcoming: 28,
    employees: 18,
  }

  const generateDateColumns = () => {
    const dates = []
    let currentDate = new Date(dateRange.start)
    while (currentDate <= dateRange.end) {
      dates.push(new Date(currentDate))
      currentDate = addDays(currentDate, 1)
    }
    return dates
  }

  const dateColumns = generateDateColumns()

  const getShiftForEmployeeOnDate = (employeeId: string, date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    const dayOfWeek = format(date, "EEEE")

    // Generate dynamic shifts for demonstration
    // EMP001 - Full shifts on weekdays
    if (employeeId === "EMP001" && ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(dayOfWeek)) {
      return {
        type: "normal",
        slots: [
          { startTime: "09:00", endTime: "13:00" },
          { startTime: "14:00", endTime: "18:00" },
        ],
        totalHours: 8,
      }
    }

    // EMP002 - Flexible shifts on Monday, Wednesday, Friday
    if (employeeId === "EMP002" && ["Monday", "Wednesday", "Friday"].includes(dayOfWeek)) {
      return {
        type: "flexible",
        totalHours: 9,
      }
    }

    // EMP003 - Normal shifts Tuesday to Saturday
    if (employeeId === "EMP003" && ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].includes(dayOfWeek)) {
      return {
        type: "normal",
        slots: [
          { startTime: "10:00", endTime: "14:00" },
          { startTime: "15:00", endTime: "19:00" },
        ],
        totalHours: 8,
      }
    }

    // EMP004 - Flexible on weekdays
    if (employeeId === "EMP004" && ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(dayOfWeek)) {
      return {
        type: "flexible",
        totalHours: 7,
      }
    }

    // EMP005 - Normal shifts Monday to Friday
    if (employeeId === "EMP005" && ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(dayOfWeek)) {
      return {
        type: "normal",
        slots: [{ startTime: "08:00", endTime: "16:00" }],
        totalHours: 8,
      }
    }

    return null
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || emp.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const paginatedEmployees = filteredEmployees.slice(
    currentPage * employeesPerPage,
    (currentPage + 1) * employeesPerPage,
  )
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage)

  const departments = ["Training", "Sales", "Reception", "Maintenance", "Management"]

  const handlePreviousWeek = () => {
    setDateRange({
      start: addDays(dateRange.start, -7),
      end: addDays(dateRange.end, -7),
    })
  }

  const handleNextWeek = () => {
    setDateRange({
      start: addDays(dateRange.start, 7),
      end: addDays(dateRange.end, 7),
    })
  }

  const handleCellClick = (employee: (typeof employees)[0], date: Date) => {
    setSpecialShiftDialog({
      open: true,
      employee,
      date,
    })
    // Reset form
    setSlot1Start("")
    setSlot1End("")
    setSlot2Start("")
    setSlot2End("")
    setUseSlot2(false)
  }

  const calculateTotalHours = () => {
    let total = 0

    if (slot1Start && slot1End) {
      const [h1Start, m1Start] = slot1Start.split(":").map(Number)
      const [h1End, m1End] = slot1End.split(":").map(Number)
      const minutes1 = h1End * 60 + m1End - (h1Start * 60 + m1Start)
      total += minutes1 / 60
    }

    if (useSlot2 && slot2Start && slot2End) {
      const [h2Start, m2Start] = slot2Start.split(":").map(Number)
      const [h2End, m2End] = slot2End.split(":").map(Number)
      const minutes2 = h2End * 60 + m2End - (h2Start * 60 + m2Start)
      total += minutes2 / 60
    }

    return total.toFixed(1)
  }

  const handleCreateSpecialShift = () => {
    const totalHours = Number.parseFloat(calculateTotalHours())

    if (!specialShiftDialog.employee || !specialShiftDialog.date) return

    if (!slot1Start || !slot1End) {
      alert("Please enter at least one time slot")
      return
    }

    if (totalHours < specialShiftDialog.employee.workingHours) {
      const confirm = window.confirm(
        `Total hours (${totalHours}h) is less than required hours (${specialShiftDialog.employee.workingHours}h). Continue anyway?`,
      )
      if (!confirm) return
    }

    console.log("[v0] Creating special shift:", {
      employee: specialShiftDialog.employee.name,
      date: format(specialShiftDialog.date, "yyyy-MM-dd"),
      slot1: { start: slot1Start, end: slot1End },
      slot2: useSlot2 ? { start: slot2Start, end: slot2End } : null,
      totalHours,
    })

    // Here you would save the special shift to your backend
    alert(
      `Special shift created for ${specialShiftDialog.employee.name} on ${format(specialShiftDialog.date, "dd MMM yyyy")}`,
    )

    setSpecialShiftDialog({ open: false, employee: null, date: null })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="manager" />

      <main className={cn("flex-1 transition-all duration-300 ease-in-out", collapsed ? "pl-16" : "pl-64")}>
        <div className="container py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Shift Management</h1>
              <p className="text-muted-foreground mt-1">Manage employee shifts and schedules</p>
            </div>
            <Button onClick={() => router.push("/manager/shifts/create")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Shift
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Shifts</p>
                    <p className="text-2xl font-bold">{stats.totalShifts}</p>
                  </div>
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Today</p>
                    <p className="text-2xl font-bold text-emerald-600">{stats.activeToday}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.scheduledUpcoming}</p>
                  </div>
                  <CalendarIcon className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Employees</p>
                    <p className="text-2xl font-bold">{stats.employees}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Date Range */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Shifts</CardTitle>
              <CardDescription>View and manage employee shift schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm font-medium whitespace-nowrap px-4 py-2 border rounded-md bg-muted/30">
                    {format(dateRange.start, "dd MMM")} - {format(dateRange.end, "dd MMM yyyy")}
                  </div>
                  <Button variant="outline" size="icon" onClick={handleNextWeek}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="p-3 text-left font-semibold sticky left-0 bg-muted/30 z-10 min-w-[200px]">
                        Employee
                      </th>
                      {dateColumns.map((date) => (
                        <th key={date.toISOString()} className="p-3 text-center font-semibold min-w-[150px]">
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-muted-foreground">{format(date, "EEE")}</span>
                            <span className="text-sm">{format(date, "dd MMM")}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEmployees.map((employee) => (
                      <tr key={employee.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3 sticky left-0 bg-background z-10">
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {employee.id} • {employee.department}
                            </p>
                            <p className="text-xs text-muted-foreground">Required: {employee.workingHours}h</p>
                          </div>
                        </td>
                        {dateColumns.map((date) => {
                          const shift = getShiftForEmployeeOnDate(employee.id, date)
                          return (
                            <td
                              key={date.toISOString()}
                              className="p-2 text-center align-top cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => handleCellClick(employee, date)}
                            >
                              {shift ? (
                                <div className="space-y-1.5 min-h-[60px]">
                                  <div className="flex flex-col items-center gap-1">
                                    <Badge
                                      variant={shift.type === "normal" ? "default" : "secondary"}
                                      className={cn(
                                        "text-xs font-semibold",
                                        shift.type === "normal" ? "bg-primary" : "bg-blue-600",
                                      )}
                                    >
                                      {shift.type === "normal" ? "Normal" : "Flexible"}
                                    </Badge>
                                    <span className="text-xs font-medium text-muted-foreground">
                                      {shift.totalHours}h
                                    </span>
                                  </div>
                                  {shift.type === "normal" && shift.slots && (
                                    <div className="text-[11px] space-y-0.5 bg-muted/30 rounded px-2 py-1">
                                      {shift.slots.map((slot: any, idx: number) => (
                                        <div key={idx} className="font-medium">
                                          <Clock className="w-3 h-3 inline mr-1" />
                                          {slot.startTime} - {slot.endTime}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="text-muted-foreground text-xs py-4">—</div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {currentPage * employeesPerPage + 1} to{" "}
                  {Math.min((currentPage + 1) * employeesPerPage, filteredEmployees.length)} of{" "}
                  {filteredEmployees.length} employees
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Special Shift Creation Dialog */}
      <Dialog
        open={specialShiftDialog.open}
        onOpenChange={(open) => setSpecialShiftDialog({ ...specialShiftDialog, open })}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Special Shift</DialogTitle>
            <DialogDescription>
              Create a custom shift for {specialShiftDialog.employee?.name} on{" "}
              {specialShiftDialog.date && format(specialShiftDialog.date, "EEEE, dd MMMM yyyy")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Employee Info */}
            <div className="bg-muted/50 p-3 rounded-lg space-y-1">
              <p className="text-sm font-medium">{specialShiftDialog.employee?.name}</p>
              <p className="text-xs text-muted-foreground">
                Required Working Hours: {specialShiftDialog.employee?.workingHours} hours
              </p>
            </div>

            {/* Time Slot 1 */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Time Slot 1 *</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Start Time</Label>
                  <Input type="time" value={slot1Start} onChange={(e) => setSlot1Start(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">End Time</Label>
                  <Input type="time" value={slot1End} onChange={(e) => setSlot1End(e.target.value)} required />
                </div>
              </div>
            </div>

            {/* Time Slot 2 Toggle */}
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Add Second Time Slot</Label>
              <Button
                type="button"
                variant={useSlot2 ? "default" : "outline"}
                size="sm"
                onClick={() => setUseSlot2(!useSlot2)}
              >
                {useSlot2 ? "Remove" : "Add Slot 2"}
              </Button>
            </div>

            {/* Time Slot 2 */}
            {useSlot2 && (
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Time Slot 2</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Start Time</Label>
                    <Input type="time" value={slot2Start} onChange={(e) => setSlot2Start(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">End Time</Label>
                    <Input type="time" value={slot2End} onChange={(e) => setSlot2End(e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Total Hours Display */}
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Hours:</span>
                <span className="text-lg font-bold text-primary">{calculateTotalHours()}h</span>
              </div>
              {specialShiftDialog.employee &&
                Number.parseFloat(calculateTotalHours()) < specialShiftDialog.employee.workingHours && (
                  <p className="text-xs text-amber-600 mt-1">
                    ⚠ Below required hours ({specialShiftDialog.employee.workingHours}h)
                  </p>
                )}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setSpecialShiftDialog({ open: false, employee: null, date: null })}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateSpecialShift}>Create Special Shift</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function ManagerShiftsPage() {
  return (
    <SidebarProvider>
      <ManagerShiftsPageInner />
    </SidebarProvider>
  )
}
