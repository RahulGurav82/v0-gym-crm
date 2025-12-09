"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, User, Phone, KeyRound, ArrowRight, ArrowLeft } from "lucide-react"

export function LoginForm() {
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate sending OTP
    setOtpSent(true)
    console.log("[v0] OTP sent to:", phoneNumber, "Role:", selectedRole, "Branch:", selectedBranch)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect based on role
    console.log("[v0] Verifying OTP:", otp, "for role:", selectedRole)
    if (selectedRole === "admin") {
      window.location.href = "/admin"
    }
    // Add other role redirects here later
  }

  return (
    <Card className="w-full border-2 shadow-2xl">
      <CardHeader className="space-y-3 pb-6">
        <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
        <CardDescription className="text-base">
          {!otpSent
            ? "Sign in to access your gym management dashboard"
            : "We've sent a verification code to your phone"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Select Role
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Select value={selectedRole} onValueChange={setSelectedRole} required>
                  <SelectTrigger id="role" className="pl-10 h-12">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="head">Head</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch" className="text-sm font-medium">
                Select Branch
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Select value={selectedBranch} onValueChange={setSelectedBranch} required>
                  <SelectTrigger id="branch" className="pl-10 h-12">
                    <SelectValue placeholder="Choose your branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtown">Downtown Branch</SelectItem>
                    <SelectItem value="westside">Westside Branch</SelectItem>
                    <SelectItem value="eastside">Eastside Branch</SelectItem>
                    <SelectItem value="northside">Northside Branch</SelectItem>
                    <SelectItem value="southside">Southside Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold group"
              disabled={!selectedBranch || !selectedRole || !phoneNumber}
            >
              Send OTP
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                Enter OTP
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="pl-10 h-12 text-center text-lg tracking-widest font-semibold"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{"OTP sent to " + phoneNumber}</p>
                <Button type="button" variant="link" className="text-sm p-0 h-auto">
                  Resend OTP
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold group" disabled={otp.length !== 6}>
              Verify & Sign In
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base bg-transparent"
              onClick={() => {
                setOtpSent(false)
                setOtp("")
              }}
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Change Phone Number
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
