"use client"

import { ShieldX, ArrowLeft, Home, LogIn, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Main Card */}
        <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-12 pb-8 px-8 text-center">
            {/* Icon */}
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 border-2 border-destructive/20">
              <ShieldX className="w-10 h-10 text-destructive" />
            </div>

            {/* Error Code */}
            <div className="mb-2">
              <span className="text-7xl font-bold text-primary">403</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-3">Access Denied</h1>

            {/* Description */}
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              You don't have permission to access this page. Please contact your administrator if you believe this is an
              error.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button onClick={() => router.back()} variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-xs text-muted-foreground uppercase tracking-wider">
                  Or try these options
                </span>
              </div>
            </div>

            {/* Secondary Options */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-muted"
              >
                <LogIn className="w-5 h-5 text-primary" />
                <span className="text-sm">Login Again</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => window.open("mailto:support@gymcrm.com", "_blank")}
                className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-muted"
              >
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="text-sm">Get Help</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Error Code: <span className="font-mono text-foreground">ERR_ACCESS_DENIED</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            If you need immediate assistance, contact{" "}
            <a href="mailto:support@gymcrm.com" className="text-primary hover:underline">
              support@gymcrm.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
