import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getPhotos = createAsyncThunk("photos/getPhotos", async () => {
  try {
    const api = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await api.json();

    const photos = [];

    const idCount = {
      id1: 0,
      id2: 0,
      id3: 0,
      id4: 0,
      id5: 0,
    };
    data.forEach((pic) => {
      switch (pic.albumId) {
        case 1:
          if (idCount.id1 < 10) {
            idCount.id1 = idCount.id1 + 1;
            photos.push(pic);
          }
          break;
        case 2:
          if (idCount.id2 < 10) {
            idCount.id2 = idCount.id2 + 1;
            photos.push(pic);
          }
          break;
        case 3:
          if (idCount.id3 < 10) {
            idCount.id3 = idCount.id3 + 1;
            photos.push(pic);
          }
          break;
        case 4:
          if (idCount.id4 < 10) {
            idCount.id4 = idCount.id4 + 1;
            photos.push(pic);
          }
          break;
        case 5:
          if (idCount.id5 < 10) {
            idCount.id5 = idCount.id5 + 1;
            photos.push(pic);
          }
          break;

        default:
          break;
      }
    });

    return photos;
  } catch (err) {
    console.error(err.message);
  }
});
const photoSlice = createSlice({
  name: "photos",
  initialState: {
    allPhotos: [],
    status: null,
    
  },
  extraReducers: {
    [getPhotos.pending]: (state) => {
      state.status = "pending";
    },
    [getPhotos.fulfilled]: (state, { payload }) => {
      state.allPhotos = payload;
      state.status = "success";
    },
    [getPhotos.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default photoSlice.reducer;