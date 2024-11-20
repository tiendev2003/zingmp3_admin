import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

export const fetchArtists = createAsyncThunk(
  "artists/fetchArtists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/artists");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchArtistById = createAsyncThunk(
  "artists/fetchArtistById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/artists/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addArtist = createAsyncThunk(
  "artists/addArtist",
  async (artist, { rejectWithValue }) => {
    try {
      console.log(artist);
      const response = await axiosClient.post("/api/artists", artist, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateArtist = createAsyncThunk(
  "artists/updateArtist",
  async ({ id, ...artist }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/artists/${id}`, artist);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteArtist = createAsyncThunk(
  "artists/deleteArtist",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/api/artists/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// top 10 artists with the most songs
export const fetchTopArtists = createAsyncThunk(
  "artists/fetchTopArtists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/artists/top/10");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
 

const artistsSlice = createSlice({
  name: "artists",
  initialState: {
    artists: [],
    artist: null,
    topArtists: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.artists = action.payload;
        state.error = null;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchArtistById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArtistById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.artist = action.payload;
        state.error = null;
      })
      .addCase(fetchArtistById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addArtist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addArtist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.artists.push(action.payload);
      })
      .addCase(addArtist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateArtist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateArtist.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.artists.findIndex(
          (artist) => artist.id === action.payload.id
        );
        state.artists[index] = action.payload;
        state.error = null;
      })
      .addCase(updateArtist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteArtist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.artists = state.artists.filter(
          (artist) => artist.id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteArtist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTopArtists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopArtists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topArtists = action.payload.data;
        state.error = null;
      })
      .addCase(fetchTopArtists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default artistsSlice.reducer;
