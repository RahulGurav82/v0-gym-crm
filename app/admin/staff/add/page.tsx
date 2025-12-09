import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { AddStaffPage } from "@/components/staff/add-staff-page"

export default function AddStaffRoute() {
  return (
    <SidebarProvider>
      <Sidebar role="admin" />
      <AddStaffPage />
    </SidebarProvider>
  )
}
