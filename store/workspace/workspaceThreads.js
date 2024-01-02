import generateThunkAndSlice from "../thunk/thunk";
import { endpoint } from "apiEndpoints";
import { methods } from "apiEndpoints";

const {slice : getAllThreads, request : getAllThreadsThunk} = generateThunkAndSlice(
    "getAllThreads",
    endpoint.getAllThreads,
    methods.POST
)
const {slice : addThread, request : addThreadThunk} = generateThunkAndSlice(
    "addThread",
    endpoint.addThread,
    methods.POST
)

const {slice : getSingleThread, request : getSingleThreadThunk} = generateThunkAndSlice(
    "getSingleThread",
    endpoint.getSingleThread,
    methods.POST
)
const {slice : getAllComments, request : getAllCommentsThunk} = generateThunkAndSlice(
    "getAllComments",
    endpoint.getAllComments,
    methods.POST
)
const {slice : closeThread, request : closeThreadThunk} = generateThunkAndSlice(
    "closeThread",
    endpoint.closeThread,
    methods.POST
)
const {slice: addComment, request : addCommentThunk} = generateThunkAndSlice(
    "addComment",
    endpoint.addComment,
    methods.POST
)

const {slice : addReply, request : addReplyThunk} = generateThunkAndSlice(
    "addReply",
    endpoint.addReply,
    methods.POST
)
const {slice : uploadThreadFiles, request : uploadThreadFilesThunk} = generateThunkAndSlice(
    "uploadThreadFiles",
    endpoint.uploadThreadFiles,
    methods.POST
)

export {
    getAllThreads,
    getAllThreadsThunk,
    addThreadThunk,
    getSingleThread,
    getSingleThreadThunk,
    getAllComments,
    getAllCommentsThunk,
    closeThreadThunk,
    addCommentThunk,
    addReplyThunk,
    uploadThreadFilesThunk
}

