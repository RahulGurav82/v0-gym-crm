"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Edit, Trash2, Users, Calendar, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ClassesTableProps {
  filter: "all" | "upcoming" | "ongoing" | "past"
}

export function ClassesTable({ filter }: ClassesTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  // Mock data
  const allClasses = [
    {
      id: "CLS-001",
      className: "Yoga",
      instructor: "Sarah Johnson",
      date: "2024-01-15",
      time: "09:00 AM - 10:00 AM",
      participants: "12/20",
      branch: "Downtown",
      location: "Studio A",
      status: "upcoming",
    },
    {
      id: "CLS-002",
      className: "Zumba",
      instructor: "Mike Davis",
      date: "2024-01-15",
      time: "10:30 AM - 11:30 AM",
      participants: "18/25",
      branch: "Westside",
      location: "Dance Hall",
      status: "ongoing",
    },
    {
      id: "CLS-003",
      className: "CrossFit",
      instructor: "John Smith",
      date: "2024-01-14",
      time: "06:00 PM - 07:00 PM",
      participants: "15/15",
      branch: "Downtown",
      location: "Gym Floor",
      status: "past",
    },
    {
      id: "CLS-004",
      className: "MMA Training",
      instructor: "Alex Chen",
      date: "2024-01-16",
      time: "05:00 PM - 06:30 PM",
      participants: "8/12",
      branch: "Eastside",
      location: "Combat Zone",
      status: "upcoming",
    },
  ]

  const filteredClasses = allClasses.filter((cls) => {
    if (filter !== "all" && cls.status !== filter) return false
    if (
      searchQuery &&
      !cls.className.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !cls.instructor.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !cls.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    if (selectedClass && cls.className !== selectedClass) return false
    if (selectedBranch && cls.branch !== selectedBranch) return false
    return true
  })

  const totalPages = Math.ceil(filteredClasses.length / rowsPerPage)
  const paginatedClasses = filteredClasses.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-500"
      case "ongoing":
        return "bg-emerald-500/10 text-emerald-500"
      case "past":
        return "bg-gray-500/10 text-gray-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <Card>
      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by class name, instructor, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Class Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="Yoga">Yoga</SelectItem>
              <SelectItem value="Zumba">Zumba</SelectItem>
              <SelectItem value="CrossFit">CrossFit</SelectItem>
              <SelectItem value="MMA Training">MMA Training</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="Downtown">Downtown</SelectItem>
              <SelectItem value="Westside">Westside</SelectItem>
              <SelectItem value="Eastside">Eastside</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class ID</TableHead>
                <TableHead>Class Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedClasses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No classes found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.id}</TableCell>
                    <TableCell className="font-medium">{cls.className}</TableCell>
                    <TableCell>{cls.instructor}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{cls.date}</span>
                        <span className="text-xs text-muted-foreground">{cls.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{cls.participants}</span>
                      </div>
                    </TableCell>
                    <TableCell>{cls.branch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{cls.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(cls.status)} variant="secondary">
                        {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => router.push(`/admin/classes/${cls.id}`)}>
                            <Calendar className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/classes/${cls.id}?tab=edit`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Class
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/classes/${cls.id}?tab=participants`)}>
                            <Users className="w-4 h-4 mr-2" />
                            View Participants
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Cancel Class
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
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredClasses.length)} of {filteredClasses.length} classes
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
