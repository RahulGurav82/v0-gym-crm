"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Users,
  UserPlus,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in-progress" | "completed" | "overdue"
  assignees: {
    name: string
    avatar: string
    role: string
  }[]
  dueDate: string
  createdAt: string
  category: string
}

const mockTasks: Task[] = [
  {
    id: "TSK001",
    title: "Follow up with new enquiries",
    description: "Contact all new enquiries from last week and schedule gym tours",
    priority: "high",
    status: "in-progress",
    assignees: [{ name: "John Smith", avatar: "", role: "Sales Executive" }],
    dueDate: "2024-01-15",
    createdAt: "2024-01-10",
    category: "Sales",
  },
  {
    id: "TSK002",
    title: "Update member records",
    description: "Verify and update all member contact information in the system",
    priority: "medium",
    status: "pending",
    assignees: [],
    dueDate: "2024-01-18",
    createdAt: "2024-01-11",
    category: "Admin",
  },
  {
    id: "TSK003",
    title: "Prepare monthly report",
    description: "Compile sales and membership data for January report",
    priority: "high",
    status: "pending",
    assignees: [{ name: "Mike Johnson", avatar: "", role: "Manager" }],
    dueDate: "2024-01-20",
    createdAt: "2024-01-12",
    category: "Reports",
  },
  {
    id: "TSK004",
    title: "Equipment maintenance check",
    description: "Inspect all cardio machines and report any issues",
    priority: "urgent",
    status: "overdue",
    assignees: [{ name: "David Lee", avatar: "", role: "Maintenance" }],
    dueDate: "2024-01-10",
    createdAt: "2024-01-05",
    category: "Maintenance",
  },
  {
    id: "TSK005",
    title: "Schedule fitness assessments",
    description: "Book fitness assessments for all new premium members",
    priority: "medium",
    status: "completed",
    assignees: [{ name: "Emily Brown", avatar: "", role: "Trainer" }],
    dueDate: "2024-01-14",
    createdAt: "2024-01-08",
    category: "Training",
  },
  {
    id: "TSK006",
    title: "Process membership renewals",
    description: "Contact members with expiring memberships for renewals",
    priority: "high",
    status: "in-progress",
    assignees: [],
    dueDate: "2024-01-16",
    createdAt: "2024-01-09",
    category: "Sales",
  },
  {
    id: "TSK007",
    title: "Update class schedule",
    description: "Publish next month's group fitness class schedule",
    priority: "low",
    status: "pending",
    assignees: [{ name: "Sarah Wilson", avatar: "", role: "Admin Staff" }],
    dueDate: "2024-01-25",
    createdAt: "2024-01-13",
    category: "Admin",
  },
  {
    id: "TSK008",
    title: "Train new staff members",
    description: "Conduct orientation training for 3 new hires",
    priority: "medium",
    status: "in-progress",
    assignees: [],
    dueDate: "2024-01-19",
    createdAt: "2024-01-11",
    category: "HR",
  },
  {
    id: "TSK009",
    title: "Review supplier contracts",
    description: "Evaluate current supplier agreements and negotiate better terms",
    priority: "low",
    status: "pending",
    assignees: [{ name: "Mike Johnson", avatar: "", role: "Manager" }],
    dueDate: "2024-01-30",
    createdAt: "2024-01-14",
    category: "Procurement",
  },
  {
    id: "TSK010",
    title: "Social media promotion",
    description: "Create and post content for new year membership offers",
    priority: "high",
    status: "completed",
    assignees: [{ name: "Emily Brown", avatar: "", role: "Marketing" }],
    dueDate: "2024-01-12",
    createdAt: "2024-01-06",
    category: "Marketing",
  },
]

interface TasksTableProps {
  searchQuery: string
  statusFilter: string
  priorityFilter: string
  assigneeFilter: string
  dateFilter: string
  onAssignEmployee?: (taskId: string) => void
}

export function TasksTable({
  searchQuery,
  statusFilter,
  priorityFilter,
  assigneeFilter,
  dateFilter,
  onAssignEmployee,
}: TasksTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  // Filter tasks
  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    const matchesAssignee =
      assigneeFilter === "all" ||
      (assigneeFilter === "unassigned" && task.assignees.length === 0) ||
      task.assignees.some((a) => a.name.toLowerCase().includes(assigneeFilter.toLowerCase()))

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
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
      <Badge variant="outline" className={`${styles[status as keyof typeof styles]} flex items-center`}>
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
                <TableHead className="font-semibold">Assignee</TableHead>
                <TableHead className="font-semibold">Due Date</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
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
                    <div className="space-y-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    {task.assignees.length === 0 ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground bg-transparent"
                        onClick={() => onAssignEmployee?.(task.id)}
                      >
                        <UserPlus className="h-3.5 w-3.5" />
                        Assign
                      </Button>
                    ) : (
                      <TooltipProvider>
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {task.assignees.slice(0, 3).map((assignee, index) => (
                              <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-8 w-8 border-2 border-background">
                                    <AvatarImage src={assignee.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                      {assignee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="font-medium">{assignee.name}</p>
                                  <p className="text-xs text-muted-foreground">{assignee.role}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                            {task.assignees.length > 3 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="h-8 w-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center">
                                    <span className="text-xs font-medium text-primary">
                                      +{task.assignees.length - 3}
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1">
                                    {task.assignees.slice(3).map((assignee, index) => (
                                      <p key={index} className="text-sm">
                                        {assignee.name}
                                      </p>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          {task.assignees.length > 1 && (
                            <span className="ml-2 text-xs text-muted-foreground flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {task.assignees.length}
                            </span>
                          )}
                        </div>
                      </TooltipProvider>
                    )}
                  </TableCell>
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAssignEmployee?.(task.id)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign Employee
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Mark Complete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
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
                    className={`h-8 w-8 ${currentPage === pageNum ? "bg-primary" : ""}`}
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
      </CardContent>
    </Card>
  )
}
