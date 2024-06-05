import AdminLayout from "@/components/AdminDashboard/AdminLayout/AdminLayout";
import ORICSustainability from "@/components/AdminDashboard/ORICSustainability/ORICSustainability";
import ResearchCallForm from "@/components/AdminDashboard/ResearchCall/ResearchCallForm";
import React from "react";

export default function index() {
  return (
    <AdminLayout>
       <div className="flex flex-col w-full  text-blue-900 text-xl font-bold ">
       <span className="px-10 pt-8"> ORIC Sustainability and Capacity Building</span>
      
        <ORICSustainability/>
        </div>
    </AdminLayout>
  );
}
