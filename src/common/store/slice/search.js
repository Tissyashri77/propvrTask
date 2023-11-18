import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi } from "unsplash-js";

export const searchImages = createAsyncThunk(
    "searchImages",
    async ({query, pageNo}) => {
        const unsplash = createApi({
            accessKey: "JpEiPI4RJUCRCEwQ-bJcKptgpzDOrCefK8TbN_K7FzM",
          });
      
          let searchDatas = []

          await unsplash.search.getPhotos({query: query,page:pageNo,perPage:30}).then((result) => {
            if (result.errors) {
              console.log("error occurred: ", result.errors[0]);
            } else {
              const searchResults = result.response;
              searchDatas = searchDatas.concat(searchResults)
            }
          });
      
          return searchDatas;
    }
)

const searchSlice = createSlice({
    name:"searchImages",
    initialState:{
        isLoading: false,
        data:[],
        isError:false,
        pages:0,
    },
    extraReducers: (builder) => {
        builder.addCase(searchImages.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(searchImages.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.data = [...state.data, ...action.payload[0].results]
            state.pages = Math.floor(action.payload[0].total_pages / 30)
        })

        builder.addCase(searchImages.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default searchSlice.reducer