import AdminLayout from '@/components/AdminDashboard/AdminLayout/AdminLayout';
import ProjectDetails from '@/components/AdminDashboard/ProjectDetails/ProjectDetails';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const [projectData, setProjectData] = useState(null);

  const getData = async (project_id) => {
    const res = await fetch(`/api/stats/report_by_id?project_id=${project_id}`);
    console.log(res);
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    if (id) {
      getData(id).then((data) => {
        console.log(data);
        setProjectData(data);
      });
    }
  }, [id]);

  return (
    <div>
      <AdminLayout>
        <ProjectDetails projectData={projectData} />
      </AdminLayout>
    </div>
  );
}
