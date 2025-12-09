import { StaffDetails } from "@/components/staff/staff-details"

export default async function StaffDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <StaffDetails staffId={id} />
}
