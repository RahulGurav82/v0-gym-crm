import { ClassDetails } from "@/components/classes/class-details"

export default function ClassDetailsPage({ params }: { params: { id: string } }) {
  return <ClassDetails classId={params.id} />
}
