import Header from "components/Header";
import authRoutes from "./auth";
import twoFactorRoutes from "./authTwoFactor";
import workspaceRoutes from "./workspaceRoutes";
import settingsRoutes from "./routes-manager/settingsRoutes";
import unProtectedRoutes from "./unProtectedRoutes";
import reportsRoutes from "./reportsRoutes";
import appointmentRoutes from "./appointmentRoutes";

import { HEADERLAYOUT } from "utills/globalVars";

// export const allRoutes =  [...authRoutes];

let AllRoutes = [];
const headerLayout = {
  layout: HEADERLAYOUT,
  path: "/",
  element: <Header />,
  routes: authRoutes,
};

const twoFactorLayout = {
  layout: "none",
  path: "/",
  element: "",
  routes: twoFactorRoutes,
};
const workspaceLayout = {
  layout: "none",
  path: "/",
  element: "",
  routes: workspaceRoutes,
};
const settingsLayout = {
  layout: "none",
  path: "/",
  element: "",
  routes: settingsRoutes,
};

const unProtectedRoutesLayout = {
  layout: "none",
  path: "/",
  element: "",
  routes: unProtectedRoutes,
};

const reportsLayout = {
  layout: "none",
  path: "/",
  element: "",
  routes: reportsRoutes,
};

const appointmentRoutesLayout = {
  layout: "none",
  path: "/",
  element: "",
  routes: appointmentRoutes,
};

AllRoutes.unshift(
  headerLayout,
  twoFactorLayout,
  workspaceLayout,
  settingsLayout,
  unProtectedRoutesLayout,
  reportsLayout,
  appointmentRoutesLayout
);

export { AllRoutes };
