import generateThunkAndSlice from "store/thunk/thunk";
import { endpoint, methods } from "apiEndpoints";

const { slice: getAllNews, request: getAllNewsThunk } = generateThunkAndSlice(
  "getAllNews",
  endpoint.getAllNews,
  methods.POST
);

const { slice: archiveNews, request: archiveNewsThunk } = generateThunkAndSlice(
  "archiveNews",
  endpoint.archiveNews,
  methods.POST
);
const { slice: getSingleNews, request: getSingleNewsThunk } =
  generateThunkAndSlice("getSignleNews", endpoint.getSingleNews, methods.POST);
const { slice: updateNews, request: updateNewsThunk } = generateThunkAndSlice(
  "updateNews",
  endpoint.updateNews,
  methods.POST
);

const { slice: addNews, request: addNewsThunk } = generateThunkAndSlice(
  "addNews",
  endpoint.addNews,
  methods.POST
);

const { slice: uploadWorkSpaceImg, request: uploadWorkSpaceImgThunk } =
  generateThunkAndSlice(
    "uploadWorkSpaceImg",
    endpoint.uploadWorkSpaceImg,
    methods.POST
  );
const { slice: uploadWorkSpacepdf, request: uploadWorkSpacepdfThunk } =
  generateThunkAndSlice(
    "uploadWorkSpacePdf",
    endpoint.uploadWorkSpacepdf,
    methods.POST
  );

const { slice: deleteAnnFile, request: deleteAnnFileThunk } =
  generateThunkAndSlice("deleteAnnFile", endpoint.deleteAnnFile, methods.POST);
export {
  getAllNewsThunk,
  getAllNews,
  archiveNewsThunk,
  getSingleNews,
  getSingleNewsThunk,
  updateNewsThunk,
  addNewsThunk,
  uploadWorkSpaceImgThunk,
  uploadWorkSpacepdfThunk,
  deleteAnnFileThunk,
};
