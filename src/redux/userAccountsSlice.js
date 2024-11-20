import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

export const fetchUserAccounts = createAsyncThunk(
  "userAccounts/fetchUserAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/account");

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUserAccountById = createAsyncThunk(
  "userAccounts/fetchUserAccountById",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/account/${accountId}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUserAccount = createAsyncThunk(
  "userAccounts/updateUserAccount",
  async (account, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(
        `/api/account/${account._id}`,
        account
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addUserAccount = createAsyncThunk(
  "userAccounts/addUserAccount",
  async (newAccount, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/account", newAccount);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "userAccounts/deleteUserAccount",
  async (accountId, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/account/${accountId}`);

      return accountId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const changeRoleAccount = createAsyncThunk(
  "userAccounts/changeRoleAccount",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axiosClient.put(`/api/account/change-role`, {
        id: data.id,
        newRole: data.name,
      });
      console.log(response.data);
      return { id: data.id, newRole: data.name };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userAccountsSlice = createSlice({
  name: "userAccounts",
  initialState: {
    accounts: [],
    account: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserAccounts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserAccounts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.accounts = action.payload;
    });
    builder.addCase(fetchUserAccounts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(deleteUserAccount.fulfilled, (state, action) => {
      state.accounts = state.accounts.filter(
        (account) => account._id !== action.payload
      );
    });
    builder.addCase(deleteUserAccount.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(addUserAccount.fulfilled, (state, action) => {
      state.accounts.push(action.payload);
      state.status = "succeeded";
    });
    builder.addCase(addUserAccount.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(updateUserAccount.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(updateUserAccount.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(fetchUserAccountById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserAccountById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.account = action.payload;
    });
    builder.addCase(fetchUserAccountById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(changeRoleAccount.fulfilled, (state, action) => {
      
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(changeRoleAccount.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default userAccountsSlice.reducer;
