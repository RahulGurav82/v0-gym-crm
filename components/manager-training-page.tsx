"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar, SidebarProvider, useSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search, Users, Dumbbell, TrendingUp, UserCheck, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const trainers = [
  { id: "HQVJ3ZWsN9kB8n2gQBTU", name: "Alex Johnson", phone: "9000000003" },
  { id: "TR002", name: "Sarah Williams", phone: "9000000004" },
  { id: "TR003", name: "Mike Chen", phone: "9000000005" },
]

const mockPTData = [
  {
    id: "mQAnvXGc4dcd87nJXhcT",
    memberId: "KCBv7sMPfA23gt01RUl0",
    memberName: "test iuiihihj",
    phone: "9137035763",
    trainerId: "HQVJ3ZWsN9kB8n2gQBTU",
    trainerName: "",
    packageName: "Premium Fitness Bundle",
    totalSlots: 12,
    usedSlots: 2,
    remainingSlots: 10,
    status: "active",
    amount: "2100.00",
    commission: 1000,
    perSessionCommission: 83.33,
    startDate: "2025-12-23",
    endDate: "2026-06-23",
    branchName: "Sanpada",
  },
  {
    id: "PT002",
    memberId: "M002",
    memberName: "John Doe",
    phone: "9876543210",
    trainerId: null,
    trainerName: null,
    packageName: "Basic PT Package",
    totalSlots: 24,
    usedSlots: 5,
    remainingSlots: 19,
    status: "active",
    amount: "3600.00",
    commission: 1800,
    perSessionCommission: 75.0,
    startDate: "2025-12-15",
    endDate: "2026-06-15",
    branchName: "Sanpada",
  },
  {
    id: "PT003",
    memberId: "M003",
    memberName: "Jane Smith",
    phone: "9123456789",
    trainerId: "TR002",
    trainerName: "Sarah Williams",
    packageName: "Advanced PT",
    totalSlots: 18,
    usedSlots: 12,
    remainingSlots: 6,
    status: "active",
    amount: "2700.00",
    commission: 1350,
    perSessionCommission: 75.0,
    startDate: "2025-11-01",
    endDate: "2026-05-01",
    branchName: "Sanpada",
  },
]

function ManagerTrainingPageInner() {
  const router = useRouter()
  const { collapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [assignDialog, setAssignDialog] = useState<{ open: boolean; pt: (typeof mockPTData)[0] | null }>({
    open: false,
    pt: null,
  })
  const [selectedTrainer, setSelectedTrainer] = useState("")

  const stats = {
    totalPT: mockPTData.length,
    activePT: mockPTData.filter((pt) => pt.status === "active").length,
    assignedTrainers: mockPTData.filter((pt) => pt.trainerId).length,
    totalRevenue: mockPTData.reduce((sum, pt) => sum + Number.parseFloat(pt.amount), 0),
  }

  const filteredPT = mockPTData.filter(
    (pt) =>
      pt.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.phone.includes(searchQuery) ||
      pt.trainerName?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAssignTrainer = () => {
    console.log("[v0] Assigning trainer:", selectedTrainer, "to PT:", assignDialog.pt?.id)
    setAssignDialog({ open: false, pt: null })
    setSelectedTrainer("")
  }

  const handleViewDetails = (ptId: string) => {
    router.push(`/manager/training/${ptId}`)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="manager" />

      <main className={cn("flex-1 transition-all duration-300 ease-in-out", collapsed ? "pl-16" : "pl-64")}>
        <div className="container py-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Training Management</h1>
            <p className="text-muted-foreground mt-1">Manage PT sessions and trainer assignments</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total PT Sessions</p>
                    <p className="text-2xl font-bold">{stats.totalPT}</p>
                  </div>
                  <Dumbbell className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Sessions</p>
                    <p className="text-2xl font-bold text-emerald-600">{stats.activePT}</p>
                  </div>
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Trainers</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.assignedTrainers}</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-primary">₹{stats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by member name, phone, or trainer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PT List */}
          <div className="grid gap-4">
            {filteredPT.map((pt) => (
              <Card key={pt.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3">
                        <span>{pt.memberName}</span>
                        <Badge variant={pt.status === "active" ? "default" : "secondary"}>{pt.status}</Badge>
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{pt.phone}</span>
                        <span>•</span>
                        <span>{pt.packageName}</span>
                        <span>•</span>
                        <span>{pt.branchName}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(pt.id)} className="shrink-0">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Slots</p>
                      <p className="text-lg font-semibold">{pt.totalSlots}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Used</p>
                      <p className="text-lg font-semibold text-primary">{pt.usedSlots}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p className="text-lg font-semibold text-emerald-600">{pt.remainingSlots}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="text-lg font-semibold">₹{Number.parseFloat(pt.amount).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Trainer</p>
                      {pt.trainerId ? (
                        <p className="text-sm font-medium">{pt.trainerName}</p>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            setAssignDialog({ open: true, pt })
                          }}
                          className="mt-1"
                        >
                          Assign Trainer
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Assign Trainer Dialog */}
      <Dialog open={assignDialog.open} onOpenChange={(open) => setAssignDialog({ open, pt: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Trainer</DialogTitle>
            <DialogDescription>Assign a trainer to {assignDialog.pt?.memberName}'s PT sessions</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Trainer</Label>
              <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a trainer" />
                </SelectTrigger>
                <SelectContent>
                  {trainers.map((trainer) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      {trainer.name} - {trainer.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialog({ open: false, pt: null })}>
              Cancel
            </Button>
            <Button onClick={handleAssignTrainer} disabled={!selectedTrainer}>
              Assign Trainer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function ManagerTrainingPage() {
  return (
    <SidebarProvider>
      <ManagerTrainingPageInner />
    </SidebarProvider>
  )
}
