import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

export const fetchSongs = createAsyncThunk(
  "songs/fetchSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/music");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSong = createAsyncThunk(
  "songs/addSong",
  async (newSong, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        "/api/music/create-new",
        newSong,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSong = createAsyncThunk(
  "songs/updateSong",
  async (song, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/music/edit-new/${song._id}`, song, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSongById = createAsyncThunk(
  "songs/fetchSongById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/music/get-by-id?_id=${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSong = createAsyncThunk(
  "songs/deleteSong",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/music/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// top 10 songs with the most views
export const fetchTopSongs = createAsyncThunk(
  "songs/fetchTopSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/music/top/10");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    song: null,
    topSongs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songs = action.payload.data;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.songs = state.songs.filter((song) => song._id !== action.payload);
      })
      .addCase(addSong.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
       })
      .addCase(updateSong.fulfilled, (state, action) => {
        const newSong = action.payload;
        const existingSong = state.songs.find(
          (song) => song._id === newSong._id
        );
        state.songs[state.songs.indexOf(existingSong)] = newSong;
      })
      .addCase(updateSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSongById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.song = action.payload.data;
      })
      .addCase(fetchSongById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTopSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topSongs = action.payload.data;
      })
      .addCase(fetchTopSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default songsSlice.reducer;
