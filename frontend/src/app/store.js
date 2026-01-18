import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice.js';
import messageReducer from '../features/messages/msgServices.js';

export const store = configureStore({
    reducer : {
       user :  userReducer,
       msg : messageReducer,
    }
})