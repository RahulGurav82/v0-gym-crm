import { EnquiryDetails } from "@/components/enquiry/enquiry-details"

export default async function EnquiryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <EnquiryDetails enquiryId={id} />
}
