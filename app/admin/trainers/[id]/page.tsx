import { Sidebar, SidebarProvider } from "@/components/sidebar"
import { TrainerClientsPage } from "@/components/trainers/trainer-clients-page"

// Mock trainer data for mapping ID to name
const trainers: { [key: string]: string } = {
  T001: "Priyanka Singh",
  T002: "Rahul Verma",
  T003: "Isha Malhotra",
  T004: "Arjun Nair",
  T005: "Sneha Patel",
  T006: "Vikram Singh",
  T007: "Divya Kumar",
  T008: "Harsh Desai",
}

interface TrainerDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TrainerDetailPage({ params }: TrainerDetailPageProps) {
  const { id } = await params
  const trainerName = trainers[id] || "Trainer"

  return (
    <SidebarProvider>
      <Sidebar role="admin" />
      <TrainerClientsPage trainerId={id} trainerName={trainerName} />
    </SidebarProvider>
  )
}
