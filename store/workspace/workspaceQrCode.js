import generateThunkAndSlice from "store/thunk/thunk";
import { endpoint } from "apiEndpoints";
import { methods } from "apiEndpoints";

const { slice: getAllQrCodes, request: getAllQrCodesThunk } =
  generateThunkAndSlice("getAllQrCodes", endpoint.getAllQrCodes, methods.POST);

const { slice: createQrCode, request: createQrCodeThunk } =
  generateThunkAndSlice("createQrCode", endpoint.createQrCode, methods.POST);

const { slice: archiveQrCode, request: archiveQrCodeThunk } =
  generateThunkAndSlice("archiveQrCode", endpoint.archiveQrCode, methods.POST);

export {
  getAllQrCodes,
  getAllQrCodesThunk,
  createQrCode,
  createQrCodeThunk,
  archiveQrCode,
  archiveQrCodeThunk,
};
