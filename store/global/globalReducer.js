import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
  name: "global",
  initialState: {
    userPasswords: null,
    profileUpdating: false,
    isLoading: false,
    sideLoader: false,
    formSubmissionsId: "",
    singleService: "",
    businessFormEvent: false,
    form: [],
    previewForm: false,
    updateForm: false,
    editForm: [],
    allPermissions: {},
    task: null,
    status: null,
    code: {},
    branch: {},
    image: {},
    intervalId: null,
    profileImg: null,
    businessLogo: null,
    isConfirmationOpen: false,
    showindicators: true,
  },
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setSideLoader: (state, action) => {
      state.sideLoader = action.payload;
    },
    handleFormSubmissions: (state, action) => {
      state.formSubmissionsId = action.payload;
    },
    handleBusinessFormEvent: (state, action) => {
      state.businessFormEvent = action.payload;
    },
    formHandler: (state, action) => {
      state.form = action.payload;
    },
    previewFormToggler: (state, action) => {
      state.previewForm = action.payload;
    },
    updateFormToggler: (state, action) => {
      state.updateForm = action.payload;
    },
    handleProfileUpdating: (state, action) => {
      state.profileUpdating = action.payload;
    },
    handleEditForm: (state, action) => {
      state.editForm = action.payload;
    },
    handleUserPasswords: (state, action) => {
      state.userPasswords = action.payload;
    },
    handleAllPermissions: (state, action) => {
      state.allPermissions = action.payload;
    },
    handleTaskDetails: (state, action) => {
      state.task = action.payload;
    },
    handleTaskStatus: (state, action) => {
      state.status = action.payload;
    },
    handleSingleCode: (state, action) => {
      state.code = action.payload;
    },
    editService: (state, action) => {
      state.singleService = action.payload;
    },
    editBranch: (state, action) => {
      state.branch = action.payload;
    },
    handleImage: (state, action) => {
      state.image = action.payload;
    },
    setGlobalSocketConnection: (state, action) => {
      state.intervalId = action.payload;
    },
    handleProfileImage: (state, action) => {
      state.profileImg = action.payload;
    },
    handleBusinessLogo: (state, action) => {
      state.businessLogo = action.payload;
    },
    setIsConfirmationOpen: (state, action) => {
      state.isConfirmationOpen = action.payload;
    },
    handleIndicators: (state, action) => {
      state.showindicators = action.payload;
    },
  },
});

export const {
  setLoader,
  setSideLoader,
  handleFormSubmissions,
  handleBusinessFormEvent,
  formHandler,
  previewFormToggler,
  updateFormToggler,
  handleProfileUpdating,
  handleEditForm,
  handleUserPasswords,
  handleAllPermissions,
  handleTaskDetails,
  handleTaskStatus,
  handleSingleCode,
  editService,
  editBranch,
  handleImage,
  setGlobalSocketConnection,
  handleProfileImage,
  handleBusinessLogo,
  setIsConfirmationOpen,
  handleIndicators,
} = globalReducer.actions;

export default globalReducer;
