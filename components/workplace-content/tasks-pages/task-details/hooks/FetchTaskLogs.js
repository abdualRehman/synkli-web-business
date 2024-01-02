import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTaskLogsThunk } from "store/workspace/workspaceTasks";

export const FetchTaskLogs = (task_id, page) => {
  const dispatch = useDispatch();
  const [logsLoader, setLogsLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [data, setData] = useState([]);
  const fetchLogs = () => {
    const payload = {
      task_id,
      page,
    };
    setLogsLoader(true);
    dispatch(getTaskLogsThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setTotalPages(Math.ceil(response.payload.count / 10));
          setData((prevData) => [...prevData, ...response.payload.logs]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLogsLoader(false);
      });
  };
  useEffect(() => {
    fetchLogs();
  }, [task_id]);

  return { logsLoader, totalPages, data };
};
