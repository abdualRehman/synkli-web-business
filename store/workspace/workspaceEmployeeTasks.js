import generateThunkAndSlice from "../thunk/thunk";
import { endpoint, methods } from "apiEndpoints";

const { slice: yearlyStatistics, request: yearlyStatisticsThunk } =
  generateThunkAndSlice(
    "yearlyStatistics",
    endpoint.yearlyStatistics,
    methods.POST
  );

const { slice: weeklyStatsEmployee, request: weeklyStatsEmployeeThunk } =
  generateThunkAndSlice(
    "weeklyStatsEmployee",
    endpoint.weeklyStateEmployee,
    methods.POST
  );

const { slice: employeeEfficiency, request: employeeEfficiencyThunk } =
  generateThunkAndSlice(
    "employeeEfficiency",
    endpoint.employeeEfficiency,
    methods.POST
  );

const { slice: singleEmployeeTaks, request: singleEmployeeTaksThunk } =
  generateThunkAndSlice(
    "singleEmployeeTaks",
    endpoint.singleEmployeeTaks,
    methods.POST
  );
const { slice: taskCountByType, request: taskCountByTypeThunk } =
  generateThunkAndSlice(
    "taskCountByType",
    endpoint.taskCountByType,
    methods.POST
  );

const { slice: getTaskEmpInfo, request: getTaskEmpInfoThunk } =
  generateThunkAndSlice(
    "getTaskEmpInfo",
    endpoint.getTaskEmpInfo,
    methods.POST
  );

export {
  yearlyStatistics,
  yearlyStatisticsThunk,
  weeklyStatsEmployee,
  weeklyStatsEmployeeThunk,
  employeeEfficiency,
  employeeEfficiencyThunk,
  singleEmployeeTaks,
  singleEmployeeTaksThunk,
  taskCountByType,
  taskCountByTypeThunk,
  getTaskEmpInfo,
  getTaskEmpInfoThunk,
};
