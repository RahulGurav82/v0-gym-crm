import { RenewalsPage } from "@/components/renewals/renewals-page"
import { Sidebar, SidebarProvider } from "@/components/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar role="admin" />
        <RenewalsPage />
      </div>
    </SidebarProvider>
  )
}
