import StartSubs from "pages/dashboard/StartSubs";
import Onboarding from "pages/dashboard/onboarding/Onboarding";
import AlternateMethod from "pages/lost-two-fa/AlternateMethod";
import BackupAlternate from "pages/lost-two-fa/BackupAlternate";
import EmailAlternate from "pages/lost-two-fa/EmailAlternate";
import LoginSuccessful from "pages/lost-two-fa/LoginSuccessful";
import LostGoogleAuth from "pages/lost-two-fa/LostGoogleAuth";
import LostTwoFa from "pages/lost-two-fa/LostTwoFa";
import { SecurityQuestionsAlternate } from "pages/lost-two-fa/SecurityQuestionsAlternate";
import { OneTimeProtection } from "./protected-routes/OneTimeProtection";

const { default: Dashboard } = require("pages/dashboard/Dashboard");
const { Protected } = require("./protected-routes/Protected");
const { default: TwoFactor } = require("pages/dashboard/auth/TwoFactor");
const {
  default: EmailAuth,
} = require("pages/dashboard/auth/email-auth/EmailAuth");
const {
  default: EmailSuccess,
} = require("pages/dashboard/auth/email-auth/EmailSuccess");
const {
  default: GoogleAuth,
} = require("pages/dashboard/auth/google-auth/GoogleAuth");
const {
  default: GoogleQr,
} = require("pages/dashboard/auth/google-auth/GoogleQr");
const {
  default: AuthSuccess,
} = require("pages/dashboard/auth/google-auth/AuthSuccess");
const { default: BackupCodes } = require("pages/dashboard/auth/BackupCodes");
const { default: SubsSuccess } = require("pages/dashboard/SubsSuccess");

const twoFactorRoutes = [
  {
    path: "/dashboard",
    component: <OneTimeProtection Component={Dashboard} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/two/factor/auth",
    component: <OneTimeProtection Component={TwoFactor} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/email/auth",
    component: <OneTimeProtection Component={EmailAuth} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/email/success",
    component: <OneTimeProtection Component={EmailSuccess} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/google/auth",
    component: <OneTimeProtection Component={GoogleAuth} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/google/qr",
    component: <OneTimeProtection Component={GoogleQr} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/auth/success",
    component: <OneTimeProtection Component={AuthSuccess} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/backup/codes",
    component: <OneTimeProtection Component={BackupCodes} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/start/subs",
    component: <OneTimeProtection Component={StartSubs} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/subs/success",
    component: <OneTimeProtection Component={SubsSuccess} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/lost/two/fa",
    component: <OneTimeProtection Component={LostTwoFa} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/lost/google/auth",
    component: <OneTimeProtection Component={LostGoogleAuth} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/alternate/method",
    component: <OneTimeProtection Component={AlternateMethod} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/backup/alternate",
    component: <OneTimeProtection Component={BackupAlternate} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/email/alternate",
    component: <OneTimeProtection Component={EmailAlternate} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/security/questions/alternate",
    component: <OneTimeProtection Component={SecurityQuestionsAlternate} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/login/successful",
    component: <OneTimeProtection Component={LoginSuccessful} />,
    isProtected: true,
    layout: "none",
  },
  {
    path: "/onboarding",
    component: <OneTimeProtection Component={Onboarding} />,
    isProtected: true,
    layout: "none",
  },
];

export default twoFactorRoutes;
