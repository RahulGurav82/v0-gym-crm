"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Mail,
  Phone,
  Shield,
  Calendar,
} from "lucide-react"

interface Staff {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: "Admin" | "Head" | "Manager" | "Employee" | "Trainer"
  department: "Management" | "Training" | "Sales" | "Maintenance" | "Reception"
  status: "Active" | "Inactive" | "On Leave"
  branch: string
  joinDate: string
  salary: string
  shift: "Morning" | "Evening" | "Night" | "Flexible"
}

const mockStaff: Staff[] = [
  {
    id: "S001",
    name: "Aditya Sharma",
    email: "aditya.sharma@fithub.com",
    phone: "+91 98765 43210",
    avatar: "",
    role: "Admin",
    department: "Management",
    status: "Active",
    branch: "Downtown",
    joinDate: "2022-01-15",
    salary: "₹75,000",
    shift: "Flexible",
  },
  {
    id: "S002",
    name: "Neha Gupta",
    email: "neha.gupta@fithub.com",
    phone: "+91 87654 32109",
    avatar: "",
    role: "Head",
    department: "Training",
    status: "Active",
    branch: "Westside",
    joinDate: "2022-03-20",
    salary: "₹60,000",
    shift: "Morning",
  },
  {
    id: "S003",
    name: "Ravi Kumar",
    email: "ravi.kumar@fithub.com",
    phone: "+91 76543 21098",
    avatar: "",
    role: "Manager",
    department: "Sales",
    status: "Active",
    branch: "Downtown",
    joinDate: "2022-06-10",
    salary: "₹50,000",
    shift: "Morning",
  },
  {
    id: "S004",
    name: "Priyanka Singh",
    email: "priyanka.singh@fithub.com",
    phone: "+91 65432 10987",
    avatar: "",
    role: "Trainer",
    department: "Training",
    status: "Active",
    branch: "Eastside",
    joinDate: "2023-01-05",
    salary: "₹35,000",
    shift: "Evening",
  },
  {
    id: "S005",
    name: "Sanjay Verma",
    email: "sanjay.verma@fithub.com",
    phone: "+91 54321 09876",
    avatar: "",
    role: "Employee",
    department: "Reception",
    status: "On Leave",
    branch: "Westside",
    joinDate: "2023-04-15",
    salary: "₹25,000",
    shift: "Morning",
  },
  {
    id: "S006",
    name: "Anjali Reddy",
    email: "anjali.reddy@fithub.com",
    phone: "+91 43210 98765",
    avatar: "",
    role: "Trainer",
    department: "Training",
    status: "Active",
    branch: "Downtown",
    joinDate: "2023-02-20",
    salary: "₹38,000",
    shift: "Evening",
  },
  {
    id: "S007",
    name: "Manoj Patel",
    email: "manoj.patel@fithub.com",
    phone: "+91 32109 87654",
    avatar: "",
    role: "Employee",
    department: "Maintenance",
    status: "Active",
    branch: "Eastside",
    joinDate: "2023-07-01",
    salary: "₹22,000",
    shift: "Night",
  },
  {
    id: "S008",
    name: "Kavitha Nair",
    email: "kavitha.nair@fithub.com",
    phone: "+91 21098 76543",
    avatar: "",
    role: "Manager",
    department: "Management",
    status: "Active",
    branch: "Westside",
    joinDate: "2022-09-12",
    salary: "₹55,000",
    shift: "Morning",
  },
  {
    id: "S009",
    name: "Deepak Yadav",
    email: "deepak.yadav@fithub.com",
    phone: "+91 10987 65432",
    avatar: "",
    role: "Trainer",
    department: "Training",
    status: "Inactive",
    branch: "Downtown",
    joinDate: "2022-11-25",
    salary: "₹32,000",
    shift: "Morning",
  },
  {
    id: "S010",
    name: "Sunita Iyer",
    email: "sunita.iyer@fithub.com",
    phone: "+91 09876 54321",
    avatar: "",
    role: "Employee",
    department: "Sales",
    status: "Active",
    branch: "Eastside",
    joinDate: "2023-05-18",
    salary: "₹28,000",
    shift: "Evening",
  },
  {
    id: "S011",
    name: "Arjun Menon",
    email: "arjun.menon@fithub.com",
    phone: "+91 98765 12345",
    avatar: "",
    role: "Trainer",
    department: "Training",
    status: "Active",
    branch: "Downtown",
    joinDate: "2023-08-01",
    salary: "₹36,000",
    shift: "Morning",
  },
  {
    id: "S012",
    name: "Rekha Krishnan",
    email: "rekha.krishnan@fithub.com",
    phone: "+91 87654 23456",
    avatar: "",
    role: "Employee",
    department: "Reception",
    status: "Active",
    branch: "Westside",
    joinDate: "2023-09-10",
    salary: "₹24,000",
    shift: "Evening",
  },
]

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50]

export function StaffTable() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [branchFilter, setBranchFilter] = useState<string>("all")
  const [shiftFilter, setShiftFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Filter staff
  const filteredStaff = useMemo(() => {
    return mockStaff.filter((staff) => {
      const matchesSearch =
        staff.name.toLowerCase().includes(search.toLowerCase()) ||
        staff.email.toLowerCase().includes(search.toLowerCase()) ||
        staff.id.toLowerCase().includes(search.toLowerCase()) ||
        staff.phone.includes(search)

      const matchesStatus = statusFilter === "all" || staff.status === statusFilter
      const matchesRole = roleFilter === "all" || staff.role === roleFilter
      const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter
      const matchesBranch = branchFilter === "all" || staff.branch === branchFilter
      const matchesShift = shiftFilter === "all" || staff.shift === shiftFilter

      return matchesSearch && matchesStatus && matchesRole && matchesDepartment && matchesBranch && matchesShift
    })
  }, [search, statusFilter, roleFilter, departmentFilter, branchFilter, shiftFilter])

  // Pagination
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStaff = filteredStaff.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">Active</Badge>
        )
      case "Inactive":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20">Inactive</Badge>
      case "On Leave":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20">
            On Leave
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Admin</Badge>
      case "Head":
        return (
          <Badge className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-purple-500/20">Head</Badge>
        )
      case "Manager":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20">Manager</Badge>
      case "Trainer":
        return <Badge className="bg-teal-500/10 text-teal-600 hover:bg-teal-500/20 border-teal-500/20">Trainer</Badge>
      case "Employee":
        return <Badge variant="outline">Employee</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getDepartmentBadge = (department: string) => {
    switch (department) {
      case "Management":
        return <span className="text-sm font-medium text-primary">{department}</span>
      case "Training":
        return <span className="text-sm font-medium text-teal-600">{department}</span>
      case "Sales":
        return <span className="text-sm font-medium text-blue-600">{department}</span>
      case "Maintenance":
        return <span className="text-sm font-medium text-yellow-600">{department}</span>
      case "Reception":
        return <span className="text-sm font-medium text-purple-600">{department}</span>
      default:
        return <span className="text-sm">{department}</span>
    }
  }

  const resetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setRoleFilter("all")
    setDepartmentFilter("all")
    setBranchFilter("all")
    setShiftFilter("all")
    setCurrentPage(1)
  }

  const hasActiveFilters =
    search ||
    statusFilter !== "all" ||
    roleFilter !== "all" ||
    departmentFilter !== "all" ||
    branchFilter !== "all" ||
    shiftFilter !== "all"

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-lg font-semibold">All Staff Members</CardTitle>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, ID, phone..."
                className="pl-9"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>

            {/* Filter dropdowns */}
            <div className="flex flex-wrap gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[130px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={roleFilter}
                onValueChange={(value) => {
                  setRoleFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[130px]">
                  <Shield className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Head">Head</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Trainer">Trainer</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={departmentFilter}
                onValueChange={(value) => {
                  setDepartmentFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Reception">Reception</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={branchFilter}
                onValueChange={(value) => {
                  setBranchFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="Downtown">Downtown</SelectItem>
                  <SelectItem value="Westside">Westside</SelectItem>
                  <SelectItem value="Eastside">Eastside</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={shiftFilter}
                onValueChange={(value) => {
                  setShiftFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[130px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground">
            Showing {paginatedStaff.length} of {filteredStaff.length} staff members
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {/* Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[220px]">Staff</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStaff.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    <p className="text-muted-foreground">No staff found</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedStaff.map((staff) => (
                  <TableRow key={staff.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={staff.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {staff.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">{staff.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="truncate max-w-[150px]">{staff.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {staff.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(staff.role)}</TableCell>
                    <TableCell>{getDepartmentBadge(staff.department)}</TableCell>
                    <TableCell>{getStatusBadge(staff.status)}</TableCell>
                    <TableCell className="text-sm">{staff.branch}</TableCell>
                    <TableCell className="text-sm">{staff.shift}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2" onClick={() => router.push(`/admin/staff/${staff.id}`)}>
                            <Eye className="w-4 h-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="w-4 h-4" />
                            Edit Staff
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="w-4 h-4" />
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[70px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </span>
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
        </div>
      </CardContent>
    </Card>
  )
}
