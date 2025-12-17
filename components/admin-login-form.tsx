"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, KeyRound, ShieldCheck, ArrowRight } from "lucide-react"

export function AdminLoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber !== "9137408709") {
      alert("Unauthorized: This phone number is not registered for admin access.")
      return
    }
    setOtpSent(true)
    console.log("[v0] Admin OTP sent to:", phoneNumber)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Verifying admin OTP:", otp)
    window.location.href = "/admin"
  }

  return (
    <Card className="w-full border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
      <CardContent className="pt-6">
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="admin-phone" className="text-sm font-medium text-zinc-200">
                Administrator Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  id="admin-phone"
                  type="tel"
                  placeholder="Enter registered admin number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-12 h-14 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-primary focus:ring-primary"
                  maxLength={10}
                  required
                />
              </div>
              <p className="text-xs text-zinc-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Only authorized admin numbers can access
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 text-white shadow-lg shadow-primary/25 group"
              disabled={phoneNumber.length !== 10}
            >
              Send Secure OTP
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="admin-otp" className="text-sm font-medium text-zinc-200">
                Enter Verification Code
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  id="admin-otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="pl-12 h-14 text-center text-xl tracking-widest font-bold bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">Sent to {phoneNumber}</p>
                <Button type="button" variant="link" className="text-sm p-0 h-auto text-primary hover:text-primary/80">
                  Resend Code
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 text-white shadow-lg shadow-primary/25 group"
              disabled={otp.length !== 6}
            >
              <ShieldCheck className="mr-2 w-5 h-5" />
              Verify & Access Admin Portal
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base bg-transparent border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              onClick={() => {
                setOtpSent(false)
                setOtp("")
              }}
            >
              Change Phone Number
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
