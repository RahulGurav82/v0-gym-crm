"use client"

import { SidebarProvider, Sidebar, useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Plus, GraduationCap, Calendar, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassesTable } from "./classes-table"
import { RescheduleRequests } from "./reschedule-requests"
import { AddClassDialog } from "./add-class-dialog"
import { useState } from "react"

function ClassesPageInner() {
  const { collapsed } = useSidebar()
  const [showAddDialog, setShowAddDialog] = useState(false)

  const stats = [
    {
      title: "Total Classes",
      value: "156",
      icon: GraduationCap,
      description: "All scheduled classes",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Upcoming",
      value: "42",
      icon: Calendar,
      description: "Next 30 days",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Ongoing",
      value: "3",
      icon: Clock,
      description: "Currently active",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Reschedule Requests",
      value: "7",
      icon: CheckCircle,
      description: "Pending approval",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (
    <main className={cn("min-h-screen bg-background transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
      <Sidebar role="admin" />

      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Class Management</h1>
            <p className="text-sm text-muted-foreground">Manage gym classes and schedules</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4" />
            Create Class
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                    <Icon className={cn("w-4 h-4", stat.color)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs for Classes and Reschedule Requests */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="all">All Classes</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="reschedule">
              <span className="flex items-center gap-2">
                Reschedule
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  7
                </span>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ClassesTable filter="all" />
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <ClassesTable filter="upcoming" />
          </TabsContent>

          <TabsContent value="ongoing" className="mt-6">
            <ClassesTable filter="ongoing" />
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <ClassesTable filter="past" />
          </TabsContent>

          <TabsContent value="reschedule" className="mt-6">
            <RescheduleRequests />
          </TabsContent>
        </Tabs>
      </div>

      <AddClassDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </main>
  )
}

export default function ClassesPage() {
  return (
    <SidebarProvider>
      <ClassesPageInner />
    </SidebarProvider>
  )
}
