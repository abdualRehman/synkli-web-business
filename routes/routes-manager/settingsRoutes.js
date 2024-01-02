const { default: AppUserProfile } = require("pages/app-users/AppUserfProfile");
const { default: AppUsers } = require("pages/app-users/AppUsers");
const { MainDashboard } = require("pages/main-dashboard/MainDashboard");
const { default: Profile } = require("pages/profile/Profile");
const { Settings } = require("pages/settings/Settings");
const { default: RoleManagement } = require("pages/team/RoleManagement");
const { default: Team } = require("pages/team/Team");
const { Protected } = require("routes/protected-routes/Protected");

const settingsRoutes = [
  {
    path: "/main/dashboard",
    component: <Protected Component={MainDashboard} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/settings",
    component: <Protected Component={Settings} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/app/users",
    component: <Protected Component={AppUsers} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/app/user/profile/:id",
    component: <Protected Component={AppUserProfile} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/team/rolemanagement",
    component: <Protected Component={RoleManagement} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/profile",
    component: <Protected Component={Profile} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/team",
    component: <Protected Component={Team} />,
    isProtected: false,
    layout: "header",
  },
];

export default settingsRoutes;
