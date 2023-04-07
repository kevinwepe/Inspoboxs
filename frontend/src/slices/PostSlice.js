import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios, { formToJSON } from 'axios';
import { Form } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('token'));

const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/posts`
});

API.interceptors.request.use(request => {
    if(user){
        request.headers.Authorization = `Bearer ${user}`;
    }

    return request;
});

export const getAllPosts = createAsyncThunk('post/get' , async () => {
     try {
        const { data } = await API.get('/all');
        if(data) {
            return data;
        }

     } catch(err) {
        return null;
     }
});

export const createPost = createAsyncThunk('post/create' , async ({ postForm,setPostForm }) => {
    try {
        const formData = new FormData();
        formData.append('title' , postForm.title);
        formData.append('description',postForm.description);
        formData.append('image' , postForm.image);
        formData.append('user_id' , postForm.user_id);

        const { data } = await API.post('/create' , formData);

        if(data) {
        setPostForm({
          title:"",
          image:"",
          description:""
       });

            window.location.href = "/";

            return data;
        }

    } catch(err) {
        return null;
    }
});

const PostSlice = createSlice({
    name:'post',
    initialState: {
        posts:[],
        loading:false 
    },
    extraReducers:(builder) => {
        builder.addCase(getAllPosts.fulfilled,(state, { payload }) => {
            state.posts = payload;

            return state;
        })
    }
});

export default PostSlice.reducer;