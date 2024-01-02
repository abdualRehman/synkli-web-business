import React, { useEffect, useState } from "react";
import "./css/employeeTasks.css";
import { EmployeesTasksJumbo } from "./EmployeesTasksJumbo";
import { EmployeeProfileSection } from "./employee-profile-section/EmployeeProfileSection";
import { EmployeeTasksCards } from "./employee-tasks-cards/EmployeeTasksCards";
import { useSelector } from "react-redux";
import { useGetSingleEmployee } from "Hooks/useGetSingleEmployee";
import { useParams } from "react-router-dom";
import { Loader } from "components/common/Loader";
import { useGetYearlyStatistics } from "Hooks/useGetYearlyStatistics";
export const EmployeeTasksPage = () => {
  const { id } = useParams();
  const { data: employee } = useSelector(
    (state) => state.fetchBusinessEmployee
  );
  const { data: yearlyStats } = useSelector((state) => state.yearlyStatistics);
  const { data: weeklyStats } = useSelector(
    (state) => state.weeklyStatsEmployee
  );
  const { data: efficiency } = useSelector((state) => state.employeeEfficiency);
  const { data: employeeTasks } = useSelector(
    (state) => state.singleEmployeeTaks
  );

  const { data: empInfo } = useSelector((state) => state.getTaskEmpInfo);

  const { isLoading } = useSelector((state) => state.global);
  const { fetchEmployee } = useGetSingleEmployee();
  const { fetchYearlyStats } = useGetYearlyStatistics();
  useEffect(() => {
    fetchYearlyStats(id);
  }, [id]);
  return (
    <div className="md:mx-10 mx-5">
      {isLoading && <Loader />}
      <EmployeesTasksJumbo empInfo={empInfo} />
      <EmployeeProfileSection
        employee={employee}
        yearlyStats={yearlyStats}
        weeklyStats={weeklyStats}
        efficiency={efficiency}
        empInfo={empInfo}
      />
      <EmployeeTasksCards employeeTasks={employeeTasks} />
    </div>
  );
};
