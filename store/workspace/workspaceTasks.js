import generateThunkAndSlice from "store/thunk/thunk";
import { endpoint, methods } from "apiEndpoints";

const { slice: createTaskStatus, request: createTaskStatusThunk } =
  generateThunkAndSlice(
    "createTaskStatus",
    endpoint.createTaskStatus,
    methods.POST
  );

const { slice: createTaskType, request: createTaskTypeThunk } =
  generateThunkAndSlice(
    "createTaskType",
    endpoint.createTaskType,
    methods.POST
  );

const { slice: getAllTaskStatuses, request: getAllTaskStatusesThunk } =
  generateThunkAndSlice(
    "getAllTaskStatuses",
    endpoint.getAllTaskStatuses,
    methods.POST
  );

const { slice: updateStatus, request: updateStatusThunk } =
  generateThunkAndSlice("updateStatus", endpoint.updateStatus, methods.POST);

const { slice: archiveTaskStatus, request: archiveTaskStatusThunk } =
  generateThunkAndSlice(
    "archiveTaskStatus",
    endpoint.archiveTaskStatus,
    methods.POST
  );

const { slice: getAllTaskType, request: getAllTaskTypeThunk } =
  generateThunkAndSlice(
    "getAllTaskType",
    endpoint.getAllTaskType,
    methods.POST
  );

const { slice: archiveTaskType, request: archiveTaskTypeThunk } =
  generateThunkAndSlice(
    "archiveTaskType",
    endpoint.archiveTaskType,
    methods.POST
  );

const { slice: addTask, request: addTaskThunk } = generateThunkAndSlice(
  "addTask",
  endpoint.addTask,
  methods.POST
);

const { slice: getAllTasks, request: getAllTasksThunk } = generateThunkAndSlice(
  "getAllTasks",
  endpoint.getAllTasks,
  methods.POST
);

const { slice: getSingleTask, request: getSingleTaskThunk } =
  generateThunkAndSlice("getSingleTask", endpoint.getSingleTask, methods.POST);

const { slice: updateChecklistItem, request: updateChecklistItemThunk } =
  generateThunkAndSlice(
    "updateChecklistItem",
    endpoint.updateChecklistItem,
    methods.POST
  );

const { slice: createChecklistItem, request: createChecklistItemThunk } =
  generateThunkAndSlice(
    "createChecklistItem",
    endpoint.createChecklistItem,
    methods.POST
  );

const { slice: updateTask, request: updateTaskThunk } = generateThunkAndSlice(
  "updateTask",
  endpoint.updateTask,
  methods.POST
);

const { slice: archiveTaskChecklist, request: archiveTaskChecklistTunk } =
  generateThunkAndSlice(
    "archiveTaskChecklist",
    endpoint.archiveTaskChecklist,
    methods.POST
  );

const {
  slice: archiveTaskChecklistItem,
  request: archiveTaskChecklistItemThunk,
} = generateThunkAndSlice(
  "archiveTaskchecklistItemThunk",
  endpoint.archiveTaskChecklistItem,
  methods.POST
);

const { slice: addEmployeeToTask, request: addEmployeeToTaskThunk } =
  generateThunkAndSlice(
    "addEmployeeToTask",
    endpoint.addEmployeeToTask,
    methods.POST
  );

const { slice: uploadTaskFiles, request: uploadTaskFilesThunk } =
  generateThunkAndSlice(
    "uploadTaskFiles",
    endpoint.uploadTaskFiles,
    methods.POST
  );

const { slice: createTaskComment, request: createTaskCommentThunk } =
  generateThunkAndSlice(
    "createTaskComment",
    endpoint.createTaskComment,
    methods.POST
  );

const { slice: getActivity, request: getActivityThunk } = generateThunkAndSlice(
  "getActivity",
  endpoint.getActivity,
  methods.POST
);

const { slice: deleteActivity, request: deleteActivityThunk } =
  generateThunkAndSlice(
    "deleteActivity",
    endpoint.deleteActivity,
    methods.POST
  );

const {
  slice: deleteSingleCommentFile,
  request: deleteSingleCommentFileThunk,
} = generateThunkAndSlice(
  "deleteSingleCommentFile",
  endpoint.deleteSingleCommentFile,
  methods.POST
);

const { slice: updateActivity, request: updateActivityThunk } =
  generateThunkAndSlice(
    "updateActivity",
    endpoint.updateActivity,
    methods.POST
  );

const { slice: getTaskLogs, request: getTaskLogsThunk } = generateThunkAndSlice(
  "getTaskLogs",
  endpoint.getTaskLogs,
  methods.POST
);

const { slice: uploadTaskFile, request: uploadTaskFileThunk } =
  generateThunkAndSlice(
    "uploadTaskFile",
    endpoint.uploadTaskFile,
    methods.POST
  );

const { slice: getAllTasksLogs, request: getAllTasksLogsThunk } =
  generateThunkAndSlice(
    "getAllTasksLogs",
    endpoint.getAllTasksLogs,
    methods.POST
  );

const { slice: archiveTaskFile, request: archiveTaskFileThunk } =
  generateThunkAndSlice(
    "archiveTaskfile",
    endpoint.archiveTaskFile,
    methods.POST
  );
  const { slice: shareTask, request: shareTaskThunk } =
  generateThunkAndSlice(
    "shareTask",
    endpoint.shareTask,
    methods.POST
  );
  const { slice: markAsCompleteTask, request: markAsCompleteTaskThunk } =
  generateThunkAndSlice(
    "markAsCompleteTask",
    endpoint.markAsCompleteTask,
    methods.POST
  );
export {
  createTaskStatusThunk,
  createTaskTypeThunk,
  getAllTaskStatusesThunk,
  getAllTaskStatuses,
  updateStatusThunk,
  archiveTaskStatusThunk,
  getAllTaskTypeThunk,
  getAllTaskType,
  archiveTaskTypeThunk,
  addTaskThunk,
  getAllTasks,
  getAllTasksThunk,
  getSingleTask,
  getSingleTaskThunk,
  updateChecklistItemThunk,
  createChecklistItemThunk,
  updateTaskThunk,
  archiveTaskChecklistTunk,
  archiveTaskChecklistItemThunk,
  addEmployeeToTaskThunk,
  uploadTaskFilesThunk,
  createTaskCommentThunk,
  getActivityThunk,
  getActivity,
  deleteActivityThunk,
  deleteSingleCommentFileThunk,
  updateActivityThunk,
  getTaskLogs,
  getTaskLogsThunk,
  uploadTaskFileThunk,
  archiveTaskFileThunk,
  getAllTasksLogs,
  getAllTasksLogsThunk,
  shareTaskThunk,
  markAsCompleteTaskThunk
};
