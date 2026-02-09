import { DeletedBillsPage } from "@/components/billing/deleted-bills-page"
import { Sidebar, SidebarProvider } from "@/components/sidebar"

export default function DeletedBillsPageRoute() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar role="admin" />
        <DeletedBillsPage />
      </div>
    </SidebarProvider>
  )
}
