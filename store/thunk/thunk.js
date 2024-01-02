import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makeHttpRequest } from "../../axios";

const generateThunkAndSlice = (sliceName, endpoint, method) => {
  const initialState = {
    data: null,
  };
  const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
      handleUpdate: (state, action) => {
        state.data = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(request.pending, (state) => {
          console.log("pending");
        })
        .addCase(request.fulfilled, (state, action) => {
          console.log(action);
          state.data = action.payload;
        });
    },
  });

  const request = createAsyncThunk(`/${sliceName}/request`, async (params) => {
    try {
      const res = await makeHttpRequest(method, endpoint, params);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  });

  return {
    slice,
    request,
  };
};

export default generateThunkAndSlice;
