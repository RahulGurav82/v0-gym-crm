"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  CalendarIcon,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Flag,
  Users,
  FileText,
  ListTodo,
  Search,
  Filter,
  X,
  Check,
} from "lucide-react"

interface Employee {
  id: string
  name: string
  role: string
  department: string
  branch: string
  avatar: string
}

const employees: Employee[] = [
  { id: "EMP001", name: "John Smith", role: "Sales Executive", department: "Sales", branch: "Downtown", avatar: "" },
  { id: "EMP002", name: "Sarah Wilson", role: "Admin Staff", department: "Admin", branch: "Downtown", avatar: "" },
  { id: "EMP003", name: "Mike Johnson", role: "Manager", department: "Management", branch: "Westside", avatar: "" },
  { id: "EMP004", name: "Emily Brown", role: "Trainer", department: "Training", branch: "Downtown", avatar: "" },
  { id: "EMP005", name: "David Lee", role: "Maintenance", department: "Operations", branch: "Eastside", avatar: "" },
  { id: "EMP006", name: "Lisa Chen", role: "Receptionist", department: "Front Desk", branch: "Westside", avatar: "" },
  { id: "EMP007", name: "Robert Taylor", role: "Trainer", department: "Training", branch: "Eastside", avatar: "" },
  {
    id: "EMP008",
    name: "Jessica Martinez",
    role: "Sales Executive",
    department: "Sales",
    branch: "Westside",
    avatar: "",
  },
  { id: "EMP009", name: "Chris Anderson", role: "Admin Staff", department: "Admin", branch: "Eastside", avatar: "" },
  { id: "EMP010", name: "Amanda White", role: "Manager", department: "Management", branch: "Downtown", avatar: "" },
]

const departments = ["All", "Sales", "Admin", "Management", "Training", "Operations", "Front Desk"]
const roles = ["All", "Sales Executive", "Admin Staff", "Manager", "Trainer", "Maintenance", "Receptionist"]
const branches = ["All", "Downtown", "Westside", "Eastside"]

const priorities = [
  { value: "low", label: "Low", icon: Flag, color: "text-slate-500 bg-slate-500/10" },
  { value: "medium", label: "Medium", icon: Flag, color: "text-blue-500 bg-blue-500/10" },
  { value: "high", label: "High", icon: AlertTriangle, color: "text-orange-500 bg-orange-500/10" },
  { value: "urgent", label: "Urgent", icon: AlertCircle, color: "text-red-500 bg-red-500/10" },
]

const categories = [
  "Sales",
  "Admin",
  "Training",
  "Maintenance",
  "Marketing",
  "HR",
  "Reports",
  "Procurement",
  "Customer Service",
]

interface AddTaskFormProps {
  onSuccess?: () => void
}

export function AddTaskForm({ onSuccess }: AddTaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [roleFilter, setRoleFilter] = useState("All")
  const [branchFilter, setBranchFilter] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        searchQuery === "" ||
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDepartment = departmentFilter === "All" || employee.department === departmentFilter
      const matchesRole = roleFilter === "All" || employee.role === roleFilter
      const matchesBranch = branchFilter === "All" || employee.branch === branchFilter

      return matchesSearch && matchesDepartment && matchesRole && matchesBranch
    })
  }, [searchQuery, departmentFilter, roleFilter, branchFilter])

  const activeFiltersCount = [departmentFilter, roleFilter, branchFilter].filter((f) => f !== "All").length

  const clearFilters = () => {
    setSearchQuery("")
    setDepartmentFilter("All")
    setRoleFilter("All")
    setBranchFilter("All")
  }

  const selectEmployee = (employeeId: string) => {
    setSelectedEmployee(selectedEmployee === employeeId ? null : employeeId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSuccess(true)
    setTimeout(() => {
      onSuccess?.()
    }, 1500)
  }

  const selectedEmployeeData = employees.find((emp) => emp.id === selectedEmployee)

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Task Created Successfully!</h3>
        <p className="text-sm text-muted-foreground text-center">
          The task has been assigned to {selectedEmployeeData?.name}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="flex items-center gap-2">
          <ListTodo className="h-4 w-4 text-muted-foreground" />
          Task Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-background"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe the task in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-background min-h-[100px] resize-none"
          required
        />
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Flag className="h-4 w-4 text-muted-foreground" />
          Priority <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-4 gap-2">
          {priorities.map((p) => {
            const Icon = p.icon
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all",
                  priority === p.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                )}
              >
                <div className={cn("p-2 rounded-lg mb-1", p.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">{p.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Due Date & Category */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            Due Date <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background",
                  !dueDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employee Selection - Individual Only */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          Assign to Employee <span className="text-red-500">*</span>
        </Label>

        {/* Search and Filter Controls */}
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={cn("gap-2", showFilters && "bg-primary/10 border-primary")}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Filter Employees</h4>
                {activeFiltersCount > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs h-7 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Department</Label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="bg-background h-9">
                      <SelectValue />
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
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Role</Label>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="bg-background h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Branch</Label>
                  <Select value={branchFilter} onValueChange={setBranchFilter}>
                    <SelectTrigger className="bg-background h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end">
            <span className="text-xs text-muted-foreground">
              Showing {filteredEmployees.length} of {employees.length} employees
            </span>
          </div>
        </div>

        {/* Employee Grid - Single Selection */}
        <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto p-1">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <button
                key={employee.id}
                type="button"
                onClick={() => selectEmployee(employee.id)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left relative",
                  selectedEmployee === employee.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                )}
              >
                {selectedEmployee === employee.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
                <Avatar className="h-10 w-10">
                  <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{employee.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {employee.id} - {employee.role}
                  </p>
                  <p className="text-xs text-muted-foreground/70 truncate">{employee.branch}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-2 py-8 text-center text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No employees found</p>
              <p className="text-xs">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Employee Preview */}
      {selectedEmployeeData && (
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground mb-3">Task will be assigned to:</p>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedEmployeeData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {selectedEmployeeData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{selectedEmployeeData.name}</p>
              <p className="text-xs text-muted-foreground">
                {selectedEmployeeData.id} - {selectedEmployeeData.role} - {selectedEmployeeData.branch}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-auto h-8 w-8 p-0"
              onClick={() => setSelectedEmployee(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!title || !description || !priority || !dueDate || !selectedEmployee || !category || isSubmitting}
          className="bg-[#ed9320] hover:bg-[#ed9320]/90 text-white min-w-[120px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </div>
          ) : (
            "Create Task"
          )}
        </Button>
      </div>
    </form>
  )
}
