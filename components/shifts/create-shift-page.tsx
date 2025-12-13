"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Search, Sparkles, Users } from "lucide-react"

const employees = [
  { id: "EMP001", name: "John Smith", role: "Trainer", department: "Training", workingHours: 8, branch: "Sanpada" },
  {
    id: "EMP002",
    name: "Sarah Wilson",
    role: "Receptionist",
    department: "Reception",
    workingHours: 8,
    branch: "Sanpada",
  },
  { id: "EMP003", name: "Mike Johnson", role: "Manager", department: "Management", workingHours: 9, branch: "Sanpada" },
  { id: "EMP004", name: "Emily Davis", role: "Trainer", department: "Training", workingHours: 8, branch: "Sanpada" },
  {
    id: "EMP005",
    name: "David Brown",
    role: "Maintenance",
    department: "Maintenance",
    workingHours: 8,
    branch: "Sanpada",
  },
  { id: "EMP006", name: "Lisa Anderson", role: "Sales", department: "Sales", workingHours: 8, branch: "Sanpada" },
]

export default function CreateShiftPage() {
  return (
    <SidebarProvider>
      <CreateShiftInner />
    </SidebarProvider>
  )
}

function CreateShiftInner() {
  const router = useRouter()
  const { isCollapsed } = useSidebar()
  const [step, setStep] = useState(1)
  const [shiftType, setShiftType] = useState<"normal" | "flexible" | null>(null)
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [employeeSlots, setEmployeeSlots] = useState<
    Record<
      string,
      {
        slot1: { enabled: boolean; start: string; end: string }
        slot2: { enabled: boolean; start: string; end: string }
      }
    >
  >({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const departments = ["Training", "Reception", "Management", "Maintenance", "Sales"]

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes("") || emp.id.toLowerCase().includes("")
    const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const selectedEmployeeData = employees.filter((emp) => selectedEmployees.includes(emp.id))

  const calculateHours = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return 0
    const [startHour, startMin] = startTime.split(":").map(Number)
    const [endHour, endMin] = endTime.split(":").map(Number)
    const start = startHour + startMin / 60
    const end = endHour + endMin / 60
    return Math.max(0, end - start)
  }

  const calculateEndTime = (startTime: string, requiredHours: number): string => {
    if (!startTime) return ""
    const [hour, minute] = startTime.split(":").map(Number)
    const totalMinutes = hour * 60 + minute + requiredHours * 60
    const endHour = Math.floor(totalMinutes / 60) % 24
    const endMinute = totalMinutes % 60
    return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`
  }

  const getTotalHours = (employeeId: string) => {
    const slots = employeeSlots[employeeId]
    if (!slots) return 0

    let total = 0
    if (slots.slot1.enabled) {
      total += calculateHours(slots.slot1.start, slots.slot1.end)
    }
    if (slots.slot2.enabled) {
      total += calculateHours(slots.slot2.start, slots.slot2.end)
    }
    return total
  }

  const toggleSlot = (employeeId: string, slotNumber: 1 | 2) => {
    setEmployeeSlots((prev) => {
      const current = prev[employeeId] || {
        slot1: { enabled: false, start: "", end: "" },
        slot2: { enabled: false, start: "", end: "" },
      }
      const slotKey = `slot${slotNumber}` as keyof typeof current

      return {
        ...prev,
        [employeeId]: {
          ...current,
          [slotKey]: { ...current[slotKey], enabled: !current[slotKey].enabled },
        },
      }
    })
  }

  const updateSlot = (
    employeeId: string,
    slotNumber: 1 | 2,
    field: "start" | "end",
    value: string,
    autoCalculate = false,
  ) => {
    const employee = employees.find((e) => e.id === employeeId)
    if (!employee) return

    setEmployeeSlots((prev) => {
      const current = prev[employeeId] || {
        slot1: { enabled: false, start: "", end: "" },
        slot2: { enabled: false, start: "", end: "" },
      }
      const slotKey = `slot${slotNumber}` as keyof typeof current

      if (field === "start" && autoCalculate) {
        // Auto-calculate end time when start time changes
        const endTime = calculateEndTime(value, employee.workingHours)
        return {
          ...prev,
          [employeeId]: {
            ...current,
            [slotKey]: { ...current[slotKey], start: value, end: endTime },
          },
        }
      }

      return {
        ...prev,
        [employeeId]: {
          ...current,
          [slotKey]: { ...current[slotKey], [field]: value },
        },
      }
    })
  }

  const handleEmployeeToggle = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees((prev) => [...prev, employeeId])
    } else {
      setSelectedEmployees((prev) => prev.filter((id) => id !== employeeId))
      // Clear slots when deselecting
      setEmployeeSlots((prev) => {
        const newSlots = { ...prev }
        delete newSlots[employeeId]
        return newSlots
      })
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (!shiftType) {
        alert("Please select a shift type")
        return
      }
    } else if (step === 2) {
      if (selectedEmployees.length === 0) {
        alert("Please select at least one employee")
        return
      }
      if (shiftType === "normal") {
        // Initialize time slots for normal shifts
        const initialSlots: Record<
          string,
          {
            slot1: { enabled: boolean; start: string; end: string }
            slot2: { enabled: boolean; start: string; end: string }
          }
        > = {}
        selectedEmployees.forEach((empId) => {
          initialSlots[empId] = {
            slot1: { enabled: true, start: "09:00", end: "17:00" },
            slot2: { enabled: false, start: "18:00", end: "20:00" },
          }
        })
        setEmployeeSlots(initialSlots)
      }
    }
    setStep(step + 1)
  }

  const handleSubmit = async () => {
    // Validate working hours for normal shift
    if (shiftType === "normal") {
      let allValid = true
      selectedEmployees.forEach((empId) => {
        const employee = employees.find((e) => e.id === empId)
        const totalHours = getTotalHours(empId)
        if (employee && totalHours !== employee.workingHours) {
          allValid = false
        }
      })

      if (!allValid) {
        alert("Please ensure all employees meet their required working hours")
        return
      }
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSuccess(true)

    setTimeout(() => {
      router.push("/manager/shifts")
    }, 2000)
  }

  const isStep1Complete = shiftType !== null
  const isStep2Complete = selectedEmployees.length > 0
  const isStep3Complete =
    shiftType === "flexible" ||
    selectedEmployees.every((empId) => {
      const employee = employees.find((e) => e.id === empId)
      const totalHours = getTotalHours(empId)
      return employee && totalHours === employee.workingHours
    })

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="manager" />

      <main className={cn("flex-1 transition-all duration-300 ease-in-out", isCollapsed ? "pl-16" : "pl-64")}>
        {/* Success State */}
        {success ? (
          <div className="flex items-center justify-center min-h-screen">
            <Card className="max-w-md w-full">
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Shift Created Successfully!</h3>
                  <p className="text-muted-foreground mt-1">Employee shifts have been scheduled. Redirecting...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="container max-w-5xl py-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Create Shift</h1>
                <p className="text-muted-foreground mt-1">Schedule employee shifts with time slots</p>
              </div>
              <Button variant="outline" onClick={() => router.push("/manager/shifts")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shifts
              </Button>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4">
              {[
                { num: 1, label: "Shift Type" },
                { num: 2, label: "Select Employees" },
                { num: 3, label: "Configure Slots" },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all",
                        step >= s.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {s.num}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-sm",
                        step >= s.num ? "text-primary font-medium" : "text-muted-foreground",
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div
                      className={cn(
                        "w-20 h-1 mx-4 rounded transition-colors",
                        step > s.num ? "bg-primary" : "bg-muted",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Shift Type Selection */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Shift Type</CardTitle>
                  <CardDescription>Choose between normal scheduled shifts or flexible shifts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                      type="button"
                      onClick={() => setShiftType("normal")}
                      className={cn(
                        "relative p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg",
                        shiftType === "normal"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      {shiftType === "normal" && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <Clock className="w-10 h-10 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Normal Shift</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Regular scheduled shifts with specific start and end times
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Fixed time slots</li>
                        <li>• Up to 2 slots per employee</li>
                        <li>• Must meet working hours</li>
                      </ul>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShiftType("flexible")}
                      className={cn(
                        "relative p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg",
                        shiftType === "flexible"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      {shiftType === "flexible" && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <Sparkles className="w-10 h-10 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Flexible Shift</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Flexible working hours without fixed time slots
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• No fixed times</li>
                        <li>• Based on required hours</li>
                        <li>• Employee manages timing</li>
                      </ul>
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Select Department & Employees */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Select Employees
                  </CardTitle>
                  <CardDescription>
                    {shiftType === "normal"
                      ? "Choose employees and configure their time slots"
                      : "Choose employees for flexible shift"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Department Filter */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Filter by Department</Label>
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem> {/* Updated value prop */}
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Search Employees</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search by name or ID..." value="" onChange={(e) => {}} className="pl-10" />
                      </div>
                    </div>
                  </div>

                  {/* Selected Count */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Selected Employees</span>
                    <Badge variant="secondary" className="text-base">
                      {selectedEmployees.length}
                    </Badge>
                  </div>

                  {/* Employee List */}
                  <div className="border rounded-lg max-h-[500px] overflow-y-auto">
                    {filteredEmployees.map((employee) => {
                      const isSelected = selectedEmployees.includes(employee.id)

                      return (
                        <div
                          key={employee.id}
                          className="p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => handleEmployeeToggle(employee.id, checked as boolean)}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">{employee.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {employee.id} • {employee.role} • {employee.department}
                                  </p>
                                </div>
                                <Badge variant="outline" className="ml-4">
                                  {employee.workingHours}h required
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {filteredEmployees.length === 0 && (
                      <div className="p-8 text-center text-muted-foreground">
                        <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No employees found</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Configure Slots (Normal) or Review (Flexible) */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>{shiftType === "normal" ? "Configure Time Slots" : "Review Selected Employees"}</CardTitle>
                  <CardDescription>
                    {shiftType === "normal"
                      ? "Set start and end times for each employee (up to 2 slots)"
                      : "Review employees and their required working hours"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedEmployeeData.map((employee) => {
                    const totalHours = getTotalHours(employee.id)
                    const isValid = totalHours === employee.workingHours

                    return (
                      <Card key={employee.id} className="overflow-hidden">
                        <div className="p-4 bg-muted/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-lg">{employee.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {employee.id} • {employee.role} • {employee.department}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="mb-1">
                                Required: {employee.workingHours}h
                              </Badge>
                              {shiftType === "normal" && (
                                <Badge
                                  variant={isValid ? "default" : "destructive"}
                                  className={isValid ? "bg-emerald-600" : ""}
                                >
                                  {totalHours.toFixed(1)}h / {employee.workingHours}h
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {shiftType === "normal" && (
                          <CardContent className="pt-6 space-y-6">
                            {/* Slot 1 */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={employeeSlots[employee.id]?.slot1.enabled || false}
                                  onCheckedChange={() => toggleSlot(employee.id, 1)}
                                />
                                <Label className="text-base font-semibold">Time Slot 1</Label>
                              </div>
                              {employeeSlots[employee.id]?.slot1.enabled && (
                                <div className="ml-8 space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label>Start Time *</Label>
                                      <Input
                                        type="time"
                                        value={employeeSlots[employee.id]?.slot1.start || ""}
                                        onChange={(e) => updateSlot(employee.id, 1, "start", e.target.value)}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>End Time *</Label>
                                      <Input
                                        type="time"
                                        value={employeeSlots[employee.id]?.slot1.end || ""}
                                        onChange={(e) => updateSlot(employee.id, 1, "end", e.target.value)}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const startTime = employeeSlots[employee.id]?.slot1.start
                                      if (startTime) {
                                        updateSlot(employee.id, 1, "start", startTime, true)
                                      }
                                    }}
                                    className="text-xs"
                                  >
                                    <Clock className="w-3 h-3 mr-1" />
                                    Auto-calculate end time
                                  </Button>
                                </div>
                              )}
                            </div>

                            {/* Slot 2 */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={employeeSlots[employee.id]?.slot2.enabled || false}
                                  onCheckedChange={() => toggleSlot(employee.id, 2)}
                                />
                                <Label className="text-base font-semibold">Time Slot 2</Label>
                              </div>
                              {employeeSlots[employee.id]?.slot2.enabled && (
                                <div className="ml-8 space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label>Start Time *</Label>
                                      <Input
                                        type="time"
                                        value={employeeSlots[employee.id]?.slot2.start || ""}
                                        onChange={(e) => updateSlot(employee.id, 2, "start", e.target.value)}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>End Time *</Label>
                                      <Input
                                        type="time"
                                        value={employeeSlots[employee.id]?.slot2.end || ""}
                                        onChange={(e) => updateSlot(employee.id, 2, "end", e.target.value)}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const startTime = employeeSlots[employee.id]?.slot2.start
                                      if (startTime) {
                                        updateSlot(employee.id, 2, "start", startTime, true)
                                      }
                                    }}
                                    className="text-xs"
                                  >
                                    <Clock className="w-3 h-3 mr-1" />
                                    Auto-calculate end time
                                  </Button>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    )
                  })}
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" onClick={() => setStep((prev) => Math.max(1, prev - 1))} disabled={step === 1}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={(step === 1 && !isStep1Complete) || (step === 2 && !isStep2Complete)}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading || !isStep3Complete}>
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Create Shift
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
