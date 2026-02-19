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
    <div className="space-y-4">
      {/* Month Filter */}
      <div className="flex items-center gap-4">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-48">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{employee.totalFollowups}</div>
              <div className="text-sm text-muted-foreground mt-2">Total Followups</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{employee.completed}</div>
              <div className="text-sm text-muted-foreground mt-2">Completed</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{employee.pending}</div>
              <div className="text-sm text-muted-foreground mt-2">Pending</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{employee.overdue}</div>
              <div className="text-sm text-muted-foreground mt-2">Overdue</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total" />
                <Line type="monotone" dataKey="completed" stroke="#22c55e" name="Completed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
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

        {/* Completion Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { label: "Completed Rate", value: Math.round((employee.completed / employee.totalFollowups) * 100), color: "bg-green-500" },
                { label: "Pending Rate", value: Math.round((employee.pending / employee.totalFollowups) * 100), color: "bg-blue-500" },
                { label: "Overdue Rate", value: Math.round((employee.overdue / employee.totalFollowups) * 100), color: "bg-red-500" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className={`${item.color} h-full rounded-full transition-all`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Total Followups:</span>
              <span className="font-semibold float-right">{employee.totalFollowups}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Completed:</span>
              <span className="font-semibold float-right text-green-600">{employee.completed} ({Math.round((employee.completed / employee.totalFollowups) * 100)}%)</span>
            </p>
            <p>
              <span className="text-muted-foreground">Pending:</span>
              <span className="font-semibold float-right text-blue-600">{employee.pending}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Rescheduled:</span>
              <span className="font-semibold float-right text-yellow-600">{employee.rescheduled}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Overdue:</span>
              <span className="font-semibold float-right text-red-600">{employee.overdue}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
