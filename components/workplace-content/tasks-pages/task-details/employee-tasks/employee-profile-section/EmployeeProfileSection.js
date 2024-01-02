import React from "react";
import { ProfileCard } from "./profile-section-cards/ProfileCard";
import "./css/emp-profile.css";
import { TaskNumbersCard } from "./profile-section-cards/TaskNumbersCard";
import { MonthlyChart } from "./profile-section-cards/MonthlyChart";
import { WeeklyStatistics } from "./profile-section-cards/WeeklyStatistics";
import { CompletedTaskTypesCard } from "./profile-section-cards/CompletedTaskTypesCard";
import { CompletionEfficiency } from "./profile-section-cards/CompletionEfficiency";
export const EmployeeProfileSection = ({
  yearlyStats,
  weeklyStats,
  efficiency,
  empInfo,
}) => {
  return (
    <div>
      <div className="grid-container">
        <div className="grid-item item1 all-emp-wrapper">
          <ProfileCard empInfo={empInfo} />
        </div>
        <div className="grid-item item2 all-emp-wrapper">
          <TaskNumbersCard empInfo={empInfo} />
        </div>
        <div className="grid-item item3 all-emp-wrapper">
          <MonthlyChart yearlyStats={yearlyStats} />
        </div>
      </div>
      <div className="grid-container2 mt-5">
        <div className="grid-item2 item7 all-emp-wrapper">
          <WeeklyStatistics weeklyStats={weeklyStats} />
        </div>
        <div className="grid-item2 item8 all-emp-wrapper">
          <CompletedTaskTypesCard />
        </div>
        <div className="grid-item2 item9 all-emp-wrapper">
          <CompletionEfficiency efficiency={efficiency} />
        </div>
      </div>
    </div>
  );
};
