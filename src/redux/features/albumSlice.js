import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const getAlbums = createAsyncThunk(
  "albums/getAlbums",
  async () => {
    try {
      const api = await fetch("https://jsonplaceholder.typicode.com/albums");
      const data = await api.json();
      return data.slice(0, 5)
    } catch (err) {
      console.error(err.message);
    }
   
  }
);
const albumSlice = createSlice({
  name: "albums",
  initialState: {
    albums: [],
    status: null
  },
  extraReducers: {
    [getAlbums.pending]: (state) => {
      state.status = "pending"
    },
    [getAlbums.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.albums = payload;
    },
    [getAlbums.rejected]: (state) => {
      state.status = "rejected"
    },
  }
});
export default albumSlice.reducer;