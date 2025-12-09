import { MembersPage } from "@/components/members/members-page"
import { Sidebar, SidebarProvider } from "@/components/sidebar"

export default function Members() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar role="admin" />
        <MembersPage />
      </div>
    </SidebarProvider>
  )
}
