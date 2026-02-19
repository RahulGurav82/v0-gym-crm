"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
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
  ShoppingCart,
  UserCheck,
  ChevronDown,
  Store,
  CreditCard,
  Truck,
  Tags,
  Star,
  Percent,
  ShoppingBag,
  ClipboardList,
  ClipboardCheck,
  Box,
  ListTodo,
  CalendarDays,
  Receipt,
  Building2,
  User,
  GraduationCap,
  Clock,
  Menu,
  X,
  Target,
  Award,
  RotateCw,
  Trash2,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: string[]
  children?: NavItem[]
}

const crmNavItems: NavItem[] = [
  {
    title: "CRM Dashboard",
    href: "/admin",
    icon: UserCheck,
    roles: ["admin", "head"],
  },
  {
    title: "Enquiry",
    href: "/admin/enquiry",
    icon: ClipboardCheck,
    roles: ["admin", "head", "manager", "employee"],
  },
  {
    title: "Members",
    href: "/admin/members",
    icon: Users,
    roles: ["admin", "head", "manager", "employee"],
  },
  {
    title: "Tasks",
    href: "/admin/tasks",
    icon: ListTodo,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "My Tasks",
    href: "/employee/tasks",
    icon: ListTodo,
    roles: ["employee"],
  },
  {
    title: "Attendance",
    href: "/employee/attendance",
    icon: Calendar,
    roles: ["employee"],
  },
  {
    title: "My Leaves",
    href: "/employee/leaves",
    icon: CalendarDays,
    roles: ["employee"],
  },
  {
    title: "Leave Management",
    href: "/manager/leaves",
    icon: CalendarDays,
    roles: ["manager"],
  },
  {
    title: "OT Management",
    href: "/manager/overtime",
    icon: Clock,
    roles: ["manager"],
  },
  {
    title: "Shift Management",
    href: "/manager/shifts",
    icon: Calendar,
    roles: ["manager"],
  },
  {
    title: "Mark Attendance",
    href: "/manager/mark-attendance",
    icon: UserCheck,
    roles: ["manager"],
  },
  {
    title: "Training",
    href: "/manager/training",
    icon: Dumbbell,
    roles: ["manager"],
  },
  {
    title: "Memberships",
    href: "/manager/memberships",
    icon: Users,
    roles: ["manager"],
  },
  {
    title: "Amenities",
    href: "/manager/amenities",
    icon: Dumbbell,
    roles: ["manager"],
  },
  {
    title: "Attendance Approvals",
    href: "/head/attendance-approvals",
    icon: UserCheck,
    roles: ["head"],
  },
  {
    title: "OT Approvals",
    href: "/head/ot-approvals",
    icon: Clock,
    roles: ["head"],
  },
  {
    title: "Packages",
    href: "/admin/packages",
    icon: Box,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Classes",
    href: "/admin/classes",
    icon: GraduationCap,
    roles: ["admin", "head"],
  },
  {
    title: "Calendar",
    href: "/admin/calendar",
    icon: CalendarDays,
    roles: ["admin", "head", "manager", "employee"],
  },
  {
    title: "Departments",
    href: "/admin/departments",
    icon: Building2,
    roles: ["admin", "head"],
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
    title: "Invoices",
    href: "/admin/invoices",
    icon: Receipt,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Deleted Bills",
    href: "/admin/deleted-bills",
    icon: Trash2,
    roles: ["admin", "head"],
  },
  {
    title: "Followups Reports",
    href: "/admin/followups-reports",
    icon: TrendingUp,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Renewals",
    href: "/admin/renewals",
    icon: RotateCw,
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
    title: "Trainer Rankings",
    href: "/admin/trainers",
    icon: Award,
    roles: ["admin", "head"],
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
  {
    title: "OT Requests",
    href: "/employee/overtime",
    icon: Clock,
    roles: ["employee"],
  },
  {
    title: "My PT",
    href: "/employee/my-pt",
    icon: Dumbbell,
    roles: ["employee"],
  },
  {
    title: "My Follow-Ups",
    href: "/employee/follow-ups",
    icon: Target,
    roles: ["employee"],
  },
  {
    title: "Orders",
    href: "/employee/orders",
    icon: ShoppingCart,
    roles: ["employee"],
  },
  {
    title: "My Purchases",
    href: "/employee/purchases",
    icon: ShoppingBag,
    roles: ["employee"],
  },
]

const ecommerceNavItems: NavItem[] = [
  {
    title: "Ecommerce Dashboard",
    href: "/admin/ecommerce",
    icon: ShoppingCart,
    roles: ["admin", "head"],
  },
  {
    title: "Products",
    href: "/admin/ecommerce/products",
    icon: Package,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Orders",
    href: "/admin/ecommerce/orders",
    icon: ClipboardList,
    roles: ["admin", "head", "manager", "employee"],
  },
  {
    title: "Customers",
    href: "/admin/ecommerce/customers",
    icon: Users,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Inventory",
    href: "/admin/ecommerce/inventory",
    icon: Store,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Payments",
    href: "/admin/ecommerce/payments",
    icon: CreditCard,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Shipping",
    href: "/admin/ecommerce/shipping",
    icon: Truck,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Categories",
    href: "/admin/ecommerce/categories",
    icon: Tags,
    roles: ["admin", "head"],
  },
  {
    title: "Reviews",
    href: "/admin/ecommerce/reviews",
    icon: Star,
    roles: ["admin", "head", "manager"],
  },
  {
    title: "Discounts",
    href: "/admin/ecommerce/discounts",
    icon: Percent,
    roles: ["admin", "head"],
  },
]

const dashboardSwitcher = [
  {
    title: "CRM Dashboard",
    href: "/admin",
    icon: UserCheck,
    type: "crm",
  },
  {
    title: "Ecommerce Dashboard",
    href: "/admin/ecommerce",
    icon: ShoppingBag,
    type: "ecommerce",
  },
]

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
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
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

interface SidebarProps {
  role?: string
  unreadNotifications?: number
}

export function Sidebar({ role = "admin", unreadNotifications = 4 }: SidebarProps) {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar()
  const pathname = usePathname()
  const [showDashboardSwitcher, setShowDashboardSwitcher] = useState(false)

  const isEcommerce = pathname.includes("/admin/ecommerce")
  const activeDashboard = isEcommerce ? "ecommerce" : "crm"
  const currentDashboard = dashboardSwitcher.find((d) => d.type === activeDashboard)

  const navItems = activeDashboard === "ecommerce" ? ecommerceNavItems : crmNavItems
  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen border-r border-border bg-card transition-all duration-300",
          // Desktop: always visible with collapse
          "lg:z-40",
          collapsed ? "lg:w-16" : "lg:w-64",
          // Mobile: hidden by default, full width when open
          "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 lg:hidden", collapsed && "mx-auto")}
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 hidden lg:flex", collapsed && "mx-auto")}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {(role === "admin" || role === "head") && (
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Button
                variant="outline"
                className={cn("w-full justify-between gap-2 h-10 bg-muted/50", collapsed && "justify-center px-0")}
                onClick={() => !collapsed && setShowDashboardSwitcher(!showDashboardSwitcher)}
              >
                {currentDashboard && (
                  <>
                    <div className="flex items-center gap-2">
                      <currentDashboard.icon className="h-4 w-4 text-primary" />
                      {!collapsed && (
                        <span className="text-sm font-medium">{currentDashboard.title.replace(" Dashboard", "")}</span>
                      )}
                    </div>
                    {!collapsed && (
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", showDashboardSwitcher && "rotate-180")}
                      />
                    )}
                  </>
                )}
              </Button>

              {/* Dropdown */}
              {!collapsed && showDashboardSwitcher && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
                  {dashboardSwitcher.map((dashboard) => {
                    const Icon = dashboard.icon
                    const isActive = dashboard.type === activeDashboard
                    return (
                      <Link key={dashboard.href} href={dashboard.href} onClick={() => setShowDashboardSwitcher(false)}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 hover:bg-muted transition-colors",
                            isActive && "bg-primary/10 text-primary",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{dashboard.title}</span>
                          {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              {/* Collapsed state dropdown */}
              {collapsed && (
                <div className="mt-1 space-y-1">
                  {dashboardSwitcher.map((dashboard) => {
                    const Icon = dashboard.icon
                    const isActive = dashboard.type === activeDashboard
                    return (
                      <Link key={dashboard.href} href={dashboard.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-center px-0 h-9",
                            isActive && "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",
                          )}
                          title={dashboard.title}
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto h-[calc(100vh-12rem)]">
          {!collapsed && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
              {activeDashboard === "ecommerce" ? "Store Management" : "Gym Management"}
            </p>
          )}

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
          <Link
            href={
              role === "admin"
                ? "/admin/profile"
                : role === "head"
                  ? "/head/profile"
                  : role === "manager"
                    ? "/manager/profile"
                    : "/employee/profile"
            }
          >
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-3 h-10", collapsed && "justify-center px-0")}
            >
              <User className="h-5 w-5" />
              {!collapsed && <span className="text-sm font-medium">Profile</span>}
            </Button>
          </Link>
          <Link href="/admin/notifications">
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-3 h-10 relative", collapsed && "justify-center px-0")}
            >
              <div className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span
                    className={cn(
                      "absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold rounded-full bg-primary text-primary-foreground",
                      collapsed && "-top-1 -right-1",
                    )}
                  >
                    {unreadNotifications > 9 ? "9+" : unreadNotifications}
                  </span>
                )}
              </div>
              {!collapsed && <span className="text-sm font-medium">Notifications</span>}
              {!collapsed && unreadNotifications > 0 && (
                <Badge className="ml-auto bg-primary text-primary-foreground h-5 px-1.5">{unreadNotifications}</Badge>
              )}
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-3 h-10", collapsed && "justify-center px-0")}
            >
              <Settings className="h-5 w-5" />
              {!collapsed && <span className="text-sm font-medium">Settings</span>}
            </Button>
          </Link>
          <Link href="/">
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
          </Link>
        </div>
      </aside>
    </>
  )
}

export function MobileMenuButton() {
  const { setMobileOpen } = useSidebar()

  return (
    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
      <Menu className="h-5 w-5" />
    </Button>
  )
}
