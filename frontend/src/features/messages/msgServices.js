import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../utils/axiosInstance.utils";


const initialState = {
    messages : [],
    status : 'loading'
};

export const getMessages = createAsyncThunk('/message/get', async(otherUserId, {rejectWithValue}) => {
    try {
        const res = await server.get(`/message/getmessages/${otherUserId}`);
        console.log('res fom get Message : ', res.data);
        return res.data;
    } catch (err) {
        console.log('error in get Message func : ', err);
        return rejectWithValue(err.response?.data || 'get message failed')
    }
});

const messageSlice = createSlice({
    name : 'message',
    initialState,
    reducers : {
        addMessageToState : (state, action) => {
            state.messages.push(action?.payload)
        },
        deletMsgFromState : (state, action) => {
            state.messages = state.messages.map(msg => 
                 msg._id === action.payload ? {...msg, isDeleted : true } : msg
            )
        }
    },
    extraReducers : (builder) => {
        builder
          .addCase(getMessages.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(getMessages.fulfilled, (state, action) => {
            state.status = 'success';
            state.messages = action.payload?.data || []
          })
          .addCase(getMessages.rejected, (state) => {
            state.status = 'failed';
            state.messages = []
          })
    }
});

export const {addMessageToState, deletMsgFromState} = messageSlice.actions;

export default messageSlice.reducer