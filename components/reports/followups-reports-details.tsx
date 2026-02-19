"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Calendar } from "lucide-react"

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

interface FollowupsReportsDetailsProps {
  employee: Employee
}

const monthlyData = [
  { month: "Jan", total: 8, completed: 6, pending: 1, rescheduled: 1, overdue: 0 },
  { month: "Feb", total: 9, completed: 7, pending: 1, rescheduled: 1, overdue: 0 },
  { month: "Mar", total: 7, completed: 5, pending: 1, rescheduled: 1, overdue: 0 },
  { month: "Apr", total: 10, completed: 8, pending: 1, rescheduled: 1, overdue: 0 },
  { month: "May", total: 11, completed: 8, pending: 2, rescheduled: 0, overdue: 1 },
]

const statusData = [
  { name: "Completed", value: 32, fill: "#22c55e" },
  { name: "Pending", value: 8, fill: "#3b82f6" },
  { name: "Rescheduled", value: 3, fill: "#eab308" },
  { name: "Overdue", value: 2, fill: "#ef4444" },
]

export function FollowupsReportsDetails({ employee }: FollowupsReportsDetailsProps) {
  const [selectedMonth, setSelectedMonth] = useState("all")

  const months = [
    { value: "all", label: "All Months" },
    { value: "jan", label: "January" },
    { value: "feb", label: "February" },
    { value: "mar", label: "March" },
    { value: "apr", label: "April" },
    { value: "may", label: "May" },
  ]

  return (
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Header with Month Filter */}
      <div className="flex items-center justify-between bg-gradient-to-r from-muted/50 to-transparent rounded-lg p-4 border">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Filter by Month:</span>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards - Horizontal Layout */}
      <div className="grid grid-cols-5 gap-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-500/10 dark:to-blue-500/5 border-blue-200/50 dark:border-blue-500/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-1">
              <div className="text-4xl font-bold text-blue-600">{employee.totalFollowups}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-500/10 dark:to-green-500/5 border-green-200/50 dark:border-green-500/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-1">
              <div className="text-4xl font-bold text-green-600">{employee.completed}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Completed</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-500/10 dark:to-blue-500/5 border-blue-200/50 dark:border-blue-500/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-1">
              <div className="text-4xl font-bold text-blue-600">{employee.pending}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Pending</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-50/50 dark:from-yellow-500/10 dark:to-yellow-500/5 border-yellow-200/50 dark:border-yellow-500/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-1">
              <div className="text-4xl font-bold text-yellow-600">{employee.rescheduled}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Rescheduled</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-50/50 dark:from-red-500/10 dark:to-red-500/5 border-red-200/50 dark:border-red-500/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-1">
              <div className="text-4xl font-bold text-red-600">{employee.overdue}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Overdue</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Row Charts - 2 Columns */}
      <div className="grid grid-cols-2 gap-4">
        {/* Monthly Trends */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="completed" stroke="#22c55e" name="Completed" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Status Breakdown and Completion Rate */}
      <div className="grid grid-cols-2 gap-4">
        {/* Status Breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Status Breakdown by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#22c55e" name="Completed" />
                <Bar dataKey="pending" stackId="a" fill="#3b82f6" name="Pending" />
                <Bar dataKey="rescheduled" stackId="a" fill="#eab308" name="Rescheduled" />
                <Bar dataKey="overdue" stackId="a" fill="#ef4444" name="Overdue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Completion Metrics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Completion Rate", value: Math.round((employee.completed / employee.totalFollowups) * 100), color: "bg-green-500" },
              { label: "Pending Rate", value: Math.round((employee.pending / employee.totalFollowups) * 100), color: "bg-blue-500" },
              { label: "Overdue Rate", value: Math.round((employee.overdue / employee.totalFollowups) * 100), color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                  <span className="text-lg font-bold">{item.value}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-500`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
