import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi } from "unsplash-js";

export const fetchRandomImages = createAsyncThunk(
  "fetchRandomImages",
  async () => {
    const unsplash = createApi({
      accessKey: "JpEiPI4RJUCRCEwQ-bJcKptgpzDOrCefK8TbN_K7FzM",
    });

    let images = []

    await unsplash.photos.getRandom({ count: 30 }).then((result) => {
      if (result.errors) {
        console.log("error occurred: ", result.errors[0]);
      } else {
        const photos = result.response;
        images = images.concat(photos)
      }
    });

    return images;
  }
);

const imageSlice = createSlice({
    name:"randomImages",
    initialState:{
        isLoading: false,
        data:[],
        isError:false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRandomImages.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchRandomImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(fetchRandomImages.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default imageSlice.reducer
