const { default: Payroll } = require("pages/payroll/Payroll");
const { default: Reports } = require("pages/workplace/tasks/Reports");
const { Protected } = require("./protected-routes/Protected");
const { default: RunPayroll } = require("pages/payroll/RunPayroll");
const { default: JobMaker } = require("pages/payroll/JobMaker");
const { default: FinilizeSTP } = require("pages/payroll/FinilizeSTP");
const { default: People } = require("pages/payroll/People");
const { Leave } = require("pages/payroll/Leave");
const { Timesheet } = require("pages/payroll/Timesheet");
const { Roster } = require("pages/payroll/Roster");
const { PayrollReports } = require("pages/payroll/PayrollReports");
const { PayrollSettings } = require("pages/payroll/PayrollSettings");

const reportsRoutes = [
  {
    path: "/reports",
    component: <Protected Component={Reports} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/payroll",
    component: <Protected Component={Payroll} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/run/payroll",
    component: <Protected Component={RunPayroll} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/job/maker",
    component: <Protected Component={JobMaker} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/finalize/stp",
    component: <Protected Component={FinilizeSTP} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/payroll/people",
    component: <Protected Component={People} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/payroll/leave",
    component: <Protected Component={Leave} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/payroll/timesheet",
    component: <Protected Component={Timesheet} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/payroll/roster",
    component: <Protected Component={Roster} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/payroll/reports",
    component: <Protected Component={PayrollReports} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/payroll/settings",
    component: <Protected Component={PayrollSettings} />,
    isProtected: false,
    layout: "header",
  },
];

export default reportsRoutes;
