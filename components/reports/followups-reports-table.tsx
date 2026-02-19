"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, ChevronRight, Calendar } from "lucide-react"
import { FollowupsReportsDetails } from "./followups-reports-details"

interface Employee {
  id: string
  name: string
  email: string
  totalFollowups: number
  completed: number
  pending: number
  rescheduled: number
  overdue: number
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@gym.com",
    totalFollowups: 45,
    completed: 32,
    pending: 8,
    rescheduled: 3,
    overdue: 2,
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@gym.com",
    totalFollowups: 52,
    completed: 38,
    pending: 10,
    rescheduled: 2,
    overdue: 2,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@gym.com",
    totalFollowups: 38,
    completed: 28,
    pending: 7,
    rescheduled: 2,
    overdue: 1,
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@gym.com",
    totalFollowups: 61,
    completed: 45,
    pending: 12,
    rescheduled: 3,
    overdue: 1,
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@gym.com",
    totalFollowups: 33,
    completed: 24,
    pending: 6,
    rescheduled: 2,
    overdue: 1,
  },
]

export function FollowupsReportsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterBranch, setFilterBranch] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((employee) => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Add more filters based on type, branch, and date range as needed
      return matchesSearch
    })
  }, [searchTerm])

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowDetailsDialog(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Followups Reports</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Employee</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="both">Both</SelectItem>
                <SelectItem value="enquiry">Enquiry</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Branch</label>
            <Select value={filterBranch} onValueChange={setFilterBranch}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="sanpada">Sanpada</SelectItem>
                <SelectItem value="dadar">Dadar</SelectItem>
                <SelectItem value="bandra">Bandra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Employee</TableHead>
                <TableHead className="text-center">Total Followups</TableHead>
                <TableHead className="text-center">Completed</TableHead>
                <TableHead className="text-center">Pending</TableHead>
                <TableHead className="text-center">Rescheduled</TableHead>
                <TableHead className="text-center">Overdue</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No employees found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => {
                  const completionRate = Math.round((employee.completed / employee.totalFollowups) * 100)
                  
                  return (
                    <TableRow key={employee.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-semibold">{employee.totalFollowups}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                          {employee.completed}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                          {employee.pending}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                          {employee.rescheduled}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400">
                          {employee.overdue}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(employee)}
                          className="gap-2"
                        >
                          <span>View</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Details Dialog */}
      {selectedEmployee && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedEmployee.name} - Followups Report</DialogTitle>
              <DialogDescription>{selectedEmployee.email}</DialogDescription>
            </DialogHeader>
            <FollowupsReportsDetails employee={selectedEmployee} />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
