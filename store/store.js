import { combineReducers, configureStore } from "@reduxjs/toolkit";

import globalReducer from "./global/globalReducer";
import { persistStore } from "redux-persist";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  signup,
  otpVerification,
  setPassword,
  login,
  googleAuth,
  getSecurityQuestions,
  verifySecurityQuestions,
  forgotPassword,
  verifyForgetPass,
  loginGetSecurityQuestions,
  getAllServices,
  getBranchLocations,
  getBusinessHours,
  getWorkspacephotos,
  totalPermissions,
  getBusinessprofile,
  businessOwnerGetProfile,
  viewOnBoardingDetails,
} from "./auth/slices";

import {
  fetchBusinessAllCustomer,
  fetchBusinessCustomer,
  viewBusinessCustomerInfo,
} from "./client";
import {
  fetchRoleGroups,
  authPermissions,
  fetchRegisteredEmployees,
  fetchBusinessEmployee,
} from "./settings/team/team";
import {
  fetchForms,
  fetchCustomerForms,
  fetchSubmissionFormData,
  singleFormLogs,
  customerActivity,
} from "./form";

//workspace reducers
import { getAllNews, getSingleNews } from "./workspace/workspaceNews";
import {
  getAllThreads,
  getSingleThread,
  getAllComments,
} from "./workspace/workspaceThreads";
import { getAllTelephonicDirectories } from "./workspace/workspaceTelephonicDirectories";

import { getAllNotes } from "./workspace/workspaceNotes";
import {
  getAllDeductions,
  createDeduction,
} from "./workspace/workspaceDeduction";
import { getAllQrCodes } from "./workspace/workspaceQrCode";
import {
  getAllTaskStatuses,
  getAllTaskType,
  getAllTasks,
  getSingleTask,
  getActivity,
  getTaskLogs,
  getAllTasksLogs,
} from "./workspace/workspaceTasks";
import {
  employeeEfficiency,
  getTaskEmpInfo,
  singleEmployeeTaks,
  taskCountByType,
  weeklyStatsEmployee,
  yearlyStatistics,
} from "./workspace/workspaceEmployeeTasks";
import { weeklyStatsCompleted } from "./workspace/workspaceCompletedTasks";

const reducers = combineReducers({
  signup: signup.reducer,
  otpVerification: otpVerification.reducer,
  setPassword: setPassword.reducer,
  login: login.reducer,
  googleAuth: googleAuth.reducer,
  global: globalReducer.reducer,
  viewBusinessCustomerInfo: viewBusinessCustomerInfo.reducer,
  getSecurityQuestions: getSecurityQuestions.reducer,
  verifySecurityQuestions: verifySecurityQuestions.reducer,
  forgotPassword: forgotPassword.reducer,
  verifyForgetPass: verifyForgetPass.reducer,
  businessOwnerGetProfile: businessOwnerGetProfile.reducer,
  loginGetSecurityQuestions: loginGetSecurityQuestions.reducer,
  fetchBusinessCustomer: fetchBusinessCustomer.reducer,
  fetchForms: fetchForms.reducer,
  fetchCustomerForms: fetchCustomerForms.reducer,
  fetchSubmissionFormData: fetchSubmissionFormData.reducer,
  fetchRoleGroups: fetchRoleGroups.reducer,
  getAllServices: getAllServices.reducer,
  getBranchLocations: getBranchLocations.reducer,
  getAllNews: getAllNews.reducer,
  getSingleNews: getSingleNews.reducer,
  getAllThreads: getAllThreads.reducer,
  getSingleThread: getSingleThread.reducer,
  getAllComments: getAllComments.reducer,
  getAllTelephonicDirectories: getAllTelephonicDirectories.reducer,
  authPermissions: authPermissions.reducer,
  getBusinessHours: getBusinessHours.reducer,
  getWorkspacephotos: getWorkspacephotos.reducer,
  totalPermissions: totalPermissions.reducer,
  getAllDeductions: getAllDeductions.reducer,
  getAllNotes: getAllNotes.reducer,
  createDeduction: createDeduction.reducer,
  getAllQrCodes: getAllQrCodes.reducer,
  getAllTaskStatuses: getAllTaskStatuses.reducer,
  getAllTaskType: getAllTaskType.reducer,
  fetchRegisteredEmployees: fetchRegisteredEmployees.reducer,
  getAllTasks: getAllTasks.reducer,
  getSingleTask: getSingleTask.reducer,
  getActivity: getActivity.reducer,
  getTaskLogs: getTaskLogs.reducer,
  getAllTasksLogs: getAllTasksLogs.reducer,
  getBusinessprofile: getBusinessprofile.reducer,
  fetchBusinessAllCustomer: fetchBusinessAllCustomer.reducer,
  fetchBusinessEmployee: fetchBusinessEmployee.reducer,
  yearlyStatistics: yearlyStatistics.reducer,
  weeklyStatsEmployee: weeklyStatsEmployee.reducer,
  employeeEfficiency: employeeEfficiency.reducer,
  singleEmployeeTaks: singleEmployeeTaks.reducer,
  taskCountByType: taskCountByType.reducer,
  weeklyStatsCompleted: weeklyStatsCompleted.reducer,
  getTaskEmpInfo: getTaskEmpInfo.reducer,
  viewOnBoardingDetails: viewOnBoardingDetails.reducer,
  singleFormLogs: singleFormLogs.reducer,
  customerActivity: customerActivity.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "signup",
    "login",
    "otpVerification",
    "googleAuth",
    "authPermissions",
    "totalPermissions",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
