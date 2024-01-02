import { CompletedTasksTraining } from "pages/trainings/tasks-training/CompletedTasksTraining";
import { EmployeeTasksTraning } from "pages/trainings/tasks-training/EmployeeTasksTraning";
import OrganizationalSettingsTraining from "pages/trainings/tasks-training/OrganizationalSettingsTraining";
import TaskTraining from "pages/trainings/tasks-training/TaskTraining";
import TaskTypeTraining from "pages/trainings/tasks-training/TaskTypeTraining";
import { TasksReportsTraining } from "pages/trainings/tasks-training/TasksReportsTraining";
import { Trainings } from "pages/trainings/tasks-training/Trainings";

const { default: Workplace } = require("pages/workplace/Workplace");
const { Protected } = require("./protected-routes/Protected");
const { default: Announcement } = require("pages/workplace/Announcement");
const { AnnouncementDetails } = require("pages/workplace/AnnouncementDetails");
const { default: Threads } = require("pages/workplace/Threads");
const { default: MyThreadDetails } = require("pages/workplace/MyThreadDetails");
const { default: ThreadList } = require("pages/workplace/ThreadList");
const {
  default: TelephonicDirectories,
} = require("pages/workplace/TelephonicDirectories");
const { default: Deductioon } = require("pages/workplace/deduction/Deduction");
const { default: QrCodes } = require("pages/workplace/qr-codes/QrCodes");
const { default: Notes } = require("pages/workplace/notes/Notes");
const { default: Tasks } = require("pages/workplace/tasks/Tasks");
const { CompletedTasks } = require("pages/workplace/tasks/CompletedTasks");
const { EmployeeTasks } = require("pages/workplace/tasks/EmployeeTasks");
const { TasksReports } = require("pages/workplace/tasks/TasksReports");
const {
  default: OrganizationalSettings,
} = require("pages/workplace/tasks/OrganizationalSettings");
const { default: TaskType } = require("pages/workplace/tasks/TaskType");

const workspaceRoutes = [
  {
    path: "/workspace",
    component: <Protected Component={Workplace} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/announcement",
    component: <Protected Component={Announcement} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/announcement/details/:id",
    component: <Protected Component={AnnouncementDetails} />,
    isProtected: false,
    layout: "header",
  },

  {
    path: "/my/threads",
    component: <Protected Component={Threads} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/my/threads/details/:id",
    component: <Protected Component={MyThreadDetails} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/threads",
    component: <Protected Component={ThreadList} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/telephonic/directories",
    component: <Protected Component={TelephonicDirectories} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/deduction",
    component: <Protected Component={Deductioon} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/qrcodes",
    component: <Protected Component={QrCodes} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/notes",
    component: <Protected Component={Notes} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/tasks",
    component: <Protected Component={Tasks} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/completed/tasks",
    component: <Protected Component={CompletedTasks} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/employee/tasks/:id",
    component: <Protected Component={EmployeeTasks} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/tasks/reports",
    component: <Protected Component={TasksReports} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/organizational/settings",
    component: <Protected Component={OrganizationalSettings} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/task/type",
    component: <Protected Component={TaskType} />,
    isProtected: false,
    layout: "header",
  },

  ///training routes
  {
    path: "/task/training",
    component: <Protected Component={TaskTraining} />,
    isProtected: true,
    layout: "header",
  },
  {
    path: "/completed/training",
    component: <Protected Component={CompletedTasksTraining} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/employee/training/:id",
    component: <Protected Component={EmployeeTasksTraning} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/training/reports",
    component: <Protected Component={TasksReportsTraining} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/organizational/training",
    component: <Protected Component={OrganizationalSettingsTraining} />,
    isProtected: false,
    layout: "header",
  },
    {
    path: "/training/type",
    component: <Protected Component={TaskTypeTraining} />,
    isProtected: false,
    layout: "header",
  },
  {

    path: "/trainings",
    component: <Protected Component={Trainings} />,
    isProtected: true,
    layout: "header",
  },
];

export default workspaceRoutes;
