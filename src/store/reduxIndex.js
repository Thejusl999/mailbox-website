import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from './userData';
import allMailsReducer from './allMails';

const store=configureStore({
    reducer:{userData:userDataReducer,mails:allMailsReducer}
});

export default store;