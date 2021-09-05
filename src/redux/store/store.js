import { configureStore } from '@reduxjs/toolkit';
import albumReducer from '../features/albumSlice';
import photoReducer from '../features/photoSlice';
export const store = configureStore({
  reducer: {
    photos: photoReducer,
    albums: albumReducer,
  },
});