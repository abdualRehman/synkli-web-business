import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadTaskFileThunk } from "store/workspace/workspaceTasks";
import { USER_TYPE } from "utills/globalVars";

export const useAddTaskFile = (
  taskItem,
  uploadFiles,

  handleTasksUpdate,
  getSingleTask
) => {
  const dispatch = useDispatch();
  const [filesloader, setFilesLoader] = useState(false);
  const uploadTaskFiles = () => {
    const formData = new FormData();
    formData.append("task_id", taskItem?.task_id);
    formData.append("uploaded_by", USER_TYPE);

    if (uploadFiles) {
      uploadFiles.forEach((file, index) => {
        formData.append(`task_files`, file);
      });
    }
    setFilesLoader(true);
    dispatch(uploadTaskFileThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          handleTasksUpdate();

          getSingleTask();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFilesLoader(false);
      });
  };
  return { filesloader, uploadTaskFiles };
};
