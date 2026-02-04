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
  Star,
  Users,
  TrendingUp,
  Award,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

interface Trainer {
  id: string
  name: string
  email: string
  avatar: string
  branch: string
  rating: number
  totalReviews: number
  specialization: string
  totalClients: number
  status: "Active" | "Inactive"
  joinDate: string
  monthlyRating: number
}

const mockTrainers: Trainer[] = [
  {
    id: "T001",
    name: "Priyanka Singh",
    email: "priyanka.singh@fithub.com",
    avatar: "",
    branch: "Downtown",
    rating: 4.9,
    totalReviews: 127,
    specialization: "HIIT & Cardio",
    totalClients: 34,
    status: "Active",
    joinDate: "2022-01-15",
    monthlyRating: 4.95,
  },
  {
    id: "T002",
    name: "Rahul Verma",
    email: "rahul.verma@fithub.com",
    avatar: "",
    branch: "Westside",
    rating: 4.85,
    totalReviews: 98,
    specialization: "Strength Training",
    totalClients: 28,
    status: "Active",
    joinDate: "2022-03-10",
    monthlyRating: 4.88,
  },
  {
    id: "T003",
    name: "Isha Malhotra",
    email: "isha.malhotra@fithub.com",
    avatar: "",
    branch: "Eastside",
    rating: 4.78,
    totalReviews: 156,
    specialization: "Yoga & Flexibility",
    totalClients: 42,
    status: "Active",
    joinDate: "2021-11-20",
    monthlyRating: 4.72,
  },
  {
    id: "T004",
    name: "Arjun Nair",
    email: "arjun.nair@fithub.com",
    avatar: "",
    branch: "Downtown",
    rating: 4.65,
    totalReviews: 89,
    specialization: "Boxing & Combat",
    totalClients: 22,
    status: "Active",
    joinDate: "2023-02-05",
    monthlyRating: 4.58,
  },
  {
    id: "T005",
    name: "Sneha Patel",
    email: "sneha.patel@fithub.com",
    avatar: "",
    branch: "Northside",
    rating: 4.92,
    totalReviews: 134,
    specialization: "Personal Training",
    totalClients: 38,
    status: "Active",
    joinDate: "2022-06-12",
    monthlyRating: 4.91,
  },
  {
    id: "T006",
    name: "Vikram Singh",
    email: "vikram.singh@fithub.com",
    avatar: "",
    branch: "Southside",
    rating: 4.52,
    totalReviews: 67,
    specialization: "Bodybuilding",
    totalClients: 19,
    status: "Active",
    joinDate: "2023-04-18",
    monthlyRating: 4.61,
  },
  {
    id: "T007",
    name: "Divya Kumar",
    email: "divya.kumar@fithub.com",
    avatar: "",
    branch: "Eastside",
    rating: 4.88,
    totalReviews: 112,
    specialization: "Dance & Zumba",
    totalClients: 31,
    status: "Active",
    joinDate: "2022-09-14",
    monthlyRating: 4.85,
  },
  {
    id: "T008",
    name: "Harsh Desai",
    email: "harsh.desai@fithub.com",
    avatar: "",
    branch: "Downtown",
    rating: 4.42,
    totalReviews: 54,
    specialization: "CrossFit",
    totalClients: 15,
    status: "Inactive",
    joinDate: "2023-08-22",
    monthlyRating: 4.35,
  },
]

type SortField = "rating" | "monthlyRating" | "reviews" | "clients" | "name"
type SortOrder = "asc" | "desc"

export function TrainerRankingTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [sortField, setSortField] = useState<SortField>("rating")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [statusFilter, setStatusFilter] = useState("all")

  const branches = Array.from(new Set(mockTrainers.map((t) => t.branch)))

  const filteredAndSorted = useMemo(() => {
    let filtered = mockTrainers.filter((trainer) => {
      const matchesSearch =
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBranch = selectedBranch === "all" || trainer.branch === selectedBranch
      const matchesStatus = statusFilter === "all" || trainer.status === statusFilter
      return matchesSearch && matchesBranch && matchesStatus
    })

    return filtered.sort((a, b) => {
      let aValue: number | string = 0
      let bValue: number | string = 0

      switch (sortField) {
        case "rating":
          aValue = a.rating
          bValue = b.rating
          break
        case "monthlyRating":
          aValue = a.monthlyRating
          bValue = b.monthlyRating
          break
        case "reviews":
          aValue = a.totalReviews
          bValue = b.totalReviews
          break
        case "clients":
          aValue = a.totalClients
          bValue = b.totalClients
          break
        case "name":
          aValue = a.name
          bValue = b.name
          break
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
    })
  }, [searchTerm, selectedBranch, sortField, sortOrder, statusFilter])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return "text-green-600"
    if (rating >= 4.5) return "text-blue-600"
    if (rating >= 4.0) return "text-yellow-600"
    return "text-orange-600"
  }

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 4.8) return "bg-green-500/10 text-green-600"
    if (rating >= 4.5) return "bg-blue-500/10 text-blue-600"
    if (rating >= 4.0) return "bg-yellow-500/10 text-yellow-600"
    return "bg-orange-500/10 text-orange-600"
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === "asc" ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Trainer Rankings ({filteredAndSorted.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-12 text-center">Rank</TableHead>
                  <TableHead>Trainer</TableHead>
                  <TableHead className="cursor-pointer select-none hover:bg-muted/50" onClick={() => handleSort("rating")}>
                    <div className="flex items-center">
                      Overall Rating
                      <SortIcon field="rating" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none hover:bg-muted/50"
                    onClick={() => handleSort("monthlyRating")}
                  >
                    <div className="flex items-center">
                      Monthly Rating
                      <SortIcon field="monthlyRating" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none hover:bg-muted/50" onClick={() => handleSort("reviews")}>
                    <div className="flex items-center">
                      Reviews
                      <SortIcon field="reviews" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none hover:bg-muted/50" onClick={() => handleSort("clients")}>
                    <div className="flex items-center">
                      Active Clients
                      <SortIcon field="clients" />
                    </div>
                  </TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSorted.map((trainer, index) => {
                  const ratingTrend = trainer.monthlyRating - trainer.rating
                  return (
                    <TableRow key={trainer.id}>
                      <TableCell className="text-center font-semibold">
                        <div className="flex items-center justify-center gap-1">
                          {index + 1}
                          {index === 0 && <Award className="w-4 h-4 text-yellow-500" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={trainer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{trainer.name}</p>
                            <p className="text-xs text-muted-foreground">{trainer.specialization}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getRatingBadgeColor(trainer.rating)} gap-1`}>
                          <Star className="w-3 h-3 fill-current" />
                          {trainer.rating.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{trainer.monthlyRating.toFixed(2)}</span>
                          {ratingTrend >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{trainer.totalReviews}</span>
                          <span className="text-xs text-muted-foreground">reviews</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{trainer.totalClients}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{trainer.branch}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={trainer.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                          {trainer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin/trainers/${trainer.id}`)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Clients
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          {filteredAndSorted.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No trainers found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
