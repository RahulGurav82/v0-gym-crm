import { SidebarProvider } from "@/components/sidebar"
import { AddPackagePage } from "@/components/packages/add-package-page"

export default function Page() {
  return (
    <SidebarProvider>
      <AddPackagePage />
    </SidebarProvider>
  )
}
