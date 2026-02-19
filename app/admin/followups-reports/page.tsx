import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { FollowupsReportsPage } from "@/components/reports/followups-reports-page"

export default function Page() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar role="admin" />
        <FollowupsReportsPage />
      </div>
    </SidebarProvider>
  )
}
