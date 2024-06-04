import AdminLayout from "@/components/AdminDashboard/AdminLayout/AdminLayout";
import ORICSustainability from "@/components/AdminDashboard/ORICSustainability/ORICSustainability";
import ResearchCallForm from "@/components/AdminDashboard/ResearchCall/ResearchCallForm";
import React from "react";

export default function index() {
  return (
    <AdminLayout>
        <ORICSustainability/>
    </AdminLayout>
  );
}
