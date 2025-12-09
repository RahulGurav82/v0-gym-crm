import { MemberDetails } from "@/components/members/member-details"

export default function MemberDetailsPage({ params }: { params: { id: string } }) {
  return <MemberDetails memberId={params.id} />
}
