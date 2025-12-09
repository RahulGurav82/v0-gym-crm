import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { AddMemberPage } from "@/components/members/add-member-page"

export default function AddMemberRoute() {
  return (
    <SidebarProvider>
      <Sidebar />
      <AddMemberPage />
    </SidebarProvider>
  )
}
