import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "./slice/images"
import searchImageSlice from "./slice/search"

export const store = configureStore({
    reducer:{
        randomImages: imageSlice,
        searchImages: searchImageSlice
    }
})