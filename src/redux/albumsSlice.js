import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";
 
export const fetchAlbums = createAsyncThunk(
  "albums/fetchAlbums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/albums");
      console.log(response.data);
      return response.data;
    } catch (error) {
        console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const addAlbum = createAsyncThunk(
  "albums/addAlbum",
  async (album, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/albums", album,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAlbum = createAsyncThunk(
  "albums/updateAlbum",
  async (album, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/albums/${album._id}`, album,{
        headers: {
          "Content-Type": "multipart/form-data",
          
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAlbumById = createAsyncThunk(
  "albums/fetchAlbumById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/albums/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAlbum = createAsyncThunk(
  "albums/deleteAlbum",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/albums/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get top 10 albums with the most songs
export const fetchTopAlbums = createAsyncThunk(
  "albums/fetchTopAlbums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/albums/top/10");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    albums: [],
    album: {},
    topAlbums: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.albums = action.payload;
        state.error = null;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter(
          (album) => album._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(addAlbum.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAlbum.fulfilled, (state, action) => {
        state.albums.push(action.payload);
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(addAlbum.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(updateAlbum.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const newAlbum = action.payload;
        state.albums = state.albums.map((album) =>
          album._id === newAlbum._id ? newAlbum : album
        );
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(updateAlbum.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(fetchAlbumById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.album = action.payload;
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(fetchAlbumById.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(fetchTopAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopAlbums.fulfilled, (state, action) => {
        state.topAlbums = action.payload.data;
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(fetchTopAlbums.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export default albumsSlice.reducer;
