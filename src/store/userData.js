import { createSlice } from "@reduxjs/toolkit";

const initialUserData={token:null,email:null,isLoggedIn:false};
const userDataSlice=createSlice({
    name:'userData',
    initialState:initialUserData,
    reducers:{
        setIsLoggedIn(state){
            state.isLoggedIn=true;
        },
        setToken(state,action){
            state.token=action.payload;
        },
        setEmail(state,action){
            state.email=action.payload;
        }
    }
});

export const userDataActions=userDataSlice.actions;
export default userDataSlice.reducer;