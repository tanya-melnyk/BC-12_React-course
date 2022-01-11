import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'services/api';

const API_ENDPOINT = 'univer';

const fetchImage = createAsyncThunk('univer/getImage', async () => {
  const data = await api.getData(API_ENDPOINT);
  if (data) {
    const images = Object.values(data);
    return images[images.length - 1];
  }
  return null;
});

const addImage = createAsyncThunk('univer/addImage', async image => {
  await api.saveItem(API_ENDPOINT, image);
  return image;
});

const univer = createSlice({
  name: 'univer',
  initialState: {
    image: null,
    loading: true,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchImage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.image = payload;
      })
      .addCase(fetchImage.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })

      .addCase(addImage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addImage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.image = payload;
      })
      .addCase(addImage.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export { fetchImage, addImage };

export default univer.reducer;
