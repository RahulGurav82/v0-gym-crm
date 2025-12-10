import { SidebarProvider } from "@/components/sidebar"
import { PackagesPage } from "@/components/packages/packages-page"

export default function Page() {
  return (
    <SidebarProvider>
      <PackagesPage />
    </SidebarProvider>
  )
}
