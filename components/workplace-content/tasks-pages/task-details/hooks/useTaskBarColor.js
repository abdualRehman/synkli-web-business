import React, { useEffect, useState } from "react";
import { getDueStatus } from "utills/moment";

export const useTaskBarColor = (task) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (task) {
      const res = getDueStatus(task?.start_date, task?.end_date);
      if (res.includes("Overdue")) {
        setColor("#FD4A4A");
      } else if (res.includes("Due in")) {
        setColor("#101828");
      } else {
        setColor("#69E48E");
      }
    }
  }, [task]);
  return { color };
};
