import { createSlice } from "@reduxjs/toolkit";

const AlertSlice = createSlice({
    name:'alert',
    initialState:{
        message:"",
        variant:"",
        textVariant:"",
        open:false 
    },
    reducers: {
        openAlert(state, { payload }) {
            state.message=payload.message;
            state.variant=payload.variant;
            state.textVariant=payload.textVariant;
            state.open = true;
            
            return state;
        },

        closeAlert(state, { payload }) {
            state.message="";
            state.variant="";
            state.textVariant="";
            state.open = false;
            
            return state;
        }
    }
});

export const { openAlert,closeAlert } = AlertSlice.actions;

export default AlertSlice.reducer;