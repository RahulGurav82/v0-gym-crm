"use client"

import { CardHeader } from "@/components/ui/card"

import { useState } from "react"
import { useSidebar, Sidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Building2,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Clock,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { BRANCHES } from "@/lib/branches"

interface Department {
  id: string
  code: string
  name: string
  branch: string
  branchId: string
  workingHours: number
  staffCount: number
  status: "active" | "inactive"
  createdAt: string
}

const initialDepartments: Department[] = [
  {
    id: "1",
    code: "DEP-001",
    name: "Management",
    branch: "Ghansoli",
    branchId: "YajpA3SoiaWY3xjx9CAX",
    workingHours: 8,
    staffCount: 5,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    code: "DEP-002",
    name: "Training",
    branch: "Ghansoli",
    branchId: "YajpA3SoiaWY3xjx9CAX",
    workingHours: 10,
    staffCount: 12,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    code: "DEP-003",
    name: "Sales",
    branch: "Nerul",
    branchId: "gvDFxqGIHoCBIiANZ0Lm",
    workingHours: 9,
    staffCount: 8,
    status: "active",
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    code: "DEP-004",
    name: "Reception",
    branch: "Ulwe",
    branchId: "18gIrEyeVVFc7iQwC3EG",
    workingHours: 12,
    staffCount: 4,
    status: "active",
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    code: "DEP-005",
    name: "Maintenance",
    branch: "Sanpada",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    workingHours: 8,
    staffCount: 3,
    status: "active",
    createdAt: "2024-02-15",
  },
  {
    id: "6",
    code: "DEP-006",
    name: "Housekeeping",
    branch: "Nerul",
    branchId: "gvDFxqGIHoCBIiANZ0Lm",
    workingHours: 8,
    staffCount: 6,
    status: "inactive",
    createdAt: "2024-03-01",
  },
  {
    id: "7",
    code: "DEP-007",
    name: "Training",
    branch: "Ulwe",
    branchId: "18gIrEyeVVFc7iQwC3EG",
    workingHours: 10,
    staffCount: 15,
    status: "active",
    createdAt: "2024-03-10",
  },
  {
    id: "8",
    code: "DEP-008",
    name: "Nutrition",
    branch: "Ghansoli",
    branchId: "YajpA3SoiaWY3xjx9CAX",
    workingHours: 6,
    staffCount: 2,
    status: "active",
    createdAt: "2024-03-20",
  },
]

function DepartmentsPageInner() {
  const { collapsed } = useSidebar()
  const [departments, setDepartments] = useState<Department[]>(initialDepartments)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Add Department Dialog State
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    branchId: "",
    workingHours: "",
  })

  // Edit Department Dialog State
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)

  // Generate unique department code
  const generateCode = () => {
    const existingCodes = departments.map((d) => Number.parseInt(d.code.split("-")[1]))
    const maxCode = Math.max(...existingCodes, 0)
    return `DEP-${String(maxCode + 1).padStart(3, "0")}`
  }

  // Filter departments
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.branch.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || dept.status === statusFilter
    const matchesBranch = branchFilter === "all" || dept.branch === branchFilter
    return matchesSearch && matchesStatus && matchesBranch
  })

  // Pagination
  const totalPages = Math.ceil(filteredDepartments.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedDepartments = filteredDepartments.slice(startIndex, startIndex + rowsPerPage)

  // Stats
  const totalDepartments = departments.length
  const activeDepartments = departments.filter((d) => d.status === "active").length
  const totalStaff = departments.reduce((acc, d) => acc + d.staffCount, 0)
  const avgWorkingHours = Math.round(departments.reduce((acc, d) => acc + d.workingHours, 0) / departments.length)

  // Add department
  const handleAddDepartment = () => {
    const selectedBranch = BRANCHES.find((b) => b.id === newDepartment.branchId)
    if (!selectedBranch || !newDepartment.name || !newDepartment.workingHours) return

    const newDept: Department = {
      id: String(departments.length + 1),
      code: generateCode(),
      name: newDepartment.name,
      branch: selectedBranch.name,
      branchId: selectedBranch.id,
      workingHours: Number.parseInt(newDepartment.workingHours),
      staffCount: 0,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setDepartments([...departments, newDept])
    setNewDepartment({ name: "", branchId: "", workingHours: "" })
    setShowAddDialog(false)
  }

  // Edit department
  const handleEditDepartment = () => {
    if (!editingDepartment) return

    setDepartments(departments.map((d) => (d.id === editingDepartment.id ? editingDepartment : d)))
    setShowEditDialog(false)
    setEditingDepartment(null)
  }

  // Delete department
  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id))
  }

  // Toggle status
  const handleToggleStatus = (id: string) => {
    setDepartments(
      departments.map((d) => (d.id === id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d)),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <main className={cn("transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Departments</h1>
              <p className="text-sm text-muted-foreground">Manage company departments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                  <DialogDescription>
                    Create a new department for your organization. A unique code will be generated automatically.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch">
                      Select Branch <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={newDepartment.branchId}
                      onValueChange={(value) =>
                        setNewDepartment({
                          ...newDepartment,
                          branchId: value,
                          branch: BRANCHES.find((b) => b.id === value)?.name || "",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANCHES.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name} ({branch.branchCode})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Department Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter department name"
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workingHours">
                      Working Hours per Day <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="workingHours"
                      type="number"
                      min="1"
                      max="24"
                      placeholder="Enter working hours per day (1-24)"
                      value={newDepartment.workingHours}
                      onChange={(e) => setNewDepartment({ ...newDepartment, workingHours: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Enter a value between 1 and 24 hours</p>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border">
                    <p className="text-sm text-muted-foreground">
                      Department Code: <span className="font-mono font-semibold text-foreground">{generateCode()}</span>
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddDepartment}
                    disabled={!newDepartment.name || !newDepartment.branchId || !newDepartment.workingHours}
                  >
                    Create Department
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Departments</p>
                    <p className="text-2xl font-bold">{totalDepartments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold">{activeDepartments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Staff</p>
                    <p className="text-2xl font-bold">{totalStaff}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Working Hours</p>
                    <p className="text-2xl font-bold">{avgWorkingHours}h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Table */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-lg font-semibold">All Departments</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search departments..."
                      className="pl-9 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={branchFilter} onValueChange={setBranchFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Branches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      {BRANCHES.map((branch) => (
                        <SelectItem key={branch.id} value={branch.name}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Code</TableHead>
                      <TableHead className="font-semibold">Department Name</TableHead>
                      <TableHead className="font-semibold">Branch</TableHead>
                      <TableHead className="font-semibold">Working Hours</TableHead>
                      <TableHead className="font-semibold">Staff Count</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Created</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDepartments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-32 text-center">
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Building2 className="w-10 h-10 opacity-20" />
                            <p>No departments found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedDepartments.map((dept) => (
                        <TableRow key={dept.id} className="hover:bg-muted/30">
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {dept.code}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              {dept.branch}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              {dept.workingHours} hours/day
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              {dept.staffCount}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={dept.status === "active" ? "default" : "secondary"}
                              className={cn(
                                dept.status === "active"
                                  ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                                  : "bg-muted text-muted-foreground",
                              )}
                            >
                              {dept.status === "active" ? (
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                              ) : (
                                <XCircle className="w-3 h-3 mr-1" />
                              )}
                              {dept.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(dept.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingDepartment(dept)
                                    setShowEditDialog(true)
                                  }}
                                >
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(dept.id)}>
                                  {dept.status === "active" ? (
                                    <>
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteDepartment(dept.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rows per page:</span>
                  <Select
                    value={String(rowsPerPage)}
                    onValueChange={(value) => {
                      setRowsPerPage(Number(value))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className="w-16 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground ml-4">
                    Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredDepartments.length)} of{" "}
                    {filteredDepartments.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm px-3">
                    Page {currentPage} of {totalPages || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Department</DialogTitle>
              <DialogDescription>Update department details. Department code cannot be changed.</DialogDescription>
            </DialogHeader>
            {editingDepartment && (
              <div className="space-y-4 py-4">
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-sm text-muted-foreground">
                    Department Code:{" "}
                    <span className="font-mono font-semibold text-foreground">{editingDepartment.code}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-branch">
                    Select Branch <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={editingDepartment.branchId}
                    onValueChange={(value) => {
                      const selectedBranch = BRANCHES.find((b) => b.id === value)
                      if (selectedBranch) {
                        setEditingDepartment({
                          ...editingDepartment,
                          branchId: value,
                          branch: selectedBranch.name,
                        })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRANCHES.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name} ({branch.branchCode})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-name">
                    Department Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="edit-name"
                    placeholder="Enter department name"
                    value={editingDepartment.name}
                    onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-workingHours">
                    Working Hours per Day <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="edit-workingHours"
                    type="number"
                    min="1"
                    max="24"
                    placeholder="Enter working hours per day (1-24)"
                    value={editingDepartment.workingHours}
                    onChange={(e) =>
                      setEditingDepartment({
                        ...editingDepartment,
                        workingHours: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editingDepartment.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setEditingDepartment({ ...editingDepartment, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditDepartment}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

export function DepartmentsPage() {
  return <DepartmentsPageInner />
}
