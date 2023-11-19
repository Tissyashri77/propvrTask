import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "./slice/images"
import searchImageSlice from "./slice/search"
import imageDetailsSlice from "./slice/image"

export const store = configureStore({
    reducer:{
        randomImages: imageSlice,
        searchImages: searchImageSlice,
        imageDetails: imageDetailsSlice
    }
})