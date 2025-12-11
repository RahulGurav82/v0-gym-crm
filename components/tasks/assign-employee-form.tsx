"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { CheckCircle2, Users, Search, Filter, X, UserCheck, Users2 } from "lucide-react"

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

interface AssignEmployeeFormProps {
  taskId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function AssignEmployeeForm({ taskId, onSuccess, onCancel }: AssignEmployeeFormProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
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

  const toggleEmployee = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId) ? prev.filter((id) => id !== employeeId) : [...prev, employeeId],
    )
  }

  const selectAll = () => {
    const allIds = employees.map((emp) => emp.id)
    setSelectedEmployees(allIds)
  }

  const selectAllFiltered = () => {
    const filteredIds = filteredEmployees.map((emp) => emp.id)
    setSelectedEmployees((prev) => {
      const newSelection = new Set([...prev, ...filteredIds])
      return Array.from(newSelection)
    })
  }

  const clearSelection = () => {
    setSelectedEmployees([])
  }

  const removeEmployee = (employeeId: string) => {
    setSelectedEmployees((prev) => prev.filter((id) => id !== employeeId))
  }

  const isAllSelected = selectedEmployees.length === employees.length
  const isAllFilteredSelected =
    filteredEmployees.length > 0 && filteredEmployees.every((emp) => selectedEmployees.includes(emp.id))

  const handleSubmit = async () => {
    if (selectedEmployees.length === 0) return
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSuccess(true)
    setTimeout(() => {
      onSuccess?.()
    }, 1500)
  }

  const selectedEmployeesData = employees.filter((emp) => selectedEmployees.includes(emp.id))

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {selectedEmployees.length === 1 ? "Employee Assigned!" : "Employees Assigned!"}
        </h3>
        <p className="text-sm text-muted-foreground text-center">
          <span className="font-medium text-foreground">{selectedEmployees.length} employee(s)</span> have been assigned
          to task <span className="font-mono font-medium text-foreground">{taskId}</span>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Task ID Display */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground">Assigning employee(s) to task:</p>
        <p className="font-mono font-semibold text-lg">{taskId}</p>
      </div>

      {/* Employee Selection */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          Select Employee(s) <span className="text-red-500">*</span>
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

          <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-muted/30 border border-border">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={selectAll}
                disabled={isAllSelected}
                className="gap-2 h-8 bg-transparent"
              >
                <Users2 className="h-3.5 w-3.5" />
                Select All ({employees.length})
              </Button>
              {filteredEmployees.length !== employees.length && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={selectAllFiltered}
                  disabled={isAllFilteredSelected}
                  className="gap-2 h-8 bg-transparent"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  Select Filtered ({filteredEmployees.length})
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{selectedEmployees.length} selected</span>
              {selectedEmployees.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <span className="text-xs text-muted-foreground">
              Showing {filteredEmployees.length} of {employees.length} employees
            </span>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto p-1">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => {
              const isSelected = selectedEmployees.includes(employee.id)
              return (
                <button
                  key={employee.id}
                  type="button"
                  onClick={() => toggleEmployee(employee.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left relative",
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                  )}
                >
                  <div className="absolute top-2 right-2">
                    <Checkbox checked={isSelected} className="pointer-events-none" />
                  </div>
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
              )
            })
          ) : (
            <div className="col-span-2 py-8 text-center text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No employees found</p>
              <p className="text-xs">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {selectedEmployeesData.length > 0 && (
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">Selected Employees ({selectedEmployeesData.length}):</p>
            {selectedEmployeesData.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="h-6 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
            {selectedEmployeesData.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-background border border-border"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">{employee.name}</span>
                <button
                  type="button"
                  onClick={() => removeEmployee(employee.id)}
                  className="text-muted-foreground hover:text-foreground ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={selectedEmployees.length === 0 || isSubmitting}
          className="bg-[#ed9320] hover:bg-[#ed9320]/90 text-white min-w-[120px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Assigning...
            </div>
          ) : (
            `Assign ${selectedEmployees.length > 0 ? `(${selectedEmployees.length})` : ""}`
          )}
        </Button>
      </div>
    </div>
  )
}
