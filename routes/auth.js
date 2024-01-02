import Home from "../pages/Home";
import { SignupOtp } from "../pages/sign-up-pages/SignupOtp";
import SecurityQuestions from "../components/login-steps/SecurityQuestions";
import { SignupSetPassword } from "../pages/sign-up-pages/SignupSetPassword";
import { TermsAndConditions } from "../pages/sign-up-pages/TermsAndConditions";
import PrivacyPolicy from "../components/signup-steps/PrivacyPolicy";
import { RegistrationSuccessfull } from "../pages/sign-up-pages/RegistrationSuccessfull";
import { Route } from "react-router-dom";
import { SignupProtection } from "./protected-routes/SignupProtection";
import Login from "pages/Login";
import { ForgotPassword } from "pages/login-pages/ForgotPassword";
import { OTPVerification } from "pages/login-pages/OTPVerification";
import { LoginSecurityQuestions } from "pages/login-pages/LoginSecurityQuestions";
import { NewPassword } from "pages/login-pages/NewPassword";
import ResetSuccess from "components/login-steps/ResetSuccess";
import GoogleAuthenticator from "pages/second-time-login/GoogleAuthenticator";
import EmailAuthenticator from "pages/second-time-login/EmailAuthenticator";
import { UpdateEmployeePasswordword } from "pages/login-pages/updateEmployeePassword";
import LoginSuccessfull from "pages/second-time-login/LoginSuccessfull";
import { SignupSecurityQuestions } from "pages/sign-up-pages/SignupSecurityQuestions";
import Header from "components/Header";
import { Protected } from "./protected-routes/Protected";
import Dashboard from "pages/dashboard/Dashboard";
import TwoFactor from "pages/dashboard/auth/TwoFactor";
import EmailAuth from "pages/dashboard/auth/email-auth/EmailAuth";
const authRoutes = [
  { path: "/", component: <Login />, isProtected: false },
  {
    path: "/signup/otp/verification",
    component: <SignupProtection Component={SignupOtp} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/signup/security/questions/:user_id",
    component: <SignupSecurityQuestions />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/signup/setPassword/:user_id",
    component: <SignupSetPassword />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/terms/and/conditions/:email",
    component: <TermsAndConditions />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/privacy/policy/:email",
    component: <PrivacyPolicy />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/signup/registration/successfull",
    component: <RegistrationSuccessfull />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/login",
    component: <Login />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/forgot/password",
    component: <ForgotPassword />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/otp/verification/:email",
    component: <OTPVerification />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/login/security/questions/:email",
    component: <LoginSecurityQuestions />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/new/password/:email",
    component: <NewPassword />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/reset/password/success",
    component: <ResetSuccess />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/google/authenticator",
    component: <GoogleAuthenticator />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/email/authenticator",
    component: <EmailAuthenticator />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/login/success",
    component: <LoginSuccessfull />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/signup",
    component: <Home />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/update-ot-password/:user_id",
    component: <UpdateEmployeePasswordword />,
    isProtected: false,
    layout: "header",
  }
];

export default authRoutes;
