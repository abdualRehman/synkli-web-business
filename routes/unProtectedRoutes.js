import { Page404 } from "pages/404Page/Page404";
import { AcceptInvite } from "pages/team/AcceptInvite";

const unProtectedRoutes = [
  {
    path: "/accept/invite/:token",
    component: <AcceptInvite />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "*",
    component: <Page404 />,
    isProtected: false,
    layout: "header",
  },
];
export default unProtectedRoutes;
