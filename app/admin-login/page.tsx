import { AdminLoginForm } from "@/components/admin-login-form" // Import the AdminLoginForm component

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(237,147,32,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(237,147,32,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and Brand */}
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-primary to-orange-600 shadow-2xl shadow-primary/50 mb-4">
              <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-tight">Admin Portal</h1>
              <p className="text-zinc-400 text-lg">Secure access for administrators</p>
            </div>
          </div>

          {/* Admin Login Form */}
          <AdminLoginForm />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">Protected by enterprise-grade security</p>
          </div>
        </div>
      </div>
    </div>
  )
}
