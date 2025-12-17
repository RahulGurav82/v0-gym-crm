"use client"

import type React from "react"

import { useState } from "react"
import { BRANCHES } from "@/lib/branches"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Phone, KeyRound, ArrowRight, ArrowLeft } from "lucide-react"

const ROLE_PHONE_MAP: Record<string, string> = {
  "9137408709": "admin",
  "9137408708": "head",
  "9137408707": "manager",
  "9137408706": "employee",
}

export function LoginForm() {
  const [selectedBranch, setSelectedBranch] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const getRoleFromPhone = (phone: string): string => {
    return ROLE_PHONE_MAP[phone] || ""
  }

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    const role = getRoleFromPhone(phoneNumber)
    if (!role) {
      alert("Invalid phone number. Please use a registered number.")
      return
    }
    setOtpSent(true)
    console.log("[v0] OTP sent to:", phoneNumber, "Role:", role, "Branch:", selectedBranch)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    const role = getRoleFromPhone(phoneNumber)
    console.log("[v0] Verifying OTP:", otp, "for role:", role)
    if (role === "admin") {
      window.location.href = "/admin"
    } else if (role === "head") {
      window.location.href = "/head"
    } else if (role === "manager") {
      window.location.href = "/manager"
    } else if (role === "employee") {
      window.location.href = "/employee"
    }
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
                    {BRANCHES.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name} ({branch.branchCode})
                      </SelectItem>
                    ))}
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
                  placeholder="Enter your 10-digit mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 h-12"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold group"
              disabled={!selectedBranch || !phoneNumber || phoneNumber.length !== 10}
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
