import { endpoint, methods } from "apiEndpoints";
import generateThunkAndSlice from "store/thunk/thunk";
import { authEmailSendOtpThunk } from "store/auth/slices";

const { slice: getPermissions, request: getPermissionsThunk } =
  generateThunkAndSlice(
    "getPermissions",
    endpoint.getPermissions,
    methods.POST
  );

const { slice: getAllBusinessModules, request: getAllBusinessModulesThunk } =
  generateThunkAndSlice(
    "getAllBusinessModules",
    endpoint.getAllBusinessModules,
    methods.POST
  );
const { slice: fetchAllBusinessGroups, request: fetchAllBusinessGroupsThunk } =
  generateThunkAndSlice(
    "fetchAllBusinessGroups",
    endpoint.fetchAllBusinessGroups,
    methods.POST
  );

const { slice: sendEmployeeInvite, request: sendEmployeeInviteThunk } =
  generateThunkAndSlice(
    "sendEmployeeInvite",
    endpoint.sendEmployeeInvite,
    methods.POST
  );

const { slice: fetchInvitedEmployees, request: fetchInvitedEmployeesThunk } =
  generateThunkAndSlice(
    "fetchInvitedEmployees",
    endpoint.fetchInvitedEmployees,
    methods.POST
  );

const {
  slice: fetchRegisteredEmployees,
  request: fetchRegisteredEmployeesThunk,
} = generateThunkAndSlice(
  "fetchRegisteredEmployees",
  endpoint.fetchRegisteredEmployees,
  methods.POST
);

const { slice: revokeEmployeeInvite, request: revokeEmployeeInviteThunk } =
  generateThunkAndSlice(
    "revokeEmployeeInvite",
    endpoint.revokeEmployeeInvite,
    methods.POST
  );

const {
  slice: businessEmployeeArchive,
  request: businessEmployeeArchiveThunk,
} = generateThunkAndSlice(
  "businessEmployeeArchive",
  endpoint.businessEmployeeArchive,
  methods.POST
);

const { slice: fetchBusinessEmployee, request: fetchBusinessEmployeeThunk } =
  generateThunkAndSlice(
    "fetchBusinessEmployee",
    endpoint.fetchBusinessEmployee,
    methods.POST
  );

const { slice: updateBusinessEmployee, request: updateBusinessEmployeeThunk } =
  generateThunkAndSlice(
    "updateBusinessEmployee",
    endpoint.updateBusinessEmployee,
    methods.POST
  );

const { slice: fetchAllPermissions, request: fetchAllPermissionsThunk } =
  generateThunkAndSlice(
    "fetchAllPermissions",
    endpoint.fetchAllPermissions,
    methods.POST
  );

const { slice: addRoleGroup, request: addRoleGroupThunk } =
  generateThunkAndSlice("addRoleGroup", endpoint.addRoleGroup, methods.POST);

const { slice: fetchRoleGroups, request: fetchRoleGroupsThunk } =
  generateThunkAndSlice(
    "fetchRoleGroups",
    endpoint.fetchRoleGroups,
    methods.POST
  );

const {
  slice: updateBusinesGroupPermissionStatus,
  request: updateBusinesGroupPermissionStatusThunk,
} = generateThunkAndSlice(
  "updateBusinesGroupPermissionStatus",
  endpoint.updateBusinesGroupPermissionStatus,
  methods.POST
);

const {
  slice: updateBusinessGroupstatus,
  request: updateBusinessGroupstatusThunk,
} = generateThunkAndSlice(
  "updateBusinessGroupstatus",
  endpoint.updateBusinessGroupstatus,
  methods.POST
);

const { slice: acceptInvite, request: acceptInviteThunk } =
  generateThunkAndSlice("acceptInvite", endpoint.acceptInvite, methods.POST);
const { slice: authPermissions, request: authPermissionsThunk } =
  generateThunkAndSlice(
    "authPermissions",
    endpoint.authPermissions,
    methods.POST
  );

  const {
    slice: resetPasswordOfEmployee,
    request: resetPasswordOfEmployeeThunk,
  } = generateThunkAndSlice(
    "resetPasswordOfEmployee",
    endpoint.resetPasswordOfEmployee,
    methods.POST
  );

export {
  getPermissionsThunk,
  getAllBusinessModulesThunk,
  fetchAllBusinessGroupsThunk,
  sendEmployeeInviteThunk,
  fetchInvitedEmployeesThunk,
  fetchRegisteredEmployeesThunk,
  revokeEmployeeInviteThunk,
  businessEmployeeArchiveThunk,
  fetchBusinessEmployee,
  fetchBusinessEmployeeThunk,
  updateBusinessEmployeeThunk,
  fetchAllPermissionsThunk,
  addRoleGroupThunk,
  fetchRoleGroupsThunk,
  fetchRoleGroups,
  updateBusinesGroupPermissionStatusThunk,
  updateBusinessGroupstatusThunk,
  acceptInviteThunk,
  authPermissions,
  authPermissionsThunk,
  authEmailSendOtpThunk,
  fetchRegisteredEmployees,
  resetPasswordOfEmployeeThunk
};
