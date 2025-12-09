import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { StaffPage } from "@/components/staff/staff-page"

export default function StaffPageRoute() {
  return (
    <SidebarProvider>
      <Sidebar role="admin" />
      <StaffPage />
    </SidebarProvider>
  )
}
