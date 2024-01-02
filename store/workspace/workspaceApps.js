

import generateThunkAndSlice from "../thunk/thunk";
import { endpoint, methods } from "apiEndpoints";

const {slice : addApp, request : addAppThunk} = generateThunkAndSlice(
    "addApp",
    endpoint.addApp,
    methods.POST
)
const {slice : retriveAllApps, request : retriveAllAppsThunk} = generateThunkAndSlice(
    "retriveAllApps",
    endpoint.retriveAllApps,
    methods.POST
)
const {slice : getAllSApps, request : getAllAppsThunk} = generateThunkAndSlice(
    "getAllApps",
    endpoint.getAllApps,
    methods.POST
)
const {slice : deleteApp, request : deleteAppThunk} = generateThunkAndSlice(
    "deleteApp",
    endpoint.deleteApp,
    methods.DELETE
)
const {slice : uploadAppImage, request : uploadAppImageThunk} = generateThunkAndSlice(
    "uploadAppImage",
    endpoint.uploadAppImage,
    methods.POST
)

export  {
    addAppThunk,
    getAllAppsThunk,
    deleteAppThunk,
    uploadAppImageThunk
}