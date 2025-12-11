import { DepartmentsPage } from "@/components/departments/departments-page"
import { SidebarProvider } from "@/components/sidebar"

export default function DepartmentsRoute() {
  return (
    <SidebarProvider>
      <DepartmentsPage />
    </SidebarProvider>
  )
}
