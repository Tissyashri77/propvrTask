import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi } from "unsplash-js";

export const fetchImageDetails = createAsyncThunk(
    "fetchImageDetails",
    async(id) => {
        const unsplash = createApi({
            accessKey: process.env.REACT_APP_ACCESS_TOKEN,
          });
        
        let image;

        await unsplash.photos.get({ photoId: id }).then((result) => {
            if (result.errors) {
                console.log("error occurred: ", result.errors[0]);
              } else {
                const photos = result.response;
                image = photos
              }
        })


        return image;
        
    }
)


const imageDetailSlice = createSlice({
    name:"imageDetails",
    initialState:{
        isLoading: false,
        data: null,
        isError:false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchImageDetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchImageDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(fetchImageDetails.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default imageDetailSlice.reducer;