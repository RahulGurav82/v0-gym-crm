import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-lg shadow-primary/50">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">FitHub CRM</h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight leading-tight">
                Manage Your Gym
                <br />
                <span className="text-primary">Effortlessly</span>
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-md">
                Streamline operations, track members, and grow your fitness business with our comprehensive management
                platform.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-zinc-400">Active Members</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-zinc-400">Branches</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-zinc-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary shadow-lg shadow-primary/50">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">FitHub CRM</h1>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <Link
              href="/admin-login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
