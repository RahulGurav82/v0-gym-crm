"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
} from "lucide-react"

interface Renewal {
  id: string
  type: "Membership" | "Personal Training" | "Amenity"
  name: string
  memberName: string
  memberPhone: string
  status: "expired" | "expiring_soon" | "active"
  endDate: string
  branchId: string
  branchName: string
  remainingSlots: number | null
  amount: number | null
}

const mockRenewals: Renewal[] = [
  {
    id: "34Ssq620jcwz8Yu3JXx0",
    type: "Membership",
    name: "Gym Membership",
    memberName: "sahil lakum",
    memberPhone: "9372443805",
    status: "expired",
    endDate: "2026-02-05",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    branchName: "sanpada",
    remainingSlots: null,
    amount: 3333.33,
  },
  {
    id: "LmbLMjXkxsdMJjmVTL9c",
    type: "Personal Training",
    name: "Personal Training",
    memberName: "meet jain",
    memberPhone: "9619058304",
    status: "expired",
    endDate: "2026-02-05",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    branchName: "sanpada",
    remainingSlots: 12,
    amount: 12380.95,
  },
  {
    id: "19jYczAVVHyuXFCC4nKS",
    type: "Amenity",
    name: "yoga",
    memberName: "manikandan nadar",
    memberPhone: "8070037387",
    status: "expired",
    endDate: "2026-02-05",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    branchName: "Sanpada",
    remainingSlots: 9,
    amount: null,
  },
  {
    id: "R004",
    type: "Membership",
    name: "Gym Membership",
    memberName: "Anita Verma",
    memberPhone: "9876543210",
    status: "expiring_soon",
    endDate: "2026-02-20",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    branchName: "sanpada",
    remainingSlots: null,
    amount: 4500.0,
  },
  {
    id: "R005",
    type: "Personal Training",
    name: "Personal Training",
    memberName: "Rajesh Kumar",
    memberPhone: "9123456789",
    status: "expiring_soon",
    endDate: "2026-02-28",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    branchName: "sanpada",
    remainingSlots: 5,
    amount: 8000.0,
  },
  {
    id: "R006",
    type: "Amenity",
    name: "Swimming",
    memberName: "Priya Singh",
    memberPhone: "8765432109",
    status: "active",
    endDate: "2026-03-15",
    branchId: "jJOQdxbfc1IneoEt4A9F",
    branchName: "sanpada",
    remainingSlots: 20,
    amount: null,
  },
]

export function RenewalsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterBranch, setFilterBranch] = useState("all")

  // Get unique branches for filter
  const branches = Array.from(new Set(mockRenewals.map((r) => r.branchName)))

  // Filter and search logic
  const filteredRenewals = useMemo(() => {
    return mockRenewals.filter((renewal) => {
      const matchesSearch =
        renewal.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        renewal.memberPhone.includes(searchTerm) ||
        renewal.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = filterType === "all" || renewal.type === filterType
      const matchesStatus = filterStatus === "all" || renewal.status === filterStatus
      const matchesBranch = filterBranch === "all" || renewal.branchName === filterBranch

      return matchesSearch && matchesType && matchesStatus && matchesBranch
    })
  }, [searchTerm, filterType, filterStatus, filterBranch])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "expired":
        return <Badge className="bg-red-500/10 text-red-600">Expired</Badge>
      case "expiring_soon":
        return <Badge className="bg-yellow-500/10 text-yellow-600">Expiring Soon</Badge>
      case "active":
        return <Badge className="bg-green-500/10 text-green-600">Active</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Membership":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">Membership</Badge>
      case "Personal Training":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">PT</Badge>
      case "Amenity":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">Amenity</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Renewals</CardTitle>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredRenewals.length} of {mockRenewals.length} renewals
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by member name, phone, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Membership">Membership</SelectItem>
                <SelectItem value="Personal Training">Personal Training</SelectItem>
                <SelectItem value="Amenity">Amenity</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBranch} onValueChange={setFilterBranch}>
              <SelectTrigger className="w-40">
                <SelectValue />
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

            {(searchTerm || filterType !== "all" || filterStatus !== "all" || filterBranch !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                  setFilterStatus("all")
                  setFilterBranch("all")
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredRenewals.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No renewals found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Member</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRenewals.map((renewal) => (
                  <TableRow key={renewal.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{renewal.memberName}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Phone className="w-3 h-3" />
                          {renewal.memberPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(renewal.type)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{renewal.name}</p>
                        {renewal.remainingSlots !== null && (
                          <p className="text-xs text-muted-foreground">{renewal.remainingSlots} slots</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{renewal.branchName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(renewal.endDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(renewal.status)}</TableCell>
                    <TableCell className="font-medium">
                      {renewal.amount ? `₹${renewal.amount.toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Renew</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
