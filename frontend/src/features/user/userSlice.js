import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import server from '../../utils/axiosInstance.utils.js';
import { 
    disconnectSocket 
} from '../../sokcet/connectSocket.js';

const initialState = {
    id : 0,
    name : '',
    email : '',
    mobile : '',
    isLogedIn : false,
    status : 'idle',
    authChecked : false,
    msg : '',
    friends : [],
    isError : false
};




export const register = createAsyncThunk('user/register', async(data, {rejectWithValue}) => {
    try {     
        const res = await server.post('/api/register', data);
        console.log('res from register : ', res);
        return res.data;
    } catch (err) {
        console.log('error in register func : ', err.response?.data)
        return rejectWithValue(err.response?.data || {msg : 'Sign-in Failed', success : false})
    }
});

export const login = createAsyncThunk('user/login', async (data, {rejectWithValue}) => {
    try {
        // console.log('data from login : ', data)
        const res = await server.post('/api/login', data);
        console.log('res from login req : , ',res.data)
        return res.data
    } catch (err) {
        console.log('error in login func', err.response?.data);
        return rejectWithValue(err.response?.data || {msg : 'Login Failed', success : false})
    }
});

export const checkAuth = createAsyncThunk('user/checkAuth', async (_,{rejectWithValue}) => {
    try {
        const res = await server.get('/api/checkAuth', {withCredentials : true, });
        return res.data
    } catch (err) {
        console.log('Error in checkAuth  : ', err.response?.data);
        return rejectWithValue(err.response?.data || {msg : 'checkAuth Failed', success : false})
    }
});

export const logout = createAsyncThunk('user/logout', async (_, {rejectWithValue}) => {
    try {
        const res = await server.post('/api/logout');
        console.log('res from logout : ', res.data);
        disconnectSocket();
        return res.data
    } catch (err) {
        console.log('Error in logout Thunk', err);
        return rejectWithValue(err.response?.msg || {msg : 'Logout Failed', success : false})
    }
})

export const oauthLogin = () => {
        let Oauth_uri = import.meta.env.VITE_ENV === 'dev' ? import.meta.env.VITE_OAUTH_DEV_URI : import.meta.env.VITE_OAUTH_PROD_URI ;

        window.location.href = Oauth_uri ;
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        updateFeild : (state, action) => {
            const {field, value} = action.payload;
            state[field] = value;
        },
        addErrorMsg: (state, action) => {
            state.isError = true;
            state.msg = action.payload;
        },
        clearMsg : state => {
            state.isError = false;
            state.msg = '';
        },
        updateFriendList : (state, action) => {
             const {feature, _id, name} = action.payload
             if(feature === 'add'){
                state.friends = [...state.friends,{ _id , name}];
             };     
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.msg = '';
                state.status = 'loading',
                state.isError = false
            })
            .addCase(register.fulfilled, (state, action) => {
                console.log('register fullfiled res : ', action);          
                state.id = action.payload?.data?._id
                state.msg = action.payload?.msg;
                state.email = action.payload?.data?.email;
                state.friends = []
                state.name = action.payload?.data?.name;
                state.isLogedIn = action.payload?.success;
                state.status = 'success';
                state.isError = false;
            })
            .addCase(register.rejected, (state, action) =>  {
                console.log('register rejected res : ',action);
                state.friends = []
                state.msg = action.payload?.msg ;
                state.isLogedIn = action.payload?.success;               
                state.status = 'failed';
                state.isError = true;
            })

            .addCase(login.pending, state => {
                state.msg = '';
                state.id = 0
                state.status  = 'loading'
                state.isError = false
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log('login fullfiled res : ',action);
                state.id = action.payload?.data?._id
                state.msg = action.payload?.msg;
                state.isLogedIn = action.payload?.success;
                state.friends = action?.payload?.data?.friends || []
                state.status  = 'success';
                state.name = action.payload?.data?.name;
                state.email = action.payload?.data?.email;
                state.mobile = action.payload?.data?.mobile;
                state.isError = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.msg = action.payload?.msg;
                state.id = 0
                state.isLogedIn = action.payload?.success;
                state.status = 'failed';
                state.isError = true
            })

            .addCase(checkAuth.pending, state => {
                state.status = 'loading';
                state.id = 0
                state.isError = false;
                state.friends = []
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                console.log('res checkauth fullfiled : ',action);
                state.id = action.payload?.data?._id
                state.msg = action.payload?.msg || '';
                state.isLogedIn = action.payload?.success || '';
                state.status  = 'success';
                state.friends = action.payload?.data?.friends || ''
                state.authChecked = true
                state.name = action.payload?.data?.name || '';
                state.email = action.payload?.data?.email || '';
                state.mobile = action.payload?.data?.mobile || '';
                state.isError = false
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.msg = action.payload?.msg || '';
                state.id = 0
                state.isLogedIn = false;
                state.authChecked = true
                state.status = 'failed';
                state.isError = true
            })

            .addCase(logout.pending, (state) => {
                 state.status = 'loading'
                 state.isError = false
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.email = '';
                state.mobile = '';
                state.isLogedIn = false;
                state.name = '';
                state.friends = []
                state.status = 'success';
                state.msg = action.payload?.msg;
                state.isError = false
            })
              .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.msg = action.payload?.msg;
                state.isError = true
            });
    }
});

export const {updateFeild, addErrorMsg, clearMsg, updateFriendList} = userSlice.actions

export default userSlice.reducer;