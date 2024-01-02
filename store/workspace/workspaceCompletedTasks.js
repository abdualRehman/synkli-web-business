import generateThunkAndSlice from "../thunk/thunk";
import { endpoint, methods } from "apiEndpoints";

const { slice: weeklyStatsCompleted, request: weeklyStatsCompletedThunk } =
  generateThunkAndSlice(
    "weeklyStatsCompleted",
    endpoint.weeklyStatsCompleted,
    methods.POST
  );

export { weeklyStatsCompleted, weeklyStatsCompletedThunk };
