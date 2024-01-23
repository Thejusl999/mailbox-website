import { createSlice } from "@reduxjs/toolkit";

const initialMailsState={inbox:[],outbox:[]};
const mailsSlice=createSlice({
    name:'mails',
    initialState:initialMailsState,
    reducers:{
        clearMails(state){
            state.inbox=[];
            state.outbox=[];
        },
        setInbox(state,action){
            state.inbox.push(action.payload);
        },
        setOutbox(state,action){
            state.outbox.push(action.payload);
        }
    }
})

export const allMailsActions=mailsSlice.actions;
export default mailsSlice.reducer;