import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import JWTDecode from 'jwt-decode';
import { openAlert } from "./AlertSlice";
import axios from "axios";

const API = axios.create({
   baseURL:`${process.env.REACT_APP_BASE_API_URL}/auth`
});

const user = JSON.parse(localStorage.getItem('token'));

const initialState = {
    token:user,
    user:user? JWTDecode(user) : null, 
}

export const loginHandler = createAsyncThunk('auth/login' , async ({ loginForm,setlogin,dispatch }) => {
    try {
       dispatch(openAlert({
          message:'Authenticated user..',
          variant:'bg-blue-50',
          textVariant:'text-blue-500'
       }));

        const { data } = await API.post('/login' , loginForm);
        if(data) {
            setlogin(false);
            return data;
        }

    } catch(err) {
        const { response:{ data} } = err;
        dispatch(openAlert({
            message:data.message,
            variant:'bg-red-50',
            textVariant:'text-red-500'
         }));
    }
});

export const registerHandler = createAsyncThunk('auth/register' , async ({ registerForm,dispatch,setregister,setlogin }) => {
     try {
        dispatch(openAlert({
            message:'Creating user..',
            variant:'bg-blue-50',
            textVariant:'text-blue-500'
         }));
  
        const { data } = await API.post('/register' , registerForm);
        if(data) {
            setregister(false);
            setlogin(true);
            return data;
        }

     }catch(err) {
        const { response:{ data} } = err;

        dispatch(openAlert({
            message:data.message,
            variant:'bg-red-50',
            textVariant:'text-red-500'
         }));
        return null;
     }
});

const AuthSlice = createSlice({
    name:'auth', 
    initialState,
    reducers: {
        logoutHandler(state) {
            state.token = null;
            state.user= null;

            localStorage.setItem("token" , JSON.stringify(state.token));

            return state;
        }
    },
    extraReducers:(builder)=> {
       builder.addCase(loginHandler.fulfilled, (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.token ? JWTDecode(payload.token) : null;

          localStorage.setItem('token' , JSON.stringify(state.token));
          return state;
       });

       builder.addCase(registerHandler.fulfilled, (state,  { payload }) => {
        state.token = payload.token;
        state.user = payload.token ? JWTDecode(payload.token) : null;

        localStorage.setItem('token' , JSON.stringify(state.token));
        return state;
       });
    }
});

export const { logoutHandler } = AuthSlice.actions;

export default AuthSlice.reducer;