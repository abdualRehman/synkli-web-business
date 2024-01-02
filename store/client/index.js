import { endpoint, methods } from "apiEndpoints";
import generateThunkAndSlice from "store/thunk/thunk";

const { slice: fetchBusinessCustomer, request: fetchBusinessCustomerThunk } =
  generateThunkAndSlice(
    "fetchBusinessCustomer",
    endpoint.fetchBusinessCustomer,
    methods.POST
  );
const {
  slice: fetchBusinessAllCustomer,
  request: fetchBusinessCustomerAllThunk,
} = generateThunkAndSlice(
  "fetchBusinessAllCustomer",
  endpoint.fetchBusinessAllCustomer,
  methods.POST
);

const {
  slice: viewBusinessCustomerInfo,
  request: viewBusinessCustomerInfoThunk,
} = generateThunkAndSlice(
  "viewBusinessCustomerInfo",
  endpoint.viewBusinessCustomerInfo,
  methods.POST
);

const { slice: addToClient, request: addToClientThunk } = generateThunkAndSlice(
  "addToClient",
  endpoint.addToClient,
  methods.POST
);

export {
  fetchBusinessCustomer,
  fetchBusinessCustomerThunk,
  viewBusinessCustomerInfoThunk,
  addToClientThunk,
  viewBusinessCustomerInfo,
  fetchBusinessCustomerAllThunk,
  fetchBusinessAllCustomer,
};
