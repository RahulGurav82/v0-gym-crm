import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { TrainerRankingPage } from "@/components/trainers/trainer-ranking-page"

export default function TrainerRankingRoute() {
  return (
    <SidebarProvider>
      <Sidebar role="admin" />
      <TrainerRankingPage />
    </SidebarProvider>
  )
}
