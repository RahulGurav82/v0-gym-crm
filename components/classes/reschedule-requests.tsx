"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Clock, Calendar, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function RescheduleRequests() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [adminNote, setAdminNote] = useState("")

  // Mock data
  const requests = [
    {
      id: "RSQ-001",
      classId: "CLS-001",
      className: "Yoga",
      instructor: "Sarah Johnson",
      currentDate: "2024-01-15",
      currentTime: "09:00 AM - 10:00 AM",
      newDate: "2024-01-16",
      newTime: "10:00 AM - 11:00 AM",
      reason: "Personal emergency - family commitment",
      requestDate: "2024-01-14 08:30 AM",
      status: "pending",
      branch: "Downtown",
    },
    {
      id: "RSQ-002",
      classId: "CLS-004",
      className: "MMA Training",
      instructor: "Alex Chen",
      currentDate: "2024-01-16",
      currentTime: "05:00 PM - 06:30 PM",
      newDate: "2024-01-16",
      newTime: "06:30 PM - 08:00 PM",
      reason: "Previous class running late, need more setup time",
      requestDate: "2024-01-15 02:15 PM",
      status: "pending",
      branch: "Eastside",
    },
    {
      id: "RSQ-003",
      classId: "CLS-002",
      className: "Zumba",
      instructor: "Mike Davis",
      currentDate: "2024-01-17",
      currentTime: "06:00 PM - 07:00 PM",
      newDate: "2024-01-18",
      newTime: "06:00 PM - 07:00 PM",
      reason: "Medical appointment conflict",
      requestDate: "2024-01-14 11:00 AM",
      status: "approved",
      branch: "Westside",
    },
  ]

  const handleApprove = () => {
    console.log("Approving request:", selectedRequest?.id)
    console.log("Admin note:", adminNote)
    setShowApproveDialog(false)
    setAdminNote("")
    setSelectedRequest(null)
  }

  const handleReject = () => {
    console.log("Rejecting request:", selectedRequest?.id)
    console.log("Admin note:", adminNote)
    setShowRejectDialog(false)
    setAdminNote("")
    setSelectedRequest(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 text-amber-500"
      case "approved":
        return "bg-emerald-500/10 text-emerald-500"
      case "rejected":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Current Schedule</TableHead>
                  <TableHead>Requested Schedule</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No reschedule requests
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{request.className}</span>
                          <span className="text-xs text-muted-foreground">{request.classId}</span>
                        </div>
                      </TableCell>
                      <TableCell>{request.instructor}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-3 h-3" />
                            <span>{request.currentDate}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{request.currentTime}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm font-medium text-primary">
                            <Calendar className="w-3 h-3" />
                            <span>{request.newDate}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <Clock className="w-3 h-3" />
                            <span>{request.newTime}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <p className="text-sm truncate" title={request.reason}>
                            {request.reason}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)} variant="secondary">
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === "pending" ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="default"
                              className="h-8 gap-1"
                              onClick={() => {
                                setSelectedRequest(request)
                                setShowApproveDialog(true)
                              }}
                            >
                              <CheckCircle className="w-3 h-3" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 gap-1"
                              onClick={() => {
                                setSelectedRequest(request)
                                setShowRejectDialog(true)
                              }}
                            >
                              <XCircle className="w-3 h-3" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            {request.status === "approved" ? "Approved" : "Rejected"}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Reschedule Request</DialogTitle>
            <DialogDescription>Review the reschedule request details before approving</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Class:</span>
                  <span className="text-sm">{selectedRequest.className}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Instructor:</span>
                  <span className="text-sm">{selectedRequest.instructor}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Current:</span>
                    <span className="text-sm">
                      {selectedRequest.currentDate} {selectedRequest.currentTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-primary">New:</span>
                    <span className="text-sm text-primary">
                      {selectedRequest.newDate} {selectedRequest.newTime}
                    </span>
                  </div>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <p className="text-sm font-medium mb-1">Reason:</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.reason}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="approve-note">Admin Note (Optional)</Label>
                <Textarea
                  id="approve-note"
                  placeholder="Add a note for the instructor..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Participants will be automatically notified about the schedule change via email and SMS.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowApproveDialog(false)
                setAdminNote("")
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleApprove} className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Approve Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Reschedule Request</DialogTitle>
            <DialogDescription>Provide a reason for rejecting this request</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Class:</span>
                  <span className="text-sm">{selectedRequest.className}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Instructor:</span>
                  <span className="text-sm">{selectedRequest.instructor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reject-note">Rejection Reason *</Label>
                <Textarea
                  id="reject-note"
                  placeholder="Explain why this request cannot be approved..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <p className="text-xs text-red-600 dark:text-red-400">
                  The instructor will be notified about the rejection along with your reason.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false)
                setAdminNote("")
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} className="gap-2" disabled={!adminNote.trim()}>
              <XCircle className="w-4 h-4" />
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
