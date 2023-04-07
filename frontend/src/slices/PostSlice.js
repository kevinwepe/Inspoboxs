import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios, { formToJSON } from 'axios';
import { Form } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('token'));

const API = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/posts`
});

const APIComment = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/comments`
});

API.interceptors.request.use(request => {
    if(user){
        request.headers.Authorization = `Bearer ${user}`;
    }

    return request;
});

APIComment.interceptors.request.use(request => {
    if(user) {
        request.headers.Authorization = `Bearer ${user}`;
    };

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

export const CommentHandler = createAsyncThunk('posts/comment-create' , async ({ comment , userid ,postid }) => {
    try {
        const { data } = await APIComment.post('/create', {
             comment,
             user_id:userid,
             post_id:postid
        });

        if(data) {
            return data;
        }

    } catch(err) {
        return null;
    }
});

export const SearchHandler = createAsyncThunk('posts/search' , async ({ searchTerm,setSearch }) => {
    try {

        const { data } = await axios.post('http://127.0.0.1:8000/api/search',{ title:searchTerm });

        if(data) {
            setSearch(false);
            return data;
        }

    } catch(err) {

    }
});

const PostSlice = createSlice({
    name:'post',
    initialState: {
        posts:[],
        loading:false ,
        loadingComment:false
    },
    extraReducers:(builder) => {
        builder.addCase(getAllPosts.pending , (state, { payload }) => {
            state.loading =true;
            
            return state;
        })

        builder.addCase(getAllPosts.fulfilled,(state, { payload }) => {

            if(payload) {
                state.posts = payload;
                state.loading = false;
            }

            return state;
        });

        builder.addCase(CommentHandler.pending, (state) => {
            state.loadingComment = true;

            return state;
        });

        builder.addCase(CommentHandler.fulfilled,(state , { payload }) => {
             state.posts = payload;
             state.loadingComment = false;

             return state;
        });

        builder.addCase(SearchHandler.pending, (state, { payload }) => {
            state.loading = true;

            return state;
        });

        builder.addCase(SearchHandler.fulfilled , (state, { payload }) => {
            if(payload) {
                 state.loading = false;
                 state.posts = payload;
            }

            return state;
        })
    }
});

export default PostSlice.reducer;