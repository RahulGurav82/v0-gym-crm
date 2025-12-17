import { SidebarProvider } from "@/components/sidebar"
import { EditPackagePage } from "@/components/packages/edit-package-page"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <SidebarProvider>
      <EditPackagePage packageId={params.id} />
    </SidebarProvider>
  )
}
