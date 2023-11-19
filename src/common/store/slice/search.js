import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi } from "unsplash-js";

export const searchImages = createAsyncThunk(
    "searchImages",
    async ({query}) => {
        console.log(query);
        const unsplash = createApi({
            accessKey: process.env.REACT_APP_ACCESS_TOKEN,
          });
      
          let searchDatas = []

          try {
            const response = await unsplash.search.getPhotos({ query, perPage:30 });
            
            if (response.errors) {
              console.log("Error occurred:", response.errors[0]);
            } else {
              const searchResults = response.response.results; // Adjust 'results' based on the actual property name
              searchDatas = searchDatas.concat(searchResults);
            }
          } catch (error) {
            console.error("Error fetching images:", error);
          }
        
      
          return searchDatas;
    }
)

const searchSlice = createSlice({
    name:"searchImages",
    initialState:{
        isLoading: false,
        data:[],
        isError:false,
    },
    extraReducers: (builder) => {
        builder.addCase(searchImages.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(searchImages.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.data = action.payload
        })

        builder.addCase(searchImages.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default searchSlice.reducer