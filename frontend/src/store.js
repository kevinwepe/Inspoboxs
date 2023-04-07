import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from "./slices/AuthSlice";
import AlertSlice from './slices/AlertSlice';
import PostSlice from './slices/PostSlice';
import ProfileSlice from './slices/ProfileSlice';

export default configureStore({
    reducer: {
        auth:AuthSlice,
        alert:AlertSlice,
        posts:PostSlice,
        profile:ProfileSlice
    },
});