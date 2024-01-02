import generateThunkAndSlice from "store/thunk/thunk";
import { endpoint } from "apiEndpoints";
import { methods } from "apiEndpoints";

const {
  slice: createTelephonicDirectory,
  request: createTelephonicDirectoryThunk,
} = generateThunkAndSlice(
  "createTelephonicDirectory",
  endpoint.createTelephonicDirectory,
  methods.POST
);

const {
  slice: getAllTelephonicDirectories,
  request: getAllTelephonicDirectoriesThunk,
} = generateThunkAndSlice(
  "getAllTelephonicDirectories",
  endpoint.getAllTelephonicDirectories,
  methods.POST
);

const {
  slice: archiveTelephonicDirectory,
  request: archiveTelephonicDirectoryThunk,
} = generateThunkAndSlice(
  "archiveTelephonicDirectory",
  endpoint.archiveTelephonicDirectory,
  methods.POST
);

export {
  createTelephonicDirectoryThunk,
  getAllTelephonicDirectories,
  getAllTelephonicDirectoriesThunk,
  archiveTelephonicDirectoryThunk,
};
