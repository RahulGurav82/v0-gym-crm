"use client"

import { useState } from "react"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarIcon, CheckCircle, Plus, Trash2, Send, Save, ArrowLeft, Clock, Check, X, Eye } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const departments = ["Training", "Sales", "Reception", "Maintenance", "Management"]

// Mock attendance correction requests created by the manager
const mockCorrectionRequests = [
  {
    id: "1",
    requestId: "ATT-COR-001",
    employeeId: "EMP001",
    employeeName: "John Smith",
    dateRange: {
      start: "2026-01-25",
      end: "2026-01-28",
    },
    submittedDate: "2026-01-29",
    status: "pending",
    days: 4,
    reason: "Incorrect punch in/out times due to system error",
    requestedBy: { name: "Manager A" },
    attendance: {
      "2026-01-25": { checkIn: "09:15 AM", checkOut: "06:30 PM", totalHours: "9h 15m" },
      "2026-01-26": { checkIn: "09:00 AM", checkOut: "06:00 PM", totalHours: "9h 0m" },
      "2026-01-27": { checkIn: "09:00 AM", checkOut: "06:00 PM", totalHours: "9h 0m" },
      "2026-01-28": { checkIn: "09:00 AM", checkOut: "06:00 PM", totalHours: "9h 0m" },
    },
  },
  {
    id: "2",
    requestId: "ATT-COR-002",
    employeeId: "EMP002",
    employeeName: "Sarah Wilson",
    dateRange: {
      start: "2026-01-20",
      end: "2026-01-22",
    },
    submittedDate: "2026-01-23",
    status: "approved",
    days: 3,
    reason: "Late arrival due to medical appointment",
    requestedBy: { name: "Manager B" },
    attendance: {
      "2026-01-20": { checkIn: "08:45 AM", checkOut: "05:45 PM", totalHours: "9h 0m" },
      "2026-01-21": { checkIn: "08:45 AM", checkOut: "05:45 PM", totalHours: "9h 0m" },
      "2026-01-22": { checkIn: "08:45 AM", checkOut: "05:45 PM", totalHours: "9h 0m" },
    },
  },
  {
    id: "3",
    requestId: "ATT-COR-003",
    employeeId: "EMP003",
    employeeName: "Mike Johnson",
    dateRange: {
      start: "2026-01-15",
      end: "2026-01-15",
    },
    submittedDate: "2026-01-28",
    status: "approved",
    days: 1,
    reason: "System sync issue - corrected punch records",
    requestedBy: { name: "Manager C" },
    attendance: {
      "2026-01-15": { checkIn: "10:00 AM", checkOut: "07:00 PM", totalHours: "9h 0m" },
    },
  },
  {
    id: "4",
    requestId: "ATT-COR-004",
    employeeId: "EMP004",
    employeeName: "Emily Brown",
    dateRange: {
      start: "2026-01-18",
      end: "2026-01-19",
    },
    submittedDate: "2026-01-27",
    status: "rejected",
    days: 2,
    reason: "Unauthorized absence correction",
    requestedBy: { name: "Manager D" },
    attendance: {
      "2026-01-18": { checkIn: "09:00 AM", checkOut: "02:00 PM", totalHours: "5h 0m" },
      "2026-01-19": { checkIn: "03:00 PM", checkOut: "06:00 PM", totalHours: "3h 0m" },
    },
  },
]

const employees = [
  {
    id: "EMP001",
    name: "John Smith",
    role: "Trainer",
    department: "Training",
    workingHours: 8,
    branch: "Downtown",
  },
  {
    id: "EMP002",
    name: "Sarah Wilson",
    role: "Receptionist",
    department: "Reception",
    workingHours: 9,
    branch: "Downtown",
  },
  {
    id: "EMP003",
    name: "Mike Johnson",
    role: "Sales",
    department: "Sales",
    workingHours: 8,
    branch: "Westside",
  },
  {
    id: "EMP004",
    name: "Emily Brown",
    role: "Trainer",
    department: "Training",
    workingHours: 7,
    branch: "Downtown",
  },
  {
    id: "EMP005",
    name: "David Lee",
    role: "Maintenance",
    department: "Maintenance",
    workingHours: 8,
    branch: "Eastside",
  },
]

// Mock past attendance data
const getPastAttendance = (employeeId: string, date: Date) => {
  // Simulate actual check-in/check-out times from system
  const dayOfWeek = date.getDay()

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    // Weekend - no attendance
    return {
      date: format(date, "yyyy-MM-dd"),
      slots: [],
      status: "Off",
    }
  }

  // Simulate different check-in patterns for different employees
  const patterns: Record<string, TimeSlot[]> = {
    EMP001: [{ checkIn: "09:15 AM", checkOut: "06:30 PM" }],
    EMP002: [{ checkIn: "08:45 AM", checkOut: "05:45 PM" }],
    EMP003: [{ checkIn: "10:00 AM", checkOut: "07:00 PM" }],
    EMP004: [
      { checkIn: "09:00 AM", checkOut: "02:00 PM" },
      { checkIn: "03:00 PM", checkOut: "06:00 PM" },
    ],
    EMP005: [{ checkIn: "07:30 AM", checkOut: "04:30 PM" }],
  }

  return {
    date: format(date, "yyyy-MM-dd"),
    slots: patterns[employeeId] || [{ checkIn: "09:00 AM", checkOut: "06:00 PM" }],
    status: "Present",
  }
}

interface TimeSlot {
  checkIn: string
  checkOut: string
}

interface EmployeeAttendance {
  employeeId: string
  employeeName: string
  dates: {
    date: string
    slots: TimeSlot[]
    totalHours: string
    status: string
  }[]
}

function ManagerMarkAttendanceInner() {
  const router = useRouter()
  const { collapsed } = useSidebar()

  const [step, setStep] = useState(1) // 1: Select Dept, 2: Select Employees & Date Range, 3: Edit Attendance
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [attendanceData, setAttendanceData] = useState<EmployeeAttendance[]>([])
  const [correctionRequests, setCorrectionRequests] = useState(mockCorrectionRequests)
  const [selectedRequest, setSelectedRequest] = useState<(typeof mockCorrectionRequests)[0] | null>(null)
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [pendingRequests, setPendingRequests] = useState(mockCorrectionRequests.filter(req => req.status === 'pending'));
  const [showRequestDetails, setShowRequestDetails] = useState(false);

  const handleDepartmentNext = () => {
    if (selectedDepartment) {
      setStep(2)
    }
  }

  const handleEmployeesNext = () => {
    if (selectedEmployees.length > 0 && startDate && endDate) {
      const attendance: EmployeeAttendance[] = selectedEmployees.map((empId) => {
        const employee = employees.find((e) => e.id === empId)!
        const dates: EmployeeAttendance["dates"] = []

        // Loop through all dates from start to end
        const currentDate = new Date(startDate)
        while (currentDate <= endDate) {
          const pastAttendance = getPastAttendance(empId, currentDate)
          dates.push({
            date: pastAttendance.date,
            slots: pastAttendance.slots,
            totalHours: calculateTotalHours(pastAttendance.slots),
            status: pastAttendance.status,
          })
          currentDate.setDate(currentDate.getDate() + 1)
        }

        return {
          employeeId: empId,
          employeeName: employee.name,
          dates,
        }
      })
      setAttendanceData(attendance)
      setStep(3)
    }
  }

  const calculateTotalHours = (slots: TimeSlot[]): string => {
    let totalMinutes = 0
    slots.forEach((slot) => {
      const checkIn = parseTime(slot.checkIn)
      const checkOut = parseTime(slot.checkOut)
      if (checkIn && checkOut) {
        totalMinutes += (checkOut - checkIn) / (1000 * 60)
      }
    })
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.round(totalMinutes % 60)
    return `${hours}h ${minutes}m`
  }

  const parseTime = (timeStr: string): number | null => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    if (!match) return null
    let hours = Number.parseInt(match[1])
    const minutes = Number.parseInt(match[2])
    const period = match[3].toUpperCase()
    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date.getTime()
  }

  const handleAddSlot = (employeeId: string, dateIndex: number) => {
    setAttendanceData((prev) =>
      prev.map((emp) =>
        emp.employeeId === employeeId
          ? {
              ...emp,
              dates: emp.dates.map((d, idx) =>
                idx === dateIndex
                  ? {
                      ...d,
                      slots: [...d.slots, { checkIn: "", checkOut: "" }],
                    }
                  : d,
              ),
            }
          : emp,
      ),
    )
  }

  const handleRemoveSlot = (employeeId: string, dateIndex: number, slotIndex: number) => {
    setAttendanceData((prev) =>
      prev.map((emp) =>
        emp.employeeId === employeeId
          ? {
              ...emp,
              dates: emp.dates.map((d, idx) =>
                idx === dateIndex
                  ? {
                      ...d,
                      slots: d.slots.filter((_, sIdx) => sIdx !== slotIndex),
                    }
                  : d,
              ),
            }
          : emp,
      ),
    )
  }

  const handleSlotChange = (
    employeeId: string,
    dateIndex: number,
    slotIndex: number,
    field: "checkIn" | "checkOut",
    value: string,
  ) => {
    setAttendanceData((prev) =>
      prev.map((emp) => {
        if (emp.employeeId === employeeId) {
          const newDates = emp.dates.map((d, idx) => {
            if (idx === dateIndex) {
              const newSlots = [...d.slots]
              newSlots[slotIndex] = { ...newSlots[slotIndex], [field]: value }
              return {
                ...d,
                slots: newSlots,
                totalHours: calculateTotalHours(newSlots),
              }
            }
            return d
          })
          return {
            ...emp,
            dates: newDates,
          }
        }
        return emp
      }),
    )
  }

  const handleSubmitForApproval = () => {
    // Submit to head for approval
    alert("Attendance submitted for Head approval!")
    router.push("/manager/shifts")
  }

  const departmentEmployees = employees.filter((emp) => emp.department === selectedDepartment)

  const toggleEmployeeSelection = (empId: string) => {
    setSelectedEmployees((prev) => (prev.includes(empId) ? prev.filter((id) => id !== empId) : [...prev, empId]))
  }

  const handleViewRequest = (request: (typeof mockCorrectionRequests)[0]) => {
    setSelectedRequest(request)
    setShowRequestDialog(true)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "approved":
        return "bg-green-100 text-green-800 border-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const handleRequestAction = (request: (typeof mockCorrectionRequests)[0], action: "approve" | "reject") => {
    setActionType(action)
    setSelectedRequest(request)
  }

  const confirmRequestAction = () => {
    if (selectedRequest && actionType) {
      const updatedRequests = correctionRequests.map(req => {
        if (req.id === selectedRequest.id) {
          return { ...req, status: actionType }
        }
        return req
      })
      setCorrectionRequests(updatedRequests)
      setPendingRequests(updatedRequests.filter(req => req.status === 'pending'))
      setActionType(null)
      setSelectedRequest(null)
      setShowRequestDialog(false)
      alert(`Request ${actionType === "approve" ? "approved" : "rejected"}`)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="manager" />

      <main className={cn("flex-1 transition-all duration-300", collapsed ? "ml-16" : "ml-64")}>
        <div className="container mx-auto p-6 max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Mark Attendance</h1>
                <p className="text-muted-foreground">Edit employee attendance and submit for approval</p>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Step {step} of 3
            </Badge>
          </div>

          {/* Submitted Correction Requests Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>My Submitted Requests</CardTitle>
              <CardDescription>Attendance correction requests you have submitted for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Request ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Employee</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Date Range</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Days</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Submitted</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {correctionRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline" className="font-mono">
                            {request.requestId}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">{request.employeeName}</td>
                        <td className="px-4 py-3 text-sm">
                          {format(new Date(request.dateRange.start), "MMM dd")} -{" "}
                          {format(new Date(request.dateRange.end), "MMM dd")}
                        </td>
                        <td className="px-4 py-3 text-sm">{request.days} day(s)</td>
                        <td className="px-4 py-3 text-sm">
                          {format(new Date(request.submittedDate), "MMM dd, yyyy")}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className={cn("border", getStatusBadgeColor(request.status))}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewRequest(request)}
                            className="gap-1 bg-transparent"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Select Department */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Department</CardTitle>
                <CardDescription>Choose the department to manage attendance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Department *</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleDepartmentNext} disabled={!selectedDepartment}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Select Employees & Date Range */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Employees & Date Range</CardTitle>
                <CardDescription>Choose employees and the date range to edit attendance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Range Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) => date > new Date() || (endDate ? date > endDate : false)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => date > new Date() || (startDate ? date < startDate : false)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Employee Selection */}
                <div className="space-y-2">
                  <Label>Select Employees ({selectedEmployees.length} selected)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-2 border rounded-lg">
                    {departmentEmployees.map((emp) => (
                      <div
                        key={emp.id}
                        onClick={() => toggleEmployeeSelection(emp.id)}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all hover:border-primary",
                          selectedEmployees.includes(emp.id) && "border-primary bg-primary/5",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{emp.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {emp.id} • {emp.role}
                            </p>
                          </div>
                          {selectedEmployees.includes(emp.id) && <CheckCircle className="w-5 h-5 text-primary" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleEmployeesNext}
                    disabled={selectedEmployees.length === 0 || !startDate || !endDate}
                  >
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Edit Attendance */}
          {step === 3 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Edit Attendance -{" "}
                      {startDate && endDate && `${format(startDate, "PPP")} to ${format(endDate, "PPP")}`}
                    </CardTitle>
                    <CardDescription>
                      Update check-in/check-out times and add additional slots if needed
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              {attendanceData.map((emp) => (
                <Card key={emp.employeeId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{emp.employeeName}</CardTitle>
                        <CardDescription>{emp.employeeId}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {emp.dates.map((dateData, dateIndex) => (
                      <div key={dateIndex} className="border-2 rounded-lg p-4 bg-card">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <CalendarIcon className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold">{format(new Date(dateData.date), "EEEE, PPP")}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={dateData.status === "Present" ? "default" : "secondary"}>
                              {dateData.status}
                            </Badge>
                            <Badge variant="outline" className="text-base">
                              Total: {dateData.totalHours}
                            </Badge>
                          </div>
                        </div>

                        {dateData.status === "Off" ? (
                          <div className="text-center py-6 text-muted-foreground">
                            <p>Weekend / Day Off</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {dateData.slots.map((slot, slotIndex) => (
                              <div key={slotIndex} className="p-4 border rounded-lg bg-muted/30">
                                <div className="flex items-center justify-between mb-3">
                                  <Label className="text-base font-semibold">Time Slot {slotIndex + 1}</Label>
                                  {dateData.slots.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveSlot(emp.employeeId, dateIndex, slotIndex)}
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Check In Time</Label>
                                    <Input
                                      type="text"
                                      value={slot.checkIn}
                                      onChange={(e) =>
                                        handleSlotChange(
                                          emp.employeeId,
                                          dateIndex,
                                          slotIndex,
                                          "checkIn",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="09:00 AM"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Check Out Time</Label>
                                    <Input
                                      type="text"
                                      value={slot.checkOut}
                                      onChange={(e) =>
                                        handleSlotChange(
                                          emp.employeeId,
                                          dateIndex,
                                          slotIndex,
                                          "checkOut",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="06:00 PM"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}

                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                              onClick={() => handleAddSlot(emp.employeeId, dateIndex)}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Time Slot
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={handleSubmitForApproval}>
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Approval
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Request Details Dialog */}
          <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Request Details</DialogTitle>
                <DialogDescription>
                  {selectedRequest?.requestId} - {selectedRequest?.employeeName}
                </DialogDescription>
              </DialogHeader>

              {selectedRequest && (
                <div className="space-y-6">
                  {/* Request Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Employee Name</p>
                      <p className="font-semibold">{selectedRequest.employeeName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Request ID</p>
                      <p className="font-mono text-sm">{selectedRequest.requestId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Date Range</p>
                      <p className="font-semibold">
                        {format(new Date(selectedRequest.dateRange.start), "MMM dd")} -{" "}
                        {format(new Date(selectedRequest.dateRange.end), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Submitted Date</p>
                      <p className="font-semibold">{format(new Date(selectedRequest.submittedDate), "MMM dd, yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Days Affected</p>
                      <p className="font-semibold">{selectedRequest.days} day(s)</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Status</p>
                      <Badge className={cn("border", getStatusBadgeColor(selectedRequest.status))}>
                        {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground font-medium mb-2">Reason for Correction</p>
                    <p className="text-sm">{selectedRequest.reason}</p>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}

export default function ManagerMarkAttendance() {
  return (
    <SidebarProvider>
      <ManagerMarkAttendanceInner />
    </SidebarProvider>
  )
}
