import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { closeAlert, openAlert } from "./AlertSlice";
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

export const DeleteUserPost = createAsyncThunk('profile/delete-posts' , async ({ postid })=>{
    try {
        const { data } = await API.delete(`http://127.0.0.1:8000/api/posts/delete/${postid}`, {
            headers: {
                Authorization:`Bearer ${user}`
            }
        });

        if(data) {
            return data;
        }

    } catch(err) {
         return null;
    }
});

export const UpdatePostItem = createAsyncThunk('profile/update-posts' , async ({ postForm , id,setPostForm }) => {
    try {
        const formData = new FormData();
        formData.append('title',postForm.title);
        formData.append('description',postForm.description);
        formData.append('image', postForm.image);
        formData.append('user_id', postForm.user_id);

        const { data } = await axios.post(`http://127.0.0.1:8000/api/posts/update/${id}`,formData);

        if(data) {
            setPostForm({
                title:'',
                description:'',
                image:null,
            });
            window.location.href = "/profile";
            return data;
        }

    } catch(err) {
        return null;
    }
});

export const UpdateProfile = createAsyncThunk('profile/update-profile'  , async ({ profileForm,userid,setOpen,dispatch }) => {
    try {
        dispatch(openAlert({
            message:'Updating...',
            variant:'bg-blue-50',
            textVariant:'text-blue-500'
        }));

        const { data } = await API.post(`/update/${userid}`,profileForm);

        if(data) {
            setOpen(false);
            dispatch(closeAlert());

            window.location.href = "/profile";
            return data;
        }

    } catch(err) {

    }
});

export const UpdateAvatarHandler = createAsyncThunk('profile/update-avatar' , async ({ userid, file }) => {
     try {
        const formData = new FormData();
        formData.append('avatar' , file);

        const { data } = await API.post(`/update/avatar/${userid}`,formData);

        if(data) {
            return data;
        }

     } catch(err) {

     }
});

const ProfileSlice = createSlice({
    name:'profile',
    initialState:{
        posts:[],
        loading:false,
        dataProfile:null
    },
    extraReducers:(builder) => {
        builder.addCase(GetProfilePosts.fulfilled,(state, { payload }) => {
            state.posts = payload[0].posts;
            state.dataProfile = payload[0];

            return state;
        });

        builder.addCase(DeleteUserPost.fulfilled , (state, { payload }) => {
             if(payload){
                const filtered = state.posts.filter((post,idx) => post.id != payload ? post : "");
                state.posts = filtered;
             }

             return state;
        });

        builder.addCase(UpdateProfile.fulfilled, (state, { payload }) => {
             state.dataProfile = payload;

             return state;
        });

        builder.addCase(UpdateAvatarHandler.fulfilled, (state, { payload }) => {
            state.dataProfile = payload;

            return state;
        });
    },
    reducers:{}
});

export default ProfileSlice.reducer;