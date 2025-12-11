"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  CalendarIcon,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Flag,
  FileText,
  ListTodo,
  ArrowRight,
} from "lucide-react"

const priorities = [
  { value: "low", label: "Low", icon: Flag, color: "text-slate-500 bg-slate-500/10" },
  { value: "medium", label: "Medium", icon: Flag, color: "text-blue-500 bg-blue-500/10" },
  { value: "high", label: "High", icon: AlertTriangle, color: "text-orange-500 bg-orange-500/10" },
  { value: "urgent", label: "Urgent", icon: AlertCircle, color: "text-red-500 bg-red-500/10" },
]

const categories = [
  "Sales",
  "Admin",
  "Training",
  "Maintenance",
  "Marketing",
  "HR",
  "Reports",
  "Procurement",
  "Customer Service",
]

interface AddTaskFormProps {
  onSuccess?: (taskId: string) => void
}

export function AddTaskForm({ onSuccess }: AddTaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [createdTaskId, setCreatedTaskId] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate task ID
    const taskId = `TSK${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`
    setCreatedTaskId(taskId)
    setIsSuccess(true)
  }

  const handleAssignEmployee = () => {
    onSuccess?.(createdTaskId)
  }

  const handleSkipAssignment = () => {
    onSuccess?.("")
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Task Created Successfully!</h3>
        <p className="text-sm text-muted-foreground text-center mb-1">
          Task ID: <span className="font-mono font-medium text-foreground">{createdTaskId}</span>
        </p>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Would you like to assign an employee to this task now?
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSkipAssignment}>
            Skip for Now
          </Button>
          <Button onClick={handleAssignEmployee} className="bg-[#ed9320] hover:bg-[#ed9320]/90 text-white gap-2">
            Assign Employee
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="flex items-center gap-2">
          <ListTodo className="h-4 w-4 text-muted-foreground" />
          Task Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-background"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe the task in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-background min-h-[100px] resize-none"
          required
        />
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Flag className="h-4 w-4 text-muted-foreground" />
          Priority <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-4 gap-2">
          {priorities.map((p) => {
            const Icon = p.icon
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all",
                  priority === p.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                )}
              >
                <div className={cn("p-2 rounded-lg mb-1", p.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">{p.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Due Date & Category */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            Due Date <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background",
                  !dueDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => onSuccess?.("")}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!title || !description || !priority || !dueDate || !category || isSubmitting}
          className="bg-[#ed9320] hover:bg-[#ed9320]/90 text-white min-w-[120px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </div>
          ) : (
            "Create Task"
          )}
        </Button>
      </div>
    </form>
  )
}
