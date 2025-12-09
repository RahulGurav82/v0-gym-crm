"use client"

import { AddEnquiryPage } from "@/components/enquiry/add-enquiry-page"
import { Sidebar, SidebarProvider } from "@/components/sidebar"

export default function AddEnquiryRoute() {
  return (
    <SidebarProvider>
      <Sidebar role="admin" />
      <AddEnquiryPage />
    </SidebarProvider>
  )
}
