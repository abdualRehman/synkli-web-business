import { endpoint, methods } from "../../apiEndpoints";
import generateThunkAndSlice from "../thunk/thunk";

const { slice: signup, request: signupUser } = generateThunkAndSlice(
  "signup",
  endpoint.createUser,
  methods.POST
);
const { slice: otpVerification, request: otpVerificationThunk } =
  generateThunkAndSlice("otpVerification", endpoint.verifyEmail, methods.POST);
const { slice: resendOtp, request: resendOtpThunk } = generateThunkAndSlice(
  "resendOtp",
  endpoint.resendOtp,
  methods.POST
);

const { slice: getSecurityQuestions, request: getSecurityQuestionsThunk } =
  generateThunkAndSlice(
    "getSecurityQuestions",
    endpoint.getSecurityQuestions,
    methods.POST
  );

const {
  slice: verifySecurityQuestions,
  request: verifySecurityQuestionsThunk,
} = generateThunkAndSlice(
  "verifySecurityQuestions",
  endpoint.verifySecurityQuestions,
  methods.POST
);

const { slice: setPassword, request: setPasswordThunk } = generateThunkAndSlice(
  "setPassword",
  endpoint.setPassword,
  methods.POST
);

const { slice: setEmployee, request: setEmployeePasswordThunk } =
  generateThunkAndSlice(
    "setPassword",
    endpoint.updateEmployeePassword,
    methods.POST
  );

const { slice: login, request: loginThunk } = generateThunkAndSlice(
  "login",
  endpoint.login,
  methods.POST
);

const { slice: forgotPassword, request: forgotPasswordThunk } =
  generateThunkAndSlice("forgotPassword", endpoint.forgotPassword, methods.PUT);

const { slice: verifyForgetPass, request: verifyForgetPassThunk } =
  generateThunkAndSlice(
    "verifyForgotPass",
    endpoint.forgetPassOtp,
    methods.PUT
  );

const {
  slice: loginGetSecurityQuestions,
  request: loginGetSecurityQuestionsThunk,
} = generateThunkAndSlice(
  "loginGetSecurityQuestions",
  endpoint.loginGetSecurityQuestions,
  methods.POST
);

const { slice: loginVerifyAnswers, request: loginVerifyAnswersThunk } =
  generateThunkAndSlice(
    "loginVerifyAnswers",
    endpoint.loginVerifyAnswers,
    methods.POST
  );

const { slice: resetPassword, request: resetPasswordThunk } =
  generateThunkAndSlice("resetPassword", endpoint.resetPassword, methods.PUT);

const { slice: authEmailSendOtp, request: authEmailSendOtpThunk } =
  generateThunkAndSlice(
    "authEmailSendOtp",
    endpoint.authEmailSendOtp,
    methods.POST
  );

const { slice: authEmailVerifyOtp, request: authEmailVerifyOtpThunk } =
  generateThunkAndSlice(
    "authEmailVerifyOtp",
    endpoint.authEmailVerifyOtp,
    methods.PUT
  );

const { slice: googleAuth, request: googleAuthThunk } = generateThunkAndSlice(
  "googleAuth",
  endpoint.googleAuth,
  methods.POST
);

const { slice: verifyGoogleAuth, request: verifyGoogleAuthThunk } =
  generateThunkAndSlice(
    "verifyGoogleAuth",
    endpoint.verifyGoogleAuth,
    methods.POST
  );

const { slice: fetchUserData, request: fetchUserDataThunk } =
  generateThunkAndSlice("fetchUserData", endpoint.getUserInfo, methods.POST);

const { slice: generateBackupCodes, request: generateBackupCodesThunk } =
  generateThunkAndSlice(
    "generateBackupCodes",
    endpoint.generateBackupCodes,
    methods.POST
  );

const { slice: regenerateBackupCodes, request: regenerateBackupCodesThunk } =
  generateThunkAndSlice(
    "regenerateBackupCodes",
    endpoint.regenrateBackupCodes,
    methods.PUT
  );

const { slice: verifyBackupCode, request: verifyBackupCodeThunk } =
  generateThunkAndSlice(
    "verifyBackupCodes",
    endpoint.verifyBackupCode,
    methods.PUT
  );

const {
  slice: businessOwnerAddProfile,
  request: businessOwnerAddProfileThunk,
} = generateThunkAndSlice(
  "businessOwnerAddProfile",
  endpoint.businessOwnerAddProfile,
  methods.POST
);

const {
  slice: businessOwnerGetProfile,
  request: businessOwnerGetProfileThunk,
} = generateThunkAndSlice(
  "businessOwnerGetprofile",
  endpoint.businessOwnerGetProfile,
  methods.POST
);

const { slice: addBranchLocation, request: addBranchLocationThunk } =
  generateThunkAndSlice(
    "addBranchLocation",
    endpoint.addBranchLocation,
    methods.POST
  );

const { slice: getBranchLocations, request: getBranchLocationsThunk } =
  generateThunkAndSlice(
    "getBranchLocations",
    endpoint.getBranchLocations,
    methods.POST
  );

const { slice: addBusiness, request: addBusinessThunk } = generateThunkAndSlice(
  "addBusiness",
  endpoint.addBusiness,
  methods.POST
);

const { slice: getBusinessprofile, request: getBusinessprofileThunk } =
  generateThunkAndSlice(
    "getBusinessprofile",
    endpoint.getBusinessprofile,
    methods.POST
  );

const { slice: addService, request: addServiceThunk } = generateThunkAndSlice(
  "addService",
  endpoint.addService,
  methods.POST
);
const { slice: updateService, request: serviceUpdate } = generateThunkAndSlice(
  "updateService",
  endpoint.updateService,
  methods.POST
);

const { slice: getAllServices, request: getAllServicesThunk } =
  generateThunkAndSlice(
    "getAllServices",
    endpoint.getAllServices,
    methods.POST
  );

const { slice: viewOnBoardingDetails, request: viewOnBoardingDetailsThunk } =
  generateThunkAndSlice(
    "viewOnboardingDetails",
    endpoint.viewOnBoardingDetails,
    methods.POST
  );

const { slice: deleteBranch, request: deleteBranchThunk } =
  generateThunkAndSlice("deleteBranch", endpoint.deleteBranch, methods.DELETE);

const { slice: deleteService, request: deleteServiceThunk } =
  generateThunkAndSlice("deleteService", endpoint.deleteService, methods.POST);
const { slice: deactivateUser, request: deactivateUserThunk } =
  generateThunkAndSlice(
    "deactivateUser",
    endpoint.deactiveateUsers,
    methods.POST
  );
const { slice: updateUserProfileImage, request: updateUserProfileImageThunk } =
  generateThunkAndSlice(
    "updateUserProfileImage",
    endpoint.updateUserProfileImage,
    methods.POST
  );
const { slice: getBusinessHours, request: getBusinessHoursThunk } =
  generateThunkAndSlice(
    "getBusinessHours",
    endpoint.getBusinessHours,
    methods.POST
  );

const { slice: updateBusinessHours, request: updateBusinessHoursThunk } =
  generateThunkAndSlice(
    "updateBusinessHours",
    endpoint.updateBusinessHours,
    methods.POST
  );
const { slice: uploadBusinessPhoto, request: uploadBusinessPhotoThunk } =
  generateThunkAndSlice(
    "uploadBusinessPhoto",
    endpoint.uploadBusinessPhoto,
    methods.POST
  );
const { slice: updatePassword, request: updatePasswordThunk } =
  generateThunkAndSlice(
    "updatePassword",
    endpoint.updatePassword,
    methods.POST
  );

const { slice: getWorkspacephotos, request: getWorkspacephotosThunk } =
  generateThunkAndSlice(
    "getWorkspacephotos",
    endpoint.getWorkspacephotos,
    methods.POST
  );

const { slice: deleteBusinessPhoto, request: deleteBusinessPhotoThunk } =
  generateThunkAndSlice(
    "deleteBusinessPhoto",
    endpoint.deleteBusinessPhoto,
    methods.POST
  );

const { slice: totalPermissions, request: totalPermissionsThunk } =
  generateThunkAndSlice(
    "totalPermissions",
    endpoint.totalPermissions,
    methods.POST
  );

const { slice: uploadBusinessLogo, request: uploadBusinessLogoThunk } =
  generateThunkAndSlice(
    "uploadBusinessLogo",
    endpoint.uploadBusinessLogo,
    methods.POST
  );

const { slice: updateBranch, request: updateBranchThunk } =
  generateThunkAndSlice("updateBranch", endpoint.updateBranch, methods.POST);

const { slice: logout, request: logoutThunk } = generateThunkAndSlice(
  "logout",
  endpoint.logout,
  methods.DELETE
);

export {
  updateBranchThunk,
  signup,
  signupUser,
  otpVerification,
  otpVerificationThunk,
  setPassword,
  setPasswordThunk,
  login,
  loginThunk,
  googleAuth,
  googleAuthThunk,
  resendOtpThunk,
  getSecurityQuestions,
  getSecurityQuestionsThunk,
  verifySecurityQuestions,
  verifySecurityQuestionsThunk,
  forgotPassword,
  forgotPasswordThunk,
  verifyForgetPass,
  verifyForgetPassThunk,
  loginGetSecurityQuestions,
  loginGetSecurityQuestionsThunk,
  loginVerifyAnswersThunk,
  resetPasswordThunk,
  authEmailSendOtpThunk,
  authEmailVerifyOtpThunk,
  verifyGoogleAuthThunk,
  fetchUserData,
  fetchUserDataThunk,
  generateBackupCodesThunk,
  regenerateBackupCodesThunk,
  verifyBackupCodeThunk,
  businessOwnerAddProfileThunk,
  addBranchLocationThunk,
  getBranchLocationsThunk,
  addBusinessThunk,
  businessOwnerGetProfile,
  businessOwnerGetProfileThunk,
  getBusinessprofile,
  getBusinessprofileThunk,
  addServiceThunk,
  getAllServicesThunk,
  viewOnBoardingDetails,
  viewOnBoardingDetailsThunk,
  getAllServices,
  getBranchLocations,
  deleteBranchThunk,
  deleteServiceThunk,
  deactivateUserThunk,
  updateUserProfileImageThunk,
  getBusinessHoursThunk,
  getBusinessHours,
  updateBusinessHoursThunk,
  uploadBusinessPhotoThunk,
  updatePasswordThunk,
  getWorkspacephotos,
  getWorkspacephotosThunk,
  deleteBusinessPhotoThunk,
  totalPermissions,
  totalPermissionsThunk,
  uploadBusinessLogoThunk,
  serviceUpdate,
  setEmployeePasswordThunk,
  logoutThunk
};
