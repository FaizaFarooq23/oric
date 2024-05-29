import AdminLayout from "@/components/AdminDashboard/AdminLayout/AdminLayout";
import ResearchCallForm from "@/components/AdminDashboard/ResearchCall/ResearchCallForm";
import React from "react";

export default function index() {
  return (
    <AdminLayout>
      <ResearchCallForm />
    </AdminLayout>
  );
}
