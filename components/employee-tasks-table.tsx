"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  XCircle,
  PlayCircle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ListTodo } from "lucide-react" // Declared ListTodo here

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in-progress" | "completed" | "overdue"
  dueDate: string
  createdAt: string
  category: string
  assignedBy: string
}

// Mock tasks assigned to the current employee
const mockEmployeeTasks: Task[] = [
  {
    id: "TSK001",
    title: "Follow up with new enquiries",
    description: "Contact all new enquiries from last week and schedule gym tours",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-15",
    createdAt: "2024-01-10",
    category: "Sales",
    assignedBy: "Admin",
  },
  {
    id: "TSK003",
    title: "Update member records",
    description: "Verify and update all member contact information in the system",
    priority: "medium",
    status: "pending",
    dueDate: "2024-01-18",
    createdAt: "2024-01-11",
    category: "Admin",
    assignedBy: "Manager",
  },
  {
    id: "TSK005",
    title: "Process membership renewals",
    description: "Contact members with expiring memberships for renewals",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-16",
    createdAt: "2024-01-09",
    category: "Sales",
    assignedBy: "Admin",
  },
  {
    id: "TSK007",
    title: "Schedule fitness assessments",
    description: "Book fitness assessments for all new premium members",
    priority: "medium",
    status: "completed",
    dueDate: "2024-01-14",
    createdAt: "2024-01-08",
    category: "Training",
    assignedBy: "Manager",
  },
  {
    id: "TSK009",
    title: "Equipment maintenance check",
    description: "Inspect all cardio machines and report any issues",
    priority: "urgent",
    status: "overdue",
    dueDate: "2024-01-10",
    createdAt: "2024-01-05",
    category: "Maintenance",
    assignedBy: "Admin",
  },
  {
    id: "TSK011",
    title: "Call pending leads",
    description: "Follow up with 10 leads from last month",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-17",
    createdAt: "2024-01-12",
    category: "Sales",
    assignedBy: "Manager",
  },
  {
    id: "TSK013",
    title: "Update class schedule",
    description: "Publish next month's group fitness class schedule",
    priority: "low",
    status: "pending",
    dueDate: "2024-01-25",
    createdAt: "2024-01-13",
    category: "Admin",
    assignedBy: "Admin",
  },
  {
    id: "TSK015",
    title: "Social media promotion",
    description: "Create and post content for new year membership offers",
    priority: "high",
    status: "completed",
    dueDate: "2024-01-12",
    createdAt: "2024-01-06",
    category: "Marketing",
    assignedBy: "Manager",
  },
]

interface EmployeeTasksTableProps {
  searchQuery: string
  statusFilter: string
  priorityFilter: string
  dateFilter: string
}

export function EmployeeTasksTable({ searchQuery, statusFilter, priorityFilter, dateFilter }: EmployeeTasksTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  // Filter tasks
  const filteredTasks = mockEmployeeTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    const today = new Date()
    const dueDate = new Date(task.dueDate)
    let matchesDate = true
    if (dateFilter === "today") {
      matchesDate = dueDate.toDateString() === today.toDateString()
    } else if (dateFilter === "week") {
      const weekFromNow = new Date(today)
      weekFromNow.setDate(today.getDate() + 7)
      matchesDate = dueDate >= today && dueDate <= weekFromNow
    } else if (dateFilter === "month") {
      matchesDate = dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear()
    } else if (dateFilter === "overdue") {
      matchesDate = dueDate < today && task.status !== "completed"
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesDate
  })

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + rowsPerPage)

  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: "bg-slate-500/10 text-slate-500 border-slate-500/20",
      medium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      urgent: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return (
      <Badge variant="outline" className={styles[priority as keyof typeof styles]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      "in-progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      completed: "bg-green-500/10 text-green-500 border-green-500/20",
      overdue: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    const icons = {
      pending: <Clock className="h-3 w-3 mr-1" />,
      "in-progress": <AlertTriangle className="h-3 w-3 mr-1" />,
      completed: <CheckCircle2 className="h-3 w-3 mr-1" />,
      overdue: <AlertTriangle className="h-3 w-3 mr-1" />,
    }
    const labels = {
      pending: "Pending",
      "in-progress": "In Progress",
      completed: "Completed",
      overdue: "Overdue",
    }
    return (
      <Badge variant="outline" className={`${styles[status as keyof typeof styles]} flex items-center w-fit`}>
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const toggleSelectAll = () => {
    if (selectedTasks.length === paginatedTasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(paginatedTasks.map((t) => t.id))
    }
  }

  const toggleSelectTask = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const handleStatusChange = (taskId: string, newStatus: string) => {
    console.log(`[v0] Changing task ${taskId} status to ${newStatus}`)
    // In real app, this would update the task status in the backend
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedTasks.length > 0 && selectedTasks.length === paginatedTasks.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-semibold w-24">Task ID</TableHead>
                <TableHead className="font-semibold">Task</TableHead>
                <TableHead className="font-semibold">Priority</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Due Date</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Assigned By</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTasks.map((task) => (
                <TableRow key={task.id} className="border-border">
                  <TableCell>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={() => toggleSelectTask(task.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs bg-muted">
                      {task.id}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 max-w-md">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-muted">
                      {task.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{task.assignedBy}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {task.status !== "in-progress" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, "in-progress")}>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Start Task
                          </DropdownMenuItem>
                        )}
                        {task.status !== "completed" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, "completed")}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark Complete
                          </DropdownMenuItem>
                        )}
                        {task.status !== "pending" && task.status !== "completed" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, "pending")}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Mark Pending
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ListTodo className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || statusFilter !== "all" || priorityFilter !== "all" || dateFilter !== "all"
                ? "Try adjusting your filters"
                : "You don't have any tasks assigned yet"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredTasks.length > 0 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page:</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-16 h-8 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="ml-4">
                Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredTasks.length)} of{" "}
                {filteredTasks.length}
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
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      className={`h-8 w-8 ${currentPage === pageNum ? "bg-primary" : "bg-transparent"}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
