import React from "react";
import "./tabSidebar.css";
import "../appSidebar.css";
import { DashboardIcon } from "../../../utills/svgs/DashboardIcon";
import { ClientsIcon } from "../../../utills/svgs/ClientsIcon";
import { WorkspaceIcon } from "../../../utills/svgs/WorkspaceIcon";
import { MarketingIcon } from "../../../utills/svgs/MarketingIcon";
import { PayrollIcon } from "../../../utills/svgs/PayrollIcon";
import { ReportsIcon } from "../../../utills/svgs/ReportsIcon";
import { SettingsIcon } from "../../../utills/svgs/SettingsIcon";
import { SearchIcon } from "../../../utills/svgs/SearchIcon";
import { ArrowRight } from "../../../utills/svgs/ArrowRight";

import { CrossIcon } from "../../../utills/svgs/CrossIcon";
import { Humberger } from "../../../utills/svgs/Humberger";
export const TabSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="tab-sidebar">
      {!isOpen ? (
        <span className="cursor-pointer" onClick={toggleSidebar}>
          <CrossIcon />
        </span>
      ) : (
        <div>
          {" "}
          <div className="cross-icon">
            <span onClick={toggleSidebar} className="cursor-pointer">
              <Humberger />
            </span>
          </div>
          <div className="tab-sidebar-main p-5">
            <div className="tab-buttons grid gap-5 grid-flow-row">
              <div className="flex items-center p-3 gap-2">
                <div>
                  {" "}
                  <DashboardIcon />{" "}
                </div>
                <div> Dashboard </div>
              </div>
              <div className="flex items-center p-3 gap-2">
                <div>
                  {" "}
                  <ClientsIcon />{" "}
                </div>
                <div> Clients </div>
                <div>
                  {" "}
                  <ArrowRight />{" "}
                </div>
              </div>
              <div className="flex items-center p-3 gap-2">
                <div>
                  {" "}
                  <WorkspaceIcon />{" "}
                </div>
                <div> Workspace </div>
                <div>
                  {" "}
                  <ArrowRight />{" "}
                </div>
              </div>
              <div className="flex items-center p-3 gap-2">
                <div>
                  {" "}
                  <MarketingIcon />{" "}
                </div>
                <div> Marketing </div>
              </div>
              <div className="flex items-center p-3 gap-2">
                <div>
                  {" "}
                  <PayrollIcon />{" "}
                </div>
                <div> Payroll </div>
              </div>
              <div className="flex items-center p-3 gap-2">
                <div>
                  {" "}
                  <ReportsIcon />{" "}
                </div>
                <div> Reports </div>
              </div>
              <div className="flex items-center p-3 gap-2">
                <div>
                  {" "}
                  <SettingsIcon />{" "}
                </div>
                <div> Settings </div>
              </div>
              <div className="flex items-center p-3 gap-2">
                <div>
                  {" "}
                  <SearchIcon />{" "}
                </div>
                <div> Search </div>
              </div>
              <div className="flex items-center p-3 gap-2">
                <div>
                  {" "}
                  <MarketingIcon />{" "}
                </div>
                <div> Marketing </div>
              </div>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};
