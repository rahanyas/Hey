import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import server from '../../utils/axiosInstance.utils.js'


const initialState = {
    name : '',
    email : '',
    mobile : '',
    pass : '',
    isLogedIn : false,
    isFirstAuthCheck : true,
    status : 'idle',
    msg : ''
}


export const register = createAsyncThunk('user/register', async(data, {rejectWithValue}) => {
    try {     
        const res = await server.post('/auth/register', data);
        console.log('res from register : ', res);
        
        return res.data;
    } catch (err) {
        console.log('error in register func : ', err.response.data)
        return rejectWithValue(err.response.data || {msg : 'Sign-in Failed', success : false})
    }
});

export const login = createAsyncThunk('user/login', async (data, {rejectWithValue}) => {
    try {
        // console.log('data from login : ', data)
        const res = await server.post('/auth/login', data);
        console.log('res from login req : , ',res.data)
        return res.data
    } catch (err) {
        console.log('error in login func', err.response.data);
        return rejectWithValue(err.response.data || {msg : 'Login Failed', success : false})
    }
});

export const checkAuth = createAsyncThunk('user/checkAuth', async (_,{rejectWithValue}) => {
    try {
        const res = await server.get('/auth/checkAuth', {withCredentials : true});
        return res.data
    } catch (err) {
        console.log('Error in checkAuth  : ', err.response.data);
        return rejectWithValue(err.response.data || {msg : 'checkAuth Failed', success : false})
    }
});

export const logout = createAsyncThunk('user/logout', async (_, {rejectWithValue}) => {
    try {
        const res = await server.post('/auth/logout');
        console.log('res from logout : ', res.data);
        return res.data
    } catch (err) {
        console.log('Error in logout Thunk', err);
        return rejectWithValue(err.response.msg || {msg : 'Logout Failed', success : false})
    }
})

export const oauthLogin = () => {
        let Oauth_uri = import.meta.env.VITE_ENV === 'dev' ? import.meta.env.VITE_OAUTH_DEV_URI : VITE_OAUTH_PROD_URI ;
        window.location.href = Oauth_uri ;
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        updateFeild : (state, action) => {
            const {field, value} = action.payload;
            state[field] = value
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.msg = '';
                state.isLogedIn = false
                state.status = 'loading'
            })
            .addCase(register.fulfilled, (state, action) => {
                console.log('register fullfiled res : ', action);               
                state.msg = action.payload?.msg;
                state.email = action.payload?.data?.email;
                state.name = action.payload?.data?.name;
                state.isLogedIn = action.payload?.success;
                state.status = 'success';
            })
            .addCase(register.rejected, (state, action) =>  {
                console.log('register rejected res : ',action);
                state.msg = action.payload?.msg ;
                state.isLogedIn = action.payload?.success;               
                state.status = 'failed';
            }),
        builder
              .addCase(login.pending, state => {
                state.msg = '';
                state.isLogedIn = false;
                state.status  = 'loading'
              })
              .addCase(login.fulfilled, (state, action) => {
                console.log('login fullfiled res : ',action);
                state.msg = action.payload?.msg;
                state.isLogedIn = action.payload?.success;
                state.status  = 'success';
                state.name = action.payload?.data?.name;
                state.email = action.payload?.data?.email;
                state.mobile = action.payload?.data?.mobile
              })
              .addCase(login.rejected, (state, action) => {
                state.msg = action.payload?.msg;
                state.isLogedIn = action.payload?.success;
                state.status = 'failed'
              }),
        builder
              .addCase(checkAuth.pending, state => {
                state.msg = '';
                state.status = 'loading';
              })
              .addCase(checkAuth.fulfilled, (state, action) => {
                console.log('res checkauth fullfiled : ',action);
                state.msg = action.payload?.msg;
                state.isLogedIn = action.payload?.success;
                state.status  = 'success';
                state.isFirstAuthCheck = false;
                state.name = action.payload?.data?.name;
                state.email = action.payload?.data?.email;
                state.mobile = action.payload?.data?.mobile
              })
              .addCase(checkAuth.rejected, (state, action) => {
                state.msg = '';
                state.isLogedIn = false;
                state.isFirstAuthCheck = false;
                state.status = 'failed';
              }),
        builder
              .addCase(logout.pending, (state) => {
                 state.status = 'loading',
                 state.isLogedIn = false
              })
              .addCase(logout.fulfilled, (state, action) => {
                state.email = '';
                state.pass  = '';
                state.mobile = '';
                state.isLogedIn = false;
                state.status = 'success';
                state.msg = action.payload?.msg;
              })
              .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.msg = action.payload?.msg;
              });
    }
});

export const {updateFeild} = userSlice.actions

export default userSlice.reducer;