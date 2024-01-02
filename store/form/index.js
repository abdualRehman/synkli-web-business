import { endpoint, methods } from "apiEndpoints";
import generateThunkAndSlice from "store/thunk/thunk";

const { slice: fetchForms, request: fetchFormsThunk } = generateThunkAndSlice(
  "fetchForms",
  endpoint.fetchForms,
  methods.POST
);

const { slice: fetchCustomerForms, request: fetchCustomerFormsThunk } =
  generateThunkAndSlice(
    "fetchCustomerForms",
    endpoint.fetchCustomerForms,
    methods.POST
  );

const {
  slice: fetchSubmissionFormData,
  request: fetchSubmissionFormDataThunk,
} = generateThunkAndSlice(
  "fetchSubmissionFormData",
  endpoint.fetchSubmissionFormData,
  methods.POST
);

const { slice: postDynamicForm, request: postDynamicFormThunk } =
  generateThunkAndSlice(
    "postDynamicForm",
    endpoint.postDynamicForm,
    methods.POST
  );
const { slice: archiveSubmissionForm, request: archiveSubmissionFormThunk } =
  generateThunkAndSlice(
    "archiveSubmissionForm",
    endpoint.archiveSubmissionForm,
    methods.POST
  );

const { slice: archiveBusinessForm, request: archiveBusinessFormThunk } =
  generateThunkAndSlice(
    "archiveBusinessForm",
    endpoint.archiveBusinessForm,
    methods.POST
  );

const { slice: updateBusinessForm, request: updateBusniessFormThunk } =
  generateThunkAndSlice(
    "updateBusinessForm",
    endpoint.updateBusinessForm,
    methods.POST
  );

const { slice: updateCustomerForm, request: updateCustomerFormThunk } =
  generateThunkAndSlice(
    "updateCustomerForm",
    endpoint.updateCustomerForm,
    methods.POST
  );

const { slice: deleteFormFile, request: deleteFormFileThunk } =
  generateThunkAndSlice(
    "deleteFormFile",
    endpoint.deleteFormFile,
    methods.POST
  );

const { slice: singleFormLogs, request: singleFormLogsThunk } =
  generateThunkAndSlice(
    "singleFormLogs",
    endpoint?.singleFormLogs,
    methods.POST
  );

const { slice: customerActivity, request: customerActivityThunk } =
  generateThunkAndSlice(
    "customerActivity",
    endpoint.customerActivity,
    methods.POST
  );
export {
  fetchFormsThunk,
  fetchForms,
  fetchCustomerFormsThunk,
  fetchCustomerForms,
  fetchSubmissionFormDataThunk,
  fetchSubmissionFormData,
  postDynamicFormThunk,
  archiveSubmissionFormThunk,
  archiveBusinessFormThunk,
  updateBusniessFormThunk,
  updateCustomerFormThunk,
  deleteFormFileThunk,
  singleFormLogs,
  singleFormLogsThunk,
  customerActivity,
  customerActivityThunk,
};
