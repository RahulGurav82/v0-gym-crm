"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Dumbbell,
  Settings,
  BarChart3,
  UserCog,
  Package,
  MessageSquare,
  Bell,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: string[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["admin", "head", "manager", "employee"],
  },
  {
    title: "Members",
    href: "/admin/members",
    icon: Users,
    roles: ["admin", "head", "manager", "employee"],
  },
  {
    title: "Schedule",
    href: "/admin/schedule",
    icon: Calendar,
    roles: ["admin", "head", "manager", "employee"],
  },
  {
    title: "Billing",
    href: "/admin/billing",
    icon: DollarSign,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Equipment",
    href: "/admin/equipment",
    icon: Dumbbell,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Staff",
    href: "/admin/staff",
    icon: UserCog,
    roles: ["admin", "head"],
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Package,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
    roles: ["admin", "head", "manager", "employee"],
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
    roles: ["admin", "head"],
  },
]

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }
  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return <SidebarContext.Provider value={{ collapsed, setCollapsed }}>{children}</SidebarContext.Provider>
}

interface SidebarProps {
  role?: string
}

export function Sidebar({ role = "admin" }: SidebarProps) {
  const { collapsed, setCollapsed } = useSidebar()
  const pathname = usePathname()

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">FitHub CRM</h1>
              <p className="text-xs text-muted-foreground capitalize">{role}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto h-[calc(100vh-8rem)]">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isActive && "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",
                  collapsed && "justify-center px-0",
                )}
              >
                <Icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
                {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-1">
        <Link href="/admin/notifications">
          <Button variant="ghost" className={cn("w-full justify-start gap-3 h-10", collapsed && "justify-center px-0")}>
            <Bell className="h-5 w-5" />
            {!collapsed && <span className="text-sm font-medium">Notifications</span>}
          </Button>
        </Link>
        <Link href="/admin/settings">
          <Button variant="ghost" className={cn("w-full justify-start gap-3 h-10", collapsed && "justify-center px-0")}>
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="text-sm font-medium">Settings</span>}
          </Button>
        </Link>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-10 text-destructive hover:text-destructive hover:bg-destructive/10",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
