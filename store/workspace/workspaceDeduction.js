import generateThunkAndSlice from "store/thunk/thunk";
import { endpoint } from "apiEndpoints";
import { methods } from "apiEndpoints";

const { slice: getAllDeductions, request: getAllDeductionsThunk } =
  generateThunkAndSlice(
    "getAllDeductions",
    endpoint.getAllDeductions,
    methods.POST
  );

const { slice: archiveDeduction, request: archiveDeductionThunk } =
  generateThunkAndSlice(
    "archiveDeduction",
    endpoint.archiveDeduction,
    methods.POST
  );

const { slice: createDeduction, request: createDeductionThunk } =
  generateThunkAndSlice(
    "createDeduction",
    endpoint.createDeduction,
    methods.POST
  );

const { slice: uploadDeductionFile, request: uploadDeductionFileThunk } =
  generateThunkAndSlice(
    "uploadDeductionFile",
    endpoint.uploadDeductionFile,
    methods.POST
  );

export {
  getAllDeductions,
  getAllDeductionsThunk,
  archiveDeduction,
  archiveDeductionThunk,
  createDeduction,
  createDeductionThunk,
  uploadDeductionFileThunk,
};
