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
} from "lucide-react"

interface Member {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  membership: "Basic" | "Premium" | "VIP"
  status: "Active" | "Inactive" | "Expired"
  branch: string
  joinDate: string
  expiryDate: string
}

const mockMembers: Member[] = [
  {
    id: "M001",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    avatar: "",
    membership: "Premium",
    status: "Active",
    branch: "Downtown",
    joinDate: "2024-01-15",
    expiryDate: "2025-01-15",
  },
  {
    id: "M002",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 87654 32109",
    avatar: "",
    membership: "VIP",
    status: "Active",
    branch: "Westside",
    joinDate: "2023-08-20",
    expiryDate: "2024-08-20",
  },
  {
    id: "M003",
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 76543 21098",
    avatar: "",
    membership: "Basic",
    status: "Inactive",
    branch: "Downtown",
    joinDate: "2024-03-10",
    expiryDate: "2024-09-10",
  },
  {
    id: "M004",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 65432 10987",
    avatar: "",
    membership: "Premium",
    status: "Active",
    branch: "Eastside",
    joinDate: "2024-02-28",
    expiryDate: "2025-02-28",
  },
  {
    id: "M005",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 54321 09876",
    avatar: "",
    membership: "Basic",
    status: "Expired",
    branch: "Westside",
    joinDate: "2023-06-15",
    expiryDate: "2024-06-15",
  },
  {
    id: "M006",
    name: "Ananya Gupta",
    email: "ananya.gupta@email.com",
    phone: "+91 43210 98765",
    avatar: "",
    membership: "VIP",
    status: "Active",
    branch: "Downtown",
    joinDate: "2024-04-01",
    expiryDate: "2025-04-01",
  },
  {
    id: "M007",
    name: "Rajesh Verma",
    email: "rajesh.verma@email.com",
    phone: "+91 32109 87654",
    avatar: "",
    membership: "Premium",
    status: "Active",
    branch: "Eastside",
    joinDate: "2024-05-12",
    expiryDate: "2025-05-12",
  },
  {
    id: "M008",
    name: "Kavita Nair",
    email: "kavita.nair@email.com",
    phone: "+91 21098 76543",
    avatar: "",
    membership: "Basic",
    status: "Inactive",
    branch: "Westside",
    joinDate: "2024-01-20",
    expiryDate: "2024-07-20",
  },
  {
    id: "M009",
    name: "Suresh Yadav",
    email: "suresh.yadav@email.com",
    phone: "+91 10987 65432",
    avatar: "",
    membership: "Premium",
    status: "Active",
    branch: "Downtown",
    joinDate: "2024-06-05",
    expiryDate: "2025-06-05",
  },
  {
    id: "M010",
    name: "Meera Iyer",
    email: "meera.iyer@email.com",
    phone: "+91 09876 54321",
    avatar: "",
    membership: "VIP",
    status: "Active",
    branch: "Eastside",
    joinDate: "2024-03-18",
    expiryDate: "2025-03-18",
  },
  {
    id: "M011",
    name: "Arjun Menon",
    email: "arjun.menon@email.com",
    phone: "+91 98765 12345",
    avatar: "",
    membership: "Basic",
    status: "Active",
    branch: "Downtown",
    joinDate: "2024-07-01",
    expiryDate: "2025-01-01",
  },
  {
    id: "M012",
    name: "Deepa Krishnan",
    email: "deepa.krishnan@email.com",
    phone: "+91 87654 23456",
    avatar: "",
    membership: "Premium",
    status: "Expired",
    branch: "Westside",
    joinDate: "2023-09-15",
    expiryDate: "2024-03-15",
  },
]

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50]

export function MembersTable() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [membershipFilter, setMembershipFilter] = useState<string>("all")
  const [branchFilter, setBranchFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Filter members
  const filteredMembers = useMemo(() => {
    return mockMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase()) ||
        member.id.toLowerCase().includes(search.toLowerCase()) ||
        member.phone.includes(search)

      const matchesStatus = statusFilter === "all" || member.status === statusFilter
      const matchesMembership = membershipFilter === "all" || member.membership === membershipFilter
      const matchesBranch = branchFilter === "all" || member.branch === branchFilter

      return matchesSearch && matchesStatus && matchesMembership && matchesBranch
    })
  }, [search, statusFilter, membershipFilter, branchFilter])

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">Active</Badge>
        )
      case "Inactive":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20">
            Inactive
          </Badge>
        )
      case "Expired":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMembershipBadge = (membership: string) => {
    switch (membership) {
      case "VIP":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">VIP</Badge>
      case "Premium":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20">Premium</Badge>
      case "Basic":
        return <Badge variant="outline">Basic</Badge>
      default:
        return <Badge variant="outline">{membership}</Badge>
    }
  }

  const resetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setMembershipFilter("all")
    setBranchFilter("all")
    setCurrentPage(1)
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-lg font-semibold">All Members</CardTitle>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={membershipFilter}
                onValueChange={(value) => {
                  setMembershipFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Membership" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
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

              {(search || statusFilter !== "all" || membershipFilter !== "all" || branchFilter !== "all") && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground">
            Showing {paginatedMembers.length} of {filteredMembers.length} members
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {/* Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[250px]">Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <p className="text-muted-foreground">No members found</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedMembers.map((member) => (
                  <TableRow key={member.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="truncate max-w-[150px]">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {member.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getMembershipBadge(member.membership)}</TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell className="text-sm">{member.branch}</TableCell>
                    <TableCell className="text-sm">{member.expiryDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => router.push(`/admin/members/${member.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="w-4 h-4" />
                            Edit Member
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
