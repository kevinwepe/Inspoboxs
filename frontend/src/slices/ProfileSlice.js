import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('token'));

const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/profile`
});

API.interceptors.request.use((request) => {
    if(user){
        request.headers.Authorization = `Bearer ${user}`;
    }

    return request;
});

export const GetProfilePosts = createAsyncThunk('profile/get-posts', async ({ userid }) => {
  try {
    const { data } = await API.get(`/${userid}`);
    if(data) {
        return data;
    }

  } catch(err) {
     return null;
  }
});

const ProfileSlice = createSlice({
    name:'profile',
    initialState:{
        posts:[],
        loading:false
    },
    extraReducers:(builder) => {
        builder.addCase(GetProfilePosts.fulfilled,(state, { payload }) => {
            state.posts = payload;

            return state;
        })
    },
    reducers:{}
});

export default ProfileSlice.reducer;