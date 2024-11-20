import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

const initialState = {
  roles: [],
  role: {},
  status: "idle",
  error: null,
};

export const fetchUserRoles = createAsyncThunk(
  "userRoles/fetchUserRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/roles");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUserRoleById = createAsyncThunk(
  "userRoles/fetchUserRoleById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/roles/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUserRole = createAsyncThunk(
  "userRoles/createUserRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/roles", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "userRoles/updateUserRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/roles/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserRole = createAsyncThunk(
  "userRoles/deleteUserRole",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/roles/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userRolesSlice = createSlice({
  name: "userRoles",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roles = action.payload;
        state.error = null;
      })
      .addCase(fetchUserRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserRoleById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserRoleById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.role = action.payload;
        state.error = null;
      })
      .addCase(fetchUserRoleById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createUserRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createUserRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.status = "succeeded";
         
        state.error = null;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload);
        state.error = action.payload;
      })
      .addCase(deleteUserRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roles = state.roles.filter(
          (userRole) => userRole.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteUserRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userRolesSlice.reducer;
